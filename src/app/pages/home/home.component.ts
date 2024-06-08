import { Component } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { CommonModule } from '@angular/common';
import { User } from '../../utils/type';
import { SearchComponent } from '../../components/search/search.component';
import { UserComponent } from '../../components/user/user.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SearchComponent, UserComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  host: {
    class: 'home-container',
  },
})
export class HomeComponent {
  public user: User | null = null;

  public showNoResult: boolean = this.user == null;

  constructor(private _githubService: GithubService) {}

  ngOnInit(): void {}

  searchHandler(search: string) {
    this._githubService.getUser(search).subscribe((user) => {
      this.user = user;
      this.showNoResult = this.user == null;
    });
  }
}
