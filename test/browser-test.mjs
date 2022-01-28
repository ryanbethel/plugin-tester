// import tiny from 'tiny-json-http'
// import arc from '@architect/functions'
import test from 'tape'
import sandbox from '@architect/sandbox'
import puppeteer from 'puppeteer'
import { getDocument, queries, waitFor } from 'pptr-testing-library'
const { getByTestId, getByLabelText, getByText } = queries
let browser

test('start sandbox', async (t) => {
  t.plan(1)
  const output = await sandbox.start()
  browser = await puppeteer.launch()
  t.equal(output, 'Sandbox successfully started', 'sandbox started')
})

test(' browser tests', async (t) => {
  t.plan(1)

  const page = await browser.newPage()
  await page.goto('http://localhost:3333/app/users')
  const document = await getDocument(page)

  // // Grab ElementHandle for document
  // // Your favorite query methods are available
  // const $form = await getByTestId($document, 'my-form')
  // // returned elements are Puppeteer ElementHandles too!
  // const $email = await getByLabelText($form, 'Email')
  // // interact with puppeteer like usual
  // await $email.type('pptr@example.com')
  // // waiting works too!
  // await waitFor(() => getByText('Loading...'))
  // const login = await getByText(document, 'Login with Git Hub')
  // console.log(login)

  t.ok(await getByText(document, 'Login with GitHub'), 'found login button')
})

test('sandbox end', async (t) => {
  t.plan(1)
  const output = await sandbox.end()
  await browser.close()
  t.equal(output, 'Sandbox successfully shut down', 'sandbox end')
})
