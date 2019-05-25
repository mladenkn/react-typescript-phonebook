import { createStyles, Theme } from "@material-ui/core";

export default ({palette, breakpoints}: Theme) => createStyles({

    heading: {
        display: 'flex',
        borderBottom: `1px solid ${palette.primary.main}`,
        paddingBottom: 15,
    },
    action: {

    },
    icon: {

    },

    [breakpoints.down('sm')]: {
        shallowRoot: {
            display: 'flex',
            justifyContent: 'center',
        },
        root: {
            maxWidth: 600,
        },
        toolbar: {
            padding: '10px 0px',
            display: 'flex',
            alignItems: 'center',
            borderBottom: `1px solid ${palette.secondary.light}`,
        },
        body: {
            padding: '8px 15px',
        },
        heading: {
            paddingTop: 10,
            justifyContent: 'center',
        },
        backAction: {
            marginLeft: '1%',
        },
        deleteAction: {
            marginLeft: '83%',
        },
        avatar: {
            width: 150,
            height: 150,
        },
        editorContainer: {
            marginTop: 10,
        },
    },

    [breakpoints.up('md')]: {
        root: {
            display: 'flex',
            paddingTop: 50,
            paddingLeft: 50,
        },
        smLeft: {
            display: 'inline-flex',
            flexDirection: 'column',
        },
        smRight: {
            marginTop: 50,
            display: 'inline-block',
            marginLeft: 20,
        },
        avatar: {
            width: 150,
            height: 150,
        },
        deleteAction: {
            marginLeft: 430,
        },
        editorContainer: {
            marginTop: 20,
            marginLeft: 15
        },
    },
    
    // [breakpoints.up('md')]: {
    //     heading: {
    //         paddingBottom: 7,
    //     },
    //     editorContainer: {
    //         marginTop: 30,
    //     },
    //     deleteAction: {
    //         marginLeft: 430,
    //     },
    // },
});
