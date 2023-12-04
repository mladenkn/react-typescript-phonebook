import style from "./ContactListItem.style"
import { ContactListItem as ContactListItemModel } from "../../models"
import { Card, withStyles, WithStyles } from "@material-ui/core"
import { Link } from "../various"
import { contactDetailsUrl } from "../../urls"
import { GoToEditAction, FavoriteAction, DeleteAction } from "../actions"
import { ContactAvatar } from "../ContactAvatar"
import clsx from "clsx"

type ItemPresenterProps = {
  contact: ContactListItemModel
  isSelected: boolean
  onToggleFavorite(): void
  onDelete(): void
  onSelect(): void
  smOrDown: boolean
} & WithStyles<typeof style>

const _ContactListItem = (p: ItemPresenterProps) => {
  const { classes, contact, onToggleFavorite, onDelete, onSelect } = p

  const showEditLink = p.smOrDown || (!p.smOrDown && p.isSelected)
  const showDeleteButton = showEditLink
  const isLinkToDetails = showEditLink

  const avatarAndName = (
    <Card
      className={clsx(
        "flex h-full w-full items-center border-2 border-solid border-secondary-light shadow-none md:block",
        classes.avatarAndName,
        p.isSelected && "border-primary-main",
      )}
    >
      <ContactAvatar
        className="md:order-2 md:m-auto md:mb-2 md:h-12 md:w-12"
        letter={p.contact.fullName[0]}
        style={p.contact.avatar}
        url={p.contact.avatarUrl}
      />
      <div className={classes.nameBox}>
        <p className="font-sans text-sm lg:text-center">{contact.fullName}</p>
      </div>
    </Card>
  )

  const favoriteAction = (
    <FavoriteAction
      onClick={onToggleFavorite}
      isFavorite={contact.isFavorite}
      rootClass={clsx(classes.action, classes.favoriteAction)}
      iconClass={classes.icon}
    />
  )

  const editAction = showEditLink && (
    <GoToEditAction
      contactId={contact.id}
      rootClass={clsx(classes.action, classes.editAction)}
      iconClass={classes.icon}
    />
  )

  const deleteAction = showDeleteButton && (
    <DeleteAction
      onConfirm={onDelete}
      rootClass={clsx(classes.action, classes.deleteAction)}
      iconClass={classes.icon}
    />
  )

  return isLinkToDetails ? (
    <div className="relative h-full w-full">
      <Link href={contactDetailsUrl(contact.id)} className={clsx("block h-full", classes.rootLink)}>
        {avatarAndName}
      </Link>
      {favoriteAction}
      {editAction}
      {deleteAction}
    </div>
  ) : (
    <div className="relative h-full w-full" onClick={onSelect}>
      {avatarAndName}
      {favoriteAction}
      {editAction}
      {deleteAction}
    </div>
  )
}

export const ContactListItem = withStyles(style)(_ContactListItem)
