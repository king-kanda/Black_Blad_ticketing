import { Component, Injectable, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroMapPin , heroCalendarDays} from '@ng-icons/heroicons/outline';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-events',
  standalone: true,
  imports: [DatePipe , NgIconComponent , RouterLink , RouterLinkActive],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
  viewProviders: [provideIcons({ heroMapPin, heroCalendarDays })]
})

@Injectable({providedIn: 'root'})
export class EventsComponent  implements OnInit {

   data: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.http.get<any[]>('http://localhost:8000/api/events')
    .subscribe(response => {
      console.log('Fetched data:', response);
      this.data = response;
    });
  }



}
