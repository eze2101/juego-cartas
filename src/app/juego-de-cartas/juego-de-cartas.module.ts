import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';

import { CartaComponent } from './ver-cartas/carta/carta.component';
import { CartasComponent } from './ver-cartas/cartas/cartas.component';
import { ManoComponent } from './mano/mano.component';
import { JuegoComponent } from './juego/juego.component';
import { CartaEnJuegoComponent } from './carta-en-juego/carta-en-juego.component';

import { CartasService } from './services/cartas.service';

@NgModule({
  declarations: [
    CartaComponent,
    CartasComponent,
    ManoComponent,
    JuegoComponent,
    CartaEnJuegoComponent,
  ],
  imports: [CommonModule, MaterialModule, FlexLayoutModule],
  exports: [CartaComponent, CartasComponent, ManoComponent, JuegoComponent],
  providers: [CartasService],
})
export class JuegoDeCartasModule {}
