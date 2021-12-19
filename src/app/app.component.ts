import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChuckJokesApp';

  jocks_list = ['Adult jokes','Dad jokes','Christmas Jokes','Job Jokes','Birthday Jokes','Social Jokes','Puns']

  searchJokes:any

  isDetailsView:boolean = true
  viewDetails(){
    this.isDetailsView = !this.isDetailsView
  }
}
