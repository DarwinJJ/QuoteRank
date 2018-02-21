import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute, Routes } from '@angular/router';

@Component({
  selector: 'app-editauthor',
  templateUrl: './editauthor.component.html',
  styleUrls: ['./editauthor.component.css']
})
export class EditauthorComponent implements OnInit {
  reqAuth = {id: "", name: ""}
  id = "";

  constructor(private _httpService: HttpService,
            private _router: Router,
            private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log("id: ", this.id)
      let author = this._httpService.getOneAuthor(this.id);
      author.subscribe(data => {
        if (data['message'] == 'Success') {
          console.log('Successfully update author', data);
          this.reqAuth.name=data['data']['name'];
          this.reqAuth.id = data['data']['_id']
          console.log(this.reqAuth)
          // this._router.navigate(['/home'])
        } else {
          console.log('Error: Create Author', data['error']);
        }
      });
    });
  }

  updateAuthor(): void {
    let Obs = this._httpService.updateAuthor(this.reqAuth);
    Obs.subscribe(data => {
      if (data['message'] == 'Success') {
        console.log('Successfully create author', data);
        this.reqAuth.name="";
        this._router.navigate(['/home'])
      } else {
        console.log('Error: Create Author', data['error']);
      }
    });
  }
}
