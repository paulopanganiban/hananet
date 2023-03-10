import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { concatMap, filter, map, tap } from 'rxjs/operators';
import { columnBuilder, convertSnaps } from '../_helpers';
import firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private db: AngularFirestore) { }

  addDriver({ firstName, lastName, contactNumber }) {
    // get seq no
    return from(
      this.db.collection('drivers').add({
        firstName: firstName,
        lastName: lastName,
        contactNumber: contactNumber,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })
    )
  }
  getDrivers$ = this.db.collection('drivers', ref => ref.orderBy('createdAt', 'desc')).snapshotChanges()
    .pipe(
      // tap((snaps) => {
      //   snaps.forEach(snap => console.log(snap.payload))
      // })
      // map(result => convertSnaps<any>(result))
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data as any };
        })
      ),
      tap(data => console.log(data, 'drivers')),
      tap(data =>
        console.log(
          columnBuilder(data, ['createdAt', 'id'])

        )
      ),
      map(data => ({
        columns: columnBuilder(data, ['createdAt', 'id']),
        rows: data
      })),
      tap(data => console.log(data, 'drivers aft')),
    )
}
