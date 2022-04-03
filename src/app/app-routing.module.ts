import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegoComponent } from './juego-de-cartas/juego/juego.component';
import { CartasComponent } from './juego-de-cartas/ver-cartas/cartas/cartas.component';

const routes: Routes = [
  {
    path: '',
    component: JuegoComponent,
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
