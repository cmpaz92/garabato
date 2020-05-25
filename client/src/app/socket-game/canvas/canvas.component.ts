import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit {
  @Input() socket: any;
  @ViewChild('game')
  private gameCanvas: ElementRef;
  private context: any;
  private roomID: number;

  private rect: any;
  private scaleX: number;
  private scaleY: number;
  private isDrawing: boolean = false;
  private drawingEnabled:boolean = false;

  public ngOnInit() {
    console.log(this.socket);
    this.roomID = 0; // TODO how do we want to set the room ID? On creation or have a set number of rooms?
  }

  public ngAfterViewInit() {
    this.context = this.gameCanvas.nativeElement.getContext('2d');
    this.rect = this.gameCanvas.nativeElement.getBoundingClientRect();
    this.scaleX = this.gameCanvas.nativeElement.width / this.rect.width, 
    this.scaleY = this.gameCanvas.nativeElement.height / this.rect.height; 

    this.enableDrawing().subscribe();
    this.updateCanvas().subscribe();
    this.clearCanvas().subscribe();

    document.onmousedown = (e) => {
      if (!!this.drawingEnabled) {
        // only draw, when it is your turn to draw
        this.isDrawing = true;
      }
    };

    document.onmouseup = (e) => {
      this.isDrawing = false;
    };

    document.onmousemove = (e) => {
      if (this.isDrawing){
        // event get mouse position in world space, but drawing is done in local space
        // therefore the the position first needs to be mapped in local space
        this.drawRequest(((e.clientX - this.rect.left) * this.scaleX), ((e.clientY - this.rect.top)* this.scaleY));
      }
    };

    this.socket.on('init', (data) => {
      console.log('We have a new client: ' + data);
    });
  }

  drawRequest(xPos: number, yPos: number) {
    // send draw request to server
    this.socket.emit('draw', xPos, yPos, this.roomID);
  }

  enableDrawing() {
    let observable = new Observable(
      (observer) => {
        this.socket.on('enableDrawing', (enable:boolean) => {
          this.drawingEnabled = enable;
          observer.next(enable);
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );
    return observable;
  }

  clearCanvas() {
    let observable = new Observable(
      (observer) => {
        this.socket.on('clearCanvas', () => {
          this.context.clearRect(
            0,
            0,
            this.gameCanvas.nativeElement.width,
            this.gameCanvas.nativeElement.height
          );
          observer.next();
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );
    return observable;
  }

  updateCanvas() {
    let observable = new Observable<{ posX: number; posY: number }>(
      (observer) => {
        this.socket.on('update canvas', (pos) => {
          this.context.fillStyle = 'white';
          this.context.fillRect(pos.posX, pos.posY, 5, 5);
          // console.log("Currently drawing on:  posX: " + pos.posX + "| posY" + pos.posY)
          observer.next(pos);
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );
    return observable;
  }

}
