import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <nav-bar></nav-bar>
  <router-outlet class="container"></router-outlet>
  `
})
export class AppComponent {
  title = 'books-angular';
}
