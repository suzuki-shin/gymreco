var win = Ti.UI.currentWindow;

var db = Ti.Database.open('gymreco');
var item_rows = db.execute('SELECT * FROM items ORDER BY id DESC');
var items = [];
for (var i = 0; item_rows.isValidRow(); i++) {
    items.push({
        name:item_rows.fieldByName('name'),
        unit_name:item_rows.fieldByName('unit_name'),
        top: i * 50 + 10
    });
    item_rows.next();
}
item_rows.close();

var rows = db.execute("SELECT * FROM trainnings WHERE created_at = ?", win.title);
var data = [];
while (rows.isValidRow()) {
    Ti.API.info(' CREATED_AT: ' + rows.fieldByName('created_at') +
                ' ITEM_ID: ' + rows.fieldByName('item_id') +
                ' VALUE: ' + rows.fieldByName('value'));
    var j = rows.fieldByName('item_id') - 1;
    data.push({title:items[j].name + ' ' + rows.fieldByName('value') + ' ' + items[j].unit_name});
    rows.next();
}
rows.close();
db.close();

var tableview = Ti.UI.createTableView({data:data});
win.add(tableview);
