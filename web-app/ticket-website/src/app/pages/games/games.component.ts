import { Component } from '@angular/core';
import { EventsComponent } from "../../ui/events/events.component";

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [EventsComponent],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent {

}
