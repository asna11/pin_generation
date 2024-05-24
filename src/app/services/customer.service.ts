import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private _customerInfo: any;
  @Output() customerInfoUpdation = new EventEmitter<any>();


  constructor(private http: HttpClient) { }

  getCountry(): Observable<any> {
    return this.http.get<any>(`https://api.first.org/data/v1/countries`).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }

  get IsCustomerInfo() {
    return this._customerInfo;
  }

  set IsCustomerInfo(newValue: any) {
    this._customerInfo = newValue;
    localStorage.setItem("shared_customerinfo", JSON.stringify(newValue));
  }

   custList: any = [];

  updateCustomerInfo(value: any) {
    this.custList.push(value);
    console.log(this.custList);
    this.customerInfoUpdation.emit({ customerInfo: this.custList })
    this._customerInfo = this.custList;
    localStorage.setItem("shared_customerinfo", JSON.stringify(this.custList));
  }
}
