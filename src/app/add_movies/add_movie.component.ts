//In this component admin can add movie and it's details.

import { Component, OnInit } from '@angular/core';
import { NgForm , FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { Movies_New } from '../movies';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-add_movie',
  templateUrl: './add_movie.component.html',
  styleUrls: ['./add_movie.component.sass']
})
export class AddMovieComponent implements OnInit {

    movies_new: Movies_New[] = [];
    title: any;
  constructor(public restApi: RestService,
              private router: Router) { }

  ngOnInit(){
  }
   
   onSubmit(f: NgForm){
     
     this.restApi.register(f.value).subscribe();
   }

}