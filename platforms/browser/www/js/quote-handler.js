var customQuotePlaceholer = [];
var dislikedQuotesPlaceholder = [];
var addButton;
var quoteActivity;
var editActivity;
var quoteTitle;
var quoteList;
var numberOfDislikedQuotes;
var numberOfCustomQuotes;
var textArea;
var authorArea;

$(document).ready(function () {
    var contentPlacement = $('#header').position().top + $('#header').height();
    $('#quote-list').css('margin-top',contentPlacement);
    $('#edit-field').css('margin-top',contentPlacement);

    quoteActivity = document.getElementsByClassName("quotes-activity")[0];
    editActivity = document.getElementsByClassName("edit-activity")[0];
    quoteTitle = document.getElementsByClassName("quote-title")[0];
    addButton = document.getElementsByClassName("add-button")[0];
    textArea = document.getElementsByClassName("edit-box")[0];
    authorArea = document.getElementsByClassName("author-box")[0];
    quoteList = $(".item-list-ul");
    quoteActivity.style.display = "none";
});

function backToIndex() {
    addButton.style.display = "none";
    quoteActivity.style.display = "none";
}

function backToList() {
    editActivity.style.display = "none";
}

function customQuotes() {
    quoteTitle.innerHTML = "Custom Quotes";
    quoteActivity.style.display = "block";
    addButton.style.display = "block";
    quoteList.html('');
    displayList = quoteSource.reverse();
    for(i=0;i<sourceLength;i++) {
        quoteList.append('<li class="item-list-li" onclick="editQuote(' + i + ')"><i class="material-icons list-item-icon">edit</i><p class="list-item-text">' + displayList[i].quote.substring(0,22) +' ... ' +  '</p></li>'); 
    }
    
}
function dislikedQuotes() {
    quoteTitle.innerHTML = "Disliked Quotes";
    quoteActivity.style.display = "block";
    addButton.style.display = "none";
}
var quoteText;
var quoteName;
var quoteId;
function editQuote(a) {
    quoteText = quoteSource[a].quote;
    quoteName = quoteSource[a].name;
    quoteId = quoteSource[a].id;
    textArea.value = quoteText;
    authorArea.value = quoteName;
    editActivity.style.display = "block";

    console.log("Edit: " + quoteId);
}
function deleteQuote() {
    quoteSource.splice(quoteSource.indexOf(quoteSource[quoteId -1]), 1);
    toast("Quote Deleted", 600, 'bottom', 2500);
}