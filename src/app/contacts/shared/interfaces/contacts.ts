export interface Contacts extends ContactForm{
    id: string;
}

export interface ContactForm {
    fullName: string;
    email: string;
    phoneNumber: string;
    description: string;
}