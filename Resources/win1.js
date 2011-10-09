var win1 = Ti.UI.currentWindow;
var form_vals = [];

var label1l = Ti.UI.createLabel({
	color:'#999',
	text:'ランニング',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'left',
	width:'auto',
    height:35,
    left:15,
    top:50
});
var label1r = Ti.UI.createLabel({
	color:'#999',
	text:'分',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'left',
	width:'auto',
    height:35,
    left:250,
    top:50
});
var rec = Ti.UI.createButton({
    title:'決定',
    height:5
});
// rec.addEventListener('click', function(e) {
//     rec.blur();
// });
var form1 = Ti.UI.createTextField({
    color:'#333',
    hintText:'',
    height:35,
    width:100,
    left:140,
    top:50,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    keyboardToolbar:[rec],
    keyboardType:Ti.UI.KEYBOARD_NUMBER_PAD,
    returnKeyType:Ti.UI.RETURNKEY_DEFAULT
});
win1.add(label1l);
win1.add(label1r);
win1.add(form1);
form1.addEventListener('blur', function(e){
    Ti.API.info(e.value);
    form_vals.push({type:1, value:e.value});
//     form1.blur();
});


var label2l = Ti.UI.createLabel({
	color:'#999',
	text:'腹筋',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'left',
	width:'auto',
    height:35,
    left:15,
    top:100
});
var label2r = Ti.UI.createLabel({
	color:'#999',
	text:'回',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'left',
	width:'auto',
    height:35,
    left:250,
    top:100
});
var form2 = Ti.UI.createTextField({
    color:'#333',
    hintText:'',
    height:35,
    width:100,
    left:140,
    top:100,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    keyboardType:Ti.UI.KEYBOARD_NUMBER_PAD,
    returnKeyType:Ti.UI.RETURNKEY_DEFAULT
});
form2.addEventListener('blur', function(e){
    Ti.API.info(e.value);
    form_vals.push({type:2, value:e.value});
});


win1.add(label2l);
win1.add(label2r);
win1.add(form2);

var label3l = Ti.UI.createLabel({
	color:'#999',
	text:'背筋',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'left',
	width:'auto',
    height:35,
    left:15,
    top:150
});
var label3r = Ti.UI.createLabel({
	color:'#999',
	text:'回',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'left',
	width:'auto',
    height:35,
    left:250,
    top:150
});
var form3 = Ti.UI.createTextField({
    color:'#333',
    hintText:'',
    height:35,
    width:100,
    left:140,
    top:150,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    keyboardType:Ti.UI.KEYBOARD_NUMBER_PAD,
    returnKeyType:Ti.UI.RETURNKEY_DEFAULT
});
form3.addEventListener('blur', function(e){
    Ti.API.info(e.value);
    form_vals.push({type:3, value:e.value});
});

win1.add(label3l);
win1.add(label3r);
win1.add(form3);

var rec_button = Ti.UI.createButton({
    title:'記録',
//     style:Ti.UI.iPhone.SystemButtonStyle.PLAIN,
    height:35,
    width:200,
//     left:140,
    top:200
});
rec_button.addEventListener('click', function(e) {
    var dt = new Date();
    var year = dt.getFullYear();
    var month = dt.getMonth() + 1;
    var date = dt.getDate();
    var now =  year + '-' + month + '-' + date;
    alert(now);
    var db = Ti.Database.open('gymreco');
    db.execute('CREATE TABLE IF NOT EXISTS TRAINNINGS (type INTEGER, value INTEGER, created_at TEXT)');
    form_vals.forEach(function(v){
//         var next_id = Ti.Database.DB.lastInsertRowId;
        db.execute('INSERT INTO TRAINNINGS (type, value, created_at) VALUES (?, ?, ?)',
                   v.type, v.value, now);
    });
    var rows = db.execute('SELECT * FROM TRAINNINGS');
    while (rows.isValidRow()) {
        Ti.API.info(' TYPE: ' + rows.fieldByName('type') +
                    ' VALUE: ' + rows.fieldByName('value') +
                    ' CREATED_AT: ' + rows.fieldByName('created_at'));
        rows.next();
    }
    rows.close();
    db.close();

    alert('記録しました');
});

win1.add(rec_button);


var select_button = Ti.UI.createButton({
    title:'記録を見る',
//     style:Ti.UI.iPhone.SystemButtonStyle.PLAIN,
    height:35,
    width:200,
//     left:140,
    top:250
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

win1.add(select_button);


// drop table
var drop_table = Ti.UI.createButton({
    title:'テーブルを削除する',
    height:35,
    width:200,
    top:300
});
drop_table.addEventListener('click', function(e) {
    var db = Ti.Database.open('gymreco');
    db.execute('drop table TRAINNINGS');
    db.close();
    alert('テーブルを削除しました');
});
win1.add(drop_table);

// insert dummy data
var insert_dummy = Ti.UI.createButton({
    title:'ダミーデータを作成する',
    height:35,
    width:200,
    top:350
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
win1.add(insert_dummy);
