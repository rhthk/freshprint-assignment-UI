import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  host: {
    class: 'search-container',
  },
})
export class SearchComponent {
  public search = '';

  @Output() onSearch = new EventEmitter();

  searchHandler() {
    this.onSearch.emit(this.search);
  }
}
