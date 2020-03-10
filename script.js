let img;

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
function preload(){
    img = loadImage('https://picsum.photos/id/1002/1920/1080');
    //img = loadImage('https://cors-anywhere.herokuapp.com/photos.smugmug.com/Assets/Scouting/n-93LwtP/Background/i-RnshQJ2/0/4d99517c/X5/francisco-ghisletti-CfMEecyNtHc-unsplash-X5.jpg');
}

function setup(){
    createCanvas(1920, 1080);
}
function draw(){
    //image(img, 0, 0, width, height);
    img.loadPixels();
    const d = pixelDensity();

    var delta = 5;
    for (let x = 0; x < img.width; x+= delta) {
        for (let y = 0; y < img.height; y+=delta) {
            const i = 4 * d*(y * d*img.width + x);
            let pix = img.get(x,y);
            var pxl = new Pixel(red(pix), green(pix), blue(pix), -50, 1);
            [r, g, b]=pxl.prepareForExport();
            noStroke();
            fill(r, g, b);
            rect(x, y, delta, delta);


        }
    }
console.log("DONE");
    noLoop();

}
