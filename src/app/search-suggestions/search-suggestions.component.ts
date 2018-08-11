import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-suggestions',
  templateUrl: './search-suggestions.component.html',
  styleUrls: ['./search-suggestions.component.css']
})
export class SearchSuggestionsComponent implements OnInit {

  @Input() suggestion;

  constructor() { }

  ngOnInit() {
  }

}
