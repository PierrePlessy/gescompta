import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
// import { Product } from './product';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {

  products: Object;

  constructor(private api: ApiService,
    private router: Router) { }

  ngOnInit() {
    this.api.getAllProducts().subscribe(data => {
      this.products = data;
      console.log(this.products[0]);
    }, err => {
      return false;
    });
  }

  addProduct(id) {
    this.api.addProductApi(id).subscribe(data => {
        console.log(data)
      alert(data.message);
      // window.location.reload();
    });
  }

}
