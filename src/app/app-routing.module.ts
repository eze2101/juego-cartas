import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartasComponent } from './juego-de-cartas/ver-cartas/cartas/cartas.component';
import { JuegoDeCartasComponent } from './juego-de-cartas/juego-de-cartas.component';

const routes: Routes = [
  {
    path: '',
    component: JuegoDeCartasComponent,
  },
  {
    path: 'cartas',
    component: CartasComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
