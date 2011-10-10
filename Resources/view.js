var win = Ti.UI.currentWindow;
var names = [
    'ストレッチ',
    'ランニング',
    '腹筋',
    '背筋'
];                     // TODO: あとでどこかグローバルな設定に持たせる
var data = [];

var db = Ti.Database.open('gymreco');
db.execute('CREATE TABLE IF NOT EXISTS TRAINNINGS (type INTEGER, value INTEGER, created_at TEXT)');
var rows = db.execute("SELECT * FROM TRAINNINGS WHERE created_at = ?", win.title);
while (rows.isValidRow()) {
    Ti.API.info(' CREATED_AT: ' + rows.fieldByName('created_at') +
                ' TYPE: ' + rows.fieldByName('type') +
                ' VALUE: ' + rows.fieldByName('value'));
    data.push({title:names[rows.fieldByName('type')] + ' ' + rows.fieldByName('value')});
    rows.next();
}
rows.close();
db.close();

var tableview = Ti.UI.createTableView({data:data});
win.add(tableview);
