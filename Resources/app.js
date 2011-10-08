// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


// create base UI tab and root window
var win1 = Titanium.UI.createWindow({
    title:'Gym Reco',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({
    icon:'KS_nav_views.png',
    title:'recording',
    window:win1
});
var label1l = Titanium.UI.createLabel({
	color:'#999',
	text:'ランニング',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'left',
	width:'auto',
    height:35,
    left:15,
    top:50
});
var label1r = Titanium.UI.createLabel({
	color:'#999',
	text:'分',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'left',
	width:'auto',
    height:35,
    left:250,
    top:50
});
var form1 = Ti.UI.createTextField({
    color:'#333',
    hintText:'',
    height:35,
    width:100,
    left:140,
    top:50,
    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    keyboardType:Ti.UI.KEYBOARD_NUMBER_PAD,
    returnKeyType:Ti.UI.RETURNKEY_DEFAULT
});

var label2l = Titanium.UI.createLabel({
	color:'#999',
	text:'腹筋',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'left',
	width:'auto',
    height:35,
    left:15,
    top:100
});
var label2r = Titanium.UI.createLabel({
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

var label3l = Titanium.UI.createLabel({
	color:'#999',
	text:'背筋',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'left',
	width:'auto',
    height:35,
    left:15,
    top:150
});
var label3r = Titanium.UI.createLabel({
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
    var now = dt.getFullYear() + '-' + dt.getMonth() + '-' + dt.getDate()
            + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();
    alert(now);
    var db = Ti.Database.open('gymreco');
//     db.execute('drop table TRAINNINGS');
    db.execute('CREATE TABLE IF NOT EXISTS TRAINNINGS (id INTEGER, type INTEGER, value INTEGER, created_at TEXT)');
    db.execute('INSERT INTO TRAINNINGS (id, type, value, created_at) VALUES (?, ?, ?, ?)', 10, 20, 30, now);
    var rows = db.execute('SELECT * FROM TRAINNINGS');
    while (rows.isValidRow()) {
        Ti.API.info('ID: ' + rows.fieldByName('id')
                    + ' TYPE: ' + rows.fieldByName('type')
                    + ' VALUE: ' + rows.fieldByName('value')
                    + ' CREATED_AT: ' + rows.fieldByName('created_at')
                   );
        rows.next();
    }
    rows.close();
    db.close();

    alert('記録しました');
});


win1.add(label1l);
win1.add(label1r);
win1.add(form1);
win1.add(label2l);
win1.add(label2r);
win1.add(form2);
win1.add(label3l);
win1.add(label3r);
win1.add(form3);
win1.add(rec_button);


//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({
    title:'Tab 2',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({
    icon:'KS_nav_ui.png',
    title:'Tab 2',
    window:win2
});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win2.add(label2);



//
//  add tabs
//
tabGroup.addTab(tab1);
tabGroup.addTab(tab2);


// open tab group
tabGroup.open();
