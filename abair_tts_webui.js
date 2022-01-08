/**
  abair_tts_webui.js
  Copyright (c) 2016 - 2017 Phonetics and Speech Lab, Trinity College Dublin, Ireland
  Author: Christoph Wendler
*/

/**
  @TODO:
    - Optionally store user selected values
*/

/**
* Global variables
*/
var _selectedVoice = 'ga_CM';
var _selectedSpeed = 1.0;
var _timedRequest = null;     // variable that holds reference to sendRequest
var _wait = 650;              // time to wait before sending the request (milliseconds)
var _requestWorker = null;    // worker that handles the XMLHttpRequests
//var _pathToWorker;
var _outputFormat = 'html';
var _selectedTheme = 'no_theme';
var _selectedZoomFactor = 150;
// [Debug]
//~ var _pathToTheme = 'http://127.0.0.1:8082/webreader/styles/';
//~ var _pathToPlayer = 'http://127.0.0.1:8082/webreader/scripts/abairplayer.js';
// [Deployment]
//HB var _pathToTheme = 'http://www.abair.tcd.ie/webreader/styles/';
//HB var _pathToPlayer = 'http://www.abair.tcd.ie/webreader/scripts/abairplayer.js';
var _pathToTheme = 'https://www.abair.ie/webreader/styles/';
var _pathToPlayer = 'https://www.abair.ie/webreader/scripts/abairplayer.js';
var _isActive = false;
var _zoomSrc = null;  // Find better name?

/**
* Called when window is loaded. It performs necessary
* steps to attach UI and make the synthesizer ready 
* for use.
* @method   loadAbairSpeechSynthesizer
*/
function loadAbairSpeechSynthesizer()
{
  console.log('loading ABAIR speech synthesizer');
  
  // Attach the worker as inline script, due to 
  // cross-origin restrictions
  var wrkMessage = document.createElement('script');
  wrkMessage.setAttribute('id', 'request_worker');
  wrkMessage.setAttribute('type', 'javascript/worker');
  wrkMessage.innerHTML = _workerOnMessage;
  document.head.appendChild(wrkMessage);
  
  var wrkInit = document.createElement('script');
  wrkInit.setAttribute('id', 'worker_init');
  wrkInit.innerHTML = _workerInit;
  document.head.appendChild(wrkInit);
  
  var style = document.createElement('link');
  style.setAttribute('id', 'abair_style');
  style.setAttribute('type', 'text/css');
  style.setAttribute('rel', 'stylesheet');
  style.setAttribute('href', _pathToTheme + 'gui.css');
  document.head.appendChild(style);
  
  var uiContainer = document.createElement('div');
  uiContainer.setAttribute('id', 'abair_ui_container');
  uiContainer.setAttribute('style', 'z-index: 10000;');
  uiContainer.innerHTML = _gui;
  document.body.appendChild(uiContainer);
  
  document.getElementById('speed').selectedIndex = 0;
  document.getElementById('theme').selectedIndex = 0;
  
  // Experimental feature
//  addEventToElement(document,
//  {
//    "type":"keydown",
//    "func":presskey,
//    "flag":false
//  }, false);
}

/**
* SYNTHESIS SECTION
*/

/*
* Worker
*/
// Not in use due to browser cross-origin
// restrictions. Worker is now attached as
// an inline script.
//_requestWorker = new Worker(_pathToWorker);
//_requestWorker.onmessage = function(msg)
//{
//  handleResponse(msg.data);
//}

/**
* Creates the URL search from the user-selected text.
* @method makeURL
* @param  {String}  text    a string
* @return {String}  url     the URL search
*/
function makeURL(text) {
  if (text.length == 0)
    return '';
  // [Debug]
  // encodeURIComponent preserves line breaks (important for formatting)
  url = 'http://127.0.0.1:8081/ttsserver-dev/?input='+encodeURIComponent(text)+'&dialect='+_selectedVoice+'&format='+_outputFormat+'&speed='+_selectedSpeed+'&id='+_sender;
  //~ url = 'http://localhost:8081/?input='+encodeURIComponent(text)+'&dialect='+_selectedVoice+'&format='+_outputFormat+'&speed='+_selectedSpeed+'&id='+_sender;
  // [Deployment] (for requests it has to be 'ttsserver')
  // url = 'http://www.abair.tcd.ie/ttsserver/?input='+encodeURIComponent(text)+'&dialect='+_selectedVoice+'&format='+_outputFormat+'&speed='+_selectedSpeed;
	return url;
}

