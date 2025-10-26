import type { Handle } from '@sveltejs/kit'
import { building } from '$app/environment'
import { paraglideMiddleware } from '$lib/paraglide/server'
import { auth } from '$lib/server/auth'
import { sequence } from '@sveltejs/kit/hooks'
import { svelteKitHandler } from 'better-auth/svelte-kit'

const handleParaglide: Handle = ({ event, resolve }) =>
  paraglideMiddleware(event.request, ({ request, locale }) => {
    event.request = request

    return resolve(event, {
      transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale),
    })
  })

const handleAuth: Handle = ({ event, resolve }) => {
  return svelteKitHandler({ event, resolve, auth, building })
}

export const handle: Handle = sequence(handleParaglide, handleAuth)
