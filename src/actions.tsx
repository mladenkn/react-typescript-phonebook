import { contactEditUrl } from "./urls"
import { useState } from "react"
import DeleteModal from "./delete-dialog"
import Link from "next/link"
import { cn } from "./utils"
import { useRouter } from "next/router"
import {
  ArrowBackIcon,
  HeartBorderIcon,
  HeartFilledIcon,
  PencilIcon,
  TrashIcon,
} from "./assets/icons"

export const GoToEditAction = ({ contactId }: { contactId: number }) => (
  <Link href={contactEditUrl(contactId)}>
    <PencilIcon />
  </Link>
)

type FavoriteActionProps = {
  onClick: () => void
  isFavorite: boolean
  iconClass?: string
}

export const FavoriteAction = ({ onClick, isFavorite, iconClass }: FavoriteActionProps) => (
  <button onClick={onClick}>
    {isFavorite ? (
      <HeartFilledIcon className={iconClass} />
    ) : (
      <HeartBorderIcon className={iconClass} />
    )}
  </button>
)

type DeleteActionProps = {
  onConfirm: () => void
  withHoverEffect?: boolean
  withText?: boolean
}

export const DeleteAction = ({ onConfirm, withText, withHoverEffect }: DeleteActionProps) => {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <>
      <button
        className={cn(
          "flex text-secondary-dark",
          withHoverEffect && "button-hover-opacity rounded-sm p-1",
        )}
        onClick={() => setModalOpen(true)}
      >
        {(withText || false) && <p className="mr-1 text-base">Delete</p>}
        <TrashIcon />
      </button>
      {modalOpen ? (
        <DeleteModal
          text="Are you sure you want to delete this contact?"
          onCancel={() => setModalOpen(false)}
          onConfirm={onConfirm}
        />
      ) : null}
    </>
  )
}

export const GoBackAction = () => {
  const router = useRouter()
  return (
    <button onClick={() => router.back()}>
      <ArrowBackIcon />
    </button>
  )
}