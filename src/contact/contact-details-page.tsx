import ContactDetailsFields from "./contact-details-fields"
import ContactAvatar from "./contact-avatar"
import { cn } from "~/utils/ui-utils"
import FixedToolbar from "~/toolbar"
import { api } from "~/utils/api"
import { ContactFavorite } from "./contact-favorite"
import { ArrowBackIcon, PencilIcon } from "~/assets/icons"
import { useRouter } from "next/router"
import { contactEditUrl, homePageUrl } from "~/urls"
import Link from "next/link"

export default function ContactDetailsPage({ contactId }: { contactId: number }) {
  const contact = api.contact.single.useQuery(contactId)

  if (!contact.data) return <>Loading...</> // never because of prefetch

  const router = useRouter()
  const editAction = (
    <button onClick={() => router.push(contactEditUrl(contactId))}>
      <PencilIcon />
    </button>
  )

  const avatar = (
    <ContactAvatar
      style={contact.data.avatarUrl ? undefined : contact.data.avatarStyle}
      className={cn("ml-2 mr-3 h-16 w-16 sm:h-44 sm:w-44")}
      url={contact.data.avatarUrl}
      letter={contact.data.fullName[0]}
    />
  )

  return (
    <div className="mx-auto max-w-xl">
      <FixedToolbar />
      <div className={cn("mt-16 px-3 text-secondary-dark sm:mt-24 sm:flex xs-max:w-full")}>
        <div className="mr-8 xs-max:hidden">{avatar}</div>
        <div>
          <div className="mt-4 flex items-center justify-between px-1 pb-2 pt-0 sm:w-96">
            <Link href={homePageUrl}>
              <ArrowBackIcon />
            </Link>
            <span className="text-2xl xs-max:hidden">{contact.data.fullName}</span>
            <span className="flex items-center gap-2">
              <ContactFavorite id={contact.data.id} isFavorite={contact.data.isFavorite} />
              {editAction}
            </span>
          </div>
          <div className="h-0.25 w-full bg-secondary-main sm:hidden" />
          <h1 className="flex items-center px-0 sm:hidden sm:pb-2 xs-max:py-4">
            {avatar}
            <p className="text-2xl">{contact.data.fullName}</p>
          </h1>
          <div className="h-0.25 w-full bg-primary-main" />
          <ContactDetailsFields contact={contact.data} />
        </div>
      </div>
    </div>
  )
}
