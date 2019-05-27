import { withStyles, WithStyles, Link, Icon, IconButton, Typography } from "@material-ui/core";
import { goToEditActionStyle, favoriteActionStyle, deleteActionStyle, goBackStyle } from "./actions-style";
import { WithClassName, createRefRouterLink } from "./reusables";
import { contactEditUrl } from "../urls";
import React, { useState} from 'react';
import { WithDispatch, withDispatch } from "../stateMgmt/DispatchContext";
import { favoriteContact, goBack, deleteContact } from "../actions";
import { Contact } from "../models";
import { compose } from "lodash/fp";
import DeleteModal from "./DeleteModal";

type IconLinkProps = {name: string, url: string} & WithClassName;

export const IconLink = ({name, url, className}: IconLinkProps) => (
    <Link component={createRefRouterLink(url) as any} className={className}>
        <Icon color="secondary">{name}</Icon>
    </Link>
);


type GoToEditActionProps = { contactId: number, styles: {root: string, icon: string} } 
    & WithStyles<typeof goToEditActionStyle>;

export const GoToEditAction = withStyles(goToEditActionStyle)
    (({classes, contactId, styles}: GoToEditActionProps) => (
        <Link component={createRefRouterLink(contactEditUrl(contactId)) as any}
            className={classes.root + ' ' + styles.root}>
            <Icon color="secondary" className={styles.icon}>edit</Icon>
        </Link>
    ));


type FavoriteActionProps = { contact: Contact, styles: {root: string, icon: string} }
    & WithStyles<typeof favoriteActionStyle> & WithDispatch;

export const FavoriteAction = compose(withStyles(favoriteActionStyle), withDispatch)
    (({contact, classes, styles, dispatch}: FavoriteActionProps) => (
        <IconButton className={classes.root + ' ' + styles.root}
            onClick={() => dispatch(favoriteContact(contact.id))} disableRipple>
            <Icon color="secondary" className={styles.icon}>
                {contact.isFavorite ? 'favorite' : 'favorite_outlined'}
            </Icon>
        </IconButton>
    ));


type DeleteActionProps = { contactId: number, withText?: boolean, styles?: {root?: string, icon?: string} } & WithStyles<typeof deleteActionStyle> & WithDispatch;
 
export const DeleteAction = compose(withStyles(deleteActionStyle), withDispatch)
    (({contactId, dispatch, withText, classes, styles}: DeleteActionProps) => {
        const [modalOpen, setModalOpen] = useState(false);
        return (
            <div className={styles && styles.root && styles.root}>
                <IconButton onClick={() => setModalOpen(true)} className={classes.button} disableRipple>
                    {(withText || false) && <Typography className={classes.text}>Delete</Typography>}
                    <Icon color="secondary" className={(styles && styles.icon && styles.icon)}>delete</Icon>
                </IconButton>
                <DeleteModal isOpen={modalOpen} text="Are you sure you want to delete this modal"
                    onCancel={() => setModalOpen(false)}
                    onConfirm={() => dispatch(deleteContact(contactId))} />
            </div>
        );
    });


type GoBackActionProps = { styles?: {root?: string, icon?: string} }
    & WithStyles<typeof goBackStyle> & WithDispatch;
    
export const GoBackAction = compose(withStyles(goBackStyle), withDispatch)
    (({dispatch, classes, styles}: GoBackActionProps) => (
        <IconButton 
            onClick={() => dispatch(goBack())} 
            className={classes.root + ' ' + (styles && styles.root)} disableRipple>
            <Icon color="secondary" className={(styles && styles.icon)}>arrow_back</Icon>
        </IconButton>
    )); 