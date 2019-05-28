import HomePage from "../components/HomePage";
import { getType } from "typesafe-actions";
import { favoriteContact, deleteContact, saveWork } from "../actions";
import React, { useState } from "react";
import { DispatchContext } from "./DispatchContext";
import ContactService from "./ContactService";
import { Contact }from "../models";
import { WithContactService } from ".";
import { buildActionHandler, handle } from "../../utils";

export default ({contactService}: WithContactService) =>
{
    const [contactList, setContactList] = useState<Contact[] | undefined>(undefined);
    const [queried, setQueried] = useState(false);

    const actionHandler = buildActionHandler([
        handle(favoriteContact, (contactId) => {
            console.log('handling favoriteContact');
        }),
        handle(saveWork, () => {
            console.log("handling saveWork");
            contactService.persist().then(() => console.log("podaci spremljeni"));            
        }),
        handle(deleteContact, (contactId) => {
            contactService
                .delete(contactId)
                .then(() => {
                    const withoutContact = contactList!.filter(c => c.id !== contactId);
                    setContactList(withoutContact);
                });
        }),        
    ]);

    const query = (keyword: string) => {        
        contactService.search(keyword).then(setContactList);
        setQueried(true);
    };

    if(!queried)
        query('')

    return (
        <DispatchContext.Provider value={actionHandler}>
            <HomePage contacts={contactList} dataLoading={contactList === undefined} />
        </DispatchContext.Provider>
    )
}