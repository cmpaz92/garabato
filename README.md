
# Garabato

## Project Members:  
Carlos Paz - S1910629008  
Matteo Prock - S1910629019  
Maurice Sporn - S1910629012  

## Project Idea:

We want to create a small Pictionary application in angular. This would include a canvas for people to draw in, a chat which allows players to communicate with each other and type in their guesses and some sort of database/storage to store the words people have to draw. You will be able to join a game once you logged in with a username, the connection would be handled with web sockets.  

## How it works:
- Register or login with "user" & "123456" to get access to the app
- Type in a room and join
- Open a second client browser, register/login & join the same room 
- The players can send and receive messages in real time
- With at least two players in the room, the game can be started by pressing the "Start next round" button
- A random player gets chosen to draw the word that is displayed only to him. Also, only for him the canvas and the clear canvas button is    enabled. The other players have to guess the word
- If a guessing player enters the correct word in chat, the game is over and a new round can be started
- This can be repeated as many rounds as the players want to - Have fun! 

## Build Instructions

**Project setup Frontend (Angular APP)**
Install dependencies
```
 "npm install"
```
Run the application with
```
 "npm run serve"
```

**Project setup Backend**
Install dependencies.
```
 "npm install"
```
Start the server with
```
 "npm start"
```

**Project setup Socket.io**
Install dependencies.
```
 "npm install"
```
Start the server with
```
 "npm start"
```

## Live project
**Netlify Link:**
```
https://brave-ramanujan-5ef68e.netlify.app/
```
