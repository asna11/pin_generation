import { Component } from '@angular/core';
import { enableProdMode } from '@angular/core';

enableProdMode();
// bootstrap(....);


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pin';
}

