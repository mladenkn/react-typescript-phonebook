import { WithStyles, withStyles, Icon, IconButton, Button } from "@material-ui/core";
import { Contact } from "../../models";
import style from "./ContactForm-style";
import React from 'react';
import { FormikErrors, Formik, Field, ErrorMessage, FieldArray } from 'formik';
import { Divider, Emptiness } from "../various";
import { ContactFieldLabel } from "../various";

/*
    Notes:
      You may notice that the following form is somewhat unusual to Formik. 
      Formik is missing onChange handler so I'm using validate to detect changes.
      Why is that necessary? I need change handler because I want the form field and submit button to be separated,
    submit button is in the parent component. 
      Why do I want the submit button to be separated? Because I don't want the tradional form, I think that this approach
    makes form the more reusable. Besides the form submit button (which is called Save button), form also contains a Cancel
    button. So, if this form should contain Save button, then it also needs to contain a Cancel button, but that doesn't make
    sense. Because the Cancel button is coupled to the page component, therefore the Save button should be to.
      But even if there weren't for the Cancel button, I still believe that the form submit button should be separated from
    the form component itself.
*/

type Props = {initialInput: Contact, onChange: (c: Contact, isValid: boolean) => void} & WithStyles<typeof style>; 

const ContactForm = ({classes, initialInput, onChange}: Props) => 
{
  const validate = (values: Contact) => {

    let errors: FormikErrors<Contact> = {};

    if(values.email && (!values.email.includes('@') || !values.email.includes('.')))
      errors.email = "Email not valid."

    if(!values.fullName)
        errors.fullName = "Name is required."
      
    onChange(values, Object.entries(errors).length === 0);

    return errors;
  }
  
  return (
    <Formik initialValues={initialInput} validate={validate} onSubmit={() => {}}>
      {({values}) => (
        <div>

          <label>
            <ContactFieldLabel icon="person_outlined" text="full name" className={classes.label} />
            <Field type="text" name="fullName" className={classes.input + ' ' + classes.singleValueInput} />
            <ErrorMessage component="div" name="fullName" className={classes.errorMessage}/>
          </label>
          
          <Divider className={classes.divider} margin={18} />
          
          <label>
            <ContactFieldLabel icon="email" text="email" className={classes.label} />
            <Field type="email" name="email" className={classes.input + ' ' + classes.singleValueInput} />
            <ErrorMessage component="div" name="email" className={classes.errorMessage}/>
          </label>
          
          <Divider className={classes.divider} margin={18} />

          <FieldArray
            name="numbers"
            render={arr => (
                <div>                        
                    <ContactFieldLabel icon="phone" text="numbers" className={classes.label} />
                    {values.numbers.map((_, index) => (
                        <div className={classes.phoneNumber} key={index}>
                            <Field type="number" name={`numbers[${index}].value`} className={classes.input + ' ' + classes.phoneNumberInput} />
                            <Field name={`numbers.${index}.label`} className={classes.input + ' ' + classes.phoneNumberLabelInput} />
                            <IconButton className={classes.labelRemover} onClick={() => arr.remove(index)}>
                            <span className={classes.labelRemoverIcon}>x</span>
                            </IconButton>
                        </div>
                    ))}
                    <Button className={classes.numberAdder} onClick={() => arr.push({ value: '', label: '' })}>
                        <Icon color="primary">add_circle_outline</Icon>
                        <Emptiness width={5} />
                        Add number
                    </Button>
                </div>
            )}
          />
        </div>
      )}          
    </Formik>
  );
}

 
export default withStyles(style)(ContactForm);