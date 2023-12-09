import { createStyles, Theme, makeStyles } from "@material-ui/core"

const contactPageStyle = ({ breakpoints }: Theme) =>
  createStyles({
    [breakpoints.up("sm")]: {
      root: {
        marginTop: 30,
      },
    },
  })

const contactEditPageStyle = ({ breakpoints }: Theme) =>
  createStyles({
    [breakpoints.up("sm")]: {
      root: {
        width: 720,
      },
    },
  })

export const useContactPageStyle = makeStyles(contactPageStyle, {
  name: "ContactPageStyle",
})

export const useContactEditPageStyle = makeStyles(contactEditPageStyle, {
  name: "ContactEditPageStyle",
})

const homePageStyle = ({ breakpoints }: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
    },
    [breakpoints.up("xs")]: {
      root: {
        marginTop: 7,
      },
    },
    [breakpoints.up("sm")]: {
      root: {
        marginTop: 20,
      },
    },
  })

export const useHomePageStyle = makeStyles(homePageStyle, {
  name: "HomePageStyle",
})
