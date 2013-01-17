function showAlert(text) {
    $('#alertdialog').style.display = 'block';
}

function hideAlert() {
    $('#alertdialog').style.display = 'none';
}

var menu = null;
$(document).ready(function() {
    menu = Menu('menuarea');
    menu.initSubMenu(0);
    menu.addMenuTitle(0, createsearchitem('Search', 'searchinput', null, null));
    menu.addMenuItem(0, createmenuitem('Item 1', null, null));
    menu.addMenuItem(0, createmenuitem('Item 2', null, null));
    menu.addMenuItem(0, createmenuitem('Item 3', null, function() {
	menu.initSubMenu(1, false);
	menu.addMenuTitle(1, createbackitem(0, 'Back', '', function() {
	    menu.refresh(0);
	    menu.showSubMenu(0);
	}));
	menu.refresh(1);
	menu.scrollUp(1);
	menu.showSubMenu(1);
    }));
    menu.addMenuItem(0, createmenuitem('Item 4', null, null));
    menu.addMenuItem(0, createmenuitem('Item 5', null, null));
    menu.addMenuItem(0, createmenuitem('Item 5', null, null));
    menu.addMenuItem(0, createmenuitem('Item 5', null, null));
    menu.addMenuItem(0, createmenuitem('Item 5', null, null));
    menu.addMenuItem(0, createmenuitem('Item 5', null, null));
    menu.addMenuItem(0, createmenuitem('Item 5', null, null));
    menu.refresh(0);
});
