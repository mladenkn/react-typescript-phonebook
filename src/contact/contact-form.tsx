import { Contact as _Contact } from "../models"
import { ContactFieldLabel } from "../various"
import { cn } from "~/utils/ui-utils"
import {
  PersonOutlinedIcon,
  EmailIcon,
  PhoneIcon,
  RemoveCircledIcon,
  AddCircleOutlineIcon,
  ArrowBackIcon,
} from "~/assets/icons"
import { DeepKeys, FormApi, ReactFormApi, useForm } from "@tanstack/react-form"
import { useRouter } from "next/router"
import SwapableAvatar from "../swapable-avatar"
import { ReactNode } from "react"
import { ContactFormInput } from "./contact-api-shared"
import { contactDetailsUrl } from "~/urls"
import Link from "next/link"

export type ContactFormEntries = {
  fullName: string
  email: string
  avatarUrl?: string | null
  phoneNumbers?: { id?: number; value: string; label: string }[]
}

type Props = {
  initialInput: ContactFormEntries
  toolbarRight?: ReactNode
  onSubmit: (entries: ContactFormEntries) => void
  goBackUrl: string
}

export default function ContactForm({ initialInput, toolbarRight, onSubmit, goBackUrl }: Props) {
  const form = useForm({
    defaultValues: initialInput,
    onSubmit: ({ value }) => onSubmit(value),
  })

  const buttonClass = cn("w-36 rounded-2xl text-white h-8")

  const router = useRouter()

  const avatar = (
    <form.Field name="avatarUrl">
      {field => (
        <SwapableAvatar
          src={field.state.value}
          className="h-52 w-52"
          onChange={value => field.handleChange(value)}
        />
      )}
    </form.Field>
  )

  const numbersField = form.useField({ name: "phoneNumbers" })

  return (
    <form
      className="mt-16 px-3 text-secondary-dark md:mt-20 md:flex sm-max:w-full"
      onSubmit={e => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <div className="mr-8 sm-max:hidden">{avatar}</div>
      <div className="md:min-w-96">
        <div className="mt-4 flex w-full items-center justify-between px-1 pb-2 pt-0">
          <Link href={goBackUrl}>
            <ArrowBackIcon />
          </Link>
          {toolbarRight}
        </div>
        <div className="h-0.25 w-full bg-secondary-main md:hidden" />
        <h1 className="flex items-center justify-center px-0 md:hidden md:pb-2 sm-max:py-4">
          {avatar}
        </h1>
        <div className="mb-2 h-0.25 w-full bg-primary-main" />

        <label>
          <ContactFieldLabel
            icon={<PersonOutlinedIcon className="text-primary-main" />}
            text="Full name"
            className="mb-2"
          />
          <FormTextInput name="fullName" form={form} />
        </label>

        <div className="my-4 h-0.25 w-full bg-primary-main" />

        <label>
          <ContactFieldLabel
            icon={<EmailIcon className="text-primary-main" />}
            text="Email"
            className="mb-2"
          />
          <FormTextInput name="email" form={form} />
        </label>

        <div className="my-4 h-0.25 w-full bg-primary-main" />

        <form.Field name="phoneNumbers" mode="array">
          {phoneNumberField => (
            <div className="min-h-14">
              <ContactFieldLabel
                className="mb-2"
                icon={<PhoneIcon className="text-primary-main" />}
                text="Phone numbers"
              />
              {phoneNumberField.state.value?.map((_, index) => (
                <div
                  className="flex flex-col gap-2 py-2 md:flex-row md:justify-between"
                  key={index}
                >
                  <FormTextInput
                    placeholder="Label"
                    form={form}
                    name={`phoneNumbers[${index}].label`}
                  />
                  <FormTextInput
                    placeholder="Number"
                    form={form}
                    name={`phoneNumbers[${index}].value`}
                    validate={input => (input?.length === 0 ? "Required" : undefined)}
                  />
                  <button
                    className="max-sm:ml-2"
                    type="button"
                    onClick={() => numbersField.removeValue(index)}
                  >
                    <RemoveCircledIcon className="text-secondary-main" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </form.Field>

        <button
          type="button"
          className="mt-6 flex text-primary-main"
          onClick={() => numbersField.pushValue({ label: "", value: "" })}
        >
          <AddCircleOutlineIcon className="mr-1.5 text-primary-main" />
          Add number
        </button>

        <div className="my-4 h-0.25 w-full bg-primary-main" />

        <div className="mx-0.5 mb-4 mt-6 flex justify-between">
          <button
            className={cn(buttonClass, "bg-secondary-main")}
            onClick={() => router.back()}
            type="button"
          >
            Cancel
          </button>
          <form.Subscribe
            selector={state => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <button
                className={cn(buttonClass, "bg-primary-main")}
                type="submit"
                disabled={!canSubmit}
              >
                {isSubmitting ? "..." : "Save"}
              </button>
            )}
          />
        </div>
      </div>
    </form>
  )
}

type FormTextInputProps = {
  form: FormApi<ContactFormEntries, undefined> & ReactFormApi<ContactFormEntries, undefined>
  name: DeepKeys<ContactFormEntries>
  placeholder?: string
  validate?(input: string): string | undefined
}

function FormTextInput({ form, name, placeholder, validate }: FormTextInputProps) {
  return (
    <form.Field
      name={name}
      children={field => (
        <div className="flex flex-col gap-1">
          <input
            className="w-full border-2 border-solid border-secondary-light p-2 text-secondary-main outline-none"
            type="text"
            name={field.name}
            onBlur={field.handleBlur}
            value={field.state.value as any}
            onChange={e => field.handleChange(e.target.value)}
            placeholder={placeholder}
          />
          {field.state.meta.isTouched && field.state.meta.errors.length ? (
            <em className="not-italic text-red-500">{field.state.meta.errors.join(", ")}</em>
          ) : null}
        </div>
      )}
      validators={{
        onBlur({ value }) {
          if (validate) {
            return validate(value as string)
          }

          const validationResult = ContactFormInput.pick({ [name]: true } as any).safeParse({
            [name]: value,
          })
          if (validationResult.error) {
            return validationResult.error.issues.map(i => i.message).join(", ")
          }
        },
      }}
    />
  )
}
