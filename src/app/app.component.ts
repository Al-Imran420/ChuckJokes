import { Component, OnInit } from '@angular/core';
import { AppService } from './services/data.service';
import { PagerService } from './services/pagerService'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'All';

  constructor(
    private appService: AppService,
    public pagerService: PagerService
  ) { }

  ngOnInit() {
    this.getAllJokesSearch();
    this.getAllJokes();
    this.getAllCategories()
  }

  jokes: any = [];
  isLoading: boolean = false
  getAllJokes() {
    this.title = 'All';
    this.isLoading = true;
    this.appService.getAllJokes().subscribe((res: any) => {
      this.jokes = res.result;
      this.isLoading = false;
      this.setPage(1)
      console.log(res.result)
    }, error => {
      console.log(error)
    })
  }
  //For Pageinnations
  pager: any = {};
  pagedItems: any = [];
  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.jokes.length, page, 50);
    this.pagedItems = this.jokes.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  // All Categories
  categories: any = [];
  getAllCategories() {
    this.appService.getAllCategories().subscribe((res: any) => {
      this.categories = res;
      console.log(res)
    }, error => {
      console.log(error)
    })
  }

  // View by categorie
  viewByCategorie(cat: any) {
    this.isLoading = true;
    console.log(cat)
    this.title = cat
    this.appService.getJokesByCategorie(cat).subscribe((res: any) => {
      this.isLoading = false;
      let newdata: any = [];
      newdata.push(res)
      this.jokes = newdata
      this.setPage(1)
      console.log(res)
    }, error => {
      console.log(error)
    })
  }

  // Search
  searchJokes: any;
  searchJokesList: any = [];
  getAllJokesSearch() {
    this.appService.searchJokes(this.searchJokes).subscribe((res: any) => {
      this.searchJokesList = res.result;
      console.log(this.searchJokesList);
    }, error => {
      console.log(error)
    })
  }

  // View details
  jokesDetails: any;
  isDetailsView: boolean = true
  viewDetails(cat: any) {
    console.log(cat)
    if (cat.length > 0) {
      this.isLoading = true;
      this.appService.getJokesByCategorie(cat).subscribe((res: any) => {
        this.jokesDetails = res;
        console.log(this.jokesDetails);
        this.isLoading = false;
        this.isDetailsView = false;
        this.searchJokes = ''
        window.scrollTo(0, 0)
      }, error => {
        console.log(error)
      })
    } else {
      alert('Category is Uncategorized')
    }
  }

  //View rendome
  randomJokeView(cat: any) {
    console.log(cat)
    this.isLoading = true;
    this.appService.getJokesByCategorie(cat).subscribe((res: any) => {
      this.jokesDetails = res;
      console.log(this.jokesDetails);
      this.isLoading = false;
    }, error => {
      console.log(error)
    })
  }

  back() {
    this.isDetailsView = true
  }

  // Like dislike
  like:number=0
  dislike:number=0
  addLike(){
    this.like++
  }
  addDisLike(){
    this.dislike++
  }

}
