import arc from '@architect/functions'
export const handler = arc.http.async(index)
const socketUrl = 'ws://localhost:51000'
const reloadClient = /* html*/ `
<script>
(()=>{
  const url = '${socketUrl}'
  let socket = new WebSocket(url);
  socket.addEventListener('message',(event)=>{
    console.log('message:',event.data)
    if (event.data==='reload') location.reload()
  })
  socket.addEventListener('close',()=>{
    const retryMs = 100;
    const cancelMs = 3000;
    const maxAttempts = Math.round(cancelMs/retryMs);
    let attempts = 0;
    const reloadIfCanConnect = ()=>{
      attempts ++ ;
      if(attempts > maxAttempts){
        console.error("Could not reconnect to dev server.");
        return;
      }
      socket = new WebSocket(url);
      socket.addEventListener('error',()=>{
        setTimeout(reloadIfCanConnect,retryMs);
      });
      socket.addEventListener('open',()=>{
        location.reload();
      });
    };
    reloadIfCanConnect();
  });
})();
</script>
`

async function index() {
  return {
    html: /* html*/ `
    <html>
      <head>
        ${reloadClient}
      </head>
      <body>
        Hello World
      </body>
    </html>`
  }
}
