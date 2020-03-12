let img;

var iso = 0;
var sat = 0;

var reset = false;
class Pixel{
    r = 0;
    b = 0;
    g = 0;
    iso = 0;
    saturation = 0;

    exportR = 0;
    exportB = 0;
    exportG = 0;


    constructor(r, g, b, iso, saturation) {
        this.r = r;
        this.b = b;
        this.g = g;
        this.iso = iso;
        this.saturation = saturation;
    }

    prepareForExport(){
        var colors = [this.r, this.g, this.b];

        for(let x = 0; x < colors.length; x++){
            colors[x] = colors[x]*this.saturation + this.iso;
            if(colors[x] > 255){
                colors[x] = 255;
            }
            if(colors[x] < 0){
                colors[x] = 0
            }
        }

        return colors;
    }


}


class imageSegment {
    x1 = 0;
    y1 = 0;

    x2 = 0;
    y2 = 0;

    delta = 0;

    acceptableTolerance = 99;

    render() {

    }
}
function preload(){
    img = loadImage('https://picsum.photos/id/1002/1920/1080');
    //img = loadImage('https://cors-anywhere.herokuapp.com/photos.smugmug.com/Assets/Scouting/n-93LwtP/Background/i-RnshQJ2/0/4d99517c/X5/francisco-ghisletti-CfMEecyNtHc-unsplash-X5.jpg');
}

function setup(){
    createCanvas(1920, 1080);
    img.loadPixels();
    reset = true;
    if(img.width < img.height){
        globalDelta = img.width;
    }
    else{
        globalDelta = img.height;
    }

}
function drawImage(delta){
    img.loadPixels();
    const d = pixelDensity();


    for (let x = 0; x < img.width; x += delta) {
        for (let y = 0; y < img.height; y += delta) {
            const i = 4 * d * (y * d * img.width + x);
            let pix = img.get(x, y);
            var pxl = new Pixel(red(pix), green(pix), blue(pix), iso, sat);
            [r, g, b] = pxl.prepareForExport();
            noStroke();
            fill(r, g, b);
            rect(x, y, delta, delta);
        }
    }
}

function updateISO(val){
    this.iso = val;
    this.reset = true;
    globalDelta = 500;
}

function updateSat(val){
    this.sat = val;
    this.reset = true;
    globalDelta = 500;
}
var globalDelta = 500;
function draw(){
    console.log("DRAW)");

    // Progressive renders more
    //image(img, 0, 0, width, height);

    if(globalDelta <= 1 || reset){
        noLoop();
    }else{
        reset = false
        drawImage(globalDelta);
        globalDelta = globalDelta/2;
    }


}
