import { Contact } from "../../models"
import { ContactFieldLabel } from "../various"
import EmailIcon from "@material-ui/icons/Email"
import PhoneIcon from "@material-ui/icons/Phone"

export default ({ contact }: { contact: Contact }) => (
  <div>
    <div className="py-5">
      <ContactFieldLabel Icon={EmailIcon} text="email" />
      <p className="ml-10 mt-3">{contact.email}</p>
    </div>
    <div className="py-5">
      <ContactFieldLabel Icon={PhoneIcon} text="number" />
      <ul className="ml-10 mt-4 flex flex-col gap-4">
        {contact.numbers.map(({ label, value }) => (
          <li key={value} className="flex gap-2">
            <p className="w-24 uppercase">{label}</p>
            <p className="underline">{value}</p>
          </li>
        ))}
      </ul>
    </div>
  </div>
)
