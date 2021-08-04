var time = 60;
var score = 0;
var finalResult = 0;
var countDown;

function functionGame()
{
    document.getElementById("timeRemaining").style.opacity = 100;
    if(document.getElementById("play").value == "Reset Game")
    {
        location.reload();
    }
    else
    {
        document.getElementById("play").value = "Reset Game";
        countDown = setInterval(function() {
            document.getElementById("time").innerHTML = `${time} sec`;
            if(time == 0)
            {
                document.getElementById("message").innerHTML = `Game over!<br>Your score is ${score}`;
                document.getElementById("message").style.opacity = 100;
                document.getElementById("timeRemaining").style.opacity = 0;
                clearInterval(countDown);
            }
            else
            {
                time--;
            }
        }, 1000);
        display();
    }
}

function display()
{
    var firstInt = Math.round(Math.random() * 10);
    var secondInt = Math.round(Math.random() * 10);
    finalResult = firstInt * secondInt;
    document.getElementById("screen").innerHTML = `${firstInt}x${secondInt}`;

    var wrongResultArray = new Array(4);
    for(var i = 1; i <= 4; i++)
    {
        var wrongResult = Math.round(Math.random() * 100);
        while(wrongResult == finalResult || wrongResultArray.includes(wrongResult)) //wrongResultArray.indexOf(wrongResult) >= 0 (!= -1)
        {
            wrongResult = Math.round(Math.random() * 100);
        }
        wrongResultArray.push(wrongResult);
        document.getElementById(`choice${i}`).value = wrongResult;
    }
    document.getElementById(`choice${Math.round(Math.random()*3) + 1}`).value = finalResult.toString();
}

function check(id)
{
    if(document.getElementById("play").value == "Start Game")
    {
        return;
    }
    
    var notification = document.getElementById("notification");
    if(parseInt(document.getElementById(`choice${id}`).value) == finalResult)
    {
        score++;
        document.getElementById("score").innerHTML = `${score}`;
        notification.innerHTML = "Correct";
        notification.style.backgroundColor = "#37CA4E";
        notification.style.boxShadow = "3px 3px #63C898";
        display();
    }
    else
    {
        notification.innerHTML = "Try again";
        notification.style.backgroundColor = "#ED4D18";
        notification.style.boxShadow = "3px 3px #BE8375";
    }

    var delay = setTimeout(function(){
        notification.style.opacity = "0";
    }, 1000);
    notification.style.opacity = "100";
}