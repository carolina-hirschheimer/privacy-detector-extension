
// PEGA COOKIES DA WINDOW ABERTA
async function displayCookies(tabs) {
  let tab = tabs.pop();
  let cookieList = document.getElementById('cookie-list');
  let totalCookies = document.getElementById('total-cookies');

  browser.cookies.getAll({ url: tab.url }).then(cookies => {
    if (cookies.length > 0) {

      // Pega total de cookies
      let t = document.createElement("p");
      t.textContent = `Total Cookies: ${cookies.length}`;
      totalCookies.appendChild(t);

      for (let cookie of cookies) {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(`${cookie.name}: ${cookie.value}`));
        cookieList.appendChild(li);
      }

      let urls = Array.from(document.querySelectorAll("link, img, script, iframe"))
        .map(e => e.href || e.src);
      console.log(urls);
    } else {
      let p = document.createElement("p");
      p.appendChild(document.createTextNode("No cookies in this tab."));
      cookieList.parentNode.appendChild(p);
    }

  });
}

// PEGA EXTERNAL CONNECTIONS DA WINDOW ABERTA
async function displayExtConnect(tabs) {
  let tab = tabs.pop();
  let itemList = document.getElementById('external-connections');

  const response = await browser.tabs.sendMessage(tab.id, { method: "external" });
  const items = response.data;

  if (items.length > 0) {
    for (let item of items) {
      if (item !== "") {
        let li = document.createElement("li");
        li.textContent = item;
        itemList.appendChild(li);
      }
    }
  } else {
    let p = document.createElement("p");
    p.textContent = "No storage in this tab.";
    itemList.parentNode.appendChild(p);
  }
}

// PEGA LOCAL STORAGE DA WINDOW ABERTA
async function displayLS(tabs) {
  let tab = tabs.pop();
  let itemList = document.getElementById('local-storage');
  
  const response = await browser.tabs.sendMessage(tab.id, { method: "local-storage" });
  const items = response.data;
  
  displayStorageItems(items, itemList);
}

// PEGA SESSION STORAGE DA WINDOW ABERTA
async function displaySS(tabs) {
  let tab = tabs.pop();
  let itemList = document.getElementById('session-storage');
  
  const response = await browser.tabs.sendMessage(tab.id, { method: "session-storage" });
  const items = response.data;
  
  displayStorageItems(items, itemList);
}

// FAZ DISPLAY DO SESSION STORAGE E LOCAL STORAGE
function displayStorageItems(items, itemList) {
  if (items.length > 0) {
    for (let item of items) {
      if (item !== undefined) {
        let li = document.createElement("li");
        li.textContent = item;
        itemList.appendChild(li);
      }
    }
  } else {
    let p = document.createElement("p");
    p.textContent = "No storage connections in this tab.";
    itemList.parentNode.appendChild(p);
  }
}

// PEGA WINDOW ABERTA
function getCurrentWindow() {
    return browser.tabs.query({currentWindow: true, active: true});
  }
  
getCurrentWindow().then(displayCookies) 
getCurrentWindow().then(displayExtConnect)
getCurrentWindow().then(displayLS) 
getCurrentWindow().then(displaySS) 

// DROP DOWNS

const cookie_title = document.getElementById('cookie-title');
const cookie_list = document.getElementById('cookie-list');

cookie_title.addEventListener('click', function() {
  if (cookie_list.style.display === 'none') {
    cookie_list.style.display = 'block';
  } else {
    cookie_list.style.display = 'none';
  }
});

const ext_title = document.getElementById('ext-title');
const ext_list = document.getElementById('external-connections');

ext_title.addEventListener('click', function() {
  if (ext_list.style.display === 'none') {
    ext_list.style.display = 'block';
  } else {
    ext_list.style.display = 'none';
  }
});

const ss_title = document.getElementById('ss-title');
const ss_list = document.getElementById('session-storage');

ss_title.addEventListener('click', function() {
  if (ss_list.style.display === 'none') {
    ss_list.style.display = 'block';
  } else {
    ss_list.style.display = 'none';
  }
});

const ls_title = document.getElementById('ls-title');
const ls_list = document.getElementById('local-storage');

ls_title.addEventListener('click', function() {
  if (ls_list.style.display === 'none') {
    ls_list.style.display = 'block';
  } else {
    ls_list.style.display = 'none';
  }
});