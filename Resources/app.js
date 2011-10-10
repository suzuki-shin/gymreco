Ti.UI.setBackgroundColor('#000');

var tabGroup = Ti.UI.createTabGroup();

var tab1 = Ti.UI.createTab({
    icon:'KS_nav_views.png',
    title:'記録',
    window:Ti.UI.createWindow({
        title:'記録',
        backgroundColor:'#fff',
        url:'win_record.js'
    })
});

var tab2 = Ti.UI.createTab({
    icon:'KS_nav_ui.png',
    title:'履歴',
    window:Ti.UI.createWindow({
        title:'履歴',
        backgroundColor:'#fff',
        url:'win_view.js'
    })
});

var tab3 = Ti.UI.createTab({
    icon:'KS_nav_ui.png',
    title:'設定',
    window:Ti.UI.createWindow({
        title:'設定',
        backgroundColor:'#fff',
        url:'win_config.js'
    })
});

var tab4 = Ti.UI.createTab({
    icon:'KS_nav_ui.png',
    title:'DEBUG',
    window:Ti.UI.createWindow({
        title:'DEBUG',
        backgroundColor:'#fff',
        url:'debug.js'
    })
});

tabGroup.addTab(tab1);
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);

tabGroup.open();
