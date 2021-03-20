function onPageLoad() 
{
	
}

var queryString = window.location.search;
var params = new URLSearchParams(queryString);
var FirstName = params.get("fname");
var SecondName = params.get("lname");
var weaponOfChoice = params.get("TYPE");

function WelcomeText() 
{
	document.getElementById("WelcomeName").innerHTML = "Welcome : " + FirstName + " " + SecondName;
	document.getElementById("HUD").innerHTML = "Class: " + weaponOfChoice;
}

// get a handle to the canvas context
var canvas = document.getElementById("game");
// get 2D context for this canvas
var context = canvas.getContext("2d");

//diffrent button on mouse up event listiners
document.getElementById("FirstAttackButton").onmouseup = function() {ButtonUp()};
document.getElementById("SecondAttackButton").onmouseup = function() {ButtonUp()};
document.getElementById("ThirdAttackButton").onmouseup = function() {ButtonUp()};
document.getElementById("HealButton").onmouseup = function() {ButtonUp()};

document.getElementById("FirstAttackButton").addEventListener("touchstart", FirstAttackButton, {passive: true});
document.getElementById("FirstAttackButton").addEventListener("touchend", ButtonUp);

document.getElementById("SecondAttackButton").addEventListener("touchstart", SecondAttackButton, {passive: true});
document.getElementById("SecondAttackButton").addEventListener("touchend", ButtonUp, {passive: true});

document.getElementById("ThirdAttackButton").addEventListener("touchstart", ThirdAttackButton, {passive: true});
document.getElementById("ThirdAttackButton").addEventListener("touchend", ButtonUp, {passive: true});

document.getElementById("HealButton").addEventListener("touchstart", HealButton, {passive: true});
document.getElementById("HealButton").addEventListener("touchend", ButtonUp, {passive: true});

var mySound = document.getElementById("sound");   

function FirstAttackButton(){
}

function SecondAttackButton(){
}

function ThirdAttackButton()
{
}

function DownbuttonOnClick(){
}

function ButtonUp(){
}

function update()
{
	
}

// Draw GameObjects to Console
// Modify to Draw to Screen
function draw()
{
    
}
//gameplay loop
function gameloop()
{
    update();
    draw();
    window.requestAnimationFrame(gameloop);
}

//function for playing audio
function playButtonClick()
{
	//if sound is finished, play
	if(mySound.paused)
	{
		mySound.play();
	}
	//else if not finished reset to start of audio 
	else
	{
		mySound.currentTime = 0;
	}
}

// Handle Active Browser Tag Animation
window.requestAnimationFrame(gameloop);

WelcomeText();