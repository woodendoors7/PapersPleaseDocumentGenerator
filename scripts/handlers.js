let dropZone = document.getElementById("dropZone")
let loadedFirst = false;
console.log(document.fonts.ready)
document.fonts.onloadingdone = checkLoaded
img.onload = checkLoaded
if (img.complete) { console.log("image is complete!"); checkLoaded() }

function checkLoaded() {
    console.log("checked loaded")
    if (loadedFirst) return setTimeout(() => {
        averageColors();
    }, 1000);
    loadedFirst = true;
}

function dropHandler(event) {
    event.preventDefault();

    let file = event.dataTransfer.files[0]
    console.log(file)

    if (file.type.match('image.*')) {
        var reader = new FileReader();
        reader.onload = function (event) {
            var img = new Image();
            img.src = event.target.result;
            img.style.maxWidth = "200px";
            img.style.maxHeight = "200px";
            img.id = "dropImage";
            dropZone.innerHTML = "";
            dropZone.appendChild(img);
            bigImage = new Image();
            console.log("new big image!")
            bigImage.src = event.target.result;
            bigImage.onload = averageColors
        };
        reader.readAsDataURL(file);
    }
}

function dragOverHandler(event) {
    event.preventDefault()

}


function averageColors() {
    if (!bigImage) {
        console.log(bigImage)
        console.log("no big image!")
        averaged = null;
        return renderNormal()
    }
    let img = bigImage
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    let width = canvas.width;
    let height = canvas.height

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
        imageData.data[i] = gray * (242 / 255); // red
        imageData.data[i + 1] = gray * (228 / 255); // green
        imageData.data[i + 2] = gray * (224 / 255); // blue
    }

    ctx.putImageData(imageData, 0, 0);
    let img2 = new Image()

    img2.src = canvas.toDataURL();
    averaged = img2;

    img2.addEventListener("load", renderNormal)
}


function clearImage() {
    let img = document.getElementById("dropImage")
    if (!img) return;
    img.remove();
    bigImage = null;
    averageColors();
}

function clearStamps() {
    stamps = [];
    renderNormal();
}

function clearEverything() {
    for (let i = 0; i < arrOfElementsToListenTo.length; i++) {
        const element = arrOfElementsToListenTo[i];
        element.value = "";
    }
    clearStamps();
    clearImage();
    renderNormal()
}

function setupChangeListeners() {
    for (let i = 0; i < arrOfElementsToListenTo.length; i++) {
        const element = arrOfElementsToListenTo[i];
        element.addEventListener("input", renderNormal)
    }
}

setupChangeListeners();


function issuePass() {
    issueButton.style.display = "none";
    loadingButton.style.display = "block"
    loadingButton.disabled = true

    const img = canvas.toDataURL('image/png')
    hideThis.style.display = "none"
    unhideThis.style.display = "block"
    passImg.src = img;
}



let startTimeout;

function download() {
    clearInterval(blinkInterval)
    clearInterval(startTimeout)
    downloadElem.style.backgroundImage = "url('../img/downloadDone.png')"
    startTimeout = setTimeout(() => {
        startBlinking()
    }, 2000);

    buttonDrop.currentTime = 0;
    buttonDrop.play();

    const img = canvas.toDataURL('image/png')

    var link = document.createElement("a");
    link.download = name.value + " - Papers Please (floppa·hair)";
    link.href = img;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    link.remove();
}






let toggleHaha = false;

let blinkInterval;

function startBlinking() {
    blinkInterval = setInterval(() => {
        if (toggleHaha) {
            downloadElem.style.backgroundImage = "url('img/downloadUnpressed.png')"
        }
        else {
            downloadElem.style.backgroundImage = "url('img/downloadPressed.png')"
        }


        toggleHaha = !toggleHaha
    }, 500);
}
startBlinking()

downloadElem.click();



downloadElem.onclick = download;


unhideThis.style.display = "none"


function dataURLToBlob(dataURL) {
    var parts = dataURL.split(';base64,');
    var contentType = parts[0].split(':')[1];
    var byteString = atob(parts[1]);
    var arrayBuffer = new ArrayBuffer(byteString.length);
    var uint8Array = new Uint8Array(arrayBuffer);
    for (var i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: contentType });
}