import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NewauthorComponent } from './newauthor/newauthor.component';
import { NewquoteComponent } from './newquote/newquote.component';
import { EditauthorComponent } from './editauthor/editauthor.component';
import { HomeComponent } from './home/home.component';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { GetquotesComponent } from './getquotes/getquotes.component';


@NgModule({
  declarations: [
    AppComponent,
    NewauthorComponent,
    NewquoteComponent,
    EditauthorComponent,
    HomeComponent,
    GetquotesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
