import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerComponent } from '../customer/customer.component';
import { PinComponent } from '../pin/pin.component';
import { PinService } from 'src/app/services/pin.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  constructor(public dialog: MatDialog, public pinService: PinService) { }

  ngOnInit(): void {
    this.getPinList();
    this.getCustomers();
  }

  preview!: string;
  listItem: any;
  pinArray: any;
  isPinDisabled: boolean = false;
  getPinList() {
    this.listItem = localStorage.getItem("shared_pinInfo");
    this.pinArray = JSON.parse(this.listItem);

    // const profile = this.pinArray[0].image;
    // console.log(profile);
    this.pinArray.forEach((itm: any) => {
      const profile = itm.image;
      this.convertImageToBase64(profile);

    })
    // this.toDataURL('profile', function (data:any) {
    //   console.log(data)
    // })


  }

  customersList: any;
  customersListArr: any;
  getCustomers() {
    this.customersList = localStorage.getItem("shared_customerinfo");
    this.customersListArr = JSON.parse(this.customersList);
    console.log(this.customersListArr);
    if (this.customersListArr.length == 0) {
      this.isPinDisabled = true;
    }
  }

  base64Image: any;
  convertImageToBase64(url: string): void {
    this.pinService.getImageAsBase64(url).subscribe((res: any) => {
      console.log(res)
      this.base64Image = res;
      console.log('base url', this.base64Image);
    })
  }

  toDataURL(url: any, callback: any) {
    // return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
    return url;
    // })

  }


  openAddCustomer() {
    const dialogRef = this.dialog.open(CustomerComponent, {
      width: "400px",
      // height:"auto"
    });
    dialogRef.afterClosed().subscribe(confirm => {
      this.getPinList();
    });
  }

  onAddPin() {
    const dialogRef = this.dialog.open(PinComponent, {
      width: "400px",
      // height:"auto"
    });
    dialogRef.afterClosed().subscribe(confirm => {
      console.log('closed', confirm)
      this.getPinList();
    });
  }

}
