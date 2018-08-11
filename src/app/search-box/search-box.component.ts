import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  searchForm: FormGroup;
  message = '';

  @Output() searchTermEntered: EventEmitter<any> = new EventEmitter<any>();
  @Output() latestSearchTerm: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      'searchTerm': new FormControl('', [
        Validators.required
      ])
    });
  }

  get searchTerm() {
    return this.searchForm.get('searchTerm');
  }

  onKeyup(e) {
    if (e.key === 'Enter') {
      this.searchClicked();
    } else {
      this.message = 'Press enter to search';
      this.latestSearchTerm.emit(this.searchForm.value.searchTerm.trim());
    }
  }

  searchClicked() {
    if (this.searchForm.value.searchTerm.trim() !== '') {
      this.message = '';
      this.searchTermEntered.emit(this.searchForm.value.searchTerm.trim());
    } else {
      this.message = 'Please enter a search term';
    }
  }

}
