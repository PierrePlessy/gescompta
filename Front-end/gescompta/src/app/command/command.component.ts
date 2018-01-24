import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.css']
})
export class CommandComponent implements OnInit {

  command: Object;

  constructor(private api: ApiService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.api.getCommand().subscribe(data => {
      this.command = data.json();

      var price = 0;
      this.command[0].product.forEach((product) => {
        price += product.price
      })
      this.command[0].priceHT = price
      this.command[0].priceTTC = price * 1.20
    }, err => {
      return false;
    });
  }

  deleteProduct(id) {
    this.api.deleteProduct(id).subscribe(data => {
      alert(data.message);
      window.location.reload();
    });
  }

}
