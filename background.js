var fmtJsonContextMenuItem = {
    "id": "Jipy:fmtJSON"
    , "title": "Format JSON"
    , "contexts": ["selection"]
};

var fmtJsonStringContextMenuItem = {
    "id": "Jipy:fmtJSONString"
    , "title": "Format Escaped JSON"
    , "contexts": ["selection"]
};

function runFormatter(cmd) {
    // Get current tab; SEE: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/query#Syntax
    browser.tabs.query({ active: true, currentWindow: true })
        .then(function (tabs) {
            if (tabs.length > 0) {
                browser.tabs.sendMessage(tabs[0].id, cmd);
            }
        }, (err) => { }).catch((err) => { });
}

// Register Context Menu; SEE: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Context_menu_items
browser.contextMenus.create(fmtJsonContextMenuItem);
browser.contextMenus.create(fmtJsonStringContextMenuItem);
browser.contextMenus.onClicked.addListener(function (info) {
    if (info.menuItemId !== fmtJsonContextMenuItem.id
        && info.menuItemId !== fmtJsonStringContextMenuItem.id) {
        return;
    }
    runFormatter(info.menuItemId);
});


// Register button; SEE: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Browser_action#Specifying_the_browser_action
browser.browserAction.onClicked.addListener((tab) => {
    // Sending message to Content Script; SEE: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/sendMessage
    browser.tabs.sendMessage(tab.id, fmtJsonContextMenuItem.id);
});

// Register Hotkey handler
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/commands/onCommand
browser.commands.onCommand.addListener(function (cmd) {
    if (cmd === 'FormatJSON') {
        runFormatter(fmtJsonContextMenuItem.id);
    }
    else if (cmd === 'FormatJSONString') {
        runFormatter(fmtJsonStringContextMenuItem.id);
    }
});