import {createApp} from 'vue'
import App from './AppR.vue'
import store from './store'
import * as Vue from 'vue';
import {ref} from 'vue';
import AppR from './AppR.vue'

function w(parent: HTMLElement) {
	const app = Vue.createApp({
		template: `
        <div>
            <app-r/>
        </div>
        <div> {{count}} {{a}} </div>
        <button v-on:click=chandler>click</button>
		`,
		data: () => {
			return {
				count: 1
			}
		},
		components: {AppR},
		methods: {
			chandler: function () {
				this.$emit('something', 'sdfgds')
			}
		}
	}, {
		onSomething: (d: any) => {
			console.log(d);
			document.body.append('clicked');
		}
	})
	console.log("Hello World!");
	(window as any).app = app

	app.use(store);
app.mount(parent);
	(window as any).store = store
//app.mount(document.querySelector('#app'));
// const el = document.createElement('button');
// el.textContent = 'external';
// el.onclick = ()=>{
// 	app._instance.data.count = Math.random();
// }
// document.body.append(el);
//(window as any).app=app)
}

class MyComponent extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		const shadow = this.attachShadow({mode: 'open'});
		shadow.innerHTML = `<div>
			<div id="app"></div>
      Hello, ${this.getAttribute('name')}
    </div>`;
		w(shadow.querySelector('#app'))
	}
}

customElements.define('my-component', MyComponent)
//const elMy = document.createElement('my-component')
//document.body.appendChild(elMy)

