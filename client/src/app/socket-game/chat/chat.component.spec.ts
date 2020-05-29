import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatComponent } from './chat.component';
import { SocketGameComponent } from '../socket-game.component';

describe('ChatComponent', () => {
  let chat;
  let chat2;
  let socketGame;

  beforeEach(() => {
    chat = new ChatComponent();
    chat2 = new ChatComponent();
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

  it('Send Message', (done) => {
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

  it('User joinend', (done) => {
    chat.socket = socketGame.socket;
    chat.user = "TestUserA";
    chat.room = "20";

    chat2.socket = socketGame.socket;
    chat2.user = "TestUserB";
    chat2.room = "20";

    chat.join();
    expect(chat.messageArray.length).toBe(0);
    chat2.join();
    expect(chat.messageArray[0].user).toBe("Server");
    expect(chat.messageArray[0].message).toBe(chat2.user + " has joined the room!");
    done();
  });

  it('User Left', (done) => {
    chat.socket = socketGame.socket;
    chat.user = "TestUserA";
    chat.room = "30";

    chat2.socket = socketGame.socket;
    chat2.user = "TestUserB";
    chat2.room = "30";

    chat.join();
    chat2.join();

    expect(chat2.messageArray[0].user).toBe("Server");
    expect(chat2.messageArray[0].message).toBe(chat.user + " has left the room...");
    done();
  });

  it('Start Game Message', (done) => {
    chat.socket = socketGame.socket;
    chat.user = "TestUserA";
    chat.room = "40";

    chat2.socket = socketGame.socket;
    chat2.user = "TestUserB";
    chat2.room = "40";

    chat.join();
    expect(chat.messageArray[0].user).toBe("Server");
    expect(chat.messageArray[0].message).toBe("Not enough players to start!");

    chat2.join();
    expect(chat2.messageArray[0].user).toBe("Server");
    expect(chat2.messageArray[0].message).toBe("Game has started");
    done();
  });
});
