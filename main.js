Webcam.attach("camera");

Webcam.set({
    width: 350,
    height: 310,
    image_format: "png",
    png_quality: 90,
});

var classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/ydThoMq64/model.json', modelLoaded)

function modelLoaded() {
    console.log("Model Loaded Correctly")
}

function takePicture() {
    Webcam.snap(function(dataURI) {
        document.getElementById("result").innerHTML = "<img id='capturedImg'src='" + dataURI + "'>"
    });
}


function check() {
    img = document.getElementById("capturedImg")
    classifier.classify(img, gotResults)
}

function gotResults(error, results) {
    if (error) {
        console.log(error)
    } else {
        console.log(results)
        mask = results[0].label

        if (mask == "NoMask") {
            document.getElementById('emoji').innerHTML = "&#9940;"
            document.getElementById('maskName').innerHTML = 'You can Not enter the building until you wear a mask'
        } else if (mask == "ImproperMask") {
            document.getElementById('emoji').innerHTML = "&#9940;"
            document.getElementById('maskName').innerHTML = 'You can Not enter the building until you fix your mask'
        } else {
            document.getElementById('emoji').innerHTML = "&#9989;"
            document.getElementById('maskName').innerHTML = 'You can enter the Building'
        }
    }
}