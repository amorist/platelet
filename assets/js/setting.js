const { ipcRenderer } = require("electron");

(function() {
  $("#hitokoto-value").val(store.get('hitokoto'))
})();

$(".save").click(() => {
  const val = $("#hitokoto-value").val()
  ipcRenderer.send("setting-hitokoto", val);
});

$(".close").click(() => {
  hideSettingWindow();
});

// hide setting window.
function hideSettingWindow() {
  ipcRenderer.send("hide-setting-window");
}
