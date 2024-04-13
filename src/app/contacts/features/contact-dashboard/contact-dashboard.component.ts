import { Component, inject } from '@angular/core';
import { SearchBarComponent } from '../../ui/search-bar/search-bar.component';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ContactsService } from '../../data-access/contacts.service';
import { CardContactComponent } from '../../ui/card-contact/card-contact.component';
import { Contacts } from '../../shared/interfaces/contacts';
import { of } from 'rxjs';

@Component({
  selector: 'app-contact-dashboard',
  standalone: true,
  imports: [CardContactComponent, SearchBarComponent, AsyncPipe],
  templateUrl: './contact-dashboard.component.html',
  styleUrl: './contact-dashboard.component.css'
})
export class ContactDashboardComponent {

  private _router = inject(Router);
  private _contactsService = inject(ContactsService);

  contacts$ = this._contactsService.getContacts();

  editContact(contact: Contacts){
    this._router.navigate(['/dashboard/edit', contact.id]);
  }

  async deleteContact(id: string){
    try {
      await this._contactsService.deleteContact(id);
    } catch (error) {}
  }

  async changeQuery(query: string) {
    try {
      const contacts = await this._contactsService.searchContactByQuery(query);
      this.contacts$ = of(contacts);
    } catch (error) {}
  }
  
}
