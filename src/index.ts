import {createApp} from 'vue'
import App from './AppR.vue'
import store from './store'

function weather(parent: HTMLElement) {
	const app = createApp(App)
	app.use(store);
	app.mount(parent);
}

class WeatherComponent extends HTMLElement {
	connectedCallback() {
		const shadow = this.attachShadow({mode: 'open'});
		shadow.innerHTML = `<div>
			<div id="app"></div>
    </div>`;
		weather(shadow.querySelector('#app'))
	}
}
customElements.define('weather-component', WeatherComponent)
