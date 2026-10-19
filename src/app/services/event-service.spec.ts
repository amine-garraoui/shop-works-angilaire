import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { EventM } from '../models/event-m';
import { EventService } from './event-service';

describe('EventService', () => {
  let service: EventService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(EventService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load events and update the events signal', () => {
    const events: EventM[] = [
      {
        id: 4,
        name: 'Nouvel événement',
        description: 'Description de test',
        location: 'Tunis',
        price: 25,
        nbPlaces: 12,
        date: '2026-10-19',
      },
    ];

    service.getEvents().subscribe();

    const request = httpTestingController.expectOne('http://localhost:3000/events');
    expect(request.request.method).toBe('GET');
    request.flush(events);

    expect(service.events()).toEqual(events);
  });
});
