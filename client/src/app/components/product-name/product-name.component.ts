import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-product-name',
  templateUrl: './product-name.component.html',
  styleUrls: ['./product-name.component.css']
})
export class ProductNameComponent implements OnInit {
  @Input() name: string;
  @Input() description: string;

  constructor() { }

  ngOnInit() {
  }

}
