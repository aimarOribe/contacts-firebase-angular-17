import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { Contacts } from '../../shared/interfaces/contacts';

@Component({
  selector: 'app-card-contact',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './card-contact.component.html',
  styleUrl: './card-contact.component.css'
})
export class CardContactComponent {

  @Input({required: true}) contact!: Contacts;

  @Output() editContact = new EventEmitter<Contacts>();

  @Output() deleteContact = new EventEmitter<string>();

  onEditContact(contact: Contacts){
    this.editContact.emit(contact);
  }

  onDeleteContact(contact: Contacts){
    this.deleteContact.emit(contact.id);
  }

}
