const os = require('os')
const electron = require('electron')
const darkMode = require('dark-mode');
// 切换dark mode
function switchNightMode() {
    darkMode.toggle().then(() => {
        console.log('Toggled between dark and light mode');
    });
}

