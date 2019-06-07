import { Component, OnInit } from '@angular/core';
import { Peep, AuthService } from '../shared';
import { PeepApiService } from '../shared/services/peep-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tweets: Peep[];
  message = new Peep();

  constructor(private peepApiService: PeepApiService) { }

  ngOnInit() {
  }

  createTweet() {
    this.peepApiService.createTweet(this.message)
    .subscribe();

    this.tweets.push(this.message);
  }
}
