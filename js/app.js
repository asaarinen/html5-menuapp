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
	menu.initSubMenu(1);
	menu.addMenuTitle(1, menu.createBackItem(0, 'Back', ''));
	menu.addMenuItem(1, menu.createGridItem('', null, 'Item 1', null, false, null));
	menu.addMenuItem(1, menu.createGridItem('', null, null, 'Item 2', false, null));
	menu.addMenuItem(1, menu.createGridItem('', null, null, 'Item 3', false, null));
	menu.addMenuItem(1, menu.createGridItem('', null, 'Item 4', null, false, null));
	menu.addMenuItem(1, menu.createGridItem('', null, 'Item 5', null, false, null));
	menu.addMenuItem(1, menu.createGridItem('', null, 'Item 6', null, false, null));
	menu.refresh(1);
	menu.scrollUp(1);
	menu.showSubMenu(1);
    }));
    menu.addMenuItem(0, menu.createMenuItem('Item 4', null, function() {
	menu.initSubMenu(1, false);
	var pagediv = menu.createMenuPage();
	pagediv.style.backgroundColor = 'red';
	menu.addMenuTitle(1, menu.createBackItem(0, 'Back', ''));
	menu.addMenuItem(1, pagediv);
	menu.showSubMenu(1);
    }));
    menu.addMenuItem(0, menu.createMenuItem('Item 5', null, null));
    menu.addMenuItem(0, menu.createMenuItem('Item 5', null, null));
    menu.addMenuItem(0, menu.createMenuItem('Item 5', null, null));
    menu.addMenuItem(0, menu.createMenuDivider('Divider 3', null, null));
    menu.addMenuItem(0, menu.createMenuTextArea(
	'<p>Tammikuinen aamu Puijon m&auml;kimontussa Kuopiossa. Pakkanen paukkuu parinkymmenen asteen tuntumassa, mutta m&auml;ess&auml; on p&auml;&auml;ll&auml; t&auml;ysi tohina.</p>' +
	    '<p>Osa Suomen k&auml;rkihypp&auml;&auml;jist&auml; harjoittelee maajoukkuevalmentaja Ville Kanteen johdolla. Eik&ouml; tuossa touhussa tule hieman kylm&auml;?</p>' +
	    '<p>- Alle ei nykyvarusteilla mahdu mit&auml;&auml;n muuta kuin millinohut liukaspintainen alusasu. Siihen ly&ouml;d&auml;&auml;n p&auml;&auml;lle viisi milli&auml; paksu m&auml;kipuku, joka p&auml;&auml;st&auml;&auml; jonkin verran ilmaa l&auml;pi. Kun pakkasta on parikymment&auml; astetta ja vauhtia on l&auml;hes sata kilometri&auml; tunnissa, niin siin&auml; voi jokainen kuvitella milt&auml; se tuntuu.</p>' +
	    '<p>Kanteen mukaan elektroniset laitteet kuten hissit, videokamerat ja radiopuhelimet saattavat lakata kovalla pakkasella toimintansa, mutta muuten homma on hypp&auml;&auml;j&auml;st&auml; kiinni.</p>' +
	    '<p>Maallikko ajattelisi, ett&auml; paukkupakkasella hypp&auml;&auml;misess&auml; ei siis ole mit&auml;&auml;n j&auml;rke&auml;, mutta asialla on Kanteen mukaan my&ouml;s k&auml;&auml;nt&ouml;puolensa.</p>' +
	    '<p>- Pakkaskelit ovat yleens&auml; my&ouml;s melko tuulettomia eli sen suhteen eritt&auml;in hyvi&auml; hyppykelej&auml;.</p>'));
    menu.addMenuItem(0, menu.createMenuDivider('Divider 4', null, null));
    menu.addMenuItem(0, menu.createMenuImage('http://img.yle.fi/urheilu/arkisto/article5043164.ece/ALTERNATES/w960/M%C3%A4kihyppy_yleinen3_EPA'));
    menu.addMenuItem(0, menu.createMenuDivider('Divider 5', null, null));
    menu.addMenuItem(0, menu.createMenuItem2C('Item 5', 'Item 5'));
    menu.addMenuItem(0, menu.createMenuItem2C('Item 5', 'Long Text Maybe Goes To Two Rows'));
    menu.addMenuItem(0, menu.createMenuItem('Lorem Ipsum Dolores Et Sonos', 'Homo Lupus Homini Est'));
    menu.addMenuItem(0, menu.createMenuItem('Lorem Ipsum Dolores Et Sonos', 'Homo Lupus Homini Est'));
    menu.refresh(0);
});
