var win = Ti.UI.currentWindow;

var view_rec = Ti.UI.createButton({
    title:'記録を見る',
//     style:Ti.UI.iPhone.SystemButtonStyle.PLAIN,
    height:35,
    width:200,
//     left:140,
    top:50
});
view_rec.addEventListener('click', function(e) {
    var db = Ti.Database.open('gymreco');
    var rows = db.execute('SELECT * FROM trainnings');
    while (rows.isValidRow()) {
        Ti.API.info('ITEM_ID: ' + rows.fieldByName('item_id') +
                    ' VALUE: ' + rows.fieldByName('value') +
                    ' CREATED_AT: ' + rows.fieldByName('created_at'));
        rows.next();
    }
    rows.close();
    db.close();
});

win.add(view_rec);
var view_items = Ti.UI.createButton({
    title:'種目を見る',
//     style:Ti.UI.iPhone.SystemButtonStyle.PLAIN,
    height:35,
    width:200,
//     left:140,
    top:100
});
view_items.addEventListener('click', function(e) {
    var db = Ti.Database.open('gymreco');
    var rows = db.execute('SELECT * FROM items');
    while (rows.isValidRow()) {
        Ti.API.info('ID: ' + rows.fieldByName('id') +
                    ' NAME: ' + rows.fieldByName('name') +
                    ' UNIT_NAME: ' + rows.fieldByName('unit_name'));
        rows.next();
    }
    rows.close();
    db.close();
});

win.add(view_items);


// drop table
var drop_table1 = Ti.UI.createButton({
    title:'trainningsテーブルを作り直す',
    height:35,
    width:200,
    top:150
});
drop_table1.addEventListener('click', function(e) {
    var db = Ti.Database.open('gymreco');
    db.execute('drop table trainnings');
    db.execute('CREATE TABLE IF NOT EXISTS trainnings (id INTEGER PRIMARY KEY AUTOINCREMENT, item_id INTEGER, value INTEGER, created_at TEXT)');
    db.close();
    alert('テーブルを作り直す');
});
win.add(drop_table1);

var drop_table2 = Ti.UI.createButton({
    title:'itemsテーブルを作り直す',
    height:35,
    width:200,
    top:200
});
drop_table2.addEventListener('click', function(e) {
    var db = Ti.Database.open('gymreco');
    db.execute('drop table items');
    db.execute('CREATE TABLE items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, unit_name TEXT, status INTEGER)');
    db.close();
    alert('テーブルを作り直しました');
});
win.add(drop_table2);

// insert dummy data
var insert_dummy = Ti.UI.createButton({
    title:'ダミーデータを作成する',
    height:35,
    width:200,
    top:250
});
insert_dummy.addEventListener('click', function(e) {
    var db = Ti.Database.open('gymreco');
    var dummy_date_list = [
        [1, '2011-10-01'],
        [2, '2011-10-01'],
        [1, '2011-10-02'],
        [3, '2011-10-02'],
        [1, '2011-10-03'],
        [2, '2011-10-03'],
        [3, '2011-10-03'],
        [1, '2011-10-04'],
        [1, '2011-10-05'],
        [3, '2011-10-05'],
        [1, '2011-10-06'],
        [2, '2011-10-06'],
        [1, '2011-10-07'],
        [1, '2011-10-08'],
        [1, '2011-10-10']
    ];
    dummy_date_list.forEach(function(d){
        db.execute('INSERT INTO trainnings (item_id, value, created_at) VALUES (?, ?, ?)',
                   d[0], 30, d[1]);
    });
    db.close();
});
win.add(insert_dummy);
