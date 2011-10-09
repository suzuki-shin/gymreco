Ti.UI.setBackgroundColor('#000');

var tabGroup = Ti.UI.createTabGroup();

var win1 = Ti.UI.createWindow({
    title:'Gym Reco',
    backgroundColor:'#fff',
    url:'win1.js'
});
var tab1 = Ti.UI.createTab({
    icon:'KS_nav_views.png',
    title:'recording',
    window:win1
});

var win2 = Ti.UI.createWindow({
    title:'Tab 2',
    backgroundColor:'#fff',
    url:'win2.js'
});
var tab2 = Ti.UI.createTab({
    icon:'KS_nav_ui.png',
    title:'Tab 2',
    window:win2
});

var debug = Ti.UI.createWindow({
    title:'DEBUG',
    backgroundColor:'#fff',
    url:'debug.js'
});
var debug = Ti.UI.createTab({
    icon:'KS_nav_ui.png',
    title:'DEBUG',
    window:debug
});

tabGroup.addTab(tab1);
tabGroup.addTab(tab2);
tabGroup.addTab(debug);

tabGroup.open();
