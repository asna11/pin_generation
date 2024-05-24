import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PinService {
  private _pinInfo: any;
  @Output() pinInfoUpdation = new EventEmitter<any>();


  constructor(private http: HttpClient) { }

  get IsPinInfo() {
    return this._pinInfo;
  }

  set IsPinInfo(newValue: any) {
    this._pinInfo = newValue;
    localStorage.setItem("shared_pinInfo", JSON.stringify(newValue));
  }

  pinList: any = [];
  updatePinInfo(value: any) {
    this.pinList.push(value);
    console.log(this.pinList);
    this.pinInfoUpdation.emit({ customerInfo: this.pinList })
    this._pinInfo = this.pinList;
    localStorage.setItem("shared_pinInfo", JSON.stringify(this.pinList));
  }

  // Fetch image as blob and convert to base64
  public getImageAsBase64(url: string): Observable<string> {
    return this.http.get(url, { responseType: 'blob' }).pipe(
      map(blob => this.convertBlobToBase64(blob))
    );
  }

  // Convert blob to base64
  private convertBlobToBase64(blob: Blob): any {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Observable(observer => {
      reader.onloadend = () => {
        observer.next(reader.result as string);
        observer.complete();
      };
    });
  }

}
