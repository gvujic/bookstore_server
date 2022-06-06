import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav/nav-bar.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { BookModule } from './books/book.module';
import { WelcomeComponent } from './welcome-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BookModule 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
