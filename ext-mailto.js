let mailtoes;

const handleMailtoeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("content script sending message");
    browser.runtime.sendMessage({"uri": e.target.href.replace(/^(mailto\:)/, ""), "url": e.target.baseURI});
};

const init = () => {
    const observer = new MutationObserver(list => {
        mailtoes = document.querySelectorAll('[href^=mailto]');
        mailtoes.forEach(mailtoe => mailtoe.addEventListener("click", handleMailtoeClick));
    });
    observer.observe(document.body, { attributes: true, childList: true, subtree: true });
}

init();