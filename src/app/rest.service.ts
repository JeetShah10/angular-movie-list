// Rest Api service for the operations like
// Get Movies, Get User, Add Movie etc.
// Which will fetch data from Json-server

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Movies_New } from './movies';
import { Users_New } from './users';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Ratings } from './ratings';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http:HttpClient) { }

  movieUrl:string = "http://localhost:3000/Movies_New";
  ratingUrl:string = "http://localhost:3000/Ratings";
  loginUrl:string = "http://localhost:3000/Users_New";
  
  getMovies(){
    return this.http.get<Movies_New[]>(this.movieUrl);
  }
  getSearchMovies(){
    
    return this.http.get<Movies_New[]>(this.movieUrl);
  }
  getUser(id: number){
    return this.http.get<Users_New[]>(`${this.loginUrl}/${id}`);
  }
  getUsers(){
    return this.http.get<Users_New[]>(this.loginUrl);
  }
  register(model: any){
    return this.http.post<Movies_New[]>(this.movieUrl,model);
  }

  getMovieDetails(movieId: number){
    return this.http.get<Movies_New[]>(`${this.movieUrl}/${movieId}`);
  }
  getRatingDetails(userId: any,movieId: any){
    return this.http.get<Ratings[]>(`${this.ratingUrl}?user_id=${userId}&&movie_id=${movieId}`);
  }

  postRating(rating: any, movieId: any, userId: any, movie: any) {
    let changedRatings = parseInt(movie.ratings)+1;
    movie.rating_average = (((parseFloat(movie.rating_average)*parseFloat(movie.ratings))+rating)/changedRatings);
    movie.ratings = changedRatings;
    const ratings = {
      rating: rating,
      movie_id: movieId,
      user_id: userId
    }
    let response_movie = this.http.put(`${this.movieUrl}/${movie.id}`, movie);
    let response_rating = this.http.post(`${this.ratingUrl}`,ratings);
    
    return forkJoin([response_movie,response_rating]);
  }

  addRating(rating: any, movie: any,rating_id:any, userId: any) {
    let changedRatings = parseInt(movie.ratings)+1;
    console.log("rating before:::::::::::::",rating)
    movie.rating_average = (((parseFloat(movie.rating_average)*parseFloat(movie.ratings))+rating)/changedRatings).toFixed(2);
    movie.ratings = changedRatings;
    console.log("rating after:::::::::::::",rating)
    const rating_data = {
      movie_id: movie.id,
      user_id: userId,
      rating: rating
    }
    let response_movie = this.http.put(`${this.movieUrl}/${movie.id}`, movie);
    let response_rating = this.http.put(`${this.ratingUrl}/${rating_id}`, rating_data);
         
    return forkJoin([response_movie,response_rating]);
  }

  addComment(comment: any,movie: any) {
    if(movie.comments){
      movie.comments.push(comment);
    }else{
      movie.comments = [];
      movie.comments.push(comment);
    }
    return this.http.put(`${this.movieUrl}/${movie.id}`, movie);
  }

  updateMov(model: any, movieId: any) {
    return this.http.put(`${this.movieUrl}/${movieId}`, model);
  }
  deleteMov(id: any) {
    return this.http.delete(`${this.movieUrl}/${id}`);
  }
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
