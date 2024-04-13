import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconContact } from '../icons/contact';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, IconContact],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