function makeForm(text)
{
	var json =
	{
		'Input': encodeURIComponent(text),
		'Locale': _selectedVoice,
		'Format': _outputFormat,
		'Speed': _selectedSpeed,
		'Theme': _selectedTheme,
		'Id': _sender
	}
	return json;
}

/**
* Sends the request to the synthesizer
* @method sendRequest
* @param {JSONObject} req    a JSONObject
*/
function sendRequest(req)
{
  var frm = makeForm(req.text);
  _requestWorker.postMessage({'form':JSON.stringify(frm)});
}

/**
* Cancels the user request, when focus 
* has moved from the element.
* @method cancelRequest
* @param {HTMLElement} el    the HTMLElement that has the focus
*/
function cancelRequest(el)
{
  _requestWorker.postMessage({"signal":"abort"});
  clearTimeout(_timedRequest);
  cancelSpeech();
  if (el)
  {
    el.removeAttribute('onmouseout');
    el.removeAttribute('onfocusout');
  }
  unselectElements();
  if (_selectedTheme === 'zoom')
  {
    var z = document.getElementById('abair_zoom');
    if (z)
      document.body.removeChild(z);
  }
}

/**
* Cancels the speech, i.e. the sound file that's
* playing.
* @method cancelSpeech
*/
function cancelSpeech()
{
  try {
    // _currAudio is an audio element that lives in abairplayer.js
    if (_currAudio)
    {
      _currAudio.pause();
    }
  }
  catch(e)
  {
    // do nothing for now
  }
}

/**
* Handles the server response.
* @method handleResponse
* @param {JSONObject} res    a JSONObject
*/
function handleResponse(res)
{
  if (res.TTSResponse.responseText)
  {
    if (!res.TTSResponse.responseText.length)
      return;
    if (res.TTSResponse.responseText === 'Error')
			return;
    // Maybe this can one day be replaced by document.implementation.createHTMLDocument
    var doc = (new DOMParser).parseFromString(res.TTSResponse.responseText, 'text/html');
    
    var jslink = document.createElement('script');
    jslink.setAttribute('id', 'script_link');
    jslink.setAttribute('type', 'text/javascript');
    jslink.setAttribute('src', _pathToPlayer);
    
    replaceElementById('script_link', document.head, jslink);
    
    var inlineScript = document.createElement('script');
    inlineScript.setAttribute('id', 'inline_script');
    inlineScript.innerHTML = doc.getElementById('inline_script').innerHTML;
    
    addEventToElement(jslink,
    {
      "type":"load",
      "func":function ()
             {
                if ((!this.readyState) || this.readyState === 'complete' || this.readyState === 'loaded')
                {
                  replaceElementById('inline_script', document.body, inlineScript);
                }
              },
      "flag":false
    });
    
    var root = doc.getElementById('root_container');
    // Add overlay;
    if (_selectedTheme === 'no_theme')
    {
      root.style.visibility = 'hidden';
      root.style.display = 'none';
      root.style.left = '-1000px';
      root.style.zIndex = '-1';
      replaceElementById('root_container', document.body, root);
    }
    else if (_selectedTheme === 'zoom')
    {
			// Remove old container if it exists.
      var r = document.getElementById('root_container'); 
      if (r)
				document.body.removeChild(r);
      replaceElementById('style', document.head, getTheme());
      displayHighlightedZoom(root.innerHTML);
		}
    else if (_selectedTheme === 'overlay')
    {
      replaceElementById('style', document.head, getTheme());
      deactivateSelectionMode();
      addEventToElement(root,
      {
        "type":"click",
        "func":removeOverlay,
        "flag":false
      });
      // Insert the logos
      var logoAbair = document.createElement('div');
			logoAbair.setAttribute('id', 'logo_abair');
			logoAbair.innerHTML = _logos;
			root.insertBefore(logoAbair, root.firstChild);
			replaceElementById('root_container', document.body, root);
			adjustRootPosition(root, document.getElementById('audio_container'));
			connectWindow();
    }
  }
}

