var win2 = Ti.UI.currentWindow;

var data = [];

var db = Ti.Database.open('gymreco');
var rows = db.execute('SELECT created_at FROM trainnings GROUP BY created_at ORDER BY created_at DESC');
while (rows.isValidRow()) {
    Ti.API.info(' CREATED_AT: ' + rows.fieldByName('created_at'));
    data.push({title:rows.fieldByName('created_at'), hasDetail:true, test:'view.js'});
    rows.next();
}
rows.close();
db.close();


var tableview = Ti.UI.createTableView({
    data: data
});

win2.add(tableview);
tableview.addEventListener('click', function(e) {
    if (e.rowData.test) {
        var win = Ti.UI.createWindow({
            url: e.rowData.test,
            title:e.rowData.wintitle || e.rowData.title
        });
		Ti.UI.currentTab.open(win,{animated:true});
    }
});