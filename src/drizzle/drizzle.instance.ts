import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import { asNonNil } from "~/utils"
import * as ContactSchema from "~/contact/contact-schema"
import { env } from "~/env"

export default function drizzle_connect() {
  const queryClient = postgres(asNonNil(env.DATABASE_URL), {
    ssl: "require",
    max: 1,
  })
  return drizzle(queryClient, { schema: { ...ContactSchema } })
}

export type Drizzle_instance = ReturnType<typeof drizzle_connect>
