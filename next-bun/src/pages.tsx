import HomeSection from "./contact/contact-list-page"
import { useContactDetailsOps } from "./contact/contact-details-ops"
import ContactDetails from "./contact/contact-details"
import ContactEdit from "./contact/contact-edit"
import { useContactServiceContext } from "./contact/contact-repository"
import Toolbar from "./toolbar"
import { getBreakpointContainerStyle } from "./utils/ui-utils"
import { useRouter } from "next/router"

export interface ContactIdRouteParams {
  contactId?: string
}

const ContactListPage = () => {
  return (
    <div className={getBreakpointContainerStyle("lg")}>
      <Toolbar />
      <HomeSection className="mt-20 md:mt-24" />
    </div>
  )
}

const ContactDetailsPage = () => {
  const router = useRouter()
  const contactId = 1 // TODO
  const ops = useContactDetailsOps(contactId, () => router.back(), router.push)

  return (
    <div className={getBreakpointContainerStyle("sm")}>
      <Toolbar />
      {ops.fetchStatus === "COMPLETED" ? (
        <ContactDetails
          className="mt-20 md:mt-24"
          contact={ops.contact!}
          onFavorite={ops.favorite}
        />
      ) : null}
    </div>
  )
}

const ContactCreatePage = () => {
  const router = useRouter()
  const contactService = useContactServiceContext()
  return (
    <div className={getBreakpointContainerStyle("md")}>
      <Toolbar />
      <ContactEdit
        className="mt-20"
        onSave={c => contactService.save(c).then(() => router.back())}
      />
    </div>
  )
}

const ContactEditPage = () => {
  const router = useRouter()
  const contactId = 1 // TODO
  const ops = useContactDetailsOps(contactId, () => router.back(), router.push)
  return (
    <div className={getBreakpointContainerStyle("md")}>
      <Toolbar />
      {ops.fetchStatus === "COMPLETED" ? (
        <ContactEdit
          className="mt-20"
          contact={ops.contact!}
          onSave={ops.save}
          onDelete={ops.delete}
        />
      ) : null}
    </div>
  )
}

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//       <Route path="/" element={<ContactListPage />} />
//       <Route path="/contact/edit/:contactId" element={<ContactEditPage />} />
//       <Route path="/contact/:contactId" element={<ContactDetailsPage />} />
//       <Route path="/contact/create" element={<ContactCreatePage />} />
//     </>,
//   ),
// )

// export default router
