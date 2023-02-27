import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any;

  constructor(private route: ActivatedRoute,
     private productService: ProductService){ }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.getSingleProduct(Number(id)).subscribe({
      next: (response => {
        console.log(response);
        this.product = response;
      })
    })
  }
}
