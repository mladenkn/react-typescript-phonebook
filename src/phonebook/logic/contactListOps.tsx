import { useState, useEffect } from "react"
import { updateMatches } from "../../utils"
import { ContactListItem } from "../models"
import { useContactServiceContext } from "./contactsRepository"
import { ContactListItemAction } from "../actions"

interface Contacts {
  all: ContactListItem[]
  favorites: ContactListItem[]
}

export const useContactListOps = () => {
  const [contacts, setContacts] = useState<Contacts | undefined>(undefined)
  const [fetchStatus, setFetchStatus] = useState("NEVER_INITIATED")
  const [fetchedAlready, setFetchedAlready] = useState(false)

  const contactService = useContactServiceContext()

  const fetch = (keyword: string) => {
    setFetchStatus("PROCESSING")
    contactService.search(keyword).then((cl) => {
      setContacts(cl)
      setFetchedAlready(true)
      setFetchStatus("COMPLETED")
    })
  }

  useEffect(() => {
    fetch("")
  })

  const handleAction = ({ type, contactId }: ContactListItemAction) => {
    if (type === "TOGGLE_FAVORITE")
      contactService
        .toggleFavorite(contactId)
        .then((updatedContact) => {
          const all = updateMatches(
            contacts!.all,
            (c) => c.id === contactId,
            () => updatedContact
          )[0]
          const favorites = updateMatches(
            contacts!.favorites,
            (c) => c.id === contactId,
            () => updatedContact
          )[0]
          setContacts({ all, favorites })
        })
    else if (type === "DELETE")
      contactService.delete(contactId).then(() => {
        const all = contacts!.all.filter((c) => c.id !== contactId)
        const favorites = contacts!.favorites.filter((c) => c.id !== contactId)
        setContacts({ all, favorites })
      })
  }

  return { contacts, fetchStatus, fetch, handleAction }
}
