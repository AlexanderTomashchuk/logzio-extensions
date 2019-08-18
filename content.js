"use strict";

const searchInputLoadingInterval = window.setInterval(() => {
    const iframe = document.getElementById("dashboard.kibana.iframe");
    if (!iframe) return;

    const iframeDocument = iframe.contentDocument;
    if (!iframeDocument) return;

    const searchInput = (iframeDocument.getElementsByClassName("kuiLocalSearchInput") || [])[0];
    if (!searchInput) return;

    searchInputWasLoadedHandler(searchInput);
}, 1000);

function searchInputWasLoadedHandler(searchInput) {
    clearInterval(searchInputLoadingInterval);

    searchInput.addEventListener("paste", (event) => {
        const pasteText = (event.clipboardData || window.clipboardData).getData('text');

        if (!isGuid(pasteText)) return;

        searchInput.value = `trackingId:"${pasteText}" OR "${pasteText}, ${pasteText}"`;

        event.preventDefault();

        var onChangeEvent = new Event("change");
        searchInput.dispatchEvent(onChangeEvent);
    });
}

function isGuid(value) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(value);
}