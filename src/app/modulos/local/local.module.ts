import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocalRoutingModule } from './local-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LocalRoutingModule,
    ReactiveFormsModule
  ]
})
export class LocalModule { }
