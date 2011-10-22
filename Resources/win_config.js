var win = Ti.UI.currentWindow;
var rec_button = Ti.UI.createButton({title:'new item'});
rec_button.addEventListener('click', function(e) {
    var win = Ti.UI.createWindow({
        url: 'trainning_add.js',
        title:'new item'
    });
	Ti.UI.currentTab.open(win,{animated:true});
});
win.rightNavButton = rec_button;

var data = [];

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