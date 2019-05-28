import { Contact } from "../../models";
import React, { useState } from 'react';
import style from "./style";
import { DeleteAction, GoBackAction } from "../actions";
import { WithStyles, withStyles, Button, Avatar } from "@material-ui/core";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ContactForm from "./ContactForm";
import { useContactPageBaseStylesXs, useContactPageBaseStylesSm } from "../ContactPageBase-style";


type Props = {contact: Contact} & WithStyles<typeof style>;

const ContactEditPage = ({contact, classes}: Props) => 
{ 
    const onlyXs = useMediaQuery('(max-width:599px)');
    const downSm = useMediaQuery('(max-width:959px)');

    const backAction = <GoBackAction rootClass={classes.backAction} />;

    const deleteAction = <DeleteAction
        contactId={contact.id}
        withText={!onlyXs}
        rootClass={classes.deleteAction} />;

    const avatar = <Avatar src={contact.avatar} className={classes.avatar}/>;

    const buttons = (
        <div className={classes.actions}>
            <Button variant="contained" color="secondary" onClick={() => {}} className={classes.button}>
                Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={() => {}} className={classes.button} autoFocus>
                Save
            </Button>              
        </div>
    )

    const xsBaseClasses = useContactPageBaseStylesXs();
    const smBaseClasses = useContactPageBaseStylesSm();

    const [formInput, setFormInput] = useState(contact);
    console.log(formInput);

    if(downSm){
        return (
            <div className={classes.shallowRoot}>
                <div className={xsBaseClasses.root + ' '+ classes.root}>
                    <div className={xsBaseClasses.toolbar}>
                        {backAction}{deleteAction}
                    </div>
                    <div className={xsBaseClasses.body}>                    
                        <div className={xsBaseClasses.heading + ' ' + classes.heading}>
                            {avatar}
                        </div>
                        <div className={classes.formAndButtons}>
                            <ContactForm contact={contact} onChange={setFormInput} />
                            {buttons}
                        </div>
                    </div>
                </div>
            </div>);
    }
    return (  
        <div className={smBaseClasses.root}>
            <div className={smBaseClasses.smLeft}>
                {avatar}
            </div>
            <div className={smBaseClasses.smRight}>
                <div className={smBaseClasses.heading}>
                    {backAction}{deleteAction}
                </div>
                <div className={classes.formAndButtons}>
                    <ContactForm contact={contact} onChange={setFormInput} />
                    {buttons}                
                </div>  
            </div>          
        </div>);
}

export default withStyles(style)(ContactEditPage);