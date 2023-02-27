import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  validationError: string[] | undefined;
  images: any = [];
  uploadedImages: any = [];

  constructor(private fb: FormBuilder, private productService: ProductService,
    private router: Router) {}

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

  uploadImage() {
    return new Promise<void>((resolve, reject) => {
      for (let i = 0; i < this.images.length; i++) {
        this.productService.uploadPhoto(this.images[i]).subscribe({
          next: (_) => {
            this.uploadedImages.push(this.productService.image);
            if (i === this.images.length - 1) {
              resolve();
            }
          },
          error: (err) => reject(err)
        });
      }
    });
  }

  async addProduct(){
    console.log(this.registerForm.value);
    
    await this.uploadImage().then(()=>{
      
      this.productService.addProduct({...this.registerForm.value,
         photos:[...this.uploadedImages]}).subscribe({
          next:() =>{
            this.productService.refreshProductData().subscribe(()=>{
              this.router.navigateByUrl('/')
            })
          },
          error:err => console.log(err)
         })
    });
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
