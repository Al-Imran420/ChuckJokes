import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  authToken: any;
  user: any;

  constructor(
    private http: HttpClient,
  ) { }

  getAllJokes() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const url = 'https://api.chucknorris.io/jokes/search?query=all';
    return this.http.get<any>(url, {headers:headers})
  }
  searchJokes(search:any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const url = 'https://api.chucknorris.io/jokes/search?query=';
    return this.http.get<any>(url+search, {headers:headers})
  }
  getJokesByCategorie(category:any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const url = 'https://api.chucknorris.io/jokes/random?category=';
    return this.http.get<any>(url+category, {headers:headers})
  }
  getAllCategories() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const url = 'https://api.chucknorris.io/jokes/categories';
    return this.http.get<any>(url, {headers:headers})
  }


}
