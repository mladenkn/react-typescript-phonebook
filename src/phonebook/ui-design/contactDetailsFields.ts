import { createStyles, Theme } from "@material-ui/core"

export const contactDetailsFieldsStyle = ({palette}: Theme) => createStyles({
    field: {   
    },
    fieldLabelEmail: {
        // marginRight: 15 
    },
    fieldValue: {
        // color: palette.secondary.main
    },
    fieldListValue: {

    },
    numberType: {
        // color: palette.secondary.main,
        width: 100,
        textTransform: 'uppercase'
    },
    numberValue: {
        // color: palette.secondary.main,    
        textDecoration: 'underline'
    },
})