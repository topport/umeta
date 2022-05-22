import { createApp } from 'vue';
import { setupAssets } from './plugins';
import { setupStore } from './store';
import { setupDirectives } from './directives';
import { setupRouter } from './router';
import App from './App.vue';
import AdminLayout from '@/components/layout/index.vue';



async function setupApp() {
  // import assets: js、css
  setupAssets();

  const app = createApp(App);

  // store plugin: pinia
  setupStore(app);

  // vue custom directives
  setupDirectives(app);

  // vue router
  await setupRouter(app);
	app.component('AdminLayout', AdminLayout);
  // mount app
  app.mount('#app');
}

setupApp();
