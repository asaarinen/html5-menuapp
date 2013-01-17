
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
	    panel.setAttribute('style', 'left: ' + (level*submenuwidth) + '%;');
	    menuhoriz.appendChild(panel);
	}
	if( scrollers[level] ) {
	    scrollers[level].destroy();
	    scrollers[level] = null;
	}
	
	var title = document.createElement("div");
	title.setAttribute("class", "harea hbar menuitem menutitle");
	title.setAttribute("id", "menutitle" + level + menuid);
	panel.appendChild(title);

	var touch = document.createElement("div");
	touch.setAttribute("class", "harea menutouch");
	touch.setAttribute("id", "menutouch" + level + menuid);
	panel.appendChild(touch);

	if( scrollable ) {
	    var scroll = document.createElement("div");
	    scroll.setAttribute("class", "harea menuscroll");
	    scroll.setAttribute("id", "menuscroll" + level + menuid);
	    
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

    function addMenuItem(level, item) {
	if( level < 0 || level >= maxlevels )
	    return;
	var scroll = document.getElementById('menuscroll' + level + menuid);
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
	table.setAttribute('class', 'table-centertext');
	var tr = document.createElement("tr");
	tr.setAttribute('class', 'table-centertext');
	var th = document.createElement('th');
	if( thclass )
	    th.setAttribute('class', 'table-centertext ' + thclass);
	else
	    th.setAttribute('class', 'table-centertext');
	tr.appendChild(th);
	table.appendChild(tr);
	
	th.innerHTML = innertext;
	
	return table;
    }    

    function createSearchItem(placeholder, inputid, onsubmit, onedit) {
	
	var input = document.createElement('input');
	input.setAttribute('type', 'search');
	input.setAttribute('class', 'searchinput');
	if( typeof inputid == 'string' )
	    input.setAttribute('id', inputid);
	if( typeof placeholder == 'string' )
	    input.setAttribute('placeholder', placeholder);
	if( onedit ) {
	    input.onkeyup = onedit;
	    input.onfocus = onedit;
	    input.onchange = onedit;
	}
	
	var icon = createDiv('searchicon');

	var inputdiv = createDiv('searchinputdiv', null, 
	    [ input, icon ]);

	var form = document.createElement('form');
	form.setAttribute('class', 'searchform');
	if( onsubmit )
	    form.onsubmit = onsubmit;
	form.appendChild(inputdiv);

	var button = createDiv('searchbutton', '', 
  	                       [ createLabel(placeholder, 'footerlabel'), 
 	                         createDiv('browsearrow') ]);

	var item = createDiv('harea hbar rel menuitem searcharea', null, 
	    [ form, button ]);
	return item;
    }

    function createMenuItem(text, itemclass, onclick) {
	var item = createDiv('harea hbar rel menuitem ' + itemclass, '',
	    [ createDiv('menuitemicon', '', createDiv('menuitemiconimg')),
  	    createDiv('menuitemtext', '', createLabel(text, 'leftalign')) ]);
	
	if( onclick ) {
	    var arrowbox = createDiv('menuitemarrow', '', 
		createDiv('menuitemarrowimg'));
	    item.appendChild(arrowbox);
            item.onclick = onclick;
	}

	//new FastClick(item);
	
	return item;
    }

    function createMenuItem2C(text1, text2, itemclass, onclick) {
	var arrowdiv = null;
	if( onclick )
	    arrowdiv = createDiv('menuitemarrow', '', 
				 createDiv('menuitemarrowimg'));
	var item = createDiv('harea hbar rel menuitem ' + itemclass, '', 
	    [
		createDiv('menuitemicon', '', createDiv('menuitemiconimg')),
		createDiv('menuitemtext1', '', createLabel(text1, 'leftalign')),
		createDiv('menuitemtext2', '', createLabel(text2)),
		arrowdiv
	    ]);
	
	if( onclick )
	    item.onclick = onclick;
	
	return item;
    }


    function createBackItem(level, text, itemclass, onbackfun) {

	var item = createDiv('harea hbar rel menuitem menutitle ' + itemclass,
	    '',
	    [ createDiv('menuitemtext', '', createLabel(text, 'subtitle')),
  	      createDiv('menuitemarrow leftarrow', '', 
	                createDiv('menuitemarrowimg leftarrowimg')) ]);

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

    function createMenuDivider(text) {
	return createDiv('harea hbar rel menudivider', '',
			 createDiv('menuitemtext', '', 
				   createLabel(text, 'leftalign')));
    }
    
    // return the object
    return {
	getCurrentLevel: getCurrentLevel,
	initSubMenu: initSubMenu,
	showSubMenu: showSubMenu,
	addMenuTitle: addMenuTitle,
	addMenuItem: addMenuItem,
	refresh: refresh,
	scrollDown: scrollDown,
	scrollUp: scrollUp,
	createSearchItem: createSearchItem,
	createMenuItem: createMenuItem,
	createMenuItem2C: createMenuItem2C,
	createBackItem: createBackItem,
	createMenuDivider: createMenuDivider
    };
}

    


function removelastmenuitem(level) {
    var elem = document.getElementById('menuscroll' + level);
    if( elem )
	if( elem.hasChildNodes() ) 
	    elem.removeChild(elem.lastChild);
}


/*
          <div id="closekeypadbutton" onclick="closekeypad(); return true;">
            <table>
	      <tr>
		<th id="closetext">Close Keypad</th>
	      </tr>
	    </table>
	  </div>
*/

function createmenuimg(imgurl, itemclass) {
    var item = document.createElement("div");
    item.setAttribute("class", "harea rel menuitem " + itemclass);

    var img = document.createElement('img');
    img.setAttribute('class', 'menuimg');
    img.setAttribute('src', imgurl);
    item.appendChild(img);

    return item;
}




function createinstructionitem(divid, instr) {
    var item = document.createElement("div");
    item.setAttribute("class", "harea hbar rel menuitem instructionitem");

    var mapdiv = document.createElement("div");
    mapdiv.setAttribute("id", divid);
    mapdiv.setAttribute("class", "instructionview");

    var textbox = document.createElement("div");
    textbox.setAttribute("class", "menuitemtext instructiontextbox");
    
    var table = createLabel(instr, 'instructiontext');
    textbox.appendChild(table);

    item.appendChild(mapdiv);
    item.appendChild(textbox);
    
    return item;
}

function createmenudesc(text) {
    var item = document.createElement("div");
    item.setAttribute("class", "harea hbar rel flexheight menuitem plainbg");

    var textbox = document.createElement("div");
    textbox.setAttribute("class", "menuitemdesc rel flexheight");
    
    textbox.innerHTML = text;

    item.appendChild(textbox);
    
    return item;
}

function createmenusubtitle(text) {
    var item = document.createElement("div");
    item.setAttribute("class", "harea hbar rel flexheight menuitem plainbg");

    var textbox = document.createElement("div");
    textbox.setAttribute("class", "menuitemdesc menuitemsubtitle rel flexheight");
    
    textbox.innerHTML = text;

    item.appendChild(textbox);
    
    return item;
}

function createmenudescbutton(text, onclick) {
    var item = document.createElement("div");
    item.setAttribute("class", "harea hbar rel flexheight menuitem plainbg noborder");

    var textbox = document.createElement("div");
    textbox.setAttribute("class", "menuitemdesc menuitemsubtitle rel flexheight menuitemdescbutton");
    
    textbox.innerHTML = text;

    item.onclick = onclick;
    item.appendChild(textbox);
    
    return item;
}

function createbackitem(level, text, itemclass, onbackfun) {
    var item = document.createElement("div");
    item.setAttribute("class", "harea hbar rel menuitem menutitle " + itemclass);
    var textbox = document.createElement("div");
    textbox.setAttribute("class", "menuitemtext");
    var arrowbox = document.createElement("div");
    arrowbox.setAttribute("class", "menuitemarrow leftarrow");

    var arrowimg = document.createElement("div");
    arrowimg.setAttribute("class", "menuitemarrowimg leftarrowimg");
    arrowbox.appendChild(arrowimg);
    
    var table = createLabel(text, 'subtitle');
    textbox.appendChild(table);
    
    item.appendChild(textbox);
    item.appendChild(arrowbox);
    
    item.onclick = function(l) { 
	var level = l; 
	return function() { 
	    if( onbackfun )
		onbackfun(); 
	    else
		showsubmenu(level); 
	} 
    }(level);
    
    return item;
}

function createmoreitem(text, onclick) {
    var item = document.createElement("div");
    item.setAttribute("class", "harea hbar rel menuitem");
    var textbox = document.createElement("div");
    textbox.setAttribute("class", "menuitemtext");

    var arrowbox = document.createElement("div");
    arrowbox.setAttribute("class", "menuitemarrow downarrow");

    var arrowimg = document.createElement("div");
    arrowimg.setAttribute("class", "menuitemarrowimg downarrowimg");
    arrowbox.appendChild(arrowimg);
    
    var table = createLabel(text, 'moreresults');
    textbox.appendChild(table);
    
    item.appendChild(textbox);
    item.appendChild(arrowbox);
    
    item.onclick = onclick;
    
    return item;
}

function createiframe(url) {
    var elem = document.createElement('iframe');
    elem.setAttribute('class', 'menuiframe');
    elem.setAttribute('src', url);
    return elem;
}




    
