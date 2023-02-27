import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { User } from './_models/User';
import { AccountService } from './_services/account.service';
import { ProductService } from './_services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  private destroyed$ = new Subject();
  constructor(private http: HttpClient, private accountService: AccountService, private productService: ProductService){
  }
  
  ngOnInit(): void {
    this.productService.refreshProductData().subscribe(()=>{})
    this.setCurrentUser()
  }
  
  ngOnDestroy(): void {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }

  setCurrentUser(){
    const userString = localStorage.getItem('user');
    
    if(!userString) return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
}
