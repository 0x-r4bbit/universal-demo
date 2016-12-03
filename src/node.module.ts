import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniversalModule } from 'angular2-universal/node'; // for AoT we need to manually split universal packages

import { AppModule, AppComponent } from './+app/app.module';

@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    UniversalModule,
    CommonModule,
    AppModule,
  ]
})
export class MainModule {}
