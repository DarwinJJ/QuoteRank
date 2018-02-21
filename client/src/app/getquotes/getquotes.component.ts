import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute, Routes } from '@angular/router';

@Component({
  selector: 'app-getquotes',
  templateUrl: './getquotes.component.html',
  styleUrls: ['./getquotes.component.css']
})
export class GetquotesComponent implements OnInit {
  id = "";
  quotes = [];
  name = ""

  constructor(private _httpService: HttpService,
              private _router: Router,
              private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log("id: ", this.id)
      let quotes = this._httpService.getOneAuthor(this.id);
      quotes.subscribe(data => {
        if (data['message'] == 'Success') {
          console.log('Successfully retrieve quotes', data);
          this.quotes=data['data']['quotes'];
          this.id = data['data']['_id'];
          this.name = data['data']['name'];
          console.log(data)
          console.log('quotes: ', this.quotes)
          // this._router.navigate(['/home'])
        } else {
          console.log('Error: Create Author', data['error']);
        }
      });
    });
  }

  deleteQuote(event): void {
    console.log(event)
    let text = event.target.value;
    for (var i=0; i<this.quotes.length; i++) {
      if (this.quotes[i].text == text) {
          this.quotes.splice(i,1);
          break;
      }
    }
    let newAuth = {id: this.id, name: this.name, quotes: this.quotes}
    let Obs = this._httpService.updateAuthor(newAuth);
    Obs.subscribe(data => {
      if (data['message'] == 'Success') {
        console.log("Successfully ", data);
      } else {
        console.log("Error: updating Author", data['error']);
      }
    });
  }

  voteUp(event) {
    console.log(event)
    let txt = event.target.value;
    console.log("text: ", txt)
    console.log("quotes: ", this.quotes)
    for (var i=0; i<this.quotes.length; i++) {
      if (this.quotes[i].text == txt) {
          this.quotes[i].votes += 1;
          break;
      }
    }
    let newAuth = {id: this.id, name: this.name, quotes: this.quotes}
    let Obs = this._httpService.updateAuthor(newAuth);
    Obs.subscribe(data => {
      if (data['message'] == 'Success') {
        console.log("Successfully ", data);
      } else {
        console.log("Error: updating Author", data['error']);
      }
    });
  }

  voteDown(event) {
    console.log(event)
    let text = event.target.value;
    for (var i=0; i<this.quotes.length; i++) {
      if (this.quotes[i].text == text) {
          this.quotes[i].votes -= 1;
          break;
      }
    }
    let newAuth = {name: this.name, quotes: this.quotes}
    let Obs = this._httpService.updateAuthor(newAuth);
    Obs.subscribe(data => {
      if (data['message'] == 'Success') {
        console.log("Successfully ", data);
      } else {
        console.log("Error: updating Author", data['error']);
      }
    });
  }
}
