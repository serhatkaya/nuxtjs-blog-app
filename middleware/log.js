export default function (context) {
  console.log(`[HTTP] ${context.req?.url} - ${context.req?.method} `)
}
