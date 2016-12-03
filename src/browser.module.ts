import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppModule, AppComponent } from './+app/app.module';

@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    AppModule
  ]
})
export class MainModule {}
