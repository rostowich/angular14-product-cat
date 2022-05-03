import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {ActionEvent, AppDataState, DataStateEnum, ProductActionTypes} from "../../../state/product.state";
import {Product} from "../../../models/product.model";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @Input() productsInput$: Observable<AppDataState<Product[]>> | null=null;
  //@Output() productEventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();
  readonly DataState = DataStateEnum;
  constructor() { }

  ngOnInit(): void {
  }

  /*onGetSelect(product: Product) {
    this.productEventEmitter.emit({
      type: ProductActionTypes.SELECT_PRODUCT,
      payload: product
    });
  }

  onDelete(product: Product) {
    this.productEventEmitter.emit({
      type: ProductActionTypes.DELETE_PRODUCT,
      payload: product
    });
  }

  onEdit(product: Product) {
    this.productEventEmitter.emit({
      type: ProductActionTypes.EDIT_PRODUCT,
      payload: product
    });
  }*/

  /*onActionEvent($event: ActionEvent) {
    this.productEventEmitter.emit($event);
  }*/
}
