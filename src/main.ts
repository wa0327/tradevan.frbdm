import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

environment.init();

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(reason => console.error(reason));
