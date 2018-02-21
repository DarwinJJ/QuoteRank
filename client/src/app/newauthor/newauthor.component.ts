import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newauthor',
  templateUrl: './newauthor.component.html',
  styleUrls: ['./newauthor.component.css']
})
export class NewauthorComponent implements OnInit {
  newAuth = {name: ""}

  constructor(private _httpService: HttpService,
            private _router: Router) { }

  ngOnInit() {
  }

  createAuthor(): void {
    console.log(this.newAuth)
    let Obs = this._httpService.createAuthor(this.newAuth);
    Obs.subscribe(data => {
      if (data['message'] == 'Success') {
        console.log('Successfully create author', data);
        this.newAuth.name="";
        this._router.navigate(['/home'])
      } else {
        console.log('Error: Create Author', data['error']);
      }
    });
  }
}