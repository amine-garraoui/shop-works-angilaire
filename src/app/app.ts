import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './home/home';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
import { Product } from './product/product';
import { Event } from './GestionEvent/event/event';


@Component({
  selector: 'app-root',
  imports: [Home, Navbar, Footer, Product, Event, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ProjectSSA');
}
