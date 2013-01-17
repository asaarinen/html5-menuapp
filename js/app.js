function showAlert(text) {
    document.getElementById('alerttitle').innerHTML = text;
    document.getElementById('alertdialog').style.display = 'block';
}

function hideAlert() {
    document.getElementById('alertdialog').style.display = 'none';
}

var menu = null;
$(document).ready(function() {
    menu = Menu('menuarea');
    menu.initSubMenu(0);
    menu.addMenuTitle(0, menu.createSearchItem('Search', 'searchinput', null, null));
    menu.addMenuItem(0, menu.createMenuDivider('Divider 1', null, null));
    menu.addMenuItem(0, menu.createMenuItem('Item 1', null, null));
    menu.addMenuItem(0, menu.createMenuItem('Item 2', null, null));
    menu.addMenuItem(0, menu.createMenuDivider('Divider 2', null, null));
    menu.addMenuItem(0, menu.createMenuItem('Item 3', null, function() {
	menu.initSubMenu(1, false);
	menu.addMenuTitle(1, menu.createBackItem(0, 'Back', ''));
	menu.refresh(1);
	menu.scrollUp(1);
	menu.showSubMenu(1);
    }));
    menu.addMenuItem(0, menu.createMenuItem('Item 4', null, function() {
	showAlert('Hello');
	setTimeout(hideAlert, 3000);
    }));
    menu.addMenuItem(0, menu.createMenuItem('Item 5', null, null));
    menu.addMenuItem(0, menu.createMenuItem('Item 5', null, null));
    menu.addMenuItem(0, menu.createMenuItem('Item 5', null, null));
    menu.addMenuItem(0, menu.createMenuDivider('Divider 3', null, null));
    menu.addMenuItem(0, menu.createMenuItem2C('Item 5', 'Item 5'));
    menu.addMenuItem(0, menu.createMenuItem2C('Item 5', 'Long Text Maybe Goes To Two Rows'));
    menu.addMenuItem(0, menu.createMenuItem('Lorem Ipsum Dolores Et Sonos', 'Homo Lupus Homini Est'));
    menu.addMenuItem(0, menu.createMenuItem('Lorem Ipsum Dolores Et Sonos', 'Homo Lupus Homini Est'));
    menu.refresh(0);
});
