import { Component, EventEmitter, Output } from '@angular/core';
import { IconSettings } from '../../../shared/ui/icons/settings';
import { IconDelete } from '../../../shared/ui/icons/delete';
import { IconEdit } from '../../../shared/ui/icons/edit';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [IconSettings, IconDelete, IconEdit],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  @Output() onEditContact = new EventEmitter<void>();
  @Output() onDeleteContact = new EventEmitter<void>();

  isOpen = false;

  openMenu(){
    this.isOpen = !this.isOpen;
  }
  
}
