import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-events',
  standalone: true,
  imports: [],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
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
