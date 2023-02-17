import style from "./ContactListItem.style"
import { ContactListItem as ContactListItemModel } from "../../models"
import {
  Card,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core"
import { Link, RandomAvatar } from "../various"
import { contactDetailsUrl } from "../../urls"
import { GoToEditAction, FavoriteAction, DeleteAction } from "../actions"
import { ContactListItemAction } from "../../actions"

type Props = {
  contact: ContactListItemModel
  isSelected: boolean
  smOrDown: boolean
  onAction: (a: ContactListItemAction) => void
}

export const ContactListItem = ({
  contact,
  isSelected,
  smOrDown,
  onAction,
}: Props) => (
  <StyledItemDummy
    contact={contact}
    showFavoriteButton
    showEditLink={smOrDown || (!smOrDown && isSelected)}
    showDeleteButton={smOrDown || (!smOrDown && isSelected)}
    isLinkToDetails={smOrDown || (!smOrDown && isSelected)}
    isSelected={isSelected}
    onAction={onAction}
  />
)

type ItemPresenterProps = {
  contact: ContactListItemModel
  showFavoriteButton: boolean
  showEditLink: boolean
  showDeleteButton: boolean
  isLinkToDetails: boolean
  isSelected: boolean
  onAction: (a: ContactListItemAction) => void
} & WithStyles<typeof style>

const ItemPresenter = (p: ItemPresenterProps) => {
  const { classes, contact, onAction } = p

  const avatarAndName = (
    <Card
      className={
        classes.avatarAndName + " " + (p.isSelected && classes.selected)
      }
    >
      <RandomAvatar className={classes.avatar} letter={p.contact.fullName[0]} />
      <div className={classes.nameBox}>
        <Typography className={classes.name}>
          {contact.fullName}
        </Typography>
      </div>
    </Card>
  )

  const favoriteAction = p.showFavoriteButton && (
    <FavoriteAction
      onClick={() =>
        onAction({ type: "TOGGLE_FAVORITE", contactId: contact.id })
      }
      isFavorite={contact.isFavorite}
      rootClass={classes.action + " " + classes.favoriteAction}
      iconClass={classes.icon}
    />
  )

  const editAction = p.showEditLink && (
    <GoToEditAction
      contactId={contact.id}
      rootClass={classes.action + " " + classes.editAction}
      iconClass={classes.icon}
    />
  )

  const deleteAction = p.showDeleteButton && (
    <DeleteAction
      onConfirm={() => onAction({ type: "DELETE", contactId: contact.id })}
      rootClass={classes.action + " " + classes.deleteAction}
      iconClass={classes.icon}
    />
  )

  return p.isLinkToDetails ? (
    <div className={classes.root}>
      <Link href={contactDetailsUrl(contact.id)} className={classes.rootLink}>
        {avatarAndName}
      </Link>
      {favoriteAction}
      {editAction}
      {deleteAction}
    </div>
  ) : (
    <div
      className={classes.root}
      onClick={() => onAction({ type: "SELECT", contactId: contact.id })}
    >
      {avatarAndName} {favoriteAction}
      {editAction}
      {deleteAction}
    </div>
  )
}

const StyledItemDummy = withStyles(style)(ItemPresenter)
