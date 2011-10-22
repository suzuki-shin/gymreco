var win = Ti.UI.currentWindow;
var rec_button = Ti.UI.createButton({title:'record'});
win.rightNavButton = rec_button;

var form_val = {name:'', unit_name:'回'};

var FORM_HEIGHT = 35;
var LABELL_LEFT = 15;
var FORM_LEFT   = 140;
var LABELR_LEFT = 250;

var default_prop = {
	color:'#333',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'left',
	width:'auto',
    height:FORM_HEIGHT
};

var label1l_prop = default_prop;
label1l_prop.text = '種目名';
label1l_prop.left = LABELL_LEFT;
label1l_prop.top = 50;
var label1l = Ti.UI.createLabel(label1l_prop);

var form1 = Ti.UI.createTextField({
    color:'#333',
    hintText:'',
    height:FORM_HEIGHT,
    width:150,
    left:FORM_LEFT,
    top:50,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    keyboardType:Ti.UI.KEYBOARD_DEFAULT,
    returnKeyType:Ti.UI.RETURNKEY_DEFAULT
});
win.add(label1l);
win.add(form1);

var label2l_prop = default_prop;
label2l_prop.text = '単位名';
label2l_prop.left = LABELL_LEFT;
label2l_prop.top = 100;
var label2l = Ti.UI.createLabel(label2l_prop);

var form2 = Ti.UI.createTextField({
    color:'#333',
    hintText:'',
    height:FORM_HEIGHT,
    width:150,
    left:FORM_LEFT,
    top:100,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    keyboardType:Ti.UI.KEYBOARD_DEFAULT,
    returnKeyType:Ti.UI.RETURNKEY_DEFAULT
});
win.add(label2l);
win.add(form2);

rec_button.addEventListener('click', function(e) {
    if (! form1.value || ! form2.value) {
        var dialog = Titanium.UI.createAlertDialog();
//         dialog.setTitle('アラートのテスト');
        dialog.setMessage('Input new item name & unit_name.');
        dialog.show();
        return;
    }

    var db = Ti.Database.open('gymreco');
    db.execute('INSERT INTO items (name, unit_name, status) VALUES (?, ?, ?)', form1.value, form2.value, 1);
    var rows = db.execute('SELECT * FROM items');
    while (rows.isValidRow()) {
        Ti.API.info(' ID: ' + rows.fieldByName('id') +
                    ' NAME: ' + rows.fieldByName('name') +
                    ' UNIT_NAME: ' + rows.fieldByName('unit_name'));
        rows.next();
    }
    form1.value = null;
    form2.value = null;
    rows.close();
    db.close();

    var win = Ti.UI.createWindow({
        url: 'win_config.js',
        title:'config'
    });
	Ti.UI.currentTab.open(win,{animated:false});
});
