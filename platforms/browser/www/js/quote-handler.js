var customQuotePlaceholer = [];
var dislikedQuotesPlaceholder = [];
var addButton;
var quoteActivity;
var quoteTitle;
var quoteList;
var numberOfDislikedQuotes;
var numberOfCustomQuotes;

$(document).ready(function () {
    var contentPlacement = $('#header').position().top + $('#header').height();
    $('#quote-list').css('margin-top',contentPlacement);
    
    quoteActivity = document.getElementsByClassName("quotes-activity")[0];
    quoteTitle = document.getElementsByClassName("quote-title")[0];
    addButton = document.getElementsByClassName("add-button")[0];
    quoteList = $(".item-list-ul");
    quoteActivity.style.display = "none";
});

function backToIndex() {
    addButton.style.display = "none";
    quoteActivity.style.display = "none";
}

function customQuotes() {
    quoteTitle.innerHTML = "Custom Quotes";
    quoteActivity.style.display = "block";
    addButton.style.display = "block";
    quoteList.html('');
    for(i=0;i<sourceLength;i++) {
        quoteList.append('<li class="item-list-li"><i class="material-icons list-item-icon">edit</i><p class="list-item-text">' + quoteSource[i].name + '</p></li>'); 
    }
    
}
function dislikedQuotes() {
    quoteTitle.innerHTML = "Disliked Quotes";
    quoteActivity.style.display = "block";
    addButton.style.display = "none";
}