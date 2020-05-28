import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})

@Injectable()
export class CanvasComponent implements OnInit {
  @Input() socket: any;
  @ViewChild('game')
  private gameCanvas: ElementRef;
  private context: any;
  private roomID: number;
  countdownTime: number = 30;
  currentWord: String = "";

  private rect: any;
  private scaleX: number;
  private scaleY: number;
  private isDrawing: boolean = false;
  private drawingEnabled:boolean = false;
  private drawOrigin: [number, number];

  public ngOnInit() {
    console.log(this.socket);
    this.roomID = 0; // TODO how do we want to set the room ID? On creation or have a set number of rooms?
    this.drawOrigin = [0,0];
  }

  public ngAfterViewInit() {
    this.context = this.gameCanvas.nativeElement.getContext('2d');
    this.rect = this.gameCanvas.nativeElement.getBoundingClientRect();
    this.scaleX = this.gameCanvas.nativeElement.width / this.rect.width, 
    this.scaleY = this.gameCanvas.nativeElement.height / this.rect.height; 
    

    this.context.lineWidth = 3;
    this.context.lineCap = 'round';
    this.context.strokeStyle = 'white';

    this.enableDrawing().subscribe();
    this.updateCanvas().subscribe();
    this.clearCanvasObsverble().subscribe();
    this.countdownObsverble().subscribe();
    this.setWordToDraw().subscribe();
    this.setOrignObsverble().subscribe();
    this.setRoomObsverble().subscribe();

    document.onmousedown = (e) => {

      if (this.drawingEnabled) {
        // only draw, when it is your turn to draw
        // event get mouse position in world space, but drawing is done in local space
        // therefore the the position first needs to be mapped in local space
        this.drawOrigin = [(e.clientX - this.rect.left) * this.scaleX, (e.clientY - this.rect.top)* this.scaleY];
        this.setOrignRequest ((e.clientX - this.rect.left) * this.scaleX, (e.clientY - this.rect.top)* this.scaleY);
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

  setWordToDraw() {
    let observable = new Observable(
      (observer) => {
        this.socket.on('setWordToDraw', (word:String) => {
          this.currentWord = word;
          observer.next(word);
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );
    return observable;
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

  clearCanvasRequest () {
    if (this.drawingEnabled){
      // only enable clear canvas, when the player who is currently drawing is pressing it
      this.socket.emit('clearCanvasRequest', this.roomID);
    }
  }

  setOrignRequest (x: number, y: number) {
    this.socket.emit('setOrignRequest', this.roomID, x, y);
  }

  clearCanvas() {
    this.context.clearRect(
      0,
      0,
      this.gameCanvas.nativeElement.width,
      this.gameCanvas.nativeElement.height
    );
  }
  
  clearCanvasObsverble() {
    let observable = new Observable(
      (observer) => {
        this.socket.on('clearCanvas', () => {
          this.clearCanvas();
          
          observer.next();
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );
    return observable;
  }

  setOrignObsverble() {
    let observable = new Observable(
      (observer) => {
        this.socket.on('setOrign', (pos) => {
          this.drawOrigin = [pos.posX, pos.posY];
          observer.next();
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );
    return observable;
  }
  setRoomObsverble() {
    let observable = new Observable(
      (observer) => {
        this.socket.on('setRoom', (room) => {
          this.roomID = room;
          observer.next();
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );
    return observable;
  }
  countdownObsverble() {
    let observable = new Observable(
      (observer) => {
        this.socket.on('setTimer', (time:number) => {
          this.countdownTime = time;
          observer.next(time);
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
          // console.log(this);
          // start drawing -> get start pos/ last pos and draw line (to avoid gaps between the mouse move event positons)
          this.context.beginPath();
          this.context.moveTo(this.drawOrigin[0], this.drawOrigin[1]);
          this.context.lineTo(pos.posX, pos.posY);
          this.drawOrigin = [pos.posX, pos.posY];
          this.context.stroke();

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
