import { Component } from '@angular/core';
import { ALL_SEARCH_RESULTS } from './mock-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  results = [];
  loadingResults;

  ngOnInit() {
    console.log(ALL_SEARCH_RESULTS);
  }

  onSearchTermEntered(searchTerm) {
    console.log('search term from app', searchTerm);
    this.getData(searchTerm);
  }

  findMatches(data, searchTerm) {
    const searchRegEx = new RegExp(searchTerm, 'gi');
    for (let i = 0; i < data.accountResults.length; i++) {
      if (data.accountResults[i].name.match(searchRegEx)) {
        this.results.push(data.accountResults[i]);
      }
    }
    for (let i = 0; i < data.repositoryResults.length; i++) {
      if (data.repositoryResults[i].name.match(searchRegEx)) {
        this.results.push(data.repositoryResults[i]);
      } else if (data.repositoryResults[i].namespace.match(searchRegEx)) {
        this.results.push(data.repositoryResults[i]);
      }
    }
    console.log(this.results);
  }

  getData(searchTerm) {

    // simulating call to API
    const dataPromise = new Promise((resolve, reject) => {
      this.loadingResults = true;

      // async request
      setTimeout(function(err, response) {
        response = ALL_SEARCH_RESULTS;
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      }, 1000);
    });

    dataPromise.then((result) => {
      this.findMatches(result, searchTerm);
    }).catch((err) => {
      console.log(err);
    });

  }
}
