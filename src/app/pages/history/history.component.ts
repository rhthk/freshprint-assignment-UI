import { Component } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { History } from '../../utils/type';
import { CommonModule } from '@angular/common';
import { UserComponent } from '../../components/user/user.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, UserComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
  host: {
    class: 'history-container',
  },
})
export class HistoryComponent {
  public histories: History[] = [];

  public hasNoHistory: boolean = true;

  constructor(private _githubService: GithubService) {}

  ngOnInit() {
    this._githubService.getHistory$.subscribe((data) => {
      this.histories = data.reverse();
      this.hasNoHistory = this.histories.length === 0;
    });
  }

  clearSearchHistory() {
    this._githubService.clearHistory();
  }
}
