import arc from '@architect/functions'
export const handler = arc.http.async(index)

async function index(req) {
  return { html: 'Hello World' }
}
