function onPageLoad() 
{
	
}

var queryString = window.location.search;
var params = new URLSearchParams(queryString);
var FirstName = params.get("fname");
var SecondName = params.get("lname");
var weaponOfChoice = params.get("TYPE");

var playerhealth = 100;
var enemyHealth = 100;
var healAmount = 25; 
var gameover = false;

function WelcomeText() 
{
	document.getElementById("WelcomeName").innerHTML = "Welcome : " + FirstName + " " + SecondName;
	document.getElementById("HUD").innerHTML = "Class: " + weaponOfChoice;
}

// get a handle to the canvas context
var canvas = document.getElementById("game");
// get 2D context for this canvas
var context = canvas.getContext("2d");
context.font = "25px Comic Sans MS";


var playerChar = new Image();
var EnemyChar = new Image();
var BGImage = new Image();

playerChar.src = "./Img/stickman.png";
EnemyChar.src = "./Img/Enemy stickman.png";
BGImage.src = "./Img/WinScreen.png";

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

function FirstAttackButton()
{
	if(enemyHealth > 0)
	{
		enemyHealth = enemyHealth - 10;
		playerhealth = playerhealth - 5;
	}
}

function SecondAttackButton()
{
	if(enemyHealth > 0)
	{
		enemyHealth = enemyHealth - 20;
		playerhealth = playerhealth - 10;
	}
}

function ThirdAttackButton()
{
	if(enemyHealth > 0)
	{
		enemyHealth = enemyHealth - 30;
		playerhealth = playerhealth - 15;
	}
}

function DownbuttonOnClick(){
}

function ButtonUp(){
}

function update()
{
	if(enemyHealth < 1)
	{
		gameover = true;
	}
}

function drawPlayerHealthbar()
{
  var width = 300;
  var height = 50;
  var max = 100;
  var val = playerhealth;

  // Draw the fill
  context.fillStyle = "#00FF00";
  var fillVal = Math.min(Math.max(val / max, 0), 1);
  context.fillRect(550,625, fillVal * width, height);
}

function drawEnemyHealthbar()
{
  var width = 300;
  var height = 50;
  var max = 100;
  var val = enemyHealth;

  // Draw the fill
  context.fillStyle = "#FF0000";
  var fillVal = Math.min(Math.max(val / max, 0), 1);
  context.fillRect(25,25, fillVal * width, height);

}

// Draw GameObjects to Console
// Modify to Draw to Screen
function draw()
{
	context.clearRect(0, 0, canvas.width, canvas.height);

	if(gameover === false)
	{
		context.drawImage(playerChar,500,300);
		
		context.drawImage(EnemyChar,0,25);
		
		context.fillStyle = "red";
		context.fillText("Enemy Health:", 25, 100);
		context.fillStyle = "#00FF00";
		context.fillText("Player Health:", 550, 600);
		context.fillText("Heal Amount: " + healAmount, 550, 550);
		drawPlayerHealthbar();
		drawEnemyHealthbar();
	}
	else
	{
		context.drawImage(BGImage,0,0);
	}
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

function HealButton()
{
	if(playerhealth + healAmount < 100)
	{
		playerhealth = playerhealth + healAmount;
		
		if(healAmount > 4){
			healAmount = healAmount - 5;
		}
	}
}

// Handle Active Browser Tag Animation
window.requestAnimationFrame(gameloop);

WelcomeText();