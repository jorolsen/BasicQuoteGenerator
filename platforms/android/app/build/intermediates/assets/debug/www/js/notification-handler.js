function notificationHandler() {

    cordova.plugins.notification.local.hasPermission(function (granted) {
        console.warn("App has notification permissions: " + granted);
    });
    // cordova.plugins.notification.local.registerPermission(function (granted) {
    // });
    cordova.plugins.notification.local.schedule({
        title: 'Random quote of the day',
        text: (returnSource[0].quote + " -" + returnSource[0].name),
        foreground: true
    });
}
function sceduleQuote(a) {
    // cordova.plugins.notification.local.schedule({
    //     title: 'Random quote of the day!',
    //     trigger: { every: {hour: 11, minute: 22, second: 0} }
    // });

    cordova.plugins.notification.local.schedule({
        title: "Ramdom quote",
        text: (passedQuote + " -" + passedName),
        trigger: { every: 'hour' }
    });
}
function sendRandomQuote(a) {
    var passedQuote = a[0].quote;
    var passedName = a[0].name;
    var passedId = a[0].id;
    if ((passedName == null) || (passedName == "") || (passedName == " ")) {
        passedName = "Unknown";
    }
    cordova.plugins.notification.local.schedule({
        title: "Ramdom quote",
        text: (passedQuote + " -" + passedName),
        foreground: true
    });
}