import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DevToolDetectComponent } from './page/devtool-detect/devtool-detect.component';
import { HomeComponent } from './page/home/home.component';
import { NumbersOnlyComponent } from './page/numbers-only/numbers-only.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'detecttools',
        component: DevToolDetectComponent
      },
      {
        path: 'number',
        component: NumbersOnlyComponent
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
