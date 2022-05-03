import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../../models/product.model";
import {ProductActionTypes} from "../../../../state/product.state";
import {EventDrivenService} from "../../../../state/event-driven.service";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product!: Product;
  //@Output() eventEmitter:EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();
  constructor(private eventDrivenService:EventDrivenService) { }

  ngOnInit(): void {
  }

  onGetSelect(product: Product) {
    this.eventDrivenService.publishEvent({
      type:ProductActionTypes.SELECT_PRODUCT,
      payload: product
    })
    /*this.eventEmitter.emit({
      type:ProductActionTypes.SELECT_PRODUCT,
      payload: product
    })*/
  }

  onDelete(product: Product) {
    this.eventDrivenService.publishEvent({
      type:ProductActionTypes.DELETE_PRODUCT,
      payload: product
    })
  }

  onEdit(product: Product) {
    this.eventDrivenService.publishEvent({
      type:ProductActionTypes.EDIT_PRODUCT,
      payload: product
    })
  }
}
