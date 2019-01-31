// initiate all global variables
var modal = document.getElementById('settings_modal');
var span = document.getElementsByClassName("close")[0];
var toastContainer = $("#toast");
var toastContainerDiv = document.getElementById("toast");
var timerIcon = document.getElementById("timer_icon");
var quoteContainer = $('#quote');
var splashId = document.getElementsByClassName("splash-overlay")[0];
var splashIdJQ = $("#splash_overlay")
var sourceLength;
var randomNumber;
var newQuoteText;
var newQuoteGenius;
var newQuoteId;
var timeAnimationIn = 100;
var timeAnimationOut = 700;
var currentQuote;
var currentQuoteId;
var shownQuotes;
var quoteSource;
var currentPosition = 0; // used for shownQuotes to manage history (feature may not be used)
var obj;
var isTrue = 1;
var disliked;
var allSettings;
var settingsJSON;
var isTimerActive;
var intervalTime = 10000;
var timerInterval;
var dislikedSource;
var dislikedLength;
var returnedQuote;
var returnedName;
var returnedId ;
var settingsFromJSON;
var returnSource = [];


document.addEventListener("deviceready", function() {
    // notificationHandler();
    sceduleQuote();
    cordova.plugins.backgroundMode.setEnabled(true);
    // backgroundTimer = setInterval(function() {
    //     console.log("Bakcground mode enabled? " + cordova.plugins.backgroundMode.isActive());
    // }, 1000);
    cordova.plugins.backgroundMode.overrideBackButton();
    cordova.plugins.backgroundMode.setDefaults({ silent: true });
    cordova.plugins.backgroundMode.on('activate', function() {
        // cordova.plugins.backgroundMode.disableWebViewOptimizations(); 
        console.log("Background on");
     });
     
    }, false);
    
    // do when app has finished loading
    $(document).ready(function () {
        // localStorage.clear()
        console.log("Is this the first launch: " + isFirstLaunch());
        
        // if this is the users first launch take default quotes and save them in local storage
        // this allows the user to add/remove quotes and save those settings for future launches
        if (isFirstLaunch()) {
            quoteSourceJSON = JSON.stringify(quoteDatabase);
        var dislikedJSON = JSON.stringify(dislikedPlaceholder);
        settingsJSON = JSON.stringify(defaultSettings);
        localStorage.setItem("quoteJSON", quoteSourceJSON);
        localStorage.setItem("disliked", dislikedJSON);
        localStorage.setItem("settingsJSON", settingsJSON);
        quoteSource = quoteDatabase;
        setFirstLaunch();
    } else {
        quoteFromJSON = localStorage.getItem("quoteJSON");
        quoteJSON = JSON.parse(quoteFromJSON);
        quoteSource = quoteJSON;
    }
    
    settingsFromJSON = localStorage.getItem("settingsJSON");
    allSettings = JSON.parse(settingsFromJSON);
    console.log("settingsJSON: " + allSettings);
    
    
    // set all needed variables to be reused
    sourceLength = quoteSource.length; // gets the array length from the default array
    
    isTimerActive = allSettings[0].isTimerOn;

    console.log("Is timer active? " + isTimerActive);
    if (isTimerActive) {
        timerIcon.style.color = "rgba(0, 133, 7, 0.7)"
    } else {
        timerIcon.style.color = "rgba(56,56,56,0.7)"
    }

    // remove the splash screen
    splashIdJQ.fadeOut(1500, function () { splashId.style.display = "none" });

    // set the first shown quote to a random quote from quoteJSON
    randomQuote();
    clearInterval(timerInterval);
    timerInterval = setInterval(function () { randomTimer(); }, intervalTime);
    clearInterval(23);
    clearInterval(26);
    clearInterval(28);
    // clearInterval(randomTimer());

    // timerInterval = setInterval(function () {
    //     console.warn(timerInterval);
    //     if (isTimerActive) {
    //         randomQuote();
    //     }
    // }, intervalTime);
    // console.log(quoteSource);
});


function randomTimer() {
    console.warn(timerInterval);
    if (isTimerActive) {
        randomQuote();
    }
}

// check to see if this is the users first launch
function isFirstLaunch() {
    var setTrue = JSON.stringify(isTrue);
    var chkTrue = localStorage.getItem("isFirstLaunch");
    var chkObj = JSON.parse(chkTrue);
    console.log("Launch code: " + chkObj);
    if (chkObj == isTrue) {
        return false;
    } else {
        // localStorage.setItem("isFirstLaunch", isTrue);
        return true;
    }
}

// when called this function will disable checking for future launches
function setFirstLaunch() {
    localStorage.setItem("isFirstLaunch", isTrue);
    console.log("Set (isFirstLaunch) to 1 (isFirstLaunch is now false)");
}

// open the settings modal
function settings() {
    modal.style.display = "block";
}
span.onclick = function () {
    modal.style.display = "none";
    updateSettings();
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        updateSettings();
    }
}

function updateSettings() {

}

function toggleTimer() {
    var timerSetting;
    if (isTimerActive) {
        isTimerActive = false;
        timerIcon.style.color = "rgba(56, 56, 56, 0.7)"
        allSettings[0] ["isTimerOn"] = isTimerActive;
        timerSetting = allSettings[0].isTimerOn;
        settingsJSON = JSON.stringify(timerSetting);
        localStorage.setItem("settingsJSON", settingsJSON);
        clearInterval(timerInterval);
        console.log("toggleTimer() Disabled timer");
        console.warn(timerInterval);
        toast("Timer disabled.", 600, 'bottom', 2500);
    } else {
        isTimerActive = true;
        timerIcon.style.color = "rgba(0, 133, 7, 0.7)"
        allSettings[0] ["isTimerOn"] = isTimerActive;
        timerSetting = allSettings[0].isTimerOn;
        settingsJSON = JSON.stringify(timerSetting);
        localStorage.setItem("settingsJSON", settingsJSON);
        clearInterval(timerInterval);
        timerInterval = setInterval(function () { randomTimer(); }, intervalTime);
        console.log("toggleTimer() Timer enabled")
        console.warn(timerInterval);
        toast("Random timer enabled.", 600, 'bottom', 2500);
    }
    timerIcon.classList.remove("pop");
    void timerIcon.offsetWidth;
    timerIcon.classList.add("pop")
}

