import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EventM } from '../../models/event-m';
import { EventService } from '../../services/event-service';

@Component({
  selector: 'app-detail-event',
  imports: [RouterLink],
  templateUrl: './detail-event.html',
  styleUrl: './detail-event.css',
})
export class DetailEvent {
  private eventService = inject(EventService);
  private rt = inject(ActivatedRoute);
  private router = inject(Router);

  events = this.eventService.events;
  id = this.rt.snapshot.paramMap.get('id');
  event = this.events().find(e => e.id == Number(this.id));

  backToEvent() {
    this.router.navigate(['/events']);
  }
}
