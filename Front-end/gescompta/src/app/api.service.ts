import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  authToken: any;
  user: any;
  private headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '<origin> | *' });
  constructor(private http: Http) { }

  authenticate(user) {
    return this.http.post('http://localhost:3000/api/auth', user, { headers: this.headers })
      .map(res => res.json());
  }

  userData(token) {
    localStorage.setItem('id_token', token);
    this.authToken = token;
  }
}
