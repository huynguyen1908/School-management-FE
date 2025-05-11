import { Component } from '@angular/core';
import { LayoutComponent } from './layout/layout/layout.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  //templateUrl: './app.component.html',
  //styleUrls: ['./app.component.scss']

  template: `<router-outlet></router-outlet>`,
  styles: []
})
  
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
}
