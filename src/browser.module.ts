import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppModule, AppComponent } from './+app/app.module';
import { CacheService } from './+app/cache.service';

export function getLRU(lru?: any) {
  // use LRU for node
  // return lru || new LRU(10);
  return lru || new Map();
}

export const UNIVERSAL_KEY = 'UNIVERSAL_CACHE';

@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    AppModule
  ],
  providers: [
    { provide: 'LRU', useFactory: getLRU, deps: [] },
    CacheService,
  ]
})
export class MainModule {
  constructor(public cache: CacheService) {
    this.doRehydrate();
  }

  doRehydrate() {
    let defaultValue = {};
    let serverCache = this._getCacheValue(CacheService.KEY, defaultValue);
    this.cache.rehydrate(serverCache);
  }

  _getCacheValue(key: string, defaultValue: any): any {
    // browser
    const win: any = window;
    if (win[UNIVERSAL_KEY] && win[UNIVERSAL_KEY][key]) {
      let serverCache = JSON.parse(win[UNIVERSAL_KEY][key]);
      return serverCache;
    }
    return defaultValue;
  }
}
