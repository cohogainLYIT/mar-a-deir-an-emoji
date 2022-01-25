const seanfhocalText = document.getElementById("seanfhocal_txt"),
boxingEmoji = document.getElementById("BOX"),
ireEmoji = document.getElementById("IRE"),
foxEmoji = document.getElementById("FOX")
pigEmoji = document.getElementById("PIG")
roadEmoji = document.getElementById("ROAD")
counter = 0

seanfhocalText.innerText = "Roghnaigh emoji chun seanfhocal a thaispeáint. "
document.getElementById("quote_left").style.visibility='hidden'
document.getElementById("quote_right").style.visibility='hidden'

function showSeanfhocal(x){
    document.getElementById("quote_left").style.visibility='visible'
    document.getElementById("quote_right").style.visibility='visible'
    if (x == 0){
        seanfhocalText.innerText = "An donas amach is an sonas isteach."
        if (document.getElementById('abair_bt_activate_img').getAttribute('alt') == abair_bt_activate_text_alt){
            sendRequest({"text":seanfhocalText.innerText});
        }
    }else if (x == 1){
        seanfhocalText.innerText = "Go raibh gáire do chairde mar cheol leat,  a gcairdeas ceol ó Neamh."
        if (document.getElementById('abair_bt_activate_img').getAttribute('alt') == abair_bt_activate_text_alt){
            sendRequest({"text":seanfhocalText.innerText});
        }
    }else if (x == 2){
        seanfhocalText.innerText = "Gáire maith agus codladh fada, an dá leigheas is fearr i leabhar an dochtúra."
        if (document.getElementById('abair_bt_activate_img').getAttribute('alt') == abair_bt_activate_text_alt){
            sendRequest({"text":seanfhocalText.innerText});
        }
    }
    else if (x == 3){
        seanfhocalText.innerText = "Síleann fear na buile gurb é féin fear na céille."
        if (document.getElementById('abair_bt_activate_img').getAttribute('alt') == abair_bt_activate_text_alt){
            sendRequest({"text":seanfhocalText.innerText});
        }
    }
    else if (x == 4){
        seanfhocalText.innerText = "Is minic a mhaolaigh béile maith brón."
        if (document.getElementById('abair_bt_activate_img').getAttribute('alt') == abair_bt_activate_text_alt){
            sendRequest({"text":seanfhocalText.innerText});
        }
    }
    else if (x == 5){
        seanfhocalText.innerText = "An rud a scríobhann an púca, léann sé féin é."
        if (document.getElementById('abair_bt_activate_img').getAttribute('alt') == abair_bt_activate_text_alt){
            sendRequest({"text":seanfhocalText.innerText});
        }
    }
    else if (x == 6){
        seanfhocalText.innerText = "Capall an tsaoil an grá. "
        if (document.getElementById('abair_bt_activate_img').getAttribute('alt') == abair_bt_activate_text_alt){
            sendRequest({"text":seanfhocalText.innerText});
        }
    }
    else if (x == 7){
        seanfhocalText.innerText = "Is fearr rith maith ná drochsheasamh."
        if (document.getElementById('abair_bt_activate_img').getAttribute('alt') == abair_bt_activate_text_alt){
            sendRequest({"text":seanfhocalText.innerText});
        }
    }
    else if (x == 8){
        seanfhocalText.innerText = "Is glas iad na cnoic i bhfad uainn."
        if (document.getElementById('abair_bt_activate_img').getAttribute('alt') == abair_bt_activate_text_alt){
            sendRequest({"text":seanfhocalText.innerText});
        }
    }
    else if (x == 9){
        seanfhocalText.innerText = "Is minic a bhí cú mhall sona."
        if (document.getElementById('abair_bt_activate_img').getAttribute('alt') == abair_bt_activate_text_alt){
            sendRequest({"text":seanfhocalText.innerText});
        }
    }
    
}

function change_keyboard(x){
    counter++
    console.log(counter)
    if(x == 1){
        document.getElementById('keyboard').innerHTML = keyboard_one;
    }else{
        document.getElementById('keyboard').innerHTML = keyboard_two;
    }
}

