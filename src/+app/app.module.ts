import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { SquareBoxComponent } from './square-box.component';


@NgModule({
  declarations: [ AppComponent, SquareBoxComponent ],
  imports: [CommonModule]
})
export class AppModule {
}

export { AppComponent } from './app.component';
