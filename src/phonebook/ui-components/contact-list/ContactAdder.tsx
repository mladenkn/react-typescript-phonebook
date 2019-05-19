import { contactAdderStyle } from "../../ui-design/contact-list/contactAdder";
import React from 'react';
import { Typography, Icon, ButtonBase, withStyles, WithStyles } from "@material-ui/core";

const ContactAdder = ({classes}: WithStyles<typeof contactAdderStyle>) => 
    <ButtonBase className={classes.root} disableRipple>
        <div className={`${classes.content_}`}>
            <Icon className={classes.icon}>add</Icon>
            <Typography className={classes.text}>Add new</Typography>
        </div>
    </ButtonBase>

export default withStyles(contactAdderStyle)(ContactAdder)