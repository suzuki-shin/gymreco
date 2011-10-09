var win = Ti.UI.currentWindow;
var data = [
    {title:'ランニング'},
    {title:'腹筋'},
    {title:'背筋'}
];
var tableview = Ti.UI.createTableView({data:data});
win.add(tableview);