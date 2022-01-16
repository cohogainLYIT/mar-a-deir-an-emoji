const seanfhocalText = document.getElementById("seanfhocal_txt"),
boxingEmoji = document.getElementById("BOX"),
ireEmoji = document.getElementById("IRE"),
foxEmoji = document.getElementById("FOX")
pigEmoji = document.getElementById("PIG")
roadEmoji = document.getElementById("ROAD")
const onclickEvent = new Event('onclick')
const mouseoverEvent = new Event('mouseover')
const onfocusinEvent = new Event('onfocusin')

seanfhocalText.innerText = "Roghnaigh emoji chun seanfhocal a thaispeáint. "
document.getElementById("quote_left").style.visibility='hidden'
document.getElementById("quote_right").style.visibility='hidden'

function showSeanfhocal(x){
    document.getElementById("quote_left").style.visibility='visible'
    document.getElementById("quote_right").style.visibility='visible'
    if (x == 0){
        console.log("clicked1")
        seanfhocalText.innerText = "Is minic a bhris béal duine a shrón."
        if (document.getElementById('abair_bt_activate_img').getAttribute('alt') == abair_bt_activate_text_alt){
            sendRequest({"text":seanfhocalText.innerText});
        }
    }else if (x == 1){
        console.log("clicked2")
        seanfhocalText.innerText = "Tír gan teanga, tír gan anam."
        if (document.getElementById('abair_bt_activate_img').getAttribute('alt') == abair_bt_activate_text_alt){
            sendRequest({"text":seanfhocalText.innerText});
        }
    }else if (x == 2){
        console.log("clicked3")
        seanfhocalText.innerText = "Ní mhealltar an sionnach faoi dhó."
        if (document.getElementById('abair_bt_activate_img').getAttribute('alt') == abair_bt_activate_text_alt){
            sendRequest({"text":seanfhocalText.innerText});
        }
    }
    else if (x == 3){
        console.log("clicked3")
        seanfhocalText.innerText = "Is iad na muca ciúine a itheann an mhin."
        if (document.getElementById('abair_bt_activate_img').getAttribute('alt') == abair_bt_activate_text_alt){
            sendRequest({"text":seanfhocalText.innerText});
        }
    }
    else if (x == 4){
        console.log("clicked4")
        seanfhocalText.innerText = "Is fada an bóthar nach bhfuil casadh ann."
        if (document.getElementById('abair_bt_activate_img').getAttribute('alt') == abair_bt_activate_text_alt){
            sendRequest({"text":seanfhocalText.innerText});
        }
    }
    else if (x == 5){
        console.log("clicked5")
        seanfhocalText.innerText = "An rud a scríobhann an púca, léann sé féin é."
        if (document.getElementById('abair_bt_activate_img').getAttribute('alt') == abair_bt_activate_text_alt){
            sendRequest({"text":seanfhocalText.innerText});
        }
    }
    else if (x == 6){
        console.log("clicked6")
        seanfhocalText.innerText = "Aithníonn ciaróg ciaróg eile."
        if (document.getElementById('abair_bt_activate_img').getAttribute('alt') == abair_bt_activate_text_alt){
            sendRequest({"text":seanfhocalText.innerText});
        }
    }
    else if (x == 7){
        console.log("clicked7")
        seanfhocalText.innerText = "Is fearr rith maith ná drochsheasamh."
        if (document.getElementById('abair_bt_activate_img').getAttribute('alt') == abair_bt_activate_text_alt){
            sendRequest({"text":seanfhocalText.innerText});
        }
    }
    else if (x == 8){
        console.log("clicked8")
        seanfhocalText.innerText = "Is glas iad na cnoic i bhfad uainn."
        if (document.getElementById('abair_bt_activate_img').getAttribute('alt') == abair_bt_activate_text_alt){
            sendRequest({"text":seanfhocalText.innerText});
        }
    }
    else if (x == 9){
        console.log("clicked8")
        seanfhocalText.innerText = "Is minic a bhí cú mhall sona."
        if (document.getElementById('abair_bt_activate_img').getAttribute('alt') == abair_bt_activate_text_alt){
            sendRequest({"text":seanfhocalText.innerText});
        }
    }
    

}

boxingEmoji.addEventListener("click", showSeanfhocal);
ireEmoji.addEventListener("click", showSeanfhocal);
foxEmoji.addEventListener("click", showSeanfhocal);
pigEmoji.addEventListener("click", showSeanfhocal);
roadEmoji.addEventListener("click", showSeanfhocal);