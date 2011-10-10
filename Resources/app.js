Ti.UI.setBackgroundColor('#000');

var tabGroup = Ti.UI.createTabGroup();

var win_record = Ti.UI.createWindow({
    title:'記録する',
    backgroundColor:'#fff',
    url:'win_record.js'
});
var tab1 = Ti.UI.createTab({
    icon:'KS_nav_views.png',
    title:'記録する',
    window:win_record
});

var win_view = Ti.UI.createWindow({
    title:'記録を見る',
    backgroundColor:'#fff',
    url:'win_view.js'
});
var tab2 = Ti.UI.createTab({
    icon:'KS_nav_ui.png',
    title:'記録を見る',
    window:win_view
});

var debug = Ti.UI.createWindow({
    title:'DEBUG',
    backgroundColor:'#fff',
    url:'debug.js'
});
var tab3 = Ti.UI.createTab({
    icon:'KS_nav_ui.png',
    title:'DEBUG',
    window:debug
});

tabGroup.addTab(tab1);
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);

tabGroup.open();
