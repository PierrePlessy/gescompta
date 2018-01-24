import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstname: String;
  lastname: String;
  birthdate: String;
  address: String;
  password: String;
  email: String;

  constructor(private api: ApiService,
    private router: Router) { }

  ngOnInit() {
  }

  registerSubmit() {
    const body = {
      firstname: this.firstname,
      lastname: this.lastname,
      birthdate: this.birthdate,
      address: this.address,
      password: this.password,
      email: this.email
    };

    this.api.authenticate(body).subscribe(data => {
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
