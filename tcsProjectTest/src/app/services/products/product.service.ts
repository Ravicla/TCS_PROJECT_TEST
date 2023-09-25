import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { lastValueFrom } from 'rxjs';
import { Product } from 'src/app/interfaces/products/product.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://tribu-ti-staffing-desarrolloafangwbmcrhucqfh.z01.azurefd.net/ipf-msaproductosfinancieros/bp/products';



  constructor(private http: HttpClient) { }

  getAll(): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorId': '1312716747'
    });
    const options = { headers: headers };

    return lastValueFrom(this.http.get<any>(`${this.apiUrl+'bp/products'}`,options))
  }
  
  validateId(pId: string): Promise<any> {
    return lastValueFrom(this.http.get<any>(`${this.apiUrl}bp/products/verification?id=${pId}`))
  }

  // Método para crear un producto
  createProduct(product: Product): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorId': '1312716747'
    });
    const options = { headers: headers };
    return lastValueFrom(this.http.post<Product>(this.apiUrl + 'bp/products', product,options)); 
  }

  updateProduct(pProduct: Product): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorId': '1312716747'
    });
    const options = { headers: headers };
    return lastValueFrom(this.http.put<any>(`${this.apiUrl+'bp/products'}`, pProduct,options))
  }

}
