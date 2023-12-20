import { Contact } from "../models"
import { faker } from "@faker-js/faker"
import { generateArray } from "../utils"

const generatePhoneNumber = () => ({
  value: faker.number.int(),
  label: faker.helpers.arrayElement(["Home", "Work", "Cell", "Husband"]),
})

const avatarStyles = [
  { background: "green", color: "white" },
  { background: "yellow", color: "black" },
  { background: "red", color: "white" },
  { background: "blue", color: "white" },
  { background: "orange", color: "black" },
]

export function getRandomAvatarStyle(){
  return faker.helpers.arrayElement(avatarStyles)
}

let contactId = 1
export const generateContact = (): Contact => ({
  id: contactId++,
  fullName: faker.person.firstName() + " " + faker.person.lastName(),
  avatarStyle: getRandomAvatarStyle(),
  avatarUrl: faker.datatype.boolean() ? faker.internet.avatar() : null,
  email: faker.internet.email(),
  numbers: generateArray(generatePhoneNumber, 1, 4),
  isFavorite: faker.datatype.boolean(),
})
