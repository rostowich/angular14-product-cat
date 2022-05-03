import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../../services/products.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductActionTypes} from "../../../state/product.state";
import {EventDrivenService} from "../../../state/event-driven.service";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productId:number;
  submitted:boolean=false;
  productFormGroup!:FormGroup;
  constructor(private activatedRoute:ActivatedRoute,
              private productService:ProductsService,
              private formBuilder:FormBuilder,
              private eventDrivenService : EventDrivenService) {
    this.productId = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.productService.getAProduct(this.productId)
      .subscribe(product=>{
        this.productFormGroup = this.formBuilder.group({
          id:[product.id,Validators.required],
          name:[product.name,Validators.required],
          price:[product.price,Validators.required],
          quantity:[product.quantity,Validators.required],
          selected:[product.selected,Validators.required],
          available:[product.available,Validators.required]
        })
      })
  }

  onUpdateProduct() {
    this.productService.updateProduct(this.productFormGroup.value)
      .subscribe(data=>{
        this.eventDrivenService.publishEvent({type:ProductActionTypes.PRODUCT_UPDATED})
        alert("Success of the product update")
      })
  }
}
