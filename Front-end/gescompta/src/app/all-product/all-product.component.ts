import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

}
