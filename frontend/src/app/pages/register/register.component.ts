import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/utils/login.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username: string;
  password: string;
  email: string;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(private loginService: LoginService, private router: Router) {
    this.username = '';
    this.password = '';
    this.email = '';
  }

  register() {
    if (this.username != '' && this.password != '' && this.email != '') {
      this.loginService
        .register(this.username, this.password, this.email)
        .subscribe(
          (msg) => {
            console.log(msg);
            this.login();
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  login() {
    if (this.username != '' && this.password != '') {
      this.loginService.login(this.username, this.password).subscribe(
        (msg) => {
          console.log(msg);
          localStorage.setItem('user', this.username);
          this.router.navigate(['/home']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
