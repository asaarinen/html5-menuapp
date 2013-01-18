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
    menu.addMenuTitle(0, menu.createSearchItem
		      ('Search', 'searchinput', 
		       function(query) {
			   menu.initSubMenu(1);
			   menu.addMenuItem(1, menu.createBackItem(0, 'Searching \'' + query + '\'', ''));
			   menu.addMenuItem(1, menu.createMenuDivider('Best Matches'));
			   menu.addMenuItem(1, menu.createMenuItem('Search Result 1', null, function() {}));
			   menu.addMenuItem(1, menu.createMenuItem('Search Result 2', null, function() {}));
			   menu.addMenuItem(1, menu.createMenuItem('Search Result 3', null, function() {}));
			   menu.addMenuItem(1, menu.createMenuDivider('Related'));
			   menu.addMenuItem(1, menu.createMenuItem('Related Result 1', null, function() {}));
			   menu.addMenuItem(1, menu.createMenuItem('Related Result 2', null, function() {}));
			   menu.addMenuItem(1, menu.createMenuItem('Related Result 3', null, function() {}));
			   menu.refresh(1);
			   menu.scrollUp(1);
			   menu.showSubMenu(1);
		       }));
    menu.addMenuItem(0, menu.createMenuDivider('Non-clickable items', null, null));
    menu.addMenuItem(0, menu.createMenuItem('Item 1', null, null));
    menu.addMenuItem(0, menu.createMenuItem('Item 2', null, null));
    menu.addMenuItem(0, menu.createMenuDivider('Various page layouts', null, null));
    menu.addMenuItem(0, menu.createMenuItem('Grid Layout', null, function() {
	menu.initSubMenu(1);
	menu.addMenuTitle(1, menu.createBackItem(0, 'Back', ''));
	menu.addMenuItem(1, menu.createMenuDivider('2x2 grid', null, null));
	menu.addMenuItem(1, menu.createGridItem(2, '', null, 'Item 1', null, false, null));
	menu.addMenuItem(1, menu.createGridItem(2, '', null, null, 'Item 2', false, null));
	menu.addMenuItem(1, menu.createGridItem(2, '', null, null, 'Item 3', false, null));
	menu.addMenuItem(1, menu.createGridItem(2, '', null, 'Item 4', null, false, null));
	menu.addMenuItem(1, menu.createMenuDivider('3x3 grid', null, null));
	menu.addMenuItem(1, menu.createGridItem(3, '', null, 'Item 5', null, false, null));
	menu.addMenuItem(1, menu.createGridItem(3, '', null, 'Item 6', null, false, null));
	menu.addMenuItem(1, menu.createGridItem(3, '', null, 'Item 7', null, false, null));
	menu.addMenuItem(1, menu.createGridItem(3, '', null, 'Item 8', null, false, null));
	menu.addMenuItem(1, menu.createMenuDivider('4x4 grid', null, null));
	menu.addMenuItem(1, menu.createGridItem(4, '', null, 'Item 9', null, false, null));
	menu.addMenuItem(1, menu.createGridItem(4, '', null, 'Item 10', null, false, null));
	menu.addMenuItem(1, menu.createGridItem(4, '', null, 'Item 11', null, false, null));
	menu.addMenuItem(1, menu.createGridItem(4, '', null, 'Item 12', null, false, null));
	menu.addMenuItem(1, menu.createGridItem(4, '', null, 'Item 13', null, false, null));
	menu.addMenuItem(1, menu.createGridItem(4, '', null, 'Item 14', null, false, null));
	menu.addMenuItem(1, menu.createGridItem(4, '', null, 'Item 15', null, false, null));
	menu.refresh(1);
	menu.scrollUp(1);
	menu.showSubMenu(1);
    }));
    menu.addMenuItem(0, menu.createMenuItem('Single full-page div', null, function() {
	menu.initSubMenu(1, false);
	var pagediv = menu.createMenuPage();
	pagediv.style.backgroundColor = 'rgb(200,50,50)';
	pagediv.setAttribute('id', 'mapdiv');
	menu.addMenuTitle(1, menu.createBackItem(0, 'Back', ''));
	menu.addMenuItem(1, pagediv);

	var template = 'http://c.tiles.mapbox.com/v3/examples.map-szwdot65/{Z}/{X}/{Y}.png';
	var provider = new MM.TemplatedLayer(template);
	var map = new MM.Map('mapdiv', provider);
	map.setCenter({ lat: 64.0, lon: 25.6 }).setZoom(10);

	menu.showSubMenu(1);
    }));
    menu.addMenuItem(0, menu.createMenuItem('Item 5', null, null));
    menu.addMenuItem(0, menu.createMenuDivider('Text Area', null, null));
    menu.addMenuItem(0, menu.createMenuTextArea(
	'<p>Tammikuinen aamu Puijon m&auml;kimontussa Kuopiossa. Pakkanen paukkuu parinkymmenen asteen tuntumassa, mutta m&auml;ess&auml; on p&auml;&auml;ll&auml; t&auml;ysi tohina.</p>' +
	    '<p>Osa Suomen k&auml;rkihypp&auml;&auml;jist&auml; harjoittelee maajoukkuevalmentaja Ville Kanteen johdolla. Eik&ouml; tuossa touhussa tule hieman kylm&auml;?</p>' +
	    '<p>- Alle ei nykyvarusteilla mahdu mit&auml;&auml;n muuta kuin millinohut liukaspintainen alusasu. Siihen ly&ouml;d&auml;&auml;n p&auml;&auml;lle viisi milli&auml; paksu m&auml;kipuku, joka p&auml;&auml;st&auml;&auml; jonkin verran ilmaa l&auml;pi. Kun pakkasta on parikymment&auml; astetta ja vauhtia on l&auml;hes sata kilometri&auml; tunnissa, niin siin&auml; voi jokainen kuvitella milt&auml; se tuntuu.</p>' +
	    '<p>Kanteen mukaan elektroniset laitteet kuten hissit, videokamerat ja radiopuhelimet saattavat lakata kovalla pakkasella toimintansa, mutta muuten homma on hypp&auml;&auml;j&auml;st&auml; kiinni.</p>' +
	    '<p>Maallikko ajattelisi, ett&auml; paukkupakkasella hypp&auml;&auml;misess&auml; ei siis ole mit&auml;&auml;n j&auml;rke&auml;, mutta asialla on Kanteen mukaan my&ouml;s k&auml;&auml;nt&ouml;puolensa.</p>' +
	    '<p>- Pakkaskelit ovat yleens&auml; my&ouml;s melko tuulettomia eli sen suhteen eritt&auml;in hyvi&auml; hyppykelej&auml;.</p>'));
    menu.addMenuItem(0, menu.createMenuDivider('Image', null, null));
    menu.addMenuItem(0, menu.createMenuImage('http://www.hs.fi/webstatic/images/helsingin-sanomat.png'));
    menu.addMenuItem(0, menu.createMenuDivider('Two-column Text', null, null));
    menu.addMenuItem(0, menu.createMenuItem2C('Item 5', 'Item 5'));
    menu.addMenuItem(0, menu.createMenuItem2C('Item 5', 'Long Text Maybe Goes To Two Rows'));
    menu.addMenuItem(0, menu.createMenuItem('Lorem Ipsum Dolores Et Sonos', 'Homo Lupus Homini Est'));
    menu.addMenuItem(0, menu.createMenuItem('Lorem Ipsum Dolores Et Sonos', 'Homo Lupus Homini Est'));
    menu.refresh(0);
});
