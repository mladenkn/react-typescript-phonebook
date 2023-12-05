import { cn } from "../../utils"

export const ContactPageBaseStylesXs = {
  root: cn(""),
  toolbar: cn("border-b-1 mt-4 flex items-center border-secondary-main px-2 pb-2 pt-0"),
  heading: cn("border-b-1 flex items-center border-primary-main px-0 pb-5 pt-2"),
  body: cn("pb-0 pl-4 pr-4 pt-2"),
}

export const ContactPageBaseStylesMd = {
  root: cn("flex"),
  heading: cn("flex border-b-1 border-primary-main pb-2"),
  left: cn("inline-flex flex-col"),
  right: cn("mt-12 inline-block ml-5"),
}
