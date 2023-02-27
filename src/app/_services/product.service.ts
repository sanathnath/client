import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, ReplaySubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl;
  image: any;
  // private currentproductsSource = new BehaviorSubject<any | null>(null);
  // currentproducts$ = this.currentproductsSource.asObservable();
  /*--------------------*/
  private  _productsData$ = new ReplaySubject<any>();

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any>{
    return this._productsData$.asObservable();
  }

  refreshProductData(): Observable<void> {
    return this.http.get<any>(this.baseUrl + 'products').pipe(
      tap(response => {
        // notify all subscribers of new data
        console.log(response);
        
        this._productsData$.next(response);
      })
    );
  }

  getSingleProduct(id: number){
    return this.http.get(this.baseUrl + "products/" + id).pipe(
      map(response => {
        return response;
      })
    )
  }

  uploadPhoto(image: any){
    const formData = new FormData();
    formData.append("file",image)
    return this.http.post(this.baseUrl + "products/add-photo", formData).pipe(
      map(response => {
        this.image = response
        console.log(this.image);
      })
    )
  }

  addProduct(data: any){
    return this.http.post(this.baseUrl + "products", data).pipe(
      map(response => {
      })
    )
  }

  deleteProduct(id: number){
    return this.http.delete(this.baseUrl + "products/" + id);
  }

}
