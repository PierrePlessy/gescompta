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
    console.log("Id : " + id)
    this.api.getProduct(id).subscribe(data => {
        console.log("Data : " + data)
      this.product = data;
      console.log(this.product);
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
