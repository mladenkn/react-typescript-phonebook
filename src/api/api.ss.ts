import { createServerSideHelpers } from '@trpc/react-query/server';
import superjson from 'superjson';
import { appRouter } from './root';
import db from '~/drizzle/drizzle.instance';

const apiSs = createServerSideHelpers({
  router: appRouter,
  ctx: { db },
  transformer: superjson, // optional - adds superjson serialization
})

export default apiSs
