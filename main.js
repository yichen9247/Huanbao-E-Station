import App from './App'

// #ifdef VUE3
import config from './config'
import * as Pinia from 'pinia'
import {
	createSSRApp
} from 'vue'
import uviewPlus from 'uview-plus'
import FloatComponent from '@/components/FloatComponent/FloatComponent.vue'

if (process.env.NODE_ENV === 'development') {
	// 开发环境
	config.baseUrl = "http://11.47.17.108:9013"
} else {
	// 线上环境
	config.baseUrl = "http://154.37.215.222:9014"
}

// 强制重写后端地址
// config.baseUrl= "http://154.37.215.222:9014"

// 测试环境
config.baseUrl = "http://11.47.62.101:9013";

export function createApp() {
	const app = createSSRApp(App)
	app.use(uviewPlus);
	app.use(FloatComponent);
	app.component('FloatComponent', FloatComponent);
	app.use(Pinia.createPinia());
	return {
		app,
		Pinia
	}
}
// #endif