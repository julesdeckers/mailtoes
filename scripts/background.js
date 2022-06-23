let clicks = 0;

let toes = [
    {
        name: "mailtoe",
        mailUrl: "url",
        baseUri: "baseURI" 
    }
]

/*
Log that we received the message.
Then display a notification. The notification contains the URL,
which we read from the message.
*/
const notify = (message) => {
    console.log("bg script received message");
    const title = "Mailtoe captured!";
    const content = "Captured: " + message.uri + "\nBase: " + message.url;
    browser.notifications.create("mailtoe-notification-" + rnd(5, rnd.alphaLower), {
        "type": "basic",
        "iconUrl": browser.extension.getURL("/icon/mailtoes-icon.png"),
        "title": title,
        "message": content
    });
    browser.browserAction.setBadgeText({ text: (++clicks).toString() });
};

const rnd = (() => {
    const gen = (min, max) => max++ && [...Array(max - min)].map((s, i) => String.fromCharCode(min + i));

    const sets = {
        num: gen(48, 57),
        alphaLower: gen(97, 122),
        alphaUpper: gen(65, 90),
        special: [...`~!@#$%^&*()_+-=[]\{}|;:'",./<>?`]
    };

    function* iter(len, set) {
        if (set.length < 1) set = Object.values(sets).flat();
        for (let i = 0; i < len; i++) yield set[Math.random() * set.length | 0]
    }

    return Object.assign(((len, ...set) => [...iter(len, set.flat())].join('')), sets);
})();

/*
Assign `notify()` as a listener to messages from the content script.
*/
browser.runtime.onMessage.addListener(notify);