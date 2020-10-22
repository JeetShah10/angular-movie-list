//This component is for each movie details where user can rate movie
// make comments on movie

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../rest.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movies_New } from '../movies';
import { NgForm } from '@angular/forms';
import { Ratings } from '../ratings';
import { AuthenticationService } from '../authentication.service';
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})
export class DetailsComponent implements OnInit {

  movieId = this.route.snapshot.params['id'];
  userId: any;
  MovieDetails: any;
  innerWidth: any;
  id: any;
  movies_new: Movies_New[] = [];
  ratings: Ratings[] = [];
  flag: any = false;
  flagRate: any = false;
  ratingDetails = {}


  constructor(
    public route: ActivatedRoute,
    private router: Router,
    public restApi: RestService,
    public dialog: MatDialog,
    public authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {

    this.innerWidth = window.innerWidth;
    if (localStorage.getItem("currentUser") != null) {
      this.flag = true;
      this.userId = this.authenticationService.currentUserValue.id;
      this.restApi.getRatingDetails(this.userId, this.movieId).subscribe((response) => {
        if (response.length !== 0) {
          this.flagRate = true;
          this.ratings = response;
          console.log("This.rating is:::", this.ratings)

        }
      });
    }
    return this.restApi.getMovieDetails(this.movieId).subscribe((response) => {
      this.movies_new = response;
    });
  }

  onRateChange($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {

    this.ngOnInit();
    console.log("Rating:::", this.ratings)
    console.log("UserId:::", this.userId)

    if (this.ratings.length === 0) {
      this.restApi.postRating($event.newValue, this.movieId, this.userId, this.movies_new).subscribe();
    }
    else {
      this.restApi.addRating($event.newValue, this.movies_new, this.ratings[0].id, this.userId).subscribe();
    }
    this.restApi.getRatingDetails(this.userId, this.movieId).subscribe((response) => {
      if (response.length !== 0) {
        this.flagRate = true;
        this.ratings = response;
      }
    });


  }

  onSubmit(f: NgForm) {
    if (localStorage.getItem("currentUser") != null) {
      this.restApi.addComment(f.value, this.movies_new).subscribe();
      return this.restApi.getMovieDetails(this.movieId).subscribe((response) => {
        this.movies_new = response;
      });
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  public toFloat(value: string): number {
    console.log(typeof Number(value))
    let perc = Number((Number(value)*10).toFixed(2))
    return perc;
  }

}
