import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CacheService } from'./cache.service';

@Component({
  selector: 'app',
  template: `
    <svg width="550" height="550"
      (mousedown)="mouseDown($event)"
      (mousemove)="mouseMove($event)"
      (mouseup)="mouseUp($event)"
      >
      <svg:g
        square-box
        *ngFor="let box of boxes"
        [box]="box"
        [selected]="box.id == currentId"
        ></svg:g>
    </svg>
  `
})
export class AppComponent {

  currentId = null;
  boxes = [];
  offsetX;
  offsetY;

  constructor(private cache: CacheService) {}

  ngOnInit() {
    this.boxes = this.cache.get('boxes');
  }

  mouseDown(event) {
    const id = Number(event.target.getAttribute("dataId"));
    const box = this.boxes[id];
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    this.offsetX = box.x - mouseX;
    this.offsetY = box.y - mouseY;
    this.currentId = id;
  }

  mouseMove(event) {
    if (this.currentId !== null) {
      this.updateBox(this.currentId, event.clientX + this.offsetX, event.clientY + this.offsetY);
    }
  }

  mouseUp($event) {
    this.currentId = null;
  }

  updateBox(id, x, y) {
    this.boxes[id] = { id, x, y };
  }
}
