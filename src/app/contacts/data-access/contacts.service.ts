import { Injectable, inject } from '@angular/core';
import { 
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where 
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ContactForm, Contacts } from '../shared/interfaces/contacts';

const PATH = 'contactos'

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);

  async searchContactByQuery(name: string){
    const q = query(this._collection, where('fullName', '>=', name), where('fullName', '<=', name + '\uf8ff'));
    const querySnapshot = await getDocs(q);
    let contacts: Contacts[] = [];
    querySnapshot.forEach((doc) => {
      contacts = [...contacts, { id: doc.id, ...doc.data() } as Contacts];
    });
    return contacts;
  }

  getContacts(){
    return collectionData(this._collection, {idField: 'id'}) as Observable<Contacts[]>;
  }

  async getContact(id: string){
    try {
      const snapshot = await getDoc(this.document(id));
      return snapshot.data() as Contacts;
    } catch (error) {
      return undefined;
    }
  }

  createContact(contact: ContactForm){
    return addDoc(this._collection, contact);
  }

  updateContact(id: string, contact: ContactForm){
    return updateDoc(this.document(id), {...contact});
  }

  deleteContact(id: string){
    return deleteDoc(this.document(id));
  }

  private document(id: string){
    return doc(this._firestore, `${PATH}/${id}`);
  }

}
