const canvas = document.getElementById("passportCanvas");
const ctx = canvas.getContext("2d");
const image = document.getElementById("passportPic")
const toggleButton = document.getElementById("stampMode");

let stampbarOpen = new Audio('../sounds/stampbar-open.wav')
let stampbarClose = new Audio('../sounds/stampbar-close.wav')
let stampUp = new Audio('../sounds/stamp-up.wav')
let stampDown = new Audio('../sounds/stamp-down.wav')
let buttonDrop = new Audio('../sounds/button-drop.wav')

stampbarOpen.volume = 0.3;
stampbarClose.volume = 0.3;

stampUp.volume = 0.5;
stampDown.volume = 0.5;

buttonDrop.volume = 0.8

const grantedStamp = new Image();
grantedStamp.src = '../img/grantedentry.png';
const deniedReason = new Image();
deniedReason.src = '../img/deniedreason.png';
const deniedStamp = new Image();
deniedStamp.src = '../img/deniedentry.png';
let stampingMode = false;
const img = new Image();
img.src = '../img/passport.png';



let generated;
let averaged;

let stamps = [];

let ran = false;

let dob = document.getElementsByName("dob")[0];
let sex = document.getElementsByName("sex")[0];
let iss = document.getElementsByName("iss")[0];
let exp = document.getElementsByName("exp")[0];
let name = document.getElementsByName("name")[0];
let passid = document.getElementsByName("passid")[0];

let issueButton = document.getElementById("issueButton")
let loadingButton = document.getElementById("loadingButton")
let niceProgress = document.getElementById("niceProgress")
let unhideThis = document.getElementById("unhideThis")
let hideThis = document.getElementById("hideThis")
let passImg = document.getElementById("passImg")

let downloadElem = document.getElementById('download')
let copyElem = document.getElementById('copy')

let arrOfElementsToListenTo = [
    dob, sex, iss, exp, name, passid
]

let dropImg = document.getElementById("dropImage")