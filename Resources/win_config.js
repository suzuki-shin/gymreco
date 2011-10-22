var win = Ti.UI.currentWindow;

var data = [
    {title:'新規追加', hasDetail:true, test:'trainning_add.js'}
//     {title:'トレッドミル', hasDetail:true, test:'view.js'},
//     {title:'レッグプレス', hasDetail:true, test:'view.js'},
//     {title:'チェストプレス', hasDetail:true, test:'view.js'}
];

var db = Ti.Database.open('gymreco');
db.execute('CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, unit_name TEXT)');
var rows = db.execute('SELECT * FROM items ORDER BY id DESC');
while (rows.isValidRow()) {
//     Ti.API.info(' CREATED_AT: ' + rows.fieldByName('created_at'));
    data.push({title:rows.fieldByName('name')});
    rows.next();
}
rows.close();
db.close();

var tableview = Ti.UI.createTableView({
    data: data,
    style: Ti.UI.iPhone.TableViewStyle.GROUPED
});

win.add(tableview);
tableview.addEventListener('click', function(e) {
    if (e.rowData.test) {
        var win = Ti.UI.createWindow({
            url: e.rowData.test,
            title:e.rowData.wintitle || e.rowData.title
        });
		Ti.UI.currentTab.open(win,{animated:true});
    }
});