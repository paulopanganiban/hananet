import * as functions from "firebase-functions";
import { FieldValue } from "firebase-admin/firestore";
import { db } from "../init";

export default async (snap, context) => {
    if (context.params.courseId == 'stats') {
        return
    }
    functions.logger.debug(
        `Running delete course trigger for courseId ${context.params.courseId}`
    )
    const course = snap.data()
    if (course.promo) {
        return
    }

    return db.doc(`courses/stats`).update({
        totalPromo: FieldValue.increment(-1)
    })
}