/**
* Replaces an existing HTMLElement, if it exists
* with el_new. If not, it appends it to the parent element.
* @method   replaceElementById.
* @param    {String}      id      the id of the element to be replaced
* @param    {HTMLElement} parent  the parent element
* @param    {HTMLElement} el_new  the replacement
*/
function replaceElementById(id, parent, el_new)
{
  var el_old = document.getElementById(id);
  if (el_old)
    parent.replaceChild(el_new, el_old);
  else
    parent.appendChild(el_new);
}

/**
* Adds an event to an HTMLElement. The event is
* passed within a JSONObject that has the following
* fields:
* - {type}  the event type
* - {func}  the function to be executed
* - {flag}  bool
* @method   addEventToElement
* @param    {HTMLElement} el      the element the event is attached to
* @param    {JSONObject}  xEvent  the event which is a JSONObject
*/
function addEventToElement(el, xEvent) {
  if (el.addEventListener)  // W3C
  {
    el.addEventListener(xEvent.type, xEvent.func, xEvent.flag);
  }
  else if (el.attachEvent)  // IE
  {
    el.attachEvent('on'+xEvent.type, xEvent.func);
  }
}

/**
* Removes the overlay from the browser window.
* @method   removeOverlay
* @param    {Event} ev    the event associated with the overlay
*/
function removeOverlay(ev)
{

  el = ev.target || ev.srcElement;
  if (el === undefined)
    return;
  if (el.hasAttribute('id'))
  {
    if (el.getAttribute('id') === 'root_container')
    {
      window.removeEventListener('scroll', smoothScroll); // TODO: x-platform
      document.body.removeChild(el);
      ev.stopPropagation();
      activateSelectionMode();
    } else
    {
      ev.stopPropagation();
      return;
    }
  }
}

/**
* Constructs the path to the CSS file
* associated with a theme.
* @method   getTheme
*/
function getTheme()
{
  var cssTheme = document.createElement('link');
  cssTheme.setAttribute('id', 'style');
  cssTheme.setAttribute('href', _pathToTheme+_selectedTheme+'.css');
  cssTheme.setAttribute('rel', 'stylesheet');
  return cssTheme;
}

/**
* Adds event listeners to the window.
* @method   connectWindow
*/
function connectWindow()
{
  addEventToElement(window,
  {
    "type":"scroll",
    "func":function()
           {
            //~ smoothScroll(document.getElementById('audio_container'));
           },
    "flag":false
  });
  
  addEventToElement(window,
  {
    "type":"resize",
    "func":function()
           {
              adjustRootPosition(document.getElementById('root_container'),
                                 document.getElementById('audio_container')
                                );
           },
    "flag":false
  });
}

/**
* UI SECTION
*/

var abair_bt_activate_text = 'Cuir i bhfeidhm';
var abair_bt_activate_text_alt = 'Cuir as feidhm';

/**
* Shows or hides the controls
* @method display
* @param {String} id    the ID of the element
*/
function display(id)
{
  var el = document.getElementById(id);
  if (id === 'abair_ui_controls')
  {
    var container = document.getElementById('abair_ui_container');
    var clbt = document.getElementById('abair_bt_close');
    if (el.style.visibility === 'hidden' ||
        el.style.visibility === ''
        )
    {
      container.style.width = '85px';
      rollOut(container, 700, 15, showControls);
    }
    else
    {
      el.style.display = 'none';
      el.style.visibility = 'hidden';
      clbt.style.display = 'none';
      clbt.style.visibility = 'hidden';
      container.style.width = '85px';
    }
  }
}

/**
* Sets the UI controls to visible, once
* the UI has "rolled" out.
* @method   showControls
*/
function showControls()
{
  var ctrls = document.getElementById('abair_ui_controls');
  ctrls.style.visibility = 'visible';
  ctrls.style.display = 'block';
  var clbt = document.getElementById('abair_bt_close');
  clbt.style.visibility = 'visible';
  clbt.style.display = 'block';
}

/**
* Handles changes in the UI
* @method uiChangedState
* @param {HTMLElement} el    a HTMLElement
*/
function uiChangedState(el)
{
  if (el.id === 'voice')
    _selectedVoice = el.value;
  else if (el.id === 'speed')
    _selectedSpeed = el.value;
  else if (el.id === 'theme')
    _selectedTheme = el.value;
}

/**
* Activates selection mode.
* @method activateSelectionMode
*/
function activateSelectionMode()
{
  document.body.setAttribute('onclick', 'handleSelection(event);');
  document.body.setAttribute('onmouseover', 'handleSelection(event);');
  document.body.setAttribute('onfocusin', 'handleSelection(event);');
  _isActive = true;
}

