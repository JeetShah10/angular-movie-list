// This component is for the admin to update details of the movie

import { Component, OnInit } from '@angular/core';
import { NgForm , FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { Movies_New } from '../movies';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-update_movie',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.sass']
})
export class UpdateComponent implements OnInit {

    movieId = this.router.snapshot.params['id'];
    movies_new: Movies_New[] = [];
    title: any;
  constructor(public restApi: RestService,
              private router: ActivatedRoute) { }

  ngOnInit(){
    return this.restApi.getMovieDetails(this.movieId).subscribe((response) => {
        this.movies_new=response;
      });
  }
   
   onSubmit(f: NgForm){
     this.restApi.updateMov(f.value,this.movieId).subscribe();
   }

}