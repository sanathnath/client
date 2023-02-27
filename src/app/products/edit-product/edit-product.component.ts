import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  validationError: string[] | undefined;
  images: any = [];
  uploadedImages: any = [];
  product: any;

  constructor(private fb: FormBuilder, private productService: ProductService,
    private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.registerForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required]],
      discount: ['',[Validators.required]],
      quantity: ['',[Validators.required]],
      description: ['',[Validators.required]],
      category: ['', Validators.required, this.selectValidator()]
    });
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


  selectValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value !== ""
        ? null
        : { notMatching: true };
    };
  }

  getImages(event: any){
    this.images = event;
  }
}
