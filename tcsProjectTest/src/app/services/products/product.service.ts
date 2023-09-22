import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //private apiUrl = 'https://tribu-ti-staffing-desarrolloafangwbmcrhucqfh.z01.azurefd.net/ipf-msaproductosfinancieros/bp/products';
  private apiUrl = 'https://tribu-ti-staffing-desarrolloafangwbmcrhucqfh.z01.azurefd.net/ipf-msaproductosfinancieros/bp/products';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'authorId': '1312716747'
  });

  constructor(private http: HttpClient) { }

  // Método para obtener los productos
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.headers });
  }

  // Método para crear un producto
  createProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl, JSON.stringify(product), { headers: this.headers });
  }
}
