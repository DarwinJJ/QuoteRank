import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-newquote',
  templateUrl: './newquote.component.html',
  styleUrls: ['./newquote.component.css']
})
export class NewquoteComponent implements OnInit {
  id = "";
  name = "";
  quotes = [];
  newQuote = {text: "", vote: 0}

  constructor(private _httpService: HttpService,
    private _router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log("newQuote init id: ", this.id);
      let Obs = this._httpService.getOneAuthor(this.id);
      Obs.subscribe(data => {
        if (data['message'] == 'Success') {
          this.name = data['data']['name'];
          this.quotes = data['data']['quotes'];
          console.log(data)
        } else {
          console.log('Error: Create Author', data['error']);
        }
      });
    });
  }

  createQuote(): void {
    console.log(this.newQuote)
    this.quotes.push(this.newQuote);
    let author = {id: this.id, name: this.name, quotes: this.quotes}
    let Obs = this._httpService.updateAuthor(author);
    Obs.subscribe(data => {
      if (data['message'] == 'Success') {
        console.log('Successfully create Quote', data);
        let pStr = '/getquotes/' + this.id
        this._router.navigate([pStr])
      } else {
        console.log('Error: Create Author', data['error']);
      }
    });
  }
}