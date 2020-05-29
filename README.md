
# Garabato

## Project Members:  
Carlos Paz - S1910629008  
Matteo Prock - S1910629019  
Maurice Sporn - S1910629012  

## Project Idea:

We want to create a small Pictionary application in angular. This would include a canvas for people  
to draw in, a chat which allows players to communicate with each other and type in their guesses  
and some sort of database/ storage to store the words people have to draw.  
You will be able to join a game once you logged in with a username, the connection would be  
handled with web sockets.  

Game Instruction:  
Once there are at least 2 people in the chat the game can start (e.g. pressing a button). Then one  
player will be randomly selected – it is his/ her turn to draw this round. He/ She will be able to select  
a word from 3 words randomly selected from the database – this is the word that other people have  
to guess.  
Now the canvas is enabled, and people can type in their guesses in the chat – each chat entry is  
compared with the word chosen by the artist. Once you guessed the correct a word a message will  
pop, telling you how many points you got (depending on the time you took to guess the correct  
word/ how many players got it before you). Once everybody got the correct answer or the time ran  
out the next artist will be chosen, and the game continues.

## How it works:
- Register or login with "user" & "123456" to get access to the app
- Type in a room and join
- Open a second client browser, register/login & join the same room 
- The players can send and receive messages in real time
- With at least two players in the room, the game can be started by pressing the "Start next round" button
- A random player gets chosen to draw the word that is displayed only to him. Also, only for him the canvas and the clear canvas button is    enabled. The other players have to guess the word
- If a guessing player enters the correct word in chat, the game is over and a new round can be started
- This can be repeated as many rounds as the players want to - Have fun! 

# Garabato

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.3.

## Development server

Navigate into the `client folder` and run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Socket.IO

Navigate into the `server folder` and run `npm start`. Make sure socket.io is installed. 

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
