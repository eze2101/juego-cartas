import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

import { MaterialModule } from '../material/material.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';

import { CartaComponent } from './ver-cartas/carta/carta.component';
import { CartasComponent } from './ver-cartas/cartas/cartas.component';
import { ManoComponent } from './mano/mano.component';
import { JuegoComponent } from './juego/juego.component';
import { CartaEnManoComponent } from './ver-cartas/carta-en-mano/carta-en-mano.component';
import { CartasEnJuegoComponent } from './ver-cartas/cartas-en-juego/cartas-en-juego.component';

import { CartasService } from './services/cartas.service';
import { MessageService } from 'primeng/api';
import { OponenteComponent } from './oponente/oponente.component';
import { CartasOponenteComponent } from './ver-cartas/cartas-oponente/cartas-oponente.component';

@NgModule({
  declarations: [
    CartaComponent,
    CartasComponent,
    ManoComponent,
    JuegoComponent,
    CartaEnManoComponent,
    CartasEnJuegoComponent,
    OponenteComponent,
    CartasOponenteComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    PrimeNgModule,
    FormsModule,
    MessagesModule,
    MessageModule,
  ],
  exports: [],
  providers: [CartasService, MessageService],
})
export class JuegoDeCartasModule {}
