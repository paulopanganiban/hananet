import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  roles = ['dispatcher', 'admin']
  userForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    role: [this.roles[0], Validators.required]
  });
  display = false

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    public userService: UserService) { }

  ngOnInit(): void {
  }
  onCreateUser() {

    const user = this.userForm.value;

    console.log(user);

    this.http.post(environment.api.createUser, {
      email: user.email,
      password: user.password,
      role: user.role,
    })
      .pipe(
        catchError(err => {
          alert(err)
          return throwError(err)
        })
      )
      .subscribe(() => {
        alert('User created success')
        this.userForm.reset()
      })
  }

}
