import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { EventM } from '../../models/event-m';
import { EventService } from '../../services/event-service';

@Component({
  selector: 'app-event',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './event.html',
  styleUrl: './event.css',
})
export class Event {
  private readonly formBuilder = inject(FormBuilder);
  private readonly eventService = inject(EventService);

  readonly events = this.eventService.events;
  readonly showAddForm = signal(false);
  readonly notice = signal('');

  // Le FormGroup et ses validateurs sont définis dans le composant (Reactive Forms).
  readonly eventForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
    location: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    price: [0, [Validators.required, Validators.min(0)]],
    nbPlaces: [1, [Validators.required, Validators.min(1)]],
    date: ['', Validators.required],
  });

  // Les Observables Reactive Forms alimentent des signals pour le template.
  readonly formValue = toSignal(this.eventForm.valueChanges, {
    initialValue: this.eventForm.getRawValue(),
  });
  readonly formStatus = toSignal(this.eventForm.statusChanges, {
    initialValue: this.eventForm.status,
  });
  readonly isFormValid = computed(() => this.formStatus() === 'VALID');
  readonly nameLength = computed(() => this.formValue().name?.length ?? 0);

  openAddForm(): void {
    this.notice.set('');
    this.eventForm.reset();
    this.showAddForm.set(true);
  }

  closeAddForm(): void {
    this.showAddForm.set(false);
    this.eventForm.reset();
  }

  reserve(id: number): void {
    this.events.update((list) =>
      list.map((event) =>
        event.id === id && event.nbPlaces > 0
          ? { ...event, nbPlaces: event.nbPlaces - 1 }
          : event,
      ),
    );
  }

  onSubmit(): void {
    this.eventForm.markAllAsTouched();
    if (this.eventForm.invalid) return;

    const values = this.eventForm.getRawValue();
    const newId = this.events().reduce((maxId, event) => Math.max(maxId, event.id), 0) + 1;
    const newEvent: EventM = { id: newId, ...values };

    this.events.update((list) => [...list, newEvent]);
    this.showAddForm.set(false);
    this.eventForm.reset();
    this.notice.set(`L’événement « ${newEvent.name} » a été ajouté.`);
  }

  get name() { return this.eventForm.controls.name; }
  get description() { return this.eventForm.controls.description; }
  get location() { return this.eventForm.controls.location; }
  get price() { return this.eventForm.controls.price; }
  get nbPlaces() { return this.eventForm.controls.nbPlaces; }
  get date() { return this.eventForm.controls.date; }
}
