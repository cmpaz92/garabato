import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatComponent } from './chat.component';
import { SocketGameComponent } from '../socket-game.component';

describe('ChatComponent', () => {
  let chat;
  let socketGame;

  beforeEach(() => {
    chat = new ChatComponent();
  //  chat2 = new ChatComponent();
    socketGame = new SocketGameComponent();
  });

  it('Join/ leave room', (done) => {
    chat.socket = socketGame.socket;

    chat.user = "TestUser";
    chat.room = "10";
    chat.join();
    expect(chat.chatroom).toBe("10");
    chat.leave();
    expect(chat.chatroom).toBe(null);
    done();
  });

  it('send message', (done) => {
    chat.socket = socketGame.socket;
    chat.ngOnInit();

    chat.user = "TestUser";
    chat.room = "10";
    chat.join();
    chat.messageText = "Hi Test";
    expect(chat.messageArray.length).toBe(0);
    chat.sendMessageToChat();
    console.log(chat.messageArray);
    expect(chat.messageArray[0].user).toBe("TestUser");
    expect(chat.messageArray[0].message).toBe("Hi Test");
    done();
  });

  it('send message', (done) => {
    chat.socket = socketGame.socket;

    chat.user = "TestUser";
    chat.room = "10";
    chat.join();
    chat.messageText = "Hi Test";
    expect(chat.messageArray.length).toBe(0);
    chat.sendMessageToChat();
    console.log(chat.messageArray);
    expect(chat.messageArray[0].user).toBe("TestUser");
    expect(chat.messageArray[0].message).toBe("Hi Test");
    done();
  });

  it('User Left', (done) => {
    chat.socket = socketGame.socket;

    chat.user = "TestUser";
    chat.room = "10";
    chat.join();
    chat.messageText = "Hi Test";
    expect(chat.messageArray.length).toBe(0);
    chat.sendMessageToChat();
    expect(chat.messageArray[0].user).toBe("TestUser");
    expect(chat.messageArray[0].message).toBe("Hi Test");
    done();
  });

  it('Start Game Message', (done) => {
    chat.socket = socketGame.socket;

    chat.user = "TestUser";
    chat.room = "10";
    chat.join();
  //  chat2.user = "TestUserB"
  //  chat2.room = "10"
    chat.messageText = "Hi Test";
    expect(chat.messageArray.length).toBe(0);
    chat.sendMessageToChat();
    expect(chat.messageArray[0].user).toBe("TestUser");
    expect(chat.messageArray[0].message).toBe("Hi Test");
    done();
  });
});
