const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('index.html', 'utf8');

const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.on("error", (err) => {
  console.log("PAGE ERROR:", err.message);
});
virtualConsole.on("log", (msg) => {
  console.log("PAGE LOG:", msg);
});

const dom = new JSDOM(html, { 
    runScripts: 'dangerously',
    virtualConsole
});

dom.window.document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        try {
            console.log("Tabs:", dom.window.document.querySelectorAll('.tab-btn').length);
            dom.window.document.querySelector('[data-target="view-ux"]').click();
            console.log("UX display:", dom.window.document.getElementById('view-ux').style.display);
        } catch (e) {
            console.log("CLICK ERROR:", e.message);
        }
    }, 100);
});
