// This component is for the list of the movies page which is landing page

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { RestService } from '../rest.service';
import { Movies_New } from '../movies';
import { Users_New } from '../users';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-rest',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {

  
  movies_new: Movies_New[] = [];
  users_new: Users_New[] = [];
  title: any;
  id: any;
  flag: any = false;

  constructor(public restApi:RestService,
              public router: ActivatedRoute,
              public authenticationService: AuthenticationService) { }

  ngOnInit() {

    if(localStorage.getItem("currentUser") != null){
      this.flag = true;
    }
    this.restApi.getMovies().subscribe((response) => {
      this.movies_new=response;})
  }

  getSearchMovies(){
    if(this.title == ""){
      this.ngOnInit();
    }
    else{
      this.movies_new = this.movies_new.filter(res =>{
        return res.title.toLocaleLowerCase().match(this.title.toLocaleLowerCase());
      })
    }
  }

  deleteMovies(id){
    this.id=id;
    if(this.id == ""){
      this.ngOnInit();
    }
    else{
     this.restApi.deleteMov(this.id).subscribe(); 
      this.movies_new = this.movies_new.filter(res =>{
        return res.id !== this.id;
      })
    }
  }

  sort_by_rating(){
    this.movies_new.sort(function(a,b){
      return parseFloat(b.rating_average) - parseFloat(a.rating_average)
    })
  }

  public toFloat(value: string): number {
    console.log(typeof Number(value))
    let perc = Number((Number(value)*10).toFixed(2))
    return perc;
  }
}