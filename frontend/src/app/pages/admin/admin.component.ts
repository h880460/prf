import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/utils/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  message = '';
  users: User[] = [];

  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.refreshUsers();
  }

  makeUserAdmin(username: string) {
    this.loginService.makeAdmin(username).subscribe(
      (msg) => {
        console.log(msg);
        this.refreshUsers();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  refreshUsers() {
    this.users = [];
    this.loginService.getUsers().subscribe(
      (users) => {
        // console.log(users);
        (users as User[]).forEach((user) => {
          if (user.username != localStorage.getItem('user')) {
            this.users.push(user);
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
