import { Routes } from "@angular/router"
import { WelcomeComponent } from "./welcome-page.component";

export const appRoutes:Routes = [

    { path: 'welcome', component:WelcomeComponent},
    { path:'', redirectTo:'welcome', pathMatch:'full'},
    {
        path:'books',
        loadChildren: () => import('./books/book.module')
            .then(m => m.BookModule)
    }
]