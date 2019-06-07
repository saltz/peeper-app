import { Component, OnInit } from '@angular/core';
import { RestApiService, Peep, AuthService } from '../shared';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { PeepApiService } from '../shared/services/peep-api.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  tweets: Peep[];
  message = new Peep();

  constructor(private peepApiService: PeepApiService) { }

  ngOnInit() {
    this.getTweets();
  }

  getTweets() {
      this.peepApiService.getTweets()
      .subscribe((data: Peep[]) => this.tweets = data);
  }
}
