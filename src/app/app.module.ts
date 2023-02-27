import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './_forms/register/register.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { LoginComponent } from './_forms/login/login.component';
import { AuthComponent } from './auth/auth.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { PhotoUploaderComponent } from './_forms/photo-uploader/photo-uploader.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ProductsListsComponent } from './products/products-lists/products-lists.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { EditProductComponent } from './products/edit-product/edit-product.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    TextInputComponent,
    LoginComponent,
    AuthComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    NavComponent,
    HomeComponent,
    CreateProductComponent,
    PhotoUploaderComponent,
    ProductsListsComponent,
    EditProductComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    BsDropdownModule.forRoot(),
    NgxSpinnerModule.forRoot({ type: 'ball-spin-clockwise-fade' }),
    CarouselModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
