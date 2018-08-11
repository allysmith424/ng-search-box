import { Component } from '@angular/core';
import { ALL_SEARCH_RESULTS } from './mock-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  searchEntered;
  results;
  suggestions;
  loadingResults;
  noResults = false;
  noSuggestions = false;

  onSearchTermEntered(searchTerm) {
    this.getData(searchTerm, 'results');
  }

  onLatestSearchTerm(searchTerm) {
    this.getData(searchTerm, 'suggestions');
  }

  findMatches(data, searchTerm, destination) {
    const searchRegEx = new RegExp(searchTerm, 'gi');
    const matches = [];
    for (let i = 0; i < data.accountResults.length; i++) {
      if (data.accountResults[i].name.match(searchRegEx)) {
        matches.push(data.accountResults[i]);
      }
    }
    for (let i = 0; i < data.repositoryResults.length; i++) {
      if (data.repositoryResults[i].name.match(searchRegEx)) {
        matches.push(data.repositoryResults[i]);
      } else if (data.repositoryResults[i].namespace.match(searchRegEx)) {
        matches.push(data.repositoryResults[i]);
      }
    }
    if (destination === 'results') {
      console.log(matches[0]);
      this.noResults = false;
      matches[0] === undefined ? this.noResults = true : this.results = matches;
    } else {
      console.log(matches[0]);
      matches[0] === undefined ? this.noSuggestions = true : this.suggestions = matches;
    }
  }

  getData(searchTerm, destination) {

    this.noSuggestions = false;

    if (searchTerm === '') {
      this.suggestions = [];
      return;
    }

      const dataPromise = new Promise((resolve, reject) => {
        this.loadingResults = true;

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
        this.suggestions = [];
        this.findMatches(result, searchTerm, destination);
      }).catch((err) => {
        console.log(err);
      });

  }
}
