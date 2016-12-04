import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniversalModule } from 'angular2-universal/node'; // for AoT we need to manually split universal packages

import { AppModule, AppComponent } from './+app/app.module';
import { CacheService } from './+app/cache.service';
import { createBoxes } from './+app/util';

export function getLRU() {
  return new Map();
}

export const UNIVERSAL_KEY = 'UNIVERSAL_CACHE';

@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    UniversalModule,
    CommonModule,
    AppModule,
  ],
  providers: [
    { provide: 'LRU', useFactory: getLRU, deps: [] },
    CacheService
  ]
})
export class MainModule {
  constructor(public cache: CacheService) {}

  universalDoDehydrate = (universalCache) => {
    this.cache.set('boxes', createBoxes(5000));
    universalCache[CacheService.KEY] = JSON.stringify(this.cache.dehydrate());
  }

  universalAfterDehydrate = () => {
    // comment out if LRU provided at platform level to be shared between each user
    this.cache.clear();
  }
}
