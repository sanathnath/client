import { Component, OnInit } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-products-lists',
  templateUrl: './products-lists.component.html',
  styleUrls: ['./products-lists.component.css']
})
export class ProductsListsComponent implements OnInit {
  products: any;
  private destroyed$ = new Subject();
  
  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.productService.getProducts().pipe(
      // it is now important to unsubscribe from the subject
      takeUntil(this.destroyed$)
    ).subscribe(data => {
      console.log("data",data); // the latest data
      this.products = data;
    });
  }

  deleteItem(id:number){
    console.log("delete");
    
    this.productService.deleteProduct(id).subscribe({
      next:() => {
        this.productService.refreshProductData().subscribe(()=>{})
      }
    })
  }
  editItem(item:any){

  }

}
