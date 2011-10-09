var win = Ti.UI.currentWindow;

var select_button = Ti.UI.createButton({
    title:'記録を見る',
//     style:Ti.UI.iPhone.SystemButtonStyle.PLAIN,
    height:35,
    width:200,
//     left:140,
    top:50
});
select_button.addEventListener('click', function(e) {
    var db = Ti.Database.open('gymreco');
    var rows = db.execute('SELECT * FROM TRAINNINGS');
    while (rows.isValidRow()) {
        Ti.API.info('TYPE: ' + rows.fieldByName('type') +
                    ' VALUE: ' + rows.fieldByName('value') +
                    ' CREATED_AT: ' + rows.fieldByName('created_at'));
        rows.next();
    }
    rows.close();
    db.close();
});

win.add(select_button);


// drop table
var drop_table = Ti.UI.createButton({
    title:'テーブルを削除する',
    height:35,
    width:200,
    top:100
});
drop_table.addEventListener('click', function(e) {
    var db = Ti.Database.open('gymreco');
    db.execute('drop table TRAINNINGS');
    db.close();
    alert('テーブルを削除しました');
});
win.add(drop_table);

// insert dummy data
var insert_dummy = Ti.UI.createButton({
    title:'ダミーデータを作成する',
    height:35,
    width:200,
    top:150
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
        db.execute('INSERT INTO TRAINNINGS (type, value, created_at) VALUES (?, ?, ?)',
                   d[0], 30, d[1]);
    });
    db.close();
});
win.add(insert_dummy);
