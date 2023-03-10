import * as functions from "firebase-functions";
import { auth, db } from "./init";
import { getUserCredentialsMiddleware } from "./auth.middleware";

const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')

export const createUserApp = express()

createUserApp.use(bodyParser.json())
createUserApp.use(cors({ origin: true }))
createUserApp.use(getUserCredentialsMiddleware)

createUserApp.post('/', async (req, res) => {
    functions.logger.debug(`Calling create user function`)
    try {

        if (!(req['uid'] && req['admin'])) {
            const message = 'Denied access to user creation service'
            functions.logger.debug(message)
            res.status(403).json({
                message
            })
            return
        }
        const { email, password, admin } = req.body
        // create user - firebas auth
        const user = await auth.createUser({
            email,
            password
        })
        // set custom claims
        await auth.setCustomUserClaims(user.uid, {
            admin
        })

        // add to whitelist (firebase) - empty doc ({})
        db.doc(`users/${user.uid}`).set({})
        res.status(200).json({
            message: 'User created success'
        })
    } catch (err) {
        functions.logger.debug(`Could not create user`, err)
        res.status(500).json({
            message: 'Could not create user'
        })
    }
})