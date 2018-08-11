import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  searchForm: FormGroup;
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

  onKeyup() {
    this.latestSearchTerm.emit(this.searchForm.value.searchTerm.trim());
  }

  searchClicked() {
    this.searchTermEntered.emit(this.searchForm.value.searchTerm.trim());
  }

}
