import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  authToken: any;
  user: any;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  authenticate(user) {
    return this.http.post('http://localhost:3000/api/auth', user, { headers: this.headers })
      .map(res => res.json());
  }

  userData(token) {
    localStorage.setItem('id_token', token);
    this.authToken = token;
  }

  getToken() {
    const token = localStorage.getItem('id_token');
    console.log("Token : " + token)
    this.authToken = token;
  }

  getAllProducts() {
    this.getToken()
    this.headers.append('Authorization', "Bearer " + this.authToken);
    return this.http.get('http://localhost:3000/api/product/all', { headers: this.headers })
      .map(res => res.json());
  }

  getProduct(id) {
    this.getToken()
    this.headers.append('Authorization', "Bearer " + this.authToken);
    return this.http.get('http://localhost:3000/api/product/'+ id, { headers: this.headers })
      .map(res => res.json());
  }

  getCommand() {
      this.getToken()
      this.headers.append('Authorization', "Bearer " + this.authToken);
      return this.http.get('http://localhost:3000/api/command/', { headers: this.headers })
        .map(res => res.json());
  }

  addProductApi(id) {
      this.getToken()
      this.headers.append('Authorization', "Bearer " + this.authToken);
      return this.http.post('http://localhost:3000/api/command/addProduct/' + id, { headers: this.headers }).map(res => res.json());
  }

  deleteProduct(id) {
      this.getToken()

      this.headers.append('Authorization', "Bearer " + this.authToken);
      console.log("putain");
      return this.http.post('http://localhost:3000/api/command/deleteProduct/' + id, { headers: this.headers }).map(res => res.json());
  }

  loggedIn() {
    return tokenNotExpired();
  }
}
