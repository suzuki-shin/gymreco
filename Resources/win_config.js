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
var rows = db.execute('SELECT * FROM items ORDER BY id DESC');
while (rows.isValidRow()) {
//     Ti.API.info(' CREATED_AT: ' + rows.fieldByName('created_at'));
    data.push({title:rows.fieldByName('name'),
               hasCheck:rows.fieldByName('status') ? true : false,
               id:rows.fieldByName('id')});
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
    var db = Ti.Database.open('gymreco');
    var status = e.rowData.hasCheck ? 0 : 1;
    db.execute('UPDATE items SET status = ? where id = ?', status, e.rowData.id);
    db.close();
    e.rowData.hasCheck = status;
});
