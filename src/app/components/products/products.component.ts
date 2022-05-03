import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Product} from "../../models/product.model";
import {catchError, map, Observable, of, startWith} from "rxjs";
import {ActionEvent, AppDataState, DataStateEnum, ProductActionTypes} from "../../state/product.state";
import {Router} from "@angular/router";
import {EventDrivenService} from "../../state/event-driven.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$: Observable<AppDataState<Product[]>> | null=null;
  readonly DataState = DataStateEnum;

  constructor(private productsService : ProductsService,
              private router: Router,
              private eventDrivenService:EventDrivenService) { }

  ngOnInit(): void {
    this.eventDrivenService.sourceEventSubject.subscribe((actionEvent:ActionEvent)=>{
      this.onActionEvent(actionEvent);
    })
  }

  onGetAllProducts() {
    this.products$ = this.productsService.getAllProducts().pipe(
      map(data => ({dataState: DataStateEnum.LOADED, data:data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onGetSelectedProducts() {
    this.products$ = this.productsService.getSelectedProducts().pipe(
      map(data => ({dataState: DataStateEnum.LOADED, data:data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onGetAvailableProducts() {
    this.products$ = this.productsService.getAvailableProducts().pipe(
      map(data => ({dataState: DataStateEnum.LOADED, data:data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onSearch(dataForm: any) {
    this.products$ = this.productsService.searchProducts(dataForm.keyword).pipe(
      map(data => ({dataState: DataStateEnum.LOADED, data:data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onGetSelect(product: Product) {
    this.productsService.select(product)
      .subscribe(data =>{
        product.selected = data.selected;
      })
  }

  onDelete(product: Product) {
    let v = confirm("Are you sure you want to delete this product");
    if(v)
    this.productsService.delete(product)
      .subscribe(data =>{
        this.onGetAllProducts();
      })
  }

  onNewProduct() {
    this.router.navigateByUrl("/newProduct");

  }

  onEdit(p: Product) {
    this.router.navigateByUrl("/editProduct/"+p.id);
  }

  onActionEvent($event: ActionEvent) {
    switch ($event.type) {
      case ProductActionTypes.GET_ALL_PRODUCTS: this.onGetAllProducts();break;
      case ProductActionTypes.GET_SELECTED_PRODUCTS: this.onGetSelectedProducts();break;
      case ProductActionTypes.GET_AVAILABLE_PRODUCTS: this.onGetAvailableProducts(); break;
      case ProductActionTypes.SEARCH_PRODUCTS: this.onSearch($event.payload);break;
      case ProductActionTypes.NEW_PRODUCT: this.onNewProduct(); break;
      case ProductActionTypes.SELECT_PRODUCT:this.onGetSelect($event.payload); break;
      case ProductActionTypes.DELETE_PRODUCT:this.onDelete($event.payload);break;
      case ProductActionTypes.EDIT_PRODUCT: this.onEdit($event.payload); break;
    }
  }
}
