import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [ToastModule, ButtonModule, RippleModule],
})
export class PrimeNgModule {}
