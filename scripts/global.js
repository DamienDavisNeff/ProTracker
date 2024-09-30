// Function to generate a random number between min and max
function random(min, max) {
    return Math.random() * (max - min) + min;
}

// gets the page aspect ratio
function getAspectRatio() {
    return reduceFraction(window.innerWidth,window.innerHeight);
}

// reduces fraction
function reduceFraction(numerator, denominator) {
    var gcd = function gcd(a,b) {
        return b ? gcd(b, a%b) : a;
    }; gcd = gcd(numerator,denominator);
    return [numerator/gcd,denominator/gcd];
}

// checks orientation
function IsPortrait() {
    if(window.innerHeight > window.innerWidth) return true;
}

// open link
function GoTo(url,target) {
    if(target === undefined) target = "_blank";
    window.open(url,target);
}

// check if an element is visible on the current view area
function IsVisible(element) {
    boundArea = element.getBoundingClientRect();
    isVisible = (
        boundArea.left >= 0 &&
        boundArea.right <= window.innerWidth &&
        boundArea.top >= 0 &&
        boundArea.bottom <= window.innerHeight
    ); return isVisible;
}