import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NewauthorComponent } from './newauthor/newauthor.component';
import { NewquoteComponent } from './newquote/newquote.component';
import { EditauthorComponent } from './editauthor/editauthor.component';
import { HomeComponent } from './home/home.component';
import { GetquotesComponent } from './getquotes/getquotes.component';

const routes: Routes = [
  { path: 'newauthor', component: NewauthorComponent },
  { path: 'editauthor/:id', component: EditauthorComponent },
  { path: 'newquote/:id', component: NewquoteComponent },
  { path: 'getquotes/:id', component: GetquotesComponent },
  { path: 'home', component: HomeComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
