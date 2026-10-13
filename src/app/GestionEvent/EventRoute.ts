import { Routes } from "@angular/router";

export const EventRoute: Routes = [
    {path : '', loadComponent: () => import('./event/event').then(m => m.Event)},
    {path : 'detail/:id', loadComponent: () => import('./detail-event/detail-event').then(m => m.DetailEvent)}
]
