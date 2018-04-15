
	// JavaScript code goes here

    // Global Variable
   
    var flag,count=0;
    var c,r;

    //Getting Canvas element which is required to draw graphics
    var canvas = document.getElementById("myCanvas");
    // getContext() provides required object which gives methods and properties to draw on the canvas
    // Here we are using 2d object
    //cordinate variables
    var ctx = canvas.getContext("2d");
    var x = canvas.width/2;
    var y = canvas.height-30;
    var dx = 2;
    var dy = -2;
    //interval variables
    var intVal,padIntVal,ballRadius=10;
    //paddle variables
    var paddleHeight = 10;
    var paddleWidth = 75;
    var paddleX = (canvas.width-paddleWidth)/2;
    //keyboard variables
    var leftPressed = false;
    var rightPressed = false;
    //bricks variables goes here
    var brickRow = 3;
    var brickColumn = 5;
    var brickHeight = 20;
    var brickWidth = 75;
    var offsetTop=30;
    var offsetLeft=30;
    var space = 10;
    var bricks = [];
    

    // global variables end here
    // building bricks
    for( c =0;c<brickColumn;c++){
        bricks[c] = [];
        for(r=0;r<brickRow;r++){
            bricks[c][r] = {x:0,y:0};
        }
    }
    
    // draw canvas
    function draw(){
        // Clears the specified pixels(x,y) within a given rectangle
        ctx.clearRect(0, 0, canvas.width, canvas.height);
       
        drawBricks();
        dragBall();
        drawPaddle();
        if(x+dx<0 || x+dx<ballRadius||x+dx >canvas.width-ballRadius){
            dx = -dx;
        }
        if(y+dy<0 || y+dy<ballRadius){
            dy = -dy;
        }
        else if(y+dy>canvas.height-ballRadius ){
            if(x > paddleX && x < paddleX+ paddleWidth){
                dy=-dy;
                count++;
            }
            else{
                //alert("Game Over");
                document.getElementById("score").textContent=count
                document.location.reload();
                console.log("count"+count);
            } 
        }
        x += dx;
        y += dy;
        console.log("x"+ x );
        console.log("y"+ y );

        if(rightPressed && paddleX < canvas.width-paddleWidth) {
                paddleX += 7;
                }
        else if(leftPressed && paddleX >0 ) {
                paddleX -= 7;
            }
    }


    //Drawing bricks


    function drawBricks(){
       
        for( c=0;c<brickColumn;c++)
        {
            for(r=0;r<brickRow;r++){
                var brickX = (c*(brickWidth+space))+offsetLeft;
                var brickY = (r*(brickHeight+space))+offsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                // bricks[i][j].x=0;
                // bricks[i][j].y=0;
                ctx.beginPath();
                ctx.rect(brickX,brickY,brickWidth,brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
         }
         

    }


    // Drawing Ball


     function dragBall(){
        ctx.beginPath();
        // Adding arc
        // ctx.arc(x, y, radius, startAngle, endAngle [, anticlockwise]);
        ctx.arc(x,y,ballRadius,0,Math.PI*2);
        ctx.fillStyle= "#0095DD";
        ctx.fill();
        ctx.closePath();
    }


    // Drawing Paddle


    function drawPaddle(){
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle= "#0095DD";
        ctx.fill();
        ctx.closePath();
        console.log("Paddle coordinates"+paddleX + canvas.height-paddleHeight)
    }
    // Eventlistener for keyboard keys
    document.addEventListener("keydown",keyDownHandler);
    document.addEventListener("keyup",keyupHandler);

    function keyDownHandler(e){
        if(e.keyCode == 39){
            rightPressed = true;
        }
        if(e.keyCode == 37){
            leftPressed = true;
        }
    }
    function keyupHandler(e) {
        if(e.keyCode == 39) {
        rightPressed = false;
        }
        else if(e.keyCode == 37){
            leftPressed = false;
            }
    }
     
     
    // Startingpoint
    function stop(){
        
        clearInterval(intVal);
        clearInterval(padIntVal);
    
    }
    function start(){
        intVal = setInterval(draw, 10);
    }
    