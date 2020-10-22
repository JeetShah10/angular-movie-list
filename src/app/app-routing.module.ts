// This file is for the defination of the routes
// which route would go to which component

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './auth/login/login.component';
import { AddMovieComponent } from './add_movies/add_movie.component';
import { FakeBackendInterceptor } from './helpers/fake-backend';
import { AuthGuard } from './helpers/auth.guard';
import { UpdateComponent } from './update_details/update.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'movie-list', canActivate: [AuthGuard] },
  { path: 'movie-list', component: ListComponent },
  { path: 'movie-list/:id', component: ListComponent },
  { path: 'movie-details/:id', component: DetailsComponent },
  { path: 'update-details/:id', component: UpdateComponent },
  { path: 'movie-details', component: DetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'addmovie', component: AddMovieComponent },
  { path: 'authenticate', component: FakeBackendInterceptor },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
