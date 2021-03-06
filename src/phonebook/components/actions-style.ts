import { createStyles, Theme } from "@material-ui/core";

export const goToEditActionStyle = createStyles({
    root: {
        '&:hover': {
            textDecoration: 'none',
        },
    },
});

export const favoriteActionStyle = createStyles({
    root: {
        padding: 0,
        '&:hover': {
            'background-color': 'inherit'
        },
    },
});

export const deleteActionStyle = ({palette}: Theme) => createStyles({
    button: {
        padding: 0,
        color: palette.text.primary,
        '&:hover': {
            'background-color': 'inherit'
        },
    },
    buttonHoverEffect: {
        padding: 5,
        color: palette.text.primary,
        borderRadius: '10%',
    },
    text: {
        marginRight: 3,
    },
});

export const goBackStyle = createStyles({
    root: {
        padding: 0,
        '&:hover': {
            'background-color': 'inherit'
        },
    },
});