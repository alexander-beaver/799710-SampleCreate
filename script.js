/**
 * A reference to the image
 */
let img;

/**
 * The iso (addition) for the image
 * @type {number}
 */
var iso = 0;

/**
 * The saturation (multiplication) for the image
 * @type {number}
 */
var sat = 1;

/**
 * Whether the code has been reset or not
 * @type {boolean}
 */
var reset = false;

/**
 * The class for decomposition of a pixel including modification calculation
 */
class Pixel{
    /**
     * The red value (0-255)
     * @type {number}
     */
    r = 0;
    /**
     * The blue value (0-255)
     * @type {number}
     */
    b = 0;
    /**
     * The green value (0-255)
     * @type {number}
     */
    g = 0;
    /**
     * The iso (addition) in the pixel
     * @type {number}
     */
    iso = 0;
    /**
     * The saturation (multiplication) in the pixel
     * @type {number}
     */
    saturation = 0;

    /**
     * The exported red
     * @type {number}
     */
    exportR = 0;

    /**
     * The exported blue
     * @type {number}
     */
    exportB = 0;

    /**
     * The exported green
     * @type {number}
     */
    exportG = 0;


    /**
     * Creates a new pixel based on data
     * @param r             red
     * @param g             green
     * @param b             blue
     * @param iso           addition
     * @param saturation    multiplication
     */
    constructor(r, g, b, iso, saturation) {
        this.r = r;
        this.b = b;
        this.g = g;
        this.iso = iso;
        this.saturation = saturation;
    }

    /**
     * Prepares a modified pixel in RGB
     * @returns {[number, number, number]}
     */
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

/**
 * A decomposition for a segment of the image
 * This is used for the subpixel rendering
 */
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

/**
 * Runs before the app is loaded
 *
 * Loads image
 */
function preload(){
    img = loadImage('./francisco-ghisletti-CfMEecyNtHc-unsplash.jpg');
    //img = loadImage('https://cors-anywhere.herokuapp.com/picsum.photos/id/1002/1920/1080');
    //img = loadImage('https://cors-anywhere.herokuapp.com/photos.smugmug.com/Assets/Scouting/n-93LwtP/Background/i-RnshQJ2/0/4d99517c/X5/francisco-ghisletti-CfMEecyNtHc-unsplash-X5.jpg');
}

/**
 * Runs as the app is loaded
 *
 * Starts the rendering
 */
function setup(){
    createCanvas(800, 550);
    img.loadPixels();
    reset = true;
    if(img.width < img.height){
        globalDelta = img.width;
    }
    else{
        globalDelta = img.height;
    }

}

/**
 * A CLI help for the functionality
 * @returns {null}
 */
function help(){
    console.log("Use the setISO(x) method to set the image iso (0-255)");
    console.log("Use the setSat(x) method to set saturation (> 0)");
    return(null);

}

/**
 * Draws an image
 * @param delta The size of the pixel
 */
function drawImage(delta){
    img.loadPixels();
    //console.log("drawing");
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

/**
 * Updates the ISO
 * @param val   ISO to set
 */
function setISO(val){
    this.iso = val;
    this.reset = true;
    globalDelta = 400;
}

/**
 * Updates the Saturation
 * @param val   Saturation to set
 */
function setSat(val){
    this.sat = val;
    this.reset = true;
    globalDelta = 400;
}

/**
 * The delta used for Subpixel rendering
 * @type {number}
 */
var globalDelta = 400;

/**
 * Handles rendering
 */
function draw(){

    // Progressive renders more
    //image(img, 0, 0, width, height);



    if (globalDelta > 2){ //Subpixel should render more
        drawImage(globalDelta);
        globalDelta = globalDelta/2;
    }

}