/**
* Deactivates selection mode
* @method deactivateSelectionMode
*/
function deactivateSelectionMode()
{
  document.body.removeAttribute('onclick');
  document.body.removeAttribute('onmouseover');
  document.body.removeAttribute('onfocusin');
  _isActive = false;
}

/**
* Removes the synthesizer UI along with 
* all other items that are related to it
* (e.g. link to style sheet etc.)
* @method clearUI
*/
function clearUI()
{
	var elHead = ['abair_link', 'request_worker', 'worker_init', 'abair_style'];
	var elBody = ['abair_ui_container', 'root_container', 'inline_script'];
	var el = null;
	for (i in elHead)
	{
		el = document.getElementById(elHead[i]);
		if (el)
			document.head.removeChild(el);
	}
	for (i in elBody)
	{
		el = document.getElementById(elBody[i]);
		if (el)
			document.body.removeChild(el);
	}
	deactivateSelectionMode();
}

/**
* Handles user events. Retrieves the element acted
* upon, prepares the text input and triggers
* synthesis.
* @method handleSelection
* @param {Event} ev    an event
*/
function handleSelection(ev)
{
  var el = getTarget(ev);
  
  if (el.tagName == 'BODY')  
    return;
  el.setAttribute('onmouseout', 'cancelRequest(this);');
  el.setAttribute('onfocusout', 'cancelRequest(this);');
//  console.log("Event type: " + ev.type);
  var text = '';
  if (ev.type === 'mouseover' || ev.type === 'focusin')
  {
    if (isChildOf(el, document.getElementById('abair_ui_container')))
      return;
    selectElementContents(el);
    var hyper = checkHyperLink(el);
    if (hyper.isLink === true)
    {
      text = 'Nasc: ';
      var title = el.getAttribute('title');
    	if (title)
    		text += title + '.';
    }
    if (el.tagName == 'IMG')
    {
    	text += ' Pictiúir ';
    	var alt = el.getAttribute('alt');
    	if (alt)
    		text += alt + '.';
    }
  }
  else if (ev.type === 'click')
  {
    return;
  }
  _timedRequest = setTimeout(
  function()
  {
    text = text + el.textContent;
    sendRequest({"text":text});
    if (_selectedTheme === 'zoom')
      _zoomSrc = ev;//~ displayZoom(ev, el);
    else if (_selectedTheme === 'overlay')
      el.removeAttribute('onmouseout');
  }, _wait);
}

/**
* Gets the element that is the target of the event
* @method getTarget
* @param  {Event} ev     an event
* @return {HTMLElement} the HTMLElement that is the target of the event
*/
function getTarget(ev)
{
  var el = ev.target || ev.srcElement;
  return el.nodeType == 1 ? el : el.parentNode;
}

/**
* Toggles certain elements of the UI, e.g.
* on/off etc.
* @method toggle
* @param {HTMLElement} el   HTMLElement
*/
function toggle(el)
{
  if (el.id === 'abair_bt_activate_img')
  {
    if (el.getAttribute('alt') === abair_bt_activate_text)
    {
      //HB el.setAttribute('src', 'http://www.abair.tcd.ie/webreader/img/deactivate.png');
      el.setAttribute('src', 'https://www.abair.ie/webreader/img/deactivate.png');
      el.setAttribute('alt', abair_bt_activate_text_alt);
      el.setAttribute('title', abair_bt_activate_text_alt);
      el.setAttribute('onclick', 'deactivateSelectionMode();toggle(this);');
      el.parentNode.style.background = '#FFCC00';
    }
    else
    {
      //HB el.setAttribute('src', 'http://www.abair.tcd.ie/webreader/img/activate.png');
      el.setAttribute('src', 'https://www.abair.ie/webreader/img/activate.png');
      el.setAttribute('alt', abair_bt_activate_text);
      el.setAttribute('title', abair_bt_activate_text);
      el.setAttribute('onclick', 'activateSelectionMode();toggle(this);');
      el.parentNode.style.background = '#444444';
    }
  }
}
/**
* [Experimental feature]
* Displays the zoom.
* @method   displayZoom
* @param  {Event} ev   the mouse event (to get the coordinates)
* @param  {el}    el   the element the mouse is hovering over
*/
function displayZoom(ev, el)
{
  var box = document.createElement('div');
  box.setAttribute('id', 'abair_zoom');
  box.innerHTML = el.outerHTML;
  box.style.fontSize = _selectedZoomFactor + '%';
  box.style.width = 500 + 'px';
  box.style.top = ev.pageY + 'px';
  box.style.left = ev.pageX + 5 /* - (parseInt(box.style.width) / 2)*/ + 'px';
  document.body.appendChild(box);
  adjustPosition(box);
}

