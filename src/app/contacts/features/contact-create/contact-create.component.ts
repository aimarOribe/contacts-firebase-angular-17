import { Component, Input, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ContactsService } from '../../data-access/contacts.service';
import { ContactForm } from '../../shared/interfaces/contacts';
import { IconBack } from '../../../shared/ui/icons/back';
import { IconRocket } from '../../../shared/ui/icons/rocket';

export interface CreateForm {
  fullName: FormControl<string>;
  email: FormControl<string>;
  phoneNumber: FormControl<string>;
  description?: FormControl<string | undefined>;
}

@Component({
  selector: 'app-contact-create',
  standalone: true,
  imports: [ReactiveFormsModule, IconBack, IconRocket, RouterLink],
  templateUrl: './contact-create.component.html',
  styleUrl: './contact-create.component.css'
})
export class ContactCreateComponent {

  private _formBuilder = inject(FormBuilder).nonNullable;
  private _router = inject(Router);
  private _contactsService = inject(ContactsService);
  private _contactId = "";

  get contactId(): string {
    return this._contactId;
  }

  @Input() set contactId(value: string){
    this._contactId = value;
    this.setFormValues(this._contactId);
  }

  form = this._formBuilder.group<CreateForm>({
    fullName: this._formBuilder.control('', Validators.required),
    email: this._formBuilder.control('', [Validators.required, Validators.email]),
    phoneNumber: this._formBuilder.control('', Validators.required),
    description: this._formBuilder.control('')
  })

  async createContact(){
    if(this.form.invalid) return;
    try {
      const contact = this.form.value as ContactForm;
      !this.contactId ? await this._contactsService.createContact(contact) : await this._contactsService.updateContact(this.contactId, contact);
      this._router.navigate(['/dashboard']);
    } catch (error) {}
  }

  async setFormValues(id: string) {
    try {
      const contact = await this._contactsService.getContact(id);
      if (!contact) return;
      this.form.setValue({
        fullName: contact.fullName,
        email: contact.email,
        phoneNumber: contact.phoneNumber,
        description: contact.description,
      });
    } catch (error) {}
  }
}
