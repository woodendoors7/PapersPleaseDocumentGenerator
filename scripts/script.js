
async function renderNormal(toCache) {

    ctx.drawImage(img, 0, 0)

    if (averaged) ctx.drawImage(averaged, 96, 1176, 480, 576)

    ctx.font = "96px BMmini";
    ctx.fillStyle = "#574848";
    ctx.fillText(dob.value, 816, 1248);
    ctx.fillText(sex.value, 816, 1344);
    ctx.fillText(iss.value, 816, 1440);
    ctx.fillText(exp.value, 816, 1536);
    ctx.fillText(name.value, 96, 1128);
    ctx.fillText(passid.value, 96, 1848);

    ctx.font = "72px MiniKylie";
    ctx.fillStyle = "#A29490";
   // ctx.fillText("made with love", 1030, 1800 );
    ctx.fillText("by  floppa.hair", 1065, 1870);

    let width = canvas.width;
    let height = canvas.height

    generated = ctx.getImageData(0, 0, width, height);


    for (let i = 0; i < stamps.length; i++) {
        const e = stamps[i];
        console.log(e.stampNum)
        if (e.stampNum == 1)
            ctx.drawImage(grantedStamp, e.x, e.y);
        else if (e.stampNum == 2)
            ctx.drawImage(deniedStamp, e.x, e.y);
        else if (e.stampNum == 3)
            ctx.drawImage(deniedReason, e.x, e.y);
    }

    if (toCache == true) generated = ctx.getImageData(0, 0, width, height);

}

async function renderStamp() {
    ctx.putImageData(generated, 0, 0);

    if (stampNum == 1)
        ctx.drawImage(grantedStamp, (pos.x - grantedStamp.width / 2) / 2, (pos.y - grantedStamp.height / 2) / 2);
    else if (stampNum == 2)
        ctx.drawImage(deniedStamp, (pos.x - grantedStamp.width / 2) / 2, (pos.y - grantedStamp.height / 2) / 2);
    else if (stampNum == 3)
        ctx.drawImage(deniedReason, (pos.x - grantedStamp.width / 2) / 2, (pos.y - grantedStamp.height / 2) / 2);
}

canvas.addEventListener("click", (evt) => {
    if (!stampingMode) return;
    stampDown.currentTime = 0;
    stampDown.play();

    setTimeout(() => {
        stampUp.currentTime = 0;
        stampUp.play();
    }, 500);

    var mouseX = evt.offsetX * canvas.width / canvas.clientWidth | 0;
    var mouseY = evt.offsetY * canvas.height / canvas.clientHeight | 0;
    let pos = { x: mouseX * 2, y: mouseY * 2 }
    stamps.push({
        stampNum: stampNum,
        x: (pos.x - grantedStamp.width / 2) / 2,
        y: (pos.y - grantedStamp.height / 2) / 2
    })
    renderNormal(true);

})


let enabledInterval = false;

setInterval(() => {
    if (!stampingMode) return;
    if (!enabledInterval) return;
    renderStamp()
}, 8);

canvas.addEventListener("mousemove", function (evt) {
    if (!stampingMode) return;
    const canvasPosition = canvas.getBoundingClientRect();

    var mouseX = evt.offsetX * canvas.width / canvas.clientWidth | 0;
    var mouseY = evt.offsetY * canvas.height / canvas.clientHeight | 0;
    pos = { x: mouseX * 2, y: mouseY * 2 }

}, false);

canvas.addEventListener("mouseenter", function (evt) {
    if (!stampingMode) return;
    enabledInterval = true;
})

canvas.addEventListener("mouseleave", function (evt) {
    if (!stampingMode) return;
    enabledInterval = false;
    ctx.putImageData(generated, 0, 0);
})

let stampNum = 0;

async function toggleStamping() {
    if (stampingMode == false) {
        let width = canvas.width;
        let height = canvas.height
        generated = ctx.getImageData(0, 0, width, height);
    }

    if (stampNum == 3) { stampingMode = false; stampNum = 0; }
    else {
        stampingMode = true; stampNum++
    };

    if (stampNum == 0) {
        stampbarClose.currentTime = 0;
        stampbarClose.play()

        toggleButton.style.border = "3px solid black";
        toggleButton.style.color = "black";
        toggleButton.innerText = "Open Stamp Rack"
    }
    else if (stampNum == 1) {
        stampbarOpen.currentTime = 0;
        stampbarOpen.play()
        toggleButton.style.border = "3px solid #53701B";
        toggleButton.style.color = "#53701B";
        toggleButton.innerText = "Entry Granted"

    }
    else if (stampNum == 2) {
        stampbarOpen.currentTime = 0;
        stampbarOpen.play()
        toggleButton.style.border = "3px solid #701B1B";
        toggleButton.style.color = "#701B1B";
        toggleButton.innerText = "Entry Denied"

    }
    else if (stampNum == 3) {
        stampbarOpen.currentTime = 0;
        stampbarOpen.play()
        toggleButton.style.border = "3px solid #174463";
        toggleButton.style.color = "#174463";
        toggleButton.innerText = "Reason for Denial"

    }
}

canvas.addEventListener('contextmenu', event => event.preventDefault());