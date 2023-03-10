import * as functions from "firebase-functions";
import { auth } from "./init";


export function getUserCredentialsMiddleware(req, res, next) {

    functions.logger.debug(
        `Attempting to extract user credentials from request`
    )
    const jwt = req.headers.authorization

    if (jwt) {
        auth.verifyIdToken(jwt)
            .then(jwtPayload => {
                req['uid'] = jwtPayload.uid
                req['admin'] = jwtPayload.admin
                req['role'] = jwtPayload.role
                functions.logger.debug(
                    `Credentials: uid=${jwtPayload.uid}, admin=${jwtPayload.admin}`
                )
                next()
            })
            .catch(err => {
                console.log('error occured while validating JWT', err)
                next()
            })
    } else {
        next()
    }
}