var keyboard_one =`
<table>
<tr>
<td><p onclick="showSeanfhocal(0)" id="sásta1" >😀</p></td>
<td><p onclick="showSeanfhocal(1)" id="sásta2" >😁</p></td>
<td><p onclick="showSeanfhocal(2)" ID="gáire">😂</p></td>
<td><p onclick="showSeanfhocal(3)" ID="caocha" >😉</p></td>
<td><p onclick="showSeanfhocal(4)" ID="teanga" >😋</p></td>
</tr>
<tr>
<td><p onclick="showSeanfhocal(0)" id="spéac" >😎</p></td>
<td><p onclick="showSeanfhocal(1)" id="grá1" >😍</p></td>
<td><p onclick="showSeanfhocal(2)" ID="póg">😙</p></td>
<td><p onclick="showSeanfhocal(3)" ID="ionadh" >🤩</p></td>
<td><p onclick="showSeanfhocal(4)" ID="fiosrach" >🤔</p></td>
</tr>
<tr>
<td><p onclick="showSeanfhocal(0)" id="feac" >😑</p></td>
<td><p onclick="showSeanfhocal(1)" id="siúlaspéir" >🙄</p></td>
<td><p onclick="showSeanfhocal(2)" ID="scanradh">😮</p></td>
<td><p onclick="showSeanfhocal(3)" ID="zip" >🤐</p></td>
<td><p onclick="showSeanfhocal(4)" ID="tuirse" >😴</p></td>
</tr>
<tr>
<td><p onclick="showSeanfhocal(0)" id="iarraidh" >🤤</p></td>
<td><p onclick="showSeanfhocal(1)" id="míshásta" >😒</p></td>
<td><p onclick="showSeanfhocal(2)" ID="táinte">🤑</p></td>
<td><p onclick="showSeanfhocal(3)" ID="brón" >😞</p></td>
<td><p onclick="showSeanfhocal(4)" ID="gul" >😭</p></td>
</tr>       
</table>
`;


var keyboard_two =`
<table>
<tr>
    <td><i onclick="showSeanfhocal(0)" id="BOX" class="em em-boxing_glove" aria-role="presentation" aria-label="BOXING_GLOVE"></i></td>
    <td><i onclick="showSeanfhocal(1)" id="IRE"class="em em-flag-ie" aria-role="presentation" aria-label="Ireland Flag"></i></td>
    <td><i onclick="showSeanfhocal(2)" ID="FOX" class="em em-fox_face" aria-role="presentation" aria-label="FOX FACE"></i></td>
    <td><i onclick="showSeanfhocal(3)" ID="PIG" class="em em-pig" aria-role="presentation" aria-label="PIG FACE"></i></td>
    <td><i onclick="showSeanfhocal(4)" ID="ROAD" class="em em-motorway" aria-role="presentation" aria-label=""></i></td>
</tr>
<tr>
    <td><i onclick="showSeanfhocal(0)" id="BOX" class="em em-boxing_glove" aria-role="presentation" aria-label="BOXING_GLOVE"></i></td>
    <td><i onclick="showSeanfhocal(1)" id="IRE"class="em em-flag-ie" aria-role="presentation" aria-label="Ireland Flag"></i></td>
    <td><i onclick="showSeanfhocal(2)" ID="FOX" class="em em-fox_face" aria-role="presentation" aria-label="FOX FACE"></i></td>
    <td><i onclick="showSeanfhocal(3)" ID="PIG" class="em em-pig" aria-role="presentation" aria-label="PIG FACE"></i></td>
    <td><i onclick="showSeanfhocal(4)" ID="ROAD" class="em em-motorway" aria-role="presentation" aria-label=""></i></td>
</tr>
<tr>
    <td><i onclick="showSeanfhocal(5)" id="GHOST"  class="em em-ghost" aria-role="presentation" aria-label="GHOST"></i></td>
    <td><i onclick="showSeanfhocal(6)" id="BEETLE"  class="em em-beetle" aria-role="presentation" aria-label="LADY BEETLE"></i></td>
    <td><i onclick="showSeanfhocal(7)" id="IRE"  class="em em-runner" aria-role="presentation" aria-label="RUNNER"></i></td>
    <td><i onclick="showSeanfhocal(8)" ID="FOX"  class="em em-sunrise_over_mountains" aria-role="presentation" aria-label="SUNRISE OVER MOUNTAINS"></i></td>
    <td><i onclick="showSeanfhocal(9)" ID="FOX"  class="em em-dog" aria-role="presentation" aria-label="DOG FACE"></i></td>
</tr>    
<tr>
    <td><i onclick="showSeanfhocal(0)" id="BOX" class="em em-boxing_glove" aria-role="presentation" aria-label="BOXING_GLOVE"></i></td>
    <td><i onclick="showSeanfhocal(1)" id="IRE"class="em em-flag-ie" aria-role="presentation" aria-label="Ireland Flag"></i></td>
    <td><i onclick="showSeanfhocal(2)" ID="FOX" class="em em-fox_face" aria-role="presentation" aria-label="FOX FACE"></i></td>
    <td><i onclick="showSeanfhocal(3)" ID="PIG" class="em em-pig" aria-role="presentation" aria-label="PIG FACE"></i></td>
    <td><i onclick="showSeanfhocal(4)" ID="ROAD" class="em em-motorway" aria-role="presentation" aria-label=""></i></td>
</tr>       
</table>
`;

