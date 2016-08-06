import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide, PLATFORM_DIRECTIVES } from '@angular/core';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { FORM_PROVIDERS } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { AppComponent, environment, APP_ROUTER_PROVIDERS } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  provide(PLATFORM_DIRECTIVES, {
    useValue: [ROUTER_DIRECTIVES],
    multi: true
  }),
  ROUTER_DIRECTIVES,
  disableDeprecatedForms(),
  provideForms()
]);
