import { Component } from '@angular/core';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GrannyFrame: Telegram Picture Frame';

  constructor() {
    console.log('Production Environment: ' + environment.production);
  }
}