// dislikes the quote and moves it to another local JSON so that it no longer shows
function dislike() {
    console.log(currentQuoteId);
    if (currentQuoteId <= 56) {
        if (confirm("Once this quote has been disliked it will no longer be shown in app or in notifications")) {
            quoteSource.splice(quoteSource.indexOf(quoteSource[currentQuote]), 1);
            currentQuote--;
            nextQuote();
            console.log(getCurrentQuoteId());
        }
    } else {
        if (confirm("Disliking a custom quote will permatly remove it and cannot be undone.")) {
            quoteSource.splice(quoteSource.indexOf(currentQuote.quote), 1);
            nextQuote();
            console.log(getCurrentQuoteId());
        }
    }
    toast("Quote disliked", 600, 'bottom', 2500);
    console.log("Input Action: Dislike");
}

// grab a random quote and display it
function randomQuote() {
    randomNumber = Math.floor(Math.random() * sourceLength);
    currentQuote = randomNumber;
    if (chkIfValid()) {
        setQuote(randomNumber);
    } else {
        randomQuote();
    }
    returnedQuote = quoteSource[currentQuote].quote;
    returnedName = quoteSource[currentQuote].name;
    returnedId = quoteSource[currentQuote].id;
    returnSource = [
        {
            id: returnedId,
            quote: returnedQuote,
            name: returnedName,
        }
    ]
    return(returnSource);
}

// takes the next quote after the current shown quote and displays it
function nextQuote() {
    currentQuote++;
    currentPosition++;
    if (currentQuote >= sourceLength) {
        currentQuote = 0;
    }
    if (chkIfValid()) {
        setQuote(currentQuote);
    } else {
        nextQuote();
    }
}

// takes the last quote behind the current shown quote and displays it
function lastQuote() {
    if (currentQuote <= 0) {
        currentQuote = sourceLength;
    }
    currentQuote--;
    if (chkIfValid()) {
        setQuote(currentQuote);
    } else {
        lastQuote();
    }
}
function setQuote(a) {
    newQuoteText = quoteSource[a].quote;
    newQuoteGenius = quoteSource[a].name;
    newQuoteId = quoteSource[a].id;
    if ((newQuoteGenius === null) || (newQuoteGenius == "") || (newQuoteGenius == " ")) { newQuoteGenius = "Unknown" }
    quoteContainer.fadeOut(timeAnimationIn, function () {
        quoteContainer.html('');
        quoteContainer.append('<p class="quote">' + newQuoteText + '</p>' + '<p id="name" class="name">' + '-' + newQuoteGenius + '</p>');
        quoteContainer.fadeIn(timeAnimationOut);
    });
    updateCurrentQuoteId();
    console.log("called setQuote");
    console.log("----------");
}
// check if the next intended quote is not disliked or diabled
function chkIfValid() {
    var isValid = quoteSource[currentQuote].id;
    if (isValid != null) {
        console.log("chkIfValid:True");
        return true;
    } else {
        console.log("chkIfValid:false");
        return false;
    }
}

// called every time the quote div updates to update currentQuoteId to the current quote's id for reference 
function updateCurrentQuoteId() {
    console.log("New Current Quote Id = " + newQuoteId);
    console.log("Current position = " + currentPosition);
    currentQuoteId = quoteSource[currentQuote].id;
}
function copyQuote() {
    const copy_text = document.querySelector('#quote, .quote');
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(copy_text)
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeAllRanges();
    toast("Quote copied to clipboard!", 600, 'bottom', 2500);
    console.log("Called copyQuote")
    console.log("----------");
}

// display a toast format:
//  toast("message", animation time (int), postion ('bottom', 'middle', 'top', or a int ), show time (int));
// example: toast("This is a two second message", 600, 'bottom', 2000);
function toast(a, b, c, d) {
    if ((a == null) || (b == null) || (c == null) || (d == null)) {
        console.error("Function:toast Error: One or more perameters null");
        toast("Toast Error: Perameters cannot be null");
        return false;
    }
    if ((c == 'bottom') || (c == 'default')) {
        c = 85;
    } else if (c == 'middle') {
        c = 50;
    } else if (c == 'top') {
        c = 15
    } else if (c < 5) {
        c = 5;
    } else if (c > 95) {
        c = 95;
    }

    if (b == 'default') {
        b = 600;
    }
    toastAnimation = b;

    if (d == 'default') {
        d = 2500;
    }

    toastContainer.html('');
    toastContainer.append(a);
    toastContainer.fadeIn(toastAnimation, function () {
        toastContainerDiv.style.display = "block"
        toastContainerDiv.style.top = (c + "%");
    });
    setTimeout(function () {
        toastContainer.fadeOut(toastAnimation, function () {
            toastContainerDiv.style.display = "none"
        });
    }, d);
    console.log("Function:toast");
    console.log("----------");
}
function getCurrentQuoteId() {
    console.log("function:getCurrentQuoteId(); Current Quote ID = " + currentQuoteId);
    console.log("function:getCurrentQuoteId(); Current position = " + currentPosition);
    return (currentQuoteId);
}
var coll = document.getElementsByClassName("collapsible");
var i;
for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}