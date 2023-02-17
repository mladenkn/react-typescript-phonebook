import { Contact } from "../models"
import { updateMatches, containsOnlyDigits } from "../../utils"
import { createContext } from "../../utils/react"
import { useState } from "react"


export const useContactRepositoryLocalStorage = () => {
  const allContactsInitial: Contact[] = Object.entries(window.localStorage)
    .filter(([ key, value ]) => key.startsWith('contact-'))
    .map(([key, value]) => value)
  const [contacts, setContacts] = useState(allContactsInitial)

  const getNextElementId = () => {
    const lastItemIndex = contacts.length - 1
    const elementWithHighestId = contacts.sort((c) => c.id)[lastItemIndex]
    return elementWithHighestId.id + 1
  }

  return {
    contacts,
    getById: async (id: number) => contacts.find((c) => c.id === id)!,

    search: async (keyword: string) => {
      const all = contacts.filter(contact => anyPropContains(contact, keyword))
      const favorites = all.filter(c => c.isFavorite)
      return { all, favorites }
    },

    save: async (contact: Contact) => {
      if (contact.id) {
        const [udpatedList, updatedItems] = updateMatches(
          contacts,
          (c) => c.id === contact.id,
          () => contact
        )
        setContacts(udpatedList)
        return updatedItems[0]
      } else {
        const contactWithId = { ...contact, id: getNextElementId() }
        setContacts([...contacts, contactWithId])
        return contactWithId
      }
    },

    delete: async (id: number) => {
      setContacts(contacts.filter((c) => c.id !== id))
    },

    toggleFavorite: async (id: number) => {
      const [allItems, updatedItems] = updateMatches(
        contacts,
        (c) => c.id === id,
        (c) => ({ ...c, isFavorite: !c.isFavorite })
      )
      setContacts(allItems)
      return updatedItems[0]
    }
  }
}

export const [ContactServiceContextProvider, useContactServiceContext] = createContext<ReturnType<typeof useContactRepositoryLocalStorage>>()

export const anyPropContains = (contact: Contact, keyword: string) => {
  const keywordLower = keyword.toLocaleLowerCase()
  if (contact.fullName.toLocaleLowerCase().includes(keywordLower)) return true
  if (contact.email.toLocaleLowerCase().includes(keywordLower)) return true
  if (containsOnlyDigits(keyword)) {
    const numMatch = contact.numbers.some((n) =>
      n.value.toString().includes(keyword)
    )
    if (numMatch) return true
  }
  return false
}
