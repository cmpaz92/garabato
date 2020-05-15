import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit {
  @Input() socket: any;
  @ViewChild('game')
  private gameCanvas: ElementRef;
  public context: any;
  public players: any[] = [];
  public player: any;
  public id: Number;

  public ngOnInit() {
    console.log(this.socket);
  }
  public ngAfterViewInit() {
    this.context = this.gameCanvas.nativeElement.getContext('2d');

    this.socket.on('heartbeat', (data) => {
      this.players = data;

      console.log('Client user: ' + this.player);
      console.log('All players: ' + this.players);

      for (let i = this.players.length - 1; i >= 0; i--) {
        if (this.players[i].id !== this.socket.id) {
          if (this.player.room == this.players[i].room) {
            this.context.fillStyle = 'red';
            this.context.fillRect(this.players[i].x, this.players[i].y, 20, 20);
            this.context.font = '10px Georgia';
            this.context.fillText(
              this.players[i].id,
              this.players[i].x,
              this.players[i].y
            );
          }
        }
      }
    });

    this.socket.on('createPlayer', (data: any) => {
      for (let i = data.length - 1; i >= 0; i--) {
        if (data[i].id == this.socket.id) {
          this.player = data[i];
          console.log(this.player);
          this.context.fillStyle = 'white';
          this.context.fillText(data[i].user, data[i].x, data[i].y);
          this.context.fillStyle = 'white';
          this.context.fillRect(data[i].x, data[i].y, 20, 20);
        }
      }
    });

    this.socket.on('deletePlayer', (data: any) => {
      for (let i = data.length - 1; i >= 0; i--) {
        if (data[i].id == this.socket.id) {
          this.context.clearRect(data[i].x, data[i].y, 20, 20);
        }
      }
    });

    this.socket.on('showNewPlayer', (data: any) => {
      for (let i = data.length - 1; i >= 0; i--) {
        if (data[i].id !== this.socket.id) {
          this.context.fillStyle = 'white';
          this.context.fillText(data[i].user, data[i].x, data[i].y);
          this.context.fillStyle = 'white';
          this.context.fillRect(data[i].x, data[i].y, 20, 20);
        }
      }
    });

    document.onkeydown = (e) => {
      let dir: string;
      if (e.keyCode === 39) dir = 'right';
      if (e.keyCode === 37) dir = 'left';
      if (e.keyCode === 38) dir = 'up';
      if (e.keyCode === 40) dir = 'down';
      this.send(dir, this.player);
    };

    this.socket.on('init', (data) => {
      console.log('We have a new client: ' + data);
    });
  }

  position(data) {
    this.context.clearRect(
      0,
      0,
      this.gameCanvas.nativeElement.width,
      this.gameCanvas.nativeElement.height
    );

    this.context.fillStyle = 'white';
    this.context.fillText(data.user, data.x, data.y);
    this.context.fillStyle = 'white';
    this.context.fillRect(data.x, data.y, 20, 20);
  }

  send(dir: String, data: any) {
    if (dir === 'left') {
      data.x = data.x - 20;
      this.position(data);
      this.socket.emit('move', data);
    }
    if (dir === 'right') {
      data.x = data.x + 20;
      this.position(data);
      this.socket.emit('move', data);
    }
    if (dir === 'up') {
      data.y = data.y - 20;
      this.position(data);
      this.socket.emit('move', data);
    }
    if (dir === 'down') {
      data.y = data.y + 20;
      this.position(data);
      this.socket.emit('move', data);
    }
  }
}
