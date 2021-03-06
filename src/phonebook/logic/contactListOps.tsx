import { useState, useEffect } from 'react';
import { replaceMatches } from '../../utils';
import { ContactListItem } from '../models';
import { useContactService } from './ContactService';
import { ContactListItemAction } from '../actions';

interface Contacts {
    all: ContactListItem[],
    favorites: ContactListItem[]
}

export const useContactListOps = () => {

    const [contacts, setContacts] = useState<Contacts | undefined>(undefined);
    const [fetchStatus, setFetchStatus] = useState('NEVER_INITIATED');
    const [fetchedAlready, setFetchedAlready] = useState(false);

    const contactService = useContactService();

    const fetch = (keyword: string) => {
        setFetchStatus('PROCESSING');
        contactService.search(keyword).then(
            cl => {
                setContacts(cl);
                setFetchedAlready(true);
                setFetchStatus('COMPLETED');
            }
        );
    };

    useEffect(() => {
        if(!fetchedAlready)
            fetch('');
    });
    
    const handleAction = ({type, contactId}: ContactListItemAction) => {

        if(type === 'TOGGLE_FAVORITE')
            contactService.toggleFavoriteListItem(contactId)
                .then(updatedContact => {
                    const all = replaceMatches(contacts!.all, c => c.id === contactId, updatedContact)[0];                    
                    const favorites = replaceMatches(contacts!.favorites, c => c.id === contactId, updatedContact)[0];
                    setContacts({all, favorites});
                });
                
        else if(type === 'DELETE')
            contactService.delete(contactId)
                .then(() => {
                    const all = contacts!.all.filter(c => c.id !== contactId);
                    const favorites = contacts!.favorites.filter(c => c.id !== contactId);
                    setContacts({all, favorites});
                });
    };

    return { contacts, fetchStatus, fetch, handleAction };
}
