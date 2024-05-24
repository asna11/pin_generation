import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  itemId: any;
  public customerForm: any;
  customerInfo: any;
  selectPlaceholder: string = 'Region';
  CountryPlaceholder: string = 'Country';
  filteredCountryList: any = [];
  filteredCountry: any = [];
  items: any = ['Africa', 'Antarctic', 'Asia', 'Central America'];
  selectedRegion: any;

  constructor(private customerService: CustomerService, public dialogRef: MatDialogRef<CustomerComponent>,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
  ) {
    this.buildForm();
    // this.selectControl.valueChanges.subscribe(value => console.log(value));
  }

  private buildForm() {
    this.customerForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required
      ])),
      email: new FormControl('', Validators.compose([Validators.required
      ])),
      region: new FormControl('', Validators.compose([Validators.required
      ])),
      country: new FormControl('', Validators.compose([
        Validators.required,
      ]))
    })
  }

  selectRegion(event: any) {
    this.filteredCountry = [];
    this.selectedRegion = event[0].value;
    console.log(this.selectedRegion);
    this.filteredCountryList = this.countryArr.filter((itm: any) => {
      return itm.region == this.selectedRegion;
    });

    this.filteredCountryList.forEach((data: any) => {
      this.filteredCountry.push(data.country);
    });
    console.log(this.filteredCountry);
  }

  ngOnInit(): void {
    this.getCountryList();
  }

  getRegion(event: any) {
    console.log(event)
  }

  countryArr: any = [];
  getCountryList() {
    this.customerService.getCountry().subscribe((response: any) => {
      console.log(response);
      if (response) {
        this.countryArr.push(response.data.AF, response.data.AM, response.data.AO, response.data.AQ, response.data.AZ, response.data.BD, response.data.BF, response.data.BI, response.data.BJ, response.data.BN, response.data.BT, response.data.BV, response.data.BW, response.data.BZ, response.data.CD, response.data.CF, response.data.CG, response.data.CI, response.data.CM, response.data.CN, response.data.CV, response.data.DJ, response.data.DZ, response.data.EG, response.data.EH, response.data.ER, response.data.ET, response.data.GA, response.data.GE, response.data.GH, response.data.GM, response.data.GN, response.data.GQ, response.data.GS, response.data.GW, response.data.HK, response.data.HM, response.data.ID, response.data.IN, response.data.IO, response.data.JP, response.data.KE, response.data.KG, response.data.KH, response.data.KM, response.data.KP, response.data.KR, response.data.KZ, response.data.LA, response.data.LK, response.data.LR, response.data.LS, response.data.LY, response.data.MA, response.data.MG, response.data.ML, response.data.MM, response.data.MN, response.data.MO, response.data.MR, response.data.MU, response.data.MV, response.data.MW, response.data.MY, response.data.MZ, response.data.NA, response.data.NE, response.data.NG, response.data.NP, response.data.PH, response.data.PK, response.data.RE, response.data.RW, response.data.SC, response.data.SD, response.data.SG, response.data.SH, response.data.SL, response.data.SN, response.data.SO, response.data.SS, response.data.ST, response.data.SZ, response.data.TD, response.data.TF, response.data.TG, response.data.TH, response.data.TJ, response.data.TL, response.data.TM, response.data.TN, response.data.TW, response.data.TZ, response.data.UG, response.data.UZ, response.data.VN, response.data.YT, response.data.ZA, response.data.ZM, response.data.ZW);
        console.log(this.countryArr);
      }
    })
  }

  onAddCustomer() {
    console.log(this.customerForm)
    this.customerInfo = Object.assign({}, this.customerInfo);
    this.customerInfo = Object.assign(this.customerInfo, this.customerForm.value);
    this.customerService.updateCustomerInfo(this.customerInfo);
    this.dialogRef.close();
    this.openMsgDialog('Customer added Successfully', 'success');
  }

  openMsgDialog(title: string, className: string) {
    this.snackBar.open(title, '', {
      duration: 2000,
      panelClass: [className]
    });
  }

}
