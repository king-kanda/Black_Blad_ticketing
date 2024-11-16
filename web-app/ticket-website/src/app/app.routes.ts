import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { MerchandiseComponent } from './pages/merchandise/merchandise.component';
import { GamesComponent } from './pages/games/games.component';
import { EventPageComponent } from './pages/event-page/event-page.component';

export const routes: Routes = [
    {path : 'about-us', component: AboutComponent},
    {path : 'merchandise', component: MerchandiseComponent},
    {path : 'game-events', component: GamesComponent},
    {path : 'games-events/event-page' , component: EventPageComponent}
];