// @TODO
function displayHighlightedZoom(inner)
{
  var box = document.createElement('div');
  box.setAttribute('id', 'abair_zoom');
  box.innerHTML = inner;
  box.style.fontSize = _selectedZoomFactor + '%';
  box.style.minWidth = 500 + 'px';
  //~ box.style.width = 500 + 'px';
  box.style.top = _zoomSrc.pageY + 'px';
  box.style.left = _zoomSrc.pageX + 5 /* - (parseInt(box.style.width) / 2)*/ + 'px';
  document.body.appendChild(box);
  adjustPosition(box);
  _zoomSrc = null;
}

/**
* Adjusts the position of an element, so that it
* stays within the browser window.
* @method   adjustPosition
* @param {HTMLElement} el   the element to be adjusted
*/
function adjustPosition(el)
{
  var winX = parseInt(window.pageXOffset);
  if (parseInt(el.style.left) < winX)  // left
    el.style.left = winX + 'px';
  if (parseInt(el.style.left) + parseInt(el.style.width) > parseInt(document.body.clientWidth))  // right
    el.style.left = parseInt(document.body.clientWidth) - parseInt(el.style.width) + 'px';
  if (parseInt(el.style.top) + parseInt(el.offsetHeight) > parseInt(document.body.scrollHeight))  // bottom
    el.style.top = parseInt(document.body.scrollHeight) - parseInt(el.offsetHeight) + 'px';
}

/**
* TEXT HANDLING
*/

