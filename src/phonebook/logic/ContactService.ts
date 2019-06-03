import { Contact, ContactListItem } from "../models";
import { generateArray, replaceMatches, updateMatches, containsOnlyDigits } from "../../utils";
import { generateContact } from '../devUtils/dataGenerators';
import React, { useContext } from 'react'

// Classes and services may be discouraged in React but they are not a bad pattern :)
// Interface not needed because it's not necessary in order to mock ContactService in test
// Easy to refactor to call REST API
export class ContactService {

    private contactList: Contact[]

    constructor(){
        const contactListJsonOrNothing = localStorage.getItem('contacts');

        if(!contactListJsonOrNothing)
            this.contactList = generateArray(generateContact, 25, 50);
        else
            this.contactList = JSON.parse(contactListJsonOrNothing) as Contact[];
    }

    async persist(){
        const contactListJson = JSON.stringify(this.contactList);
        localStorage.setItem('contacts', contactListJson);
    }

    async getById(id: number){
        return this.contactList.find(c => c.id === id)!;
    }

    async search(keyword: string){
        const all = this.contactList.filter(this.anyPropContains(keyword));
        const favorites = all.filter(c => c.isFavorite);
        return {all, favorites};
    }

    private anyPropContains(keyword: string) {
        const keywordLower = keyword.toLocaleLowerCase();
        return (contact: Contact) => {
            if(contact.fullName.toLocaleLowerCase().includes(keywordLower))
                return true;
            if(contact.email.toLocaleLowerCase().includes(keywordLower))
                return true;
            if(containsOnlyDigits(keyword)){
                const numMatch = contact.numbers.some(n => n.value.toString().includes(keyword));
                if(numMatch)
                    return true;
            }
            return false;
        }
    }

    async save(contact: Contact){
        if(contact.id)
            this.contactList = replaceMatches(this.contactList, c => c.id === contact.id, contact).allItems;
        else 
            this.contactList.push(contact);
        return contact;
    }

    async delete(id: number){
        this.contactList = this.contactList.filter(c => c.id !== id);
    }

    async toggleFavorite(id: number){
        const {allItems, updatedItems} = updateMatches(this.contactList, c => c.id === id, c => ({...c, isFavorite: !c.isFavorite})); 
        this.contactList = allItems;
        return updatedItems[0];      
    }

    async toggleFavoriteListItem(id: number){
        return (await this.toggleFavorite(id)) as ContactListItem;
    }
}

export const ContactServiceContext = React.createContext<ContactService | undefined>(undefined);

export const useContactService = () => {
    const cs = useContext(ContactServiceContext);
    if(!cs)
        throw new Error('ContactServiceContext not found.');
    return cs;
}