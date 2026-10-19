import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { EventM } from '../models/event-m';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private readonly http = inject(HttpClient);
  private readonly eventsUrl = 'http://localhost:3000/events';

  readonly events = signal<EventM[]>([]);

  getEvents(): Observable<EventM[]> {
    return this.http.get<EventM[]>(this.eventsUrl).pipe(
      tap((events) => this.events.set(events)),
    );
  }
}
