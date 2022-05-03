import {Component, OnInit} from '@angular/core';
import {ProductActionTypes} from "../../../state/product.state";
import {EventDrivenService} from "../../../state/event-driven.service";

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent implements OnInit {

  //@Output() productEventEmitter:EventEmitter<ActionEvent> = new EventEmitter<any>();
  constructor(private eventDrivenService:EventDrivenService) { }

  ngOnInit(): void {
  }

  onGetAllProducts() {
    /*this.productEventEmitter.emit({
      type:ProductActionTypes.GET_ALL_PRODUCTS
    });*/
    this.eventDrivenService.publishEvent({
      type:ProductActionTypes.GET_ALL_PRODUCTS
    })
  }

  onGetSelectedProducts() {
    this.eventDrivenService.publishEvent({
      type:ProductActionTypes.GET_SELECTED_PRODUCTS
    });
  }

  onGetAvailableProducts() {
    this.eventDrivenService.publishEvent({
      type:ProductActionTypes.GET_AVAILABLE_PRODUCTS
    })
  }

  onNewProduct() {
    this.eventDrivenService.publishEvent({
      type:ProductActionTypes.NEW_PRODUCT
    })
  }

  onSearch(dataForm: any) {
    this.eventDrivenService.publishEvent({
      type:ProductActionTypes.SEARCH_PRODUCTS,
      payload:dataForm
    })
  }
}
