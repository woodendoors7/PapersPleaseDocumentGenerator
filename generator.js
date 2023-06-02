let cities = [
    "Orvech Vonor",
    "East Grestin",
    "Paradizna"
]

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

let sexStringes = [
    "M",
    "F",
    "never"
]

let bigImage = new Image();

function generate() {
    iss.value = cities[rand(0, 2)]
    let sexStringChance = rand(0, 100)
    let sexString = ""
    if (sexStringChance < 45) sexString = "M"
    else if (sexStringChance < 90) sexString = "F"
    else if (sexStringChance < 100) sexString = "never"
    console.log(sexStringChance)
    console.log(sexString)
    sex.value = sexString;

    let val1 = generateString(5)
    let val2 = generateString(5)
    console.log(val1)
    passid.value = val1 + "-" + val2
    console.log(`${rand(1, 31).toString()}.${rand(1, 12).toString()}.${rand(1900, 2023).toString()}`)
    dob.value = `${rand(1, 31).toString()}.${rand(1, 12).toString()}.${rand(1900, 2023).toString()}`
    exp.value = `${rand(1, 31)}.${rand(1, 12)}.${rand(1900, 2023)}`

    if (sexString == "never") sexString = sexStringes[rand(0, 1)]

    if (sexString == "M") {
        let selectedName = males[rand(0, males.length)]
        selectedName = selectedName.split(" ")
        selectedName = selectedName[1] + ", " + selectedName[0]
        name.value = selectedName
        let random = rand(1, 5)
        bigImage.src = `img/man${random}.png`
        dropImage.src = `img/man${random}.png`
    } else if (sexString == "F") {
        let selectedName = females[rand(0, females.length)]
        selectedName = selectedName.split(" ")
        selectedName = selectedName[1] + ", " + selectedName[0]
        name.value = selectedName
        let random = rand(1, 4)
        bigImage.src = `img/woman${random}.png`
        dropImage.src = `img/woman${random}.png`
    }

    dropImage.onload = () => {
        document.head.innerHTML += `    <script src="script.js" defer></script>
    <script src="handlers.js" defer></script>`
        document.getElementById("settingsDiv").style.display = "block";
    }

}
generate()


function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

function rand(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
