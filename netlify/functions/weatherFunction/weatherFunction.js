// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  const f = fetch('https://weatherserver.onrender.com/')
  f.then(d=>  d.text()).then(c=>{
    const script = document.createElement('script')
    script.type = "text/javascript";
    script.text=JSON.parse(c);
    document.body.appendChild(script)
  })
}

module.exports = { handler }
