var win1 = Ti.UI.currentWindow;
var rec_button = Ti.UI.createButton({title:'record'});
win1.rightNavButton = rec_button;

var forms = [];
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

var items = [];
var db = Ti.Database.open('gymreco');
var rows = db.execute('SELECT * FROM items WHERE status > 0 ORDER BY id DESC');
for (var i = 0; rows.isValidRow(); i++) {
    items.push({
        id:rows.fieldByName('id'),
        name:rows.fieldByName('name'),
        unit_name:rows.fieldByName('unit_name'),
        top: i * 50 + 10
    });
    rows.next();
}
rows.close();
db.close();

items.forEach(function (it) {
    var label1l_prop = default_prop;
    label1l_prop.text = it.name;
    label1l_prop.left = LABELL_LEFT;
    label1l_prop.top = it.top;
    var label1l = Ti.UI.createLabel(label1l_prop);

    var label1r_prop = default_prop;
    label1r_prop.text = it.unit_name;
    label1r_prop.left = LABELR_LEFT;
    label1r_prop.top = it.top;
    var label1r = Ti.UI.createLabel(label1r_prop);

    var form1 = Ti.UI.createTextField({
        color:'#333',
        hintText:'',
        height:FORM_HEIGHT,
        width:100,
        left:FORM_LEFT,
        top:it.top,
        borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        keyboardType:Ti.UI.KEYBOARD_NUMBER_PAD,
        returnKeyType:Ti.UI.RETURNKEY_DEFAULT
    });
    win1.add(label1l);
    win1.add(label1r);
    win1.add(form1);

    forms.push({form:form1, item:it});
});

rec_button.addEventListener('click', function(e) {
    forms.forEach(function(f){
        form_vals.push({item_id:f.item.id, value:f.form.value});
        f.form.blur();
        f.form.value = null;
    });

    if (! form_vals.length) {
        var dialog = Titanium.UI.createAlertDialog();
//         dialog.setTitle('アラートのテスト');
        dialog.setMessage('Input your trainning data.');
        dialog.show();
        return;
    }

    var dt = new Date();
    var year = dt.getFullYear();
    var month = dt.getMonth() + 1;
    var date = dt.getDate();
    var now =  year + '-' + month + '-' + date;
    var db = Ti.Database.open('gymreco');
    form_vals.forEach(function (v){
        if (! v.item_id || ! v.value) {
            return;
        }
        db.execute('INSERT INTO trainnings (item_id, value, created_at) VALUES (?, ?, ?)',
                   v.item_id, v.value, now);
    });
//     var rows = db.execute('SELECT * FROM trainnings');
//     while (rows.isValidRow()) {
//         Ti.API.info(' ITEM_ID: ' + rows.fieldByName('item_id') +
//                     ' VALUE: ' + rows.fieldByName('value') +
//                     ' CREATED_AT: ' + rows.fieldByName('created_at'));
//         rows.next();
//     }
    form_vals = [];
    rows.close();
    db.close();
});