/**
* Selects the text inside an HTMLElement.
* @method selectElementContents
* @param {HTMLElement} el    HTMLElement
*/
function selectElementContents(el)
{
  var range = document.createRange();
  range.selectNodeContents(el);
  var sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

/**
* Unselects the selected text.
* @method unselectElements
*/
function unselectElements()
{
  var sel = window.getSelection();
  sel.removeAllRanges();
}

/**
* Checks if an element is a hyper link or
* inside a hyper link, e.g. in
* <a><span>Text</span></a> "Text" would be
* inside a hyperlink.
* It returns a JSONObject that contains the
* following fields
* - {bool} isLink (whether or not is (inside) a link)
* - {link} link (the content of the "href"-attribute)
* - {tag} tag (the hyper link element)
* @method checkHyperLink
* @param {HTMLElement} el   HTMLElement
* @return {JSONObject}      a JSONObject that contains information about the hyper link 
*/
// Note: could be turned into a more generic function
function checkHyperLink(el)
{
  var child = el;
  while (true)
  {
    if (child == null)
    {
      return {"isLink":false};
    }
    if (child.tagName === 'A')
    {
      return {"isLink":true, "link":child.getAttribute('href'), "tag":child};
    }
    child = child.parentNode;
  }
  return {"isLink":false};
}

/**
* Determines whether el1 is a child
* of el2.
* @method   isChildOf
* @param  {HTMLElement} el1   the child to be tested for
* @param  {HTMLElement} el2   the parent to be tested for
*/
function isChildOf(el1, el2)
{
  var child = el1;
  while (true)
  {
    if (child == null)
      return false;
    if (child == el2)
      return true;
    child = child.parentNode;
  }
  return false;
}

/**
* KEYBOARD
*/
// Experimental feature.
var _prevKey;
function presskey(e)
{
	var key = e.keyCode;
  console.log(key);
  if (key === 16)
  {
    _prevKey = key;
  }
  if (key === 83 && _prevKey === 16)
  {
    if (!_isActive)
    {
      activateSelectionMode();
    }
    else
    {
      cancelRequest(null);
      deactivateSelectionMode();
      unselectElements();
    }
    toggle(document.getElementById('abair_bt_activate_img'));
    _prevKey = -1;
  }
	else if (key === 83)
  {
    cancelRequest(null);
    if (_selectedTheme === 'overlay')
    {
      var root = document.getElementById('root_container');
      if (root)
      {
        unselectElements();
        document.body.removeChild(root);
        activateSelectionMode();
        unselectElements();
      }
    }
	}
  StopEvent(e);
}

/* From Stackoverflow, originally by Peter Blum */
function StopEvent(pE)
{
   if (!pE)
     if (window.event)
       pE = window.event;
     else
       return;
  if (pE.cancelBubble != null)
     pE.cancelBubble = true;
  if (pE.stopPropagation)
     pE.stopPropagation();
  if (pE.preventDefault)
     pE.preventDefault();
  if (window.event)
     pE.returnValue = false;
  if (pE.cancel != null)
     pE.cancel = true;
}

/**
* UTILITY FUNCTIONS
*/
/**
* Rolls out the user controls.
* @method rollOut
* @param {HTMLElement} el     HTMLElement
* @param {int} width          max width
* @param {int} step           pixels to add with each iteration
* @param {function} delegate  function to be executed, once roll
                              out has stopped
*/
function rollOut(el, width, step, delegate)
{
  var w = parseInt(el.style.width);
  if (w >= width)
  { 
    delegate();
    return;
  }
  if (w < width)
  {
    el.style.width = w + step + 'px';
  }
  setTimeout(function()
  {
    rollOut(el, width, step, delegate);
  } , 1);
}

var _scrollTimer;
/**
* Smoothly scrolls an element to the visible area of
* the window, when the user scrolls up and down.
* (Scrolling sideways not yet supported)
* @method   smoothScroll
* @param  {HTMLElement} el  the element that is scrolled into position
*
*/
function smoothScroll(el)
{
  // @TODO: don't scroll, if audio_container is bigger than window
  if (!el)
    return;
  obj = el.style;
  curr = parseInt(obj.marginTop);
  win = parseInt(window.pageYOffset);
  var step = 1;
  if (curr > win)
  {
    step = -step;
    obj.marginTop = step + curr + 'px';
  }
  else if (curr < win)
  {
    obj.marginTop = step + curr + 'px';
  }
  else if (obj.marginTop === win + "px")
  {
    clearTimeout(_scrollTimer);
    return;
  }
  _scrollTimer = setTimeout(function()
                 {
                    smoothScroll(el);
                 }, 1);
}

/**
* Adjusts the position of the overlay (centers it).
* @method   adjustRootPosition
* @param {HTMLElement}  root    the root (overlay)
* @param {HTMLElement}  child   the audio container
* @TODO:
* - Center it with offsetWidth/offsetHeight that 
*   contain the actual width and height calculated
*   by the browser.
*/
function adjustRootPosition(root, child)
{
  if (!root)
    return;
  // Calculate height of document
  var body = document.body, html = document.documentElement;
  var height = Math.max(body.scrollHeight, body.offsetHeight, 
                        html.clientHeight, html.scrollHeight, html.offsetHeight);
  root.style.height = height + 'px';
  // adjust text container to the scroll position
  child.style.marginTop = window.pageYOffset + 'px'; // Problem: height is not yet computed so can't really center it.
}


/*
* HTML STRINGS
*/
// The ABAIR and the Roinn na Gaeltachta logo
var _logos = '\
<div id="slogan">á chur ar fáil ag</div>\
  <a href="https://www.abair.ie" target="_blank">\
    <img src="https://www.abair.ie/webreader/img/logo_m.png"/>\
  </a>\
  <a href="https://www.ahrrga.gov.ie/ga/" target="_blank">\
    <img src="https://www.abair.ie/webreader/img/an_roinn.png" style="width: 175px; margin-top: 10%;">\
  </a>\
</div>';

// The GUI
var _gui =`
<!-- ABAIR GUI -->
<!-- HB changed to https -->  
    <div style="width: 20px; height: 72px; margin: auto auto; background: none; margin-top: 3px;" id="abair_bt_close" onclick="display('abair_ui_controls');">
      <!--<img src="https://www.abair.ie/webreader/img/close_arrow.png" style="height: 75px; margin: 0 auto;"/>-->

      <img src="https://www.abair.ie/webreader/img/close_arrow.png" style="width: 20px; height: 72px; margin: 0 auto;"/>
    </div>
    <div onclick="display('abair_ui_controls');" id="abair_logo">
      <img src="https://www.abair.ie/webreader/img/logo_m.png" style="width: 65px;" alt="abair synthesizer">
      <br />
      <span style="margin-top: 0px; margin-bottom: 4px; font-size: 14px; font-weight: normal;">Sintéiseoir</span>
    </div><!-- logo -->
    
    <div id="abair_ui_controls">
    
      <div id="abair_bt_activate">
        <img id="abair_bt_activate_img" src="https://www.abair.ie/webreader/img/activate.png" onclick="activateSelectionMode();toggle(this);" title="Cuir i bhfeidhm" src="" alt="Cuir i bhfeidhm" style="width: 44px;"/>
      </div>
      
      <ul id="abair_ui_list">
        <li>
         <label for="voice">Glór:</label>
         <select id="voice" onchange="uiChangedState(this);">
          <option value="ga_GD">Gaoth Dobhair</option>
          <option selected="" value="ga_CM">Conamara</option>
          <option value="ga_MU">Corca Dhuibhne</option>
         </select>
        </li>
        <li>
          <label for="speed">Luas:</label>
          <select id="speed" onchange="uiChangedState(this);">
            <option selected="true" value="1.0">gnáthluas</option>
            <option value="1.3">go tapa</option>
            <option value="0.8">go mall</option>
          </select>
        </li>
        <li>
          <label for="theme">Leagan amach:</label>
          <select id="theme" onchange="uiChangedState(this);">
            <option selected="true" value="no_theme">fuaim amháin</option>
            <option value="zoom">zúm</option>
            <option value="overlay">ar bharr</option>
          </select>
        </li>
      </ul>
    </div> <!-- controls -->
  <!-- END ABAIR GUI -->
`;

// Inline script for worker that send
// the request to the TTS server
var _workerOnMessage =`

var _workerInterval;

/**
* Sends a XMLHttpRequest to the TTSServer
*/
self.onmessage = function(req)
{
  if (req.data.signal === 'abort')
  {
    if (_workerInterval)
    {
      clearInterval(_workerInterval);
      _workerInterval = null;
    }
    return;
  }
  //~ if (!req.data.url.length)
    //~ return;
  //~ if (!req.data.form.length)
		//~ return;
  
  _workerInterval = setInterval(
  function()
  {
    var xmlhttp = new XMLHttpRequest();
    //~ xmlhttp.open('POST', 'https://127.0.0.1:8082/webreader/synthesis', false);
    //HB xmlhttp.open('POST', 'https://www.abair.ie/webreader/synthesis', false);
    xmlhttp.open('POST', 'https://www.abair.ie/webreader/synthesis', false);
    var json = JSON.parse(req.data.form);
    var frm = new FormData();
    
    for (var i in json)
			frm.append(i, json[i])
    
    xmlhttp.send(frm);
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
    {
	//HB	
	//console.log(xmlhttp.responseText.replace(/https:\\/\\/www.abair/g,"https://www.abair"));

      self.postMessage(
        {"TTSResponse":
          {
	      //HB
            //"responseText":xmlhttp.responseText.replace(/http:\\/\\/www.abair/g,"https://www.abair")
            "responseText":xmlhttp.responseText
          }
        }
      );
    }
    else
    {
			self.postMessage({"TTSResponse":{"responseText":"Error"}});
		}
    clearInterval(_workerInterval);
    _workerInterval = null;
  }, 10);
}
`;
// Inline script that initializes the worker
var _workerInit =`

  var blob = new Blob([document.getElementById('request_worker').textContent]);
  _requestWorker = new Worker(window.URL.createObjectURL(blob));
  _requestWorker.onmessage = function(msg)
  {
    handleResponse(msg.data);
  }
`;

// Load synthesizer, when window is loaded.
window.addEventListener('load', loadAbairSpeechSynthesizer);

// Browser Add-on
var _sender = '';
function receiveMessage(ev)
{
	var src = ev.target;
	if (src == window && ev.data.direction == 'from-abair-addon')
	{
		var container = document.getElementById('abair_ui_container');
		if (ev.data.message == 'load-synth')
		{
			if (!container)
			{
				loadAbairSpeechSynthesizer();
				_sender = ev.data.id;
			}
		}
		else if (ev.data.message == 'unload-synth')
		{
			if (container)
			{
				clearUI();
				_sender = '';
			}
		}
	}
}

window.addEventListener('message', receiveMessage);
