song = "";

LWY = 0;
LWX = 0;


RWY = 0;
RWX = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload() {
    song = loadSound("STAY.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#ffd9c9");
    stroke("#ffd9c9");
    if (scoreRightWrist > 0.2) {


        circle(RWX, RWY, 20);
        if (RWY > 0 && RYW <= 100) {
            document.getElementById("speed").innerHTML = "Speed is 0.5x";
            song.rate(0.5);
        }
        if (RWY > 100 && RYW <= 200) {
            document.getElementById("speed").innerHTML = "Speed is 1x";
            song.rate(1);
        }
        if (RWY > 200 && RYW <= 300) {
            document.getElementById("speed").innerHTML = "Speed is 1.5x";
            song.rate(1.5);
        }
        if (RWY > 300 && RYW <= 400) {
            document.getElementById("speed").innerHTML = "Speed is 1.75x";
            song.rate(1.75);
        }
        if (RWY > 400 && RYW <= 500) {
            document.getElementById("speed").innerHTML = "Speed is 2x";
            song.rate(2);
        }
    }

    if (scoreLeftWrist > 0.2) {


        circle(LWX, LWY, 20);
        InNumberLeftWristY = Number(LWY);
        remove_decimals = floor(InNumberLeftWristY);
        volume = remove_decimals / 500;
        document.getElementById("volume").innerHTML = "volume = " + volume;
        song.setVolume(volume);
    }
}


function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
    console.log("its working so pay meeeeeeeeeeeeeeeeeeeeeee");
}

function gotPoses(results) {
    if (results.length > 0) {
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);

        console.log(results);
        LWX = results[0].pose.leftWrist.x;
        LWY = results[0].pose.leftWrist.y;
        console.log("LeftWristX" + LWX + "Left wrist y" + LWY);
        RWX = results[0].pose.rightWrist.x;
        RWY = results[0].pose.rightWrist.y;
        console.log("RightWristX" + RWX + "Right wrist y" + RWY);
    }


}