/*
                        <tr>
                            <td><p onclick="showSeanfhocal(0)" id="BOX" >🥊</p></td>
                            <td><p onclick="showSeanfhocal(1)" id="IRE"class="em em-flag-ie" aria-role="presentation" aria-label="Ireland Flag"></p></td>
                            <td><p onclick="showSeanfhocal(2)" ID="FOX">🦊</p></td>
                            <td><p onclick="showSeanfhocal(3)" ID="PIG" >🐖</p></td>
                            <td><p onclick="showSeanfhocal(4)" ID="ROAD" class="em em-motorway" aria-role="presentation" aria-label=""></p></td>
                        </tr>
                        <tr>
                            <td><i onclick="showSeanfhocal(5)" id="GHOST"  class="em em-ghost" aria-role="presentation" aria-label="GHOST"></i></td>
                            <td><i onclick="showSeanfhocal(6)" id="BEETLE"  class="em em-beetle" aria-role="presentation" aria-label="LADY BEETLE"></i></td>
                            <td><i onclick="showSeanfhocal(7)" id="IRE"  class="em em-runner" aria-role="presentation" aria-label="RUNNER"></i></td>
                            <td><i onclick="showSeanfhocal(8)" ID="FOX"  class="em em-sunrise_over_mountains" aria-role="presentation" aria-label="SUNRISE OVER MOUNTAINS"></i></td>
                            <td><i onclick="showSeanfhocal(9)" ID="FOX"  class="em em-dog" aria-role="presentation" aria-label="DOG FACE"></i></td>
                        </tr>  



    if (x == 0){
        seanfhocalText.innerText = "Is minic a bhris béal duine a shrón."
        if (document.getElementById('abair_bt_activate_img').getAttribute('alt') == abair_bt_activate_text_alt){
            sendRequest({"text":seanfhocalText.innerText});
        }
    }else if (x == 1){
        seanfhocalText.innerText = "Tír gan teanga, tír gan anam."
        if (document.getElementById('abair_bt_activate_img').getAttribute('alt') == abair_bt_activate_text_alt){
            sendRequest({"text":seanfhocalText.innerText});
            change_keyboard(2);
        }
    }else if (x == 2){
        seanfhocalText.innerText = "Ní mhealltar an sionnach faoi dhó."
        if (document.getElementById('abair_bt_activate_img').getAttribute('alt') == abair_bt_activate_text_alt){
            sendRequest({"text":seanfhocalText.innerText});
        }
    }
    else if (x == 3){
        seanfhocalText.innerText = "Is iad na muca ciúine a itheann an mhin."
        if (document.getElementById('abair_bt_activate_img').getAttribute('alt') == abair_bt_activate_text_alt){
            sendRequest({"text":seanfhocalText.innerText});
        }
    }
    else if (x == 4){
        seanfhocalText.innerText = "Is fada an bóthar nach bhfuil casadh ann."
        if (document.getElementById('abair_bt_activate_img').getAttribute('alt') == abair_bt_activate_text_alt){
            sendRequest({"text":seanfhocalText.innerText});
        }
    }
    else if (x == 5){
        seanfhocalText.innerText = "An rud a scríobhann an púca, léann sé féin é."
        if (document.getElementById('abair_bt_activate_img').getAttribute('alt') == abair_bt_activate_text_alt){
            sendRequest({"text":seanfhocalText.innerText});
        }
    }
    else if (x == 6){
        seanfhocalText.innerText = "Aithníonn ciaróg ciaróg eile."
        if (document.getElementById('abair_bt_activate_img').getAttribute('alt') == abair_bt_activate_text_alt){
            sendRequest({"text":seanfhocalText.innerText});
        }
    }
    else if (x == 7){
        seanfhocalText.innerText = "Is fearr rith maith ná drochsheasamh."
        if (document.getElementById('abair_bt_activate_img').getAttribute('alt') == abair_bt_activate_text_alt){
            sendRequest({"text":seanfhocalText.innerText});
        }
    }
    else if (x == 8){
        seanfhocalText.innerText = "Is glas iad na cnoic i bhfad uainn."
        if (document.getElementById('abair_bt_activate_img').getAttribute('alt') == abair_bt_activate_text_alt){
            sendRequest({"text":seanfhocalText.innerText});
        }
    }
    else if (x == 9){
        seanfhocalText.innerText = "Is minic a bhí cú mhall sona."
        if (document.getElementById('abair_bt_activate_img').getAttribute('alt') == abair_bt_activate_text_alt){
            sendRequest({"text":seanfhocalText.innerText});
        }
    }
*/