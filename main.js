img="";
status="";
object=[];
alarm = "";

function setup(){
    canvas=createCanvas(380, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function preload(){
    alarm = loadSound("alert.mp3");
}

function draw(){
    image(video, 0, 0, 380, 380);
    
    if(status != ""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video, gotResults);
        for(i=0; j<object.length; i++){
            document.getElementById("status").innerHTML="Status: Baby Detected";
            document.getElementById("baby_found").innerHTML="Baby found.";

            fill(r, g, b);
            percent=floor(object[j].confidence * 100);
            text(object[j].label + " " + percent + "%", object[j].x + 15, object[j].y + 15);
            noFill();
            stroke(r, g, b);
            rect(object[j].x, object[j].y, object[j].width, object[j].height);
        }

    } else{
        document.getElementById("baby_found").innerHTML="Baby not found.";
        playAlarm();
    }
}
function playAlarm(){
    alarm.play(); 
    alarm.setVolume(1);
    alarm.rate(1);  
}
function modelLoaded(){
    console.log("Model has been loaded");
    status=true;
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results); 
        object=results;
    }
 
}
