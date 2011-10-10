var win1 = Ti.UI.currentWindow;
var form_vals = [];

var FORM_HEIGHT = 35;
var LABELL_LEFT = 15;
var FORM_LEFT   = 140;
var LABELR_LEFT = 250;

var default_prop = {
	color:'#999',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'left',
	width:'auto',
    height:FORM_HEIGHT
};

var label1l_prop = default_prop;
label1l_prop.text = 'ランニング';
label1l_prop.left = LABELL_LEFT;
label1l_prop.top = 10;
var label1l = Ti.UI.createLabel(label1l_prop);

var label1r_prop = default_prop;
label1r_prop.text = '分';
label1r_prop.left = LABELR_LEFT;
label1r_prop.top = 10;
var label1r = Ti.UI.createLabel(label1r_prop);

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
    height:FORM_HEIGHT,
    width:100,
    left:FORM_LEFT,
    top:10,
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
