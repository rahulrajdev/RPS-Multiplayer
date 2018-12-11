var config = {
    apiKey: "AIzaSyCK4KAlcALlGAL_1faygFcmIvCZztRquDQ",
    authDomain: "rps-multiplayer17.firebaseapp.com",
    databaseURL: "https://rps-multiplayer17.firebaseio.com",
    projectId: "rps-multiplayer17",
    storageBucket: "rps-multiplayer17.appspot.com",
    messagingSenderId: "20705168994"
  };

firebase.initializeApp(config);

var database = firebase.database();
var playerNum = 0;
var player1move;
var player2move;
var playerNumForChat = 0;

//Adding player 1 and player 2. Player 1 is the first player that enters a nane
//Once they enter their name, variable PlayerNum increases by 1 to indicate that Player 1 has entered the game.
//After a second name has been entered, variable PlayerNum increases to 2 to indicate that Player 2 has entered the game.
$("#name-input-player-submit").on("click", function(event) {
    event.preventDefault();
    
    var playerName = $("#name-input-player").val().trim();
    playerNum++;


    database.ref("/players").push({
        playerName: playerName,
        playerNum: playerNum
    });

});


//Here, we are monitoring changes to the database valyes of playerName and playerNum. Once these variables change,
//we run certain code depending on how many players there are. Because we incremented playerNum each time a new player entered
//their name, this will tell us when we have 1 or 2 players entered. Once this is known, we can implement certain code to happen based
//on if-else statements.
database.ref("players").on("child_added", function(snapshot) {
    
    playerName = snapshot.val().playerName;
    playerNum = snapshot.val().playerNum;


    if (playerNum === 2) {
        $("#name-input-player").hide();
        $("#name-input-player-submit").hide();
        $("#waiting-for-player").text("");
        $("#welcome-player").text("Welcome " + playerName + "!");
        $("#player2Display").text("Player 2: " + playerName);
        setTimeout (function () {$("#welcome-player").text(""); }, 1500);
        setTimeout (function () {$("#who-wins-display").text("Rock"); }, 2500);
        setTimeout (function () {$("#who-wins-display").text("Paper"); }, 3500);
        setTimeout (function () {$("#who-wins-display").text("Scissors"); }, 4500);
        setTimeout (function () {$("#who-wins-display").text("1!"); }, 5500);
        setTimeout (function () {$("#who-wins-display").text("2!"); }, 6500);
        setTimeout (function () {$("#who-wins-display").text("3!"); }, 7500);
        setTimeout (function () {$("#who-wins-display").text("GO!"); }, 8500);
    } else if (playerNum === 1) {
        $("#welcome-player").text("Welcome " + playerName + "!");
        $("#player1Display").text("Player 1: " + playerName);
        $("#waiting-for-player").text("Waiting for Player 2");
        setTimeout (function () {$("#welcome-player").text(""); }, 1500);
    }


}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});


//These lines of code update the database for Player 1 and Player 2's moves. 
$("#player1Rock").on("click", function() {
    player1move = "Rock";

    database.ref("player1move").push({
        p1move: player1move
    });
});

$("#player1Paper").on("click", function() {
    player1move = "Paper";

    database.ref("player1move").push({
        p1move: player1move
    });
});

$("#player1Scissors").on("click", function() {
    player1move = "Scissors";

    database.ref("player1move").push({
        p1move: player1move
    });
});

$("#player2Rock").on("click", function() {
    player2move = "Rock";

    database.ref("player2move").push({
        p2move: player2move
    });
});

$("#player2Paper").on("click", function() {
    player2move = "Paper";

    database.ref("player2move").push({
        p2move: player2move
    });
});

$("#player2Scissors").on("click", function() {
    player2move = "Scissors";

    database.ref("player2move").push({
        p2move: player2move
    });
});

//For value monitoring for the player moves, we have to use two separate snapshot snippets because we are monitoring two 
//player's moves. If we used only one, one player's moves would evaluate to undefined each time the other player chose a new move.
database.ref("player1move").on("child_added", function(snapshot){

    player1move = snapshot.val().p1move;


}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});

database.ref("player2move").on("child_added", function(snapshot){

    
    player2move = snapshot.val().p2move;


    if (player1move === "Rock" && player2move === "Paper") {
        $("#who-wins-display").text("Player 2 Wins!");
        setTimeout (function () {$("#who-wins-display").text(""); }, 2000);
    } else if (player1move === "Rock" && player2move === "Scissors") {
        $("#who-wins-display").text("Player 1 Wins!");
        setTimeout (function () {$("#who-wins-display").text(""); }, 2000);
    } else if (player1move === "Paper" && player2move === "Rock") {
        $("#who-wins-display").text("Player 1 Wins!");
        setTimeout (function () {$("#who-wins-display").text(""); }, 2000);
    } else if (player1move === "Paper" && player2move === "Scissors") {
        $("#who-wins-display").text("Player 2 Wins!");
        setTimeout (function () {$("#who-wins-display").text(""); }, 2000);
    } else if (player1move === "Scissors" && player2move === "Rock") {
        $("#who-wins-display").text("Player 2 Wins!");
        setTimeout (function () {$("#who-wins-display").text(""); }, 2000);
    } else if (player1move === "Scissors" && player2move === "Paper") {
        $("#who-wins-display").text("Player 1 Wins!");
        setTimeout (function () {$("#who-wins-display").text(""); }, 2000);
    }

}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});

//Code so far
//Have the ability to have only two people enter the game. Each player can pick a move, and the middle display updates
//with who wins

//Code to add
//Need to clear moves after first game (reset);
//Monitor disconnects and update the html accordingly
//Add chatbox functionality

$("#chat-input-submit").on("click", function(event) {
    event.preventDefault();

    var playerchat = $("#chat-input").val().trim();

    database.ref("/chats").push({
        playerchat: playerchat
    });
});

database.ref("chats").on("value", function(snapshot) {


    var chats = snapshot.val();

    var chatObject = Object.keys(chats);

    console.log(chatObject);
});

// var connectionsRef = database.ref("/connections");

// // '.info/connected' is a special location provided by Firebase that is updated
// // every time the client's connection state changes.
// // '.info/connected' is a boolean value, true if the client is connected and false if they are not.
// var connectedRef = database.ref(".info/connected");

// // When the client's connection state changes...
// connectedRef.on("value", function(snap) {

//   // If they are connected..
//   if (snap.val()) {

//     // Add user to the connections list.
//     var con = connectionsRef.push(true);
//     var conplayer = database.ref("players").push(true);
//     // Remove user from the connection list when they disconnect.
//     con.onDisconnect().remove();
//     conplayer.onDisconnect().remove();
//   }
// });







  
 