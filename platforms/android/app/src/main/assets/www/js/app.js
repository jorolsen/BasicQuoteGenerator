// initiate all global variables
var modal = document.getElementById('settings_modal');
var span = document.getElementsByClassName("close")[0];
var sourceLength;
var randomNumber;
var newQuoteText;
var newQuoteGenius;
var newQuoteId;
var quoteContainer;
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

// do when app has finished loading
$(document).ready(function () {
    // localStorage.clear()
    console.log("Is this the first launch: " + isFirstLaunch());

    // if this is the users first launch take default quotes and save them in local storage
    // this allows the user to add/remove quotes and save those settings for future launches
    if (isFirstLaunch()) {
        quoteSourceJSON = JSON.stringify(quoteDatabase);
        var dislikedJSON = JSON.stringify(dislikedPlaceholder);
        localStorage.setItem("quoteJSON", quoteSourceJSON);
        localStorage.setItem("disliked", dislikedJSON);
        quoteSource = quoteDatabase;
        setFirstLaunch();
    } else {
        quoteFromJSON = localStorage.getItem("quoteJSON");
        quoteJSON = JSON.parse(quoteFromJSON);
        quoteSource = quoteJSON;
    }

    // set all needed variables to be reused
    sourceLength = quoteSource.length; // gets the array length from the default array
    randomNumber = Math.floor(Math.random() * sourceLength); // gets a random number to be used for random quote gen
    quoteContainer = $('#quote'); // grab the html quote container for reference
    currentQuote = randomNumber;
    shownQuotes = [currentQuote]; // created the first element for the array to show history

    updateCurrentQuoteId();
    // set the first shown quote to a random quote from quoteJSON
    randomQuote();

    console.log(quoteSource);
});

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
    // myObj = { name: "John", age: 31, city: "New York" };
    // myJSON = JSON.stringify(myObj);
    // localStorage.setItem("testJSON", myJSON);

}
span.onclick = function () {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// dislikes the quote and moves it to another JSON so that it no longer shows
function dislike() {
    // text = localStorage.getItem("testJSON");
    // obj = JSON.parse(text);
    // console.log(obj);
    console.log(currentQuoteId);
    if (currentQuoteId <= 56) {
        if (confirm("Once this quote has been disliked it will no longer be shown in app or in notifications")) {
            quoteSource.splice(quoteSource.indexOf(currentQuote.quote), 1)
            nextQuote();
            console.log(getCurrentQuoteId());
        }
    } else {
        if (confirm("Disliking a custom quote will permatly remove it and cannot be undone.")) {
            quoteSource.splice(quoteSource.indexOf(currentQuote.quote), 1)
            nextQuote();
            console.log(getCurrentQuoteId());
        }
    }

    console.log("Input Action: Dislike");
}

// when left arrow is clicked, find the quote before current quote in the array and display it
function leftClick() {
    lastQuote();
}

// when right arrow is clicked, find the quote after the current quote in the array and display it
function rightClick() {
    nextQuote();
}

// grab a random quote and display it
function randomQuote() {
    newQuoteText = quoteSource[randomNumber].quote;
    newQuoteGenius = quoteSource[randomNumber].name;
    newQuoteId = quoteSource[randomNumber].id;
    if ((newQuoteGenius === null) || (newQuoteGenius == "") || (newQuoteGenius == " ")) { newQuoteGenius = "Unknown" }
    quoteContainer.fadeOut(timeAnimationIn, function () {
        quoteContainer.html('');
        quoteContainer.append('<p class="quote">' + newQuoteText + '</p>' + '<p id="name" class="name">' + '-' + newQuoteGenius + '</p>');
        quoteContainer.fadeIn(timeAnimationOut);
    });
    currentPosition++;
    updateCurrentQuoteId();
    console.log("called randomQuote");
}

// takes the next quote after the current shown quote and displays it
function nextQuote() {
    currentQuote++;
    currentPosition++;
    if (currentQuote >= sourceLength) {
        currentQuote = 0;
    }
    newQuoteText = quoteSource[currentQuote].quote;
    newQuoteGenius = quoteSource[currentQuote].name;
    newQuoteId = quoteSource[currentQuote].id;
    if ((newQuoteGenius === null) || (newQuoteGenius == "") || (newQuoteGenius == " ")) { newQuoteGenius = "Unknown" }
    quoteContainer.fadeOut(timeAnimationIn, function () {
        quoteContainer.html('');
        quoteContainer.append('<p class="quote">' + newQuoteText + '</p>' + '<p id="name" class="name">' + '-' + newQuoteGenius + '</p>');
        quoteContainer.fadeIn(timeAnimationOut);
    });
    shownQuotes.push(currentQuote);
    updateCurrentQuoteId();
    console.log("called nextQuote");
}

// takes the last quote behind the current shown quote and displays it
function lastQuote() {
    if (currentQuote <= 0) {
        currentQuote = sourceLength;
    }
    currentQuote--;
    newQuoteText = quoteSource[currentQuote].quote;
    newQuoteGenius = quoteSource[currentQuote].name;
    newQuoteId = quoteSource[currentQuote].id;
    if ((newQuoteGenius === null) || (newQuoteGenius == "") || (newQuoteGenius == " ")) { newQuoteGenius = "Unknown" }
    quoteContainer.fadeOut(timeAnimationIn, function () {
        quoteContainer.html('');
        quoteContainer.append('<p class="quote">' + newQuoteText + '</p>' + '<p id="name" class="name">' + '-' + newQuoteGenius + '</p>');
        quoteContainer.fadeIn(timeAnimationOut);
    });
    updateCurrentQuoteId();
    console.log("called lastQuote");
}
function setQuote(a) {
    currentQuote = a;
    newQuoteText = quoteSource[currentQuote].quote;
    newQuoteGenius = quoteSource[currentQuote].name;
    newQuoteId = quoteSource[currentQuote].id;
    if ((newQuoteGenius === null) || (newQuoteGenius == "") || (newQuoteGenius == " ")) { newQuoteGenius = "Unknown" }
    quoteContainer.fadeOut(timeAnimationIn, function () {
        quoteContainer.html('');
        quoteContainer.append('<p class="quote">' + newQuoteText + '</p>' + '<p id="name" class="name">' + '-' + newQuoteGenius + '</p>');
        quoteContainer.fadeIn(timeAnimationOut);
    });
    updateCurrentQuoteId();
    console.log("called setQuote");
}
// check if the next intended quote is not disliked or diabled
function chkIfValid() {

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
    toast("Quote copied to clipboard!", 'short', 'bottom')
    console.log("Called copyQuote")
}
function toast(a,b,c) {
    alert("Copied to clipboard");
    console.log("Function:toast");
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