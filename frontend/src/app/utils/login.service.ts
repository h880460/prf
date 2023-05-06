import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post(
      environment.serverUrl + '/login',
      { username: username, password: password },
      { withCredentials: true, responseType: 'json' }
    );
  }

  logout() {
    return this.http.post(
      environment.serverUrl + '/logout',
      {},
      { withCredentials: true, responseType: 'text' }
    );
  }

  register(username: string, password: string, email: string) {
    return this.http.post(
      environment.serverUrl + '/user',
      { username: username, email: email, password: password },
      { withCredentials: true, responseType: 'text' }
    );
  }

  uploadToDb(user: User) {
    return this.http.put(
      environment.serverUrl + '/user',
      {
        username: user.username,
        email: user.email,
        password: user.password,
        admin: user.admin,
      },
      { responseType: 'text' }
    );
  }

  getUsers() {
    return this.http.get(environment.serverUrl + '/user', {
      responseType: 'json',
    });
  }

  makeAdmin(username: string) {
    return this.http.put(
      environment.serverUrl + '/user/makeAdmin',
      { username: username },
      { responseType: 'text' }
    );
  }
}
