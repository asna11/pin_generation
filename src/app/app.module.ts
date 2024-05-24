import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { ListItemModule } from './pages/list-item/list-item.module';
import { CustomerModule } from './pages/customer/customer.module';
import { PinModule } from './pages/pin/pin.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ListItemModule,
    BrowserAnimationsModule,
    CustomerModule,
    PinModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
