import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: Object;

  constructor(private api: ApiService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.api.getProduct(id).subscribe(data => {
      this.product = data;
    }, err => {
      return false;
    });
  }

  addProduct(id) {
    this.api.addProductApi(id).subscribe(data => {
      alert(data.message);
    });
  }
}
