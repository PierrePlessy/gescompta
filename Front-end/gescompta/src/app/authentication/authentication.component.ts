import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  password: String;
  email: String;

  constructor(private api: ApiService,
    private router: Router) { }

  ngOnInit() {
  }


  loginSubmit() {
    const user = {
      password: this.password,
      email: this.email
    };

    this.api.authenticate(user).subscribe(data => {
      if (data.success) {
        this.api.userData(data.token);
        alert(data.message);
        this.router.navigate(['product/all']);
      } else {
        alert(data.message);
        this.router.navigate(['login']);
      }
    });

  }

}
