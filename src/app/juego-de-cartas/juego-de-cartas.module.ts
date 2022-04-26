import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';

import { MaterialModule } from '../material/material.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';

import { CartasService } from './services/cartas.service';

import { CartaComponent } from './ver-cartas/carta/carta.component';
import { CartasComponent } from './ver-cartas/cartas/cartas.component';
import { CartasOponenteComponent } from './ver-cartas/cartas-oponente/cartas-oponente.component';
import { ManoComponent } from './mano/mano.component';
import { OponenteComponent } from './oponente/oponente.component';
import { JuegoComponent } from './juego/juego.component';

@NgModule({
  declarations: [
    CartaComponent,
    CartasComponent,
    CartasOponenteComponent,
    ManoComponent,
    OponenteComponent,
    JuegoComponent,
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
