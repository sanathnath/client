import { Component, OnInit } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { Product } from '../_models/Product';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  private destroyed$ = new Subject();


  constructor(private productService: ProductService){
    
  }

  ngOnInit(): void {
    this.loadProduct()
  }

  loadProduct(){
    // this.productService.getProducts().subscribe({
    //   next: (response: any) => {
    //     if(response) {
    //       this.productService.currentproducts$.pipe(take(1)).subscribe({
    //         next: prods => this.products = prods
    //       })
    //     }
    //   }
    // })
    this.productService.getProducts().pipe(
      // it is now important to unsubscribe from the subject
      takeUntil(this.destroyed$)
    ).subscribe(data => {
      console.log("data",data); // the latest data
      this.products = data;
    });
  }

}
