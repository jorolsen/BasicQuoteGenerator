// max quote length: 370 char.
var dislikedPlaceholder = [];
var defaultSettings = [
    {
        isTimerOn: false,
        isStaticNotificationActive: false,
        isNotificationActive: false,
        defaultNotificationTime: 0,
    },
];
var quoteDatabase=[
    {
        id: 1,
        quote: "Start by doing what's necessary; then do what's possible; and suddenly you are doing the impossible.",
        name:"Francis of Assisi"
    },
    {
        id: 2,
        quote:"Believe you can and you're halfway there.",
        name:"Theodore Roosevelt"
    },
    {
        id: 3,
        quote:"It does not matter how slowly you go as long as you do not stop.",
        name:"Confucius"
    },
    {
        id: 4,
        quote:"Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.",
        name:"Thomas A. Edison"
    },
    {
        id: 5,
        quote:"The will to win, the desire to succeed, the urge to reach your full potential... these are the keys that will unlock the door to personal excellence.",
        name:"Confucius"
    },
    {
        id: 6,
        quote:"Don't watch the clock; do what it does. Keep going.",
        name:"Sam Levenson"
    },
    {
        id: 7,
        quote:"A creative man is motivated by the desire to achieve, not by the desire to beat others.",
        name:"Ayn Rand"
    },
    {
        id: 8,
        quote:"Start where you are. Use what you have. Do what you can.",
        name:"Arthur Ashe"
    },
    {
        id: 9,
        quote:"Ever tried. Ever failed. No matter. Try Again. Fail again. Fail better.",
        name:"Samuel Beckett"
    },
    {
        id: 10,
        quote:"Be yourself; everyone else is already taken.",
        name:"Oscar Wilde"
    },
    {
        id: 11,
        quote:"Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
        name:"Albert Einstein"
    },
    {
        id: 12,
        quote:"Always remember that you are absolutely unique. Just like everyone else.",
        name:"Margaret Mead"
    },
    {
        id: 13,
        quote:"Do not take life too seriously. You will never get out of it alive.",
        name:"Elbert Hubbard"
    },
    {
        id: 14,
        quote:"People who think they know everything are a great annoyance to those of us who do.",
        name:"Isaac Asimov"
    },
    {
        id: 15,
        quote:"Procrastination is the art of keeping up with yesterday.",
        name:"Don Marquis"
    },
    {
        id: 16,
        quote:"Get your facts first, then you can distort them as you please.",
        name:"Mark Twain"
    },
    {
        id: 17,
        quote:"A day without sunshine is like, you know, night.",
        name:"Steve Martin"
    },
    {
        id: 18,
        quote:"My grandmother started walking five miles a day when she was sixty. She's ninety-seven now, and we don't know where the hell she is.",
        name:"Ellen DeGeneres"
    },
    {
        id: 19,
        quote:"Don't sweat the petty things and don't pet the sweaty things.",
        name:"George Carlin"
    },
    {
        id: 20,
        quote:"Hapiness is not something ready made. It comes from your own actions.",
        name:"Dalai Lama"
    },
    {
        id: 21,
        quote:"Don't confuse education with schooling, I didn't go to havard but people who work for me did.",
        name:"Elon Musk"
    },
    {
        id: 22,
        quote:"Think big and don't listen to people who tell you it can't be done. Life's too short to think small.",
        name:""
    },
    {
        id: 23,
        quote:"Do one thing every day that scares you.",
        name:""
    },
    {
        id: 24,
        quote:"The distance between number one and number two is always a constant. If you want to improve an organization, you have to improve yourself and the organization gets pulled up with you. That is a big lesson.",
        name:"Indra Nooyi Chairperson and CEO, PepsiCo"
    },
    {
        id: 25,
        quote:"Lots of companies don't succeed over time. What do they fundamentally do wrong? They usually miss the future.",
        name:"Larry Page CEO, Google Inc."
    },
    {
        id: 26,
        quote:"There's an entrepreneuer right now, scared to death, making excuses, saying \"It's not the right time just yet.\" There's no such thing as a good time.",
        name:"Kevin Plank CEO, Under Armour"
    },
    {
        id: 27,
        quote:"You can't connect the dots looking forward; you can only connect them looking backwards. So you have to trust that the dots will somehow connect in your future.",
        name:"Steve Jobs CEO, Apple Inc."
    },
    {
        id: 28,
        quote:"Don't worry about failure; you only have to be right once.",
        name:"Drew Houston Cp-Founder and CEO, Dropbox"
    },
    {
        id: 29,
        quote:"If opportunity doesn't knock, build a door.",
        name:"Milton Berle"
    },
    {
        id: 30,
        quote:"A goal should scare you a little, and excite you a lot.",
        name:"Joe Vitale"
    },
    {
        id: 31,
        quote:"A comfort zone is a beautiful place, but nothing ever grows there.",
        name:""
    },
    {
        id: 32,
        quote:"Happiness is found when you stop comparing yourself to other people.",
        name:""
    },
    {
        id: 33,
        quote:"Sometimes the smallest step in the right direction ends up being the biggest step of your life. Tip toe if you must, but take the step.",
        name:""
    },
    {
        id: 34,
        quote:"There are no limits to what you can accomplish, except the limits you place on your own thinking.",
        name:"Brian Tracy"
    },
    {
        id: 35,
        quote:"One small crack does not mean that you are broken. It means that you were put to the test and you didn't fall appart.",
        name:"Linda Poindexter"
    },
    {
        id: 36,
        quote:"The one who falls and gets up is so much stronger than the one who never fell.",
        name:""
    },
    {
        id: 37,
        quote:"Make your life a masterpeice; imangine no limitation on what you can be, have or do.",
        name:"Brian Tracy"
    },
    {
        id: 38,
        quote:"F.E.A.R. has two meanings - Forget Everything And Run OR Face Everything And Rise. The choice is yours.",
        name:""
    },
    {
        id: 39,
        quote:"Don't worry about failures, worry about the chances you miss when you don't even try.",
        name:"Jack Canfield"
    },
    {
        id: 40,
        quote:"Be the change that you wish to see in the world.",
        name:"Mahatma Gandhi"
    },
    {
        id: 41,
        quote:"Work hard in silence, let your success be your noise.",
        name:"Frank Ocean"
    },
    {
        id: 42,
        quote:"Those who are crazy enough to think they can change the world usually do.",
        name:"Steve Jobs"
    },
    {
        id: 43,
        quote:"It is better to lead from behind and to put others in front, especially when you celebrate victory when nice things occur. You take the front line when there is danger. Then people will appreciate your leadership.",
        name:"Nelson Mandela"
    },
    {
        id: 44,
        quote:"People ask the difference between a leader and a boss.The leader works in the open, and the boss in covert. The leader leads, and the boss drives.",
        name:"Theodore Roosevelt"
    },
    {
        id: 45,
        quote:"The common question that gets asked in business is, ‘why?’ That’s a good question, but an equally valid question is, ‘why not?’",
        name:"Jeff Bezos, CEO of Amazon.com"
    },
    {
        id: 46,
        quote:"It takes 20 years to build a reputation and five minutes to ruin it. If you think about that, you’ll do things differently.",
        name:"Warren Buffett, CEO of Berkshire Hathaway"
    },
    {
        id: 47,
        quote:"A man must be big enough to admit his mistakes, smart enough to profit from them, and strong enough to correct them.",
        name:"John C. Maxwell"
    },
    {
        id: 48,
        quote:"Remembering that you are going to die is the best way I know to avoid the trap of thinking you have something to lose. You are already naked. There is no reason not to follow your heart.",
        name:"Steve Jobs"
    },
    {
        id: 49,
        quote:"If you’re changing the world, you’re working on important things. You’re excited to get up in the morning.",
        name:"Larry Page, CEO of Google"
    },
    {
        id: 50,
        quote:"To me, business isn’t about wearing suits or pleasing stockholders. It’s about being true to yourself, your ideas and focusing on the essentials.",
        name:"Richard Branson, CEO of Virgin Group"
    },
    {
        id: 51,
        quote:"There are a lot of things that go into creating success. I don’t like to do just the things I like to do. I like to do things that cause the company to succeed. I don’t spend a lot of time doing my favorite activities.",
        name:"Michael Dell, CEO of Dell Computers"
    },
    {
        id: 52,
        quote:"I always did something I was a little not ready to do. I think that’s how you grow. When there’s that moment of ‘Wow, I’m not really sure I can do this,’ and you push through those moments, that’s when you have a breakthrough.",
        name:"Marissa Mayer, CEO of Yahoo"
    },
    {
        id: 53,
        quote:"I’d highly prefer to settle versus battle … I’ve always hated litigation. We need people to invent their own stuff.",
        name:"Tim Cook, CEO of Apple"
    },
    {
        id: 54,
        quote:"When you innovate, you’ve got to be prepared for everyone telling you you’re nuts.",
        name:"Larry Ellison, CEO of Oracle"
    },
    {
        id: 55,
        quote:"Don't compare youself with anyone in this world...if you do so, you are insulting yourself.",
        name:"Bill Gates, CEO of Microsoft"
    },
    {
        id: 56,
        quote:"I do not think that there is any other quality so essential to success of any kind as the quality of perseverance. It overcomes almost everything, even nature.",
        name:"John D. Rockefeller, CEO of Standard Oil"
    },
];