import { Component, OnInit } from '@angular/core';
import { User, AuthService, Peep } from '../shared';
import { PeepApiService } from '../shared/services/peep-api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user = new User();
  recentTweets: Peep[];

  constructor(private peepApiService: PeepApiService, private auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.getUser();
    this.getRecentTweets();
  }

  getRecentTweets() {
    this.peepApiService.getRecentTweets()
      .subscribe((data: Peep[]) => this.recentTweets = data);
  }
}
