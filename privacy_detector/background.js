const urls = Array.from(document.querySelectorAll("link, img, script, iframe"), e => e.href || e.src);

browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method === "external") {
    sendResponse({ data: urls });
  } else if (request.method === "local-storage") {
    sendResponse({ data: Object.entries(localStorage) });
  } else if (request.method === "session-storage") {
    sendResponse({ data: Object.entries(sessionStorage) });
  } else {
    sendResponse({ data: undefined });
  }
  return true;
});
