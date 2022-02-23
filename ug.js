// ==UserScript==
// @name           UltimateGuitar Library Downloader
// @description    It adds a "Download as JSON" button to the mytabs page on UltimateGuitar.
// @author         Fabio "Blacklight" Manganiello
// @version        1.0
// @grant          none
// @include        https://www.ultimate-guitar.com/user/mytabs
// ==/UserScript==

/**
 * There are two ways to use this script:
 *
 * 1. Install it as a Greasemonkey script (or whatever extension you use for custom UserScript).
 *    Every time you browse to your UltimateGuitar page, the Download button will appear next to
 *    the header.
 *
 * 2. Manually paste the code in the browser developer console - the button will be added on the
 *    fly. You can also manually call `getTabs` from the developer console to access, filter
 *    and manipulate the list of objects.
 */


function getTabs() {
    let artist = null;
    return [
        ...document.querySelector('article[isdesktop=true] div').childNodes
    ].slice(1).map(item => {
        const childNodes = [...item.childNodes];
        const parsedItem = {};

        if (childNodes.length > 0) {
            const cellContent = childNodes[0].innerText.trim();
            if (cellContent.length)
                artist = cellContent;
        }

        if (childNodes.length > 1) {
            const cellContent = childNodes[1].innerText.trim();
            if (cellContent.length)
                parsedItem.title = cellContent;

            const link = childNodes[1].querySelector('a').getAttribute('href');
            if (link.length)
                parsedItem.link = link;
        }

        if (!artist && parsedItem.title)
            return;

        parsedItem.artist = artist;
        return parsedItem;
    }).filter(item => item)
}

function downloadTabs() {
    const tabs = getTabs();
    window.open('data:application/json,' + encodeURIComponent(JSON.stringify(tabs)));
}

function addDownloadButton() {
    const header = document.querySelector('main section header');
    if (!header)
        return;

    if (header.querySelector('button.__download-btn'))
        return;

    const btn = document.createElement('button');
    btn.classList.add('__download-btn');
    btn.innerText = 'Download as JSON';
    btn.onclick = downloadTabs;
    header.querySelector('section').appendChild(btn);
}

window.onload = addDownloadButton;

