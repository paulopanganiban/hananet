import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
interface UserRoles {
  admin: boolean;
}
interface UserCredentials {
  displayName: string
  email: string
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn$: Observable<boolean>
  isLoggedOut$: Observable<boolean>
  pictureUrl$: Observable<string>
  roles$: Observable<UserRoles>
  userCredentials$: Observable<UserCredentials>
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth) {
    this.isLoggedIn$ = afAuth.authState.pipe(
      tap(data => console.log(data, 'auth data')),
      map(user => !!user)
    )
    this.isLoggedOut$ = this.isLoggedIn$.pipe(
      map(isLoggedIn => !isLoggedIn)
    )
    this.pictureUrl$ = afAuth.authState.pipe(
      map(user => user ? user.photoURL : null)
    )

    this.roles$ = this.afAuth.idTokenResult.pipe(
      map(token => <any>token?.claims),
      tap(token => console.log(token, 'roles$'))
    )
    this.userCredentials$ = this.afAuth.authState.pipe(
      map(({ displayName, email }) => ({ displayName, email }))
    )
  }
  logout() {
    this.afAuth.signOut()
    this.router.navigateByUrl('/login')
  }
  login(email, password) {
    console.log(email, password)
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(userCredential)
        // Successful login, redirect to dashboard
        this.router.navigate(['/']);
        console.log()
      })
      .catch((error) => {
        console.log(error, 'error')
      });
  }
}
