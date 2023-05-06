import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../utils/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  email: string;

  constructor(private loginService: LoginService, private router: Router) {
    this.username = '';
    this.password = '';
    this.email = '';
  }

  login() {
    if (this.username != '' && this.password != '') {
      this.loginService.login(this.username, this.password).subscribe(
        (msg) => {
          // console.log(msg);
          // console.log((msg as any)['isAdmin']);
          localStorage.setItem('user', this.username);
          localStorage.setItem('isAdmin', (msg as any)['isAdmin']);
          this.router.navigate(['/home']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
      localStorage.removeItem('isAdmin');
      this.loginService.logout().subscribe(
        (msg) => {
          console.log('logout sikeres');
        },
        (err) => {
          console.log('logout error', err);
        }
      );
    }
  }
}
