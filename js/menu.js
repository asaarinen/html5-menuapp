function Menu(parentelem, maxlevels) {

    if( maxlevels == null )
	maxlevels = 4;
    var submenuwidth = Math.floor(100/maxlevels);

    // sanity check input and get the element
    if( typeof parentelem == 'string' )
	parentelem = document.getElementById(parentelem);
    else if( typeof parentelem != 'object' )
	return null;
    if( parentelem == null )
	return null;
    if( parentelem.appendChild === undefined )
	return null;

    // create menu id
    if( parentelem.id != null && parentelem.id != '' ) 
	var menuid = ':' + parentelem.id;
    else
	var menuid = '-' + Math.floor(Math.random() * 10000)

    // create the menu element
    var menuhoriz = document.createElement('div');
    menuhoriz.setAttribute('class', 'menuhoriz');
    menuhoriz.setAttribute('id', 'menuhoriz' + menuid);
    menuhoriz.setAttribute('style', 'width: ' + (maxlevels*100) + '%;');
    parentelem.appendChild(menuhoriz);

    // scrollers
    var currentLevel = 0;
    var scrollers = {};

    // functions

    function getCurrentLevel() {
	return currentLevel;
    }

    function initSubMenu(level, scrollable) {
	if( level < 0 || level >= maxlevels )
	    return;

	if( scrollable === null || scrollable === undefined )
	    scrollable = true;
	
	var panel = document.getElementById('menupanel' + level + menuid);
	if( panel ) {
	    while( panel.hasChildNodes() )
		panel.removeChild(panel.lastChild);
	} else {
	    panel = document.createElement('div');
	    panel.setAttribute('class', 'menupanel');
	    panel.setAttribute('id', 'menupanel' + level + menuid);
	    panel.setAttribute('style', 'width: ' + submenuwidth + '%; left: ' + (level*submenuwidth) + '%;');
	    menuhoriz.appendChild(panel);
	}
	if( scrollers[level] ) {
	    scrollers[level].destroy();
	    scrollers[level] = null;
	}
	
	var title = document.createElement("div");
	title.setAttribute("class", "menuitem-bar menuitem-title");
	title.setAttribute("id", "menutitle" + level + menuid);
	panel.appendChild(title);

	var touch = document.createElement("div");
	touch.setAttribute("class", "menutouch");
	touch.setAttribute("id", "menutouch" + level + menuid);
	panel.appendChild(touch);

	if( scrollable ) {
	    var scroll = document.createElement("div");
	    scroll.setAttribute('class', 'menuitems');
	    scroll.setAttribute('id', 'menuitems' + level + menuid);
	    
	    touch.appendChild(scroll);
	    
	    scrollers[level] = new iScroll('menutouch' + level + menuid, 
					   { hScroll: false, 
					     hScrollBar: false, 
					     vScrollBar: false });
	}
    }

    function showSubMenu(level) {
	if( level < 0 || level >= maxlevels )
	    return;
	currentLevel = level;
	var transform = 'translate3d(-' + (level*submenuwidth) + '%,0,0)';
	menuhoriz.style.webkitTransform = transform;
	menuhoriz.style.MozTransform = transform;
	menuhoriz.style.OTransform = transform;
	menuhoriz.style.msTransform = transform;
	menuhoriz.style.transform = transform;
    }

    function addMenuTitle(level, item) {
	if( level < 0 || level >= maxlevels )
	    return;
	var title = document.getElementById('menutitle' + level + menuid);
	if( title )
	    title.appendChild(item);
    }

    function setMenuTitleHeight(level, height) {
	var elem = document.getElementById('menutouch' + level + menuid);
	if( elem )
	    elem.style.top = height;

	var elem = document.getElementById('menutitle' + level + menuid);
	if( elem )
	    elem.style.height = height;
    }

    function addMenuItem(level, item) {
	if( level < 0 || level >= maxlevels )
	    return;
	var scroll = document.getElementById('menuitems' + level + menuid);
	if( scroll )
	    scroll.appendChild(item);
	else {
	    var touch = document.getElementById('menutouch' + level + menuid);
	    if( touch )
		touch.appendChild(item);
	}
    }

    function refresh(level) {
	if( level < 0 || level >= maxlevels )
	    return;
	if( scrollers[level] )
	    scrollers[level].refresh();
    }
    
    function scrollDown(level) {
	if( level < 0 || level >= maxlevels )
	    return;
	if( scrollers[level] )
	    scrollers[level].scrollTo(0, 100, 250, true);
    }
    
    function scrollUp(level) {
	if( level < 0 || level >= maxlevels )
	    return;
	if( scrollers[level] )
	    scrollers[level].scrollTo(0, 0);
    }

    function createDiv(classname, idname, childelem) {
	var e = document.createElement('div');
	e.setAttribute('class', classname);
	if( idname )
	    e.setAttribute('id', pid + ":" + idname);
	if( childelem ) {
	    if( childelem.length ) {
		for( var ci = 0; ci < childelem.length; ci++ )
		    if( childelem[ci] != null )
			e.appendChild(childelem[ci]);
	    } else 
		e.appendChild(childelem);
	}
	return e;
    }

    function createLabel(innertext, thclass) {
	var table = document.createElement("table");
	table.setAttribute('class', 'label-centertext');
	var tr = document.createElement("tr");
	tr.setAttribute('class', 'label-centertext');
	var th = document.createElement('th');
	if( thclass )
	    th.setAttribute('class', 'label-centertext ' + thclass);
	else
	    th.setAttribute('class', 'label-centertext');
	tr.appendChild(th);
	table.appendChild(tr);
	
	th.innerHTML = innertext;
	
	return table;
    }    

    function createSearchItem(placeholder, inputid, onsubmit, onedit) {
	
	var input = document.createElement('input');
	input.setAttribute('type', 'search');
	input.setAttribute('class', 'menuitem-search-input');
	if( typeof inputid == 'string' )
	    input.setAttribute('id', inputid);
	if( typeof placeholder == 'string' )
	    input.setAttribute('placeholder', placeholder);
	if( onedit ) {
	    input.onkeyup = onedit;
	    input.onfocus = onedit;
	    input.onchange = onedit;
	}
	
	var icon = createDiv('menuitem-search-icon');

	var inputdiv = createDiv('menuitem-search-input-div', null, 
	    [ input, icon ]);

	var form = document.createElement('form');
	form.setAttribute('class', 'menuitem-search-form');
	if( onsubmit ) {
	    form.onsubmit = function() {
		onsubmit(input.value);
		return false;
	    }
	}
	form.appendChild(inputdiv);

	var button = createDiv('menuitem-search-button', '', 
  	                       [ createLabel(placeholder, 'label-footer-small'), 
 	                         createDiv('menuitem-search-submit-icon') ]);

	var item = createDiv('menuitem-bar', null, 
	    [ form, button ]);
	return item;
    }

    function createMenuItem(text, itemclass, onclick) {
	var item = createDiv('menuitem-bar ' + itemclass, '',
	    [ createDiv('menuitem-bar-icon', '', createDiv('menuitem-bar-iconimg')),
  	      createDiv('menuitem-bar-text', '', createLabel(text, 'label-leftalign')) ]);
	
	if( onclick ) {
	    var arrowbox = createDiv('menuitem-bar-arrow', '', 
		createDiv('menuitem-bar-arrowimg'));
	    item.appendChild(arrowbox);
            item.onclick = onclick;
	}
	
	return item;
    }

    function createMenuItem2C(text1, text2, itemclass, onclick) {
	var arrowdiv = null;
	if( onclick )
	    arrowdiv = createDiv('menuitem-bar-arrow', '', 
				 createDiv('menuitem-bar-arrowimg'));
	var item = createDiv('menuitem-bar ' + itemclass, '', 
	    [
		createDiv('menuitem-bar-icon', '', 
			  createDiv('menuitem-bar-iconimg')),
		createDiv('menuitem-bar-text1of2', '', 
			  createLabel(text1, 'label-leftalign')),
		createDiv('menuitem-bar-text2of2', '', 
			  createLabel(text2, 'label-rightalign')),
		arrowdiv
	    ]);
	
	if( onclick )
	    item.onclick = onclick;
	
	return item;
    }


    function createBackItem(level, text, itemclass, onbackfun) {

	var item = createDiv('menuitem-bar ' + itemclass,
	    '',
	    [ createDiv('menuitem-bar-text', '', 
	                createLabel(text, 'label-bold')),
  	      createDiv('menuitem-bar-arrow-left', '', 
	                createDiv('menuitem-bar-arrowimg-left')) ]);

	item.onclick = function(l) { 
	    var level = l; 
	    return function() { 
		if( onbackfun )
		    onbackfun(); 
		showSubMenu(level);
	    } 
	}(level);
	
	return item;
    }

    function createMenuDivider(text, itemclass) {
	return createDiv('menuitem-bar menuitem-divider', '',
			 createDiv('menuitem-bar-text ' + itemclass, '', 
				   createLabel(text, 
					       'label-bold label-leftalign')));
    }

    function createMenuTextArea(text, itemclass) {
	var textbox = createDiv('menuitem-textarea');
	textbox.innerHTML = text;
	
	return createDiv('menuitem-bar-autoheight ' + 
			 itemclass, '', textbox);
    }

    function createMenuImage(imgurl, itemclass) {
	var img = document.createElement('img');
	img.setAttribute('class', 'menuitem-image');
	img.setAttribute('src', imgurl);

	img.onload = function(lvl) {
	    return function() {
		refresh(lvl);
	    }}(currentLevel);

	return createDiv('menuitem-bar-autoheight ' + itemclass, '', img);
    }

    function createMenuPage() {
	return createDiv('menuitem-page');
    }

    function createBlankItem() {
	return createDiv('menuitem-bar');
    }

    function createGridItem(size, itemclass, logo, logotext, bottomtext, 
			    center, onclick) {
	var item = createDiv('menuitem-grid-' + size + 'x' + size + ' ' + 
			     (center?'menuitem-grid-center':'') + ' ' + 
			     itemclass);
	
	if( logotext )
	    item.appendChild(createDiv('menuitem-grid-label', '', 
				       createLabel(logotext, '')));
	


	if( logo ) {
	    var logodiv = createDiv('menuitem-grid-icon', '');
	    logodiv.style.backgroundImage = 'url(' + logo + ')';
	    item.appendChild(logodiv);
	}

	if( bottomtext ) {
	    item.appendChild(createDiv('menuitem-grid-label', '',
				       createLabel(bottomtext, 'label-footer')));
	}
	
	if( onclick )
	    item.onclick = onclick;
	
	return item;
    }
    
    // return the object
    return {
	getCurrentLevel: getCurrentLevel,
	initSubMenu: initSubMenu,
	showSubMenu: showSubMenu,
	addMenuTitle: addMenuTitle,
	setMenuTitleHeight: setMenuTitleHeight,
	addMenuItem: addMenuItem,
	refresh: refresh,
	scrollDown: scrollDown,
	scrollUp: scrollUp,
	createSearchItem: createSearchItem,
	createMenuItem: createMenuItem,
	createMenuItem2C: createMenuItem2C,
	createBackItem: createBackItem,
	createMenuDivider: createMenuDivider,
	createMenuTextArea: createMenuTextArea,
	createMenuImage: createMenuImage,
	createMenuPage: createMenuPage,
	createGridItem: createGridItem,
	createBlankItem: createBlankItem
    };
}








    
