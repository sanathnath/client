import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductsListsComponent } from './products/products-lists/products-lists.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'auth', component: AuthComponent},
  {path:'product-detail/:id', component: ProductDetailsComponent},
  {path:'product-create', component: CreateProductComponent},
  {path:'product-list', component: ProductsListsComponent},
  {path:'product-edit/:id', component: EditProductComponent},
  {path:'**', component: HomeComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
