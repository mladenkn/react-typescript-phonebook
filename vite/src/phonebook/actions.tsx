import { contactEditUrl } from "./urls"
import { useState } from "react"
import DeleteModal from "./delete-dialog"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import FavoriteIcon from "@material-ui/icons/Favorite"
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteBorder"
import { Link, useNavigate } from "react-router-dom"
import { cn } from "../utils"

export const GoToEditAction = ({ contactId }: { contactId: number }) => (
  <Link to={contactEditUrl(contactId)}>
    <EditIcon color="secondary" />
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
      <FavoriteIcon className={iconClass} color="secondary" />
    ) : (
      <FavoriteOutlinedIcon className={iconClass} color="secondary" />
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
        <DeleteIcon color="secondary" />
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
  const navigate = useNavigate()
  return (
    <button onClick={() => navigate(-1)}>
      <ArrowBackIcon color="secondary" />
    </button>
  )
}