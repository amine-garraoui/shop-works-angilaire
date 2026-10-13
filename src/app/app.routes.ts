import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Product } from './product/product';
import { Event } from './GestionEvent/event/event';
import { NotFound } from './not-found/not-found';
import { DetailEvent } from './GestionEvent/detail-event/detail-event';
import { Login } from './login/login';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'products', component: Product },
    { path: 'login', component: Login },
    /*
    { path: 'events', component: Event },
    { path: 'detail/:id', component: DetailEvent },
    */

    {path : "events", loadChildren: () => import('./GestionEvent/EventRoute').then(m => m.EventRoute)},

    { path: '**', component: NotFound },
];
