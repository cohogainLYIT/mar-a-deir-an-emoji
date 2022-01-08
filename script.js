const seanfhocalText = document.getElementById("seanfhocal_txt"),
boxingEmoji = document.getElementById("BOX"),
ireEmoji = document.getElementById("IRE"),
foxEmoji = document.getElementById("FOX")
pigEmoji = document.getElementById("PIG")
roadEmoji = document.getElementById("ROAD")
const onclickEvent = new Event('onclick')
const mouseoverEvent = new Event('mouseover')
const onfocusinEvent = new Event('onfocusin')

function showSeanfhocal(x){
    if (x == 0){
        console.log("clicked1")
        seanfhocalText.innerText = "Is minic a bhris béal duine a shrón."
    }else if (x == 1){
        console.log("clicked2")
        seanfhocalText.innerText = "Tír gan teanga, tír gan anam."
    }else if (x == 2){
        console.log("clicked3")
        seanfhocalText.innerText = "Ní mhealltar an sionnach faoi dhó."
    }
    else if (x == 3){
        console.log("clicked3")
        seanfhocalText.innerText = "Is iad na muca ciúine a itheann an mhin."
    }
    else if (x == 4){
        console.log("clicked4")
        seanfhocalText.innerText = "Is fada an bóthar nach bhfuil casadh ann."
    }
    else if (x == 5){
        console.log("clicked5")
        seanfhocalText.innerText = "An rud a scríobhann an púca, léann sé féin é."
    }
    else if (x == 6){
        console.log("clicked6")
        seanfhocalText.innerText = "Aithníonn ciaróg ciaróg eile."
    }
    else if (x == 7){
        console.log("clicked7")
        seanfhocalText.innerText = "Is fearr rith maith ná drochsheasamh."
    }
    else if (x == 8){
        console.log("clicked8")
        seanfhocalText.innerText = "Is glas iad na cnoic i bhfad uainn."
    }
    else if (x == 9){
        console.log("clicked8")
        seanfhocalText.innerText = "Is minic a bhí cú mhall sona."
    }
    

}

boxingEmoji.addEventListener("click", showSeanfhocal);
ireEmoji.addEventListener("click", showSeanfhocal);
foxEmoji.addEventListener("click", showSeanfhocal);
pigEmoji.addEventListener("click", showSeanfhocal);
roadEmoji.addEventListener("click", showSeanfhocal);