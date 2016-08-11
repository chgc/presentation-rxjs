import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { Demo1Component } from './demo1';
import { Demo2Component } from './demo2';
import { Demo3Component } from './demo3';

export const routes: Routes = [
  { path: 'demo1', component: Demo1Component },
  { path: 'demo2', component: Demo2Component },
  { path: 'demo3', component: Demo3Component },
  {
    path: '**',
    redirectTo: 'demo1'    
  }
];
export const routing = RouterModule.forRoot(routes);