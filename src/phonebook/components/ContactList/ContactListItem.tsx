import style from "./ContactListItem-style";
import { Contact } from "../../models";
import React from 'react';
import { Card, Avatar, Link, Typography, withStyles, WithStyles }
    from "@material-ui/core";
import { Box } from "../reusables";
import { contactDetailsUrl } from "../../urls";
import { createRefRouterLink } from "../reusables";
import { GoToEditAction, FavoriteAction, DeleteAction } from "../actions";

type Props = {
    contact: Contact
    isSelected: boolean
    smOrDown: boolean
    onSelect: () => void
}

export default ({contact, isSelected, smOrDown, onSelect}: Props) =>
{
    return <StyledItemDummy 
        contact={contact}
        showFavoriteButton={true}
        showEditLink={smOrDown || (!smOrDown && isSelected)}
        showDeleteButton={smOrDown || (!smOrDown && isSelected)}
        isLinkToDetails={smOrDown || (!smOrDown && isSelected)}
        isSelected={isSelected}
        onSelect={onSelect} 
        />
}

type ItemDummyProps = {
    contact: Contact
    showFavoriteButton: boolean
    showEditLink: boolean
    showDeleteButton: boolean
    isLinkToDetails: boolean
    isSelected: boolean
    onSelect: () => void
} & WithStyles<typeof style>
 
const ItemDummy = (p: ItemDummyProps) => {

    const { classes, contact } = p;

    const avatarAndName = (
        <Card className={classes.avatarAndName + ' ' + (p.isSelected && classes.selected)}>
            <Avatar alt="avatar" src={contact.avatar} className={classes.avatar} />
            <Box className={classes.nameBox}>
                <Typography className={`${classes.name}`}>{contact.fullName}</Typography>
            </Box>
        </Card>);

    const favoriteAction = p.showFavoriteButton &&
        <FavoriteAction
            contact={contact}
            styles={{
                root: classes.action + ' ' + classes.favoriteAction,
                icon: classes.icon,
            }} />;

    const editAction = p.showEditLink &&
        <GoToEditAction
            contactId={contact.id}
            styles={{
                root: classes.action + ' ' + classes.editAction,
                icon: classes.icon,
            }} />;

    const deleteAction = p.showDeleteButton &&
        <DeleteAction
            contactId={contact.id}
            styles={{
                root: classes.action + ' ' + classes.deleteAction,
                icon: classes.icon,
            }} />;

    return p.isLinkToDetails ? 
        <div className={classes.root}>
            <Link component={createRefRouterLink(contactDetailsUrl(contact.id)) as any} className={classes.rootLink}>
                {avatarAndName}
            </Link>
            {favoriteAction}{editAction}{deleteAction}
        </div> :
        <div className={classes.root} onClick={p.onSelect}>
            {avatarAndName} {favoriteAction}{editAction}{deleteAction}
        </div> ;
}

const StyledItemDummy = withStyles(style)(ItemDummy);