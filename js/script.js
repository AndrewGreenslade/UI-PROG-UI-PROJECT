function onPageLoad() 
{
	UpdateButtons();
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
var playersTurn = true;

var initial = new Date().getTime();
var current; // current time
var isTimeCaptured = false;

var EnemyAttackChoice = 0;
var PlayerChoiceRandomVal = 0;

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

var mySound = new Audio('./audio/ButtonPress.mp3');  
var BackgroundTrack = new Audio('./audio/BackgroundTrackFinal.mp3');  
var ArrowTrack = new Audio('./audio/ArrowFInal.mp3');
var MagicFireTrack = new Audio('./audio/MagicFinal.mp3');
var FistsTrack = new Audio('./audio/PunchFInal.mp3');
var SwordTrack = new Audio('./audio/Sword.wav');
var KnifeTrack = new Audio('./audio/Knife.wav');

function FirstAttackButton()
{
	if(playersTurn === true)
	{
		if(enemyHealth > 0)
		{
			playButtonClick(1);
			
			PlayerChoiceRandomVal = Math.floor((Math.random() * 100) + 1);
			
			if(PlayerChoiceRandomVal <= 75)
			{
				enemyHealth = enemyHealth - 10;
				document.getElementById("TurnHUD").innerHTML = "Enemy's Turn";
				playersTurn = false;
			}
			else
			{
				document.getElementById("TurnHUD").innerHTML = "You missed, Enemy's Turn";			
				playersTurn = false;
			}
		}
	}
}

function SecondAttackButton()
{
	if(playersTurn === true)
	{
		if(enemyHealth > 0)
		{
			playButtonClick(2);
			
			PlayerChoiceRandomVal = Math.floor((Math.random() * 100) + 1);

			if(PlayerChoiceRandomVal <= 50)
			{	
				enemyHealth = enemyHealth - 20;
				document.getElementById("TurnHUD").innerHTML = "Enemy's Turn";
				playersTurn = false;
			}
			else
			{
				document.getElementById("TurnHUD").innerHTML = "You missed, Enemy's Turn";			
				playersTurn = false;
			}
		}
	}
}

function ThirdAttackButton()
{
	if(playersTurn === true)
	{
		if(enemyHealth > 0)
		{
			if(weaponOfChoice === "Wizard")
			{
				playButtonClick(3);
			}
			else if (weaponOfChoice === "Archer")
			{
				playButtonClick(4);
			}
			else if (weaponOfChoice === "Swordsman")
			{
				playButtonClick(5);
			}
			
			PlayerChoiceRandomVal = Math.floor((Math.random() * 100) + 1);
			if(PlayerChoiceRandomVal <= 40)
			{
				enemyHealth = enemyHealth - 30;
				document.getElementById("TurnHUD").innerHTML = "Enemy's Turn";				
				playersTurn = false;
			}
			else
			{
				document.getElementById("TurnHUD").innerHTML = "You missed, Enemy's Turn";							
				playersTurn = false;
			}
		}
	}
}

function DownbuttonOnClick()
{
}

function ButtonUp()
{
	
}

function EnemyUpdate()
{
	EnemyAttackChoice = Math.floor((Math.random() * 5) + 1);
	
	if(EnemyAttackChoice === 1)
	{
		playerhealth = playerhealth - 5;
		document.getElementById("TurnHUD").innerHTML = "Your Turn";			
		playersTurn = true;
		isTimeCaptured = false;
	}
	else
	if(EnemyAttackChoice === 2)
	{
		playerhealth = playerhealth - 10;
		document.getElementById("TurnHUD").innerHTML = "Your Turn";			
		playersTurn = true;
		isTimeCaptured = false;
	}
	else
	if(EnemyAttackChoice === 3)
	{
		playerhealth = playerhealth - 15;
		document.getElementById("TurnHUD").innerHTML = "Your Turn";			
		playersTurn = true;
		isTimeCaptured = false;
	}
	else
	if(EnemyAttackChoice === 4)
	{
		if(enemyHealth <= 75)
		{
			enemyHealth = enemyHealth + 25;
			document.getElementById("TurnHUD").innerHTML = "Enemy Healed, Your Turn";			

		}
		else
		{
			document.getElementById("TurnHUD").innerHTML = "Your Turn";			
		}
		playersTurn = true;
		isTimeCaptured = false;
	}
	else
	if(EnemyAttackChoice === 5)
	{
		document.getElementById("TurnHUD").innerHTML = "Enemy Missed, Your Turn";			
		playersTurn = true;
		isTimeCaptured = false;
	}
	
	initial = current;
}


function update()
{
	if(playersTurn === false)
	{
		if(isTimeCaptured === false)
		{
			initial = 	new Date().getTime();
			isTimeCaptured = true;
		}
		
		current = new Date().getTime(); // update current
		
		if (current - initial >= 3000)
		{
			if(enemyHealth > 0)
			{
				EnemyUpdate();
			}
			

		}
	}

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
	context.textAlign = "left";

	
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
		
		if(playersTurn === false)
		{
			context.fillStyle = "#000000";
			context.textAlign = "center";
			context.fillText("ENEMYS TURN", 450,300 );
			context.fillText(Math.trunc(4 - ((current - initial) / 1000)), 450, 350);
		}
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
function playButtonClick(WhichClipArgs)
{
	if(WhichClipArgs === 1)
	{
		var playPromise = FistsTrack.play();
	}
	else if(WhichClipArgs === 2)
	{
		var playPromise = KnifeTrack.play();
	}
	else if(WhichClipArgs === 3)
	{
		var playPromise = MagicFireTrack.play();
	}
	else if(WhichClipArgs === 4)
	{
		var playPromise = ArrowTrack.play();
	}
	else if(WhichClipArgs === 5)
	{
		var playPromise = SwordTrack.play();
	}
}

//function for playing audio
function playBGTrack()
{
	var playPromise = BackgroundTrack.play();
	playPromise.loop = true;
}

//Update Button Text for  relivent info
function UpdateButtons()
{
	document.getElementById("FirstAttackButton").innerHTML = "Fists - 75% Hit - 5 Damage";
	document.getElementById("SecondAttackButton").innerHTML = "Dagger - 50% Hit - 15 Damage";
	document.getElementById("TurnHUD").innerHTML = "Your Turn";

	if(weaponOfChoice === "Wizard")
	{
		document.getElementById("ThirdAttackButton").innerHTML = "Fire Spell - 40% Hit - 25 Damage";
	}
	else if (weaponOfChoice === "Archer")
	{
		document.getElementById("ThirdAttackButton").innerHTML = "Bow Shot - 40% Hit - 25 Damage";
	}
	else if (weaponOfChoice === "Swordsman")
	{
		document.getElementById("ThirdAttackButton").innerHTML = "Sword swing - 40% Hit - 25 Damage";
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