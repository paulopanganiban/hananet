// import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
// import * as firebaseui from 'firebaseui';
// import { AngularFireAuth } from '@angular/fire/auth';
// import { Router } from '@angular/router';
// import firebase from 'firebase/app';
// import EmailAuthProvider = firebase.auth.EmailAuthProvider;
// import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;


// @Component({
//     selector: 'login',
//     templateUrl: './login.component.html',
//     styleUrls: ['./login.component.scss']
// })
// export class LoginComponent implements OnInit, OnDestroy {
//     ui: firebaseui.auth.AuthUI

//     constructor(private afAuth: AngularFireAuth,
//         private router: Router
//         ) {

//     }

//     ngOnInit() {
//         this.afAuth.app.then(app => {

//             const uiConfig = {
//                 signInOptions: [EmailAuthProvider.PROVIDER_ID],
//                 callbacks: {
//                     signInSuccessWithAuthResult: this.onLoginSuccessful.bind(this)
//                 }
//             }
//             // init
//             this.ui = new firebaseui.auth.AuthUI(app.auth())
//             this.ui.start('#firebaseui-auth-container', uiConfig)

//             // always required to sign on close tab / browser
//             this.ui.disableAutoSignIn()
//         })
//     }

//     ngOnDestroy() {
//         this.ui.delete()
//     }
//     onLoginSuccessful(result) {
//         console.log(result, 'result login')
//         this.router.navigateByUrl('/courses')
//     }   
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  currentUser$: Observable<any> = {} as Observable<any>;
  isLoggedIn: boolean = false;
  constructor(private router: Router, private formBuilder: FormBuilder,
    private userService: UserService
  ) { }
  loginForm: FormGroup
  ngOnInit(): void {
    this.initializeForm()
    // this.currentUser$ = this.authService.currentUser$;
  }
  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
      return null
    }
    const { username, password } = this.loginForm.value
    this.userService.login(username, password)
  }
  initializeForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }
}