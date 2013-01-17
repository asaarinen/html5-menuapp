
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
    
    // return the object
    return {
	getCurrentLevel: getCurrentLevel,
	initSubMenu: initSubMenu,
	showSubMenu: showSubMenu,
	addMenuTitle: addMenuTitle,
	addMenuItem: addMenuItem,
	refresh: refresh,
	scrollDown: scrollDown,
	scrollUp: scrollUp
    };
}

function removelastmenuitem(level) {
    var elem = document.getElementById('menuscroll' + level);
    if( elem )
	if( elem.hasChildNodes() ) 
	    elem.removeChild(elem.lastChild);
}

function createsearchitem(placeholder, inputid, onsubmit, onedit) {
    var item = document.createElement('div');
    item.setAttribute('class', 'harea hbar rel menuitem searcharea');
    
    var form = document.createElement('form');
    form.setAttribute('class', 'searchform');
    if( onsubmit )
	form.onsubmit = onsubmit;
    
    var inputdiv = document.createElement('div');
    inputdiv.setAttribute('class', 'searchinputdiv');
    
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
    
    var icon = document.createElement('div');
    icon.setAttribute('class', 'searchicon');
    
    inputdiv.appendChild(input);
    inputdiv.appendChild(icon);
    form.appendChild(inputdiv);
    //form.appendChild(icon);
    
    item.appendChild(form);
    
    return item;
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

function createmenuitem(text, itemclass, onclick) {
    var item = document.createElement("div");
    item.setAttribute("class", "harea hbar rel menuitem " + itemclass);
    var iconbox = document.createElement("div");
    iconbox.setAttribute("class", "menuitemicon");

    var iconimg = document.createElement("div");
    iconimg.setAttribute("class", "menuitemiconimg");
    iconbox.appendChild(iconimg);

    var textbox = document.createElement("div");
    textbox.setAttribute("class", "menuitemtext");

    if( onclick ) {
	var arrowbox = document.createElement("div");
	arrowbox.setAttribute("class", "menuitemarrow");
	
	var arrowimg = document.createElement("div");
	arrowimg.setAttribute("class", "menuitemarrowimg");
	arrowbox.appendChild(arrowimg);
    }

    var table = document.createElement("table");
    table.setAttribute('class', 'table-centertext');
    var tr = document.createElement("tr");
    tr.setAttribute('class', 'table-centertext');
    var th = document.createElement("th");
    th.setAttribute("class", "leftalign table-centertext");
    tr.appendChild(th);
    table.appendChild(tr);
    textbox.appendChild(table);
    
    th.innerHTML = text;

    item.appendChild(iconbox);
    item.appendChild(textbox);
    if( onclick ) {
	item.appendChild(arrowbox);
        item.onclick = onclick;
    }
    
    return item;
}

function createmenudivider(text) {
    var item = document.createElement("div");
    item.setAttribute("class", "harea hbar rel menudivider");
    var textbox = document.createElement("div");
    textbox.setAttribute("class", "menuitemtext");
    
    var table = document.createElement("table");
    var tr = document.createElement("tr");
    var th = document.createElement("th");
    th.setAttribute("class", "leftalign");
    tr.appendChild(th);
    table.appendChild(tr);
    textbox.appendChild(table);

    item.appendChild(textbox);

    th.innerHTML = text;

    return item;
}

function createmenuitem2(text1, text2, iconurl, itemclass, onclick) {
    var item = document.createElement("div");
    item.setAttribute("class", "harea hbar rel menuitem " + itemclass);
    var iconbox = document.createElement("div");
    if( iconurl ) {
	iconbox.setAttribute("class", "menuitemiconbg");
	iconbox.style.backgroundImage = 'url(' + iconurl + ')';
    } else {
	iconbox.setAttribute("class", "menuitemicon");
	var iconimg = document.createElement("div");
	iconimg.setAttribute("class", "menuitemiconimg");
	iconbox.appendChild(iconimg);
    }

    var textbox1 = document.createElement("div");
    textbox1.setAttribute("class", "menuitemtext1");
    var textbox2 = document.createElement("div");
    textbox2.setAttribute("class", "menuitemtext2");
    var arrowbox = document.createElement("div");
    arrowbox.setAttribute("class", "menuitemarrow");
    
    var arrowimg = document.createElement("div");
    arrowimg.setAttribute("class", "menuitemarrowimg");
    arrowbox.appendChild(arrowimg);
    
    var table = document.createElement("table");
    var tr = document.createElement("tr");
    var th = document.createElement("th");
    th.setAttribute("class", "leftalign");
    th.innerHTML = text1;
    tr.appendChild(th);
    table.appendChild(tr);
    textbox1.appendChild(table);

    var table = document.createElement("table");
    var tr = document.createElement("tr");
    var th = document.createElement("th");
    th.setAttribute("class", "leftalign");
    th.innerHTML = text2;
    tr.appendChild(th);
    table.appendChild(tr);
    textbox2.appendChild(table);

    item.appendChild(iconbox);
    item.appendChild(textbox1);
    item.appendChild(textbox2);
    item.appendChild(arrowbox);
    
    item.onclick = onclick;
    
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
    
    var table = document.createElement("table");
    var tr = document.createElement("tr");
    var th = document.createElement("th");
    th.setAttribute("class", "instructiontext");
    tr.appendChild(th);
    table.appendChild(tr);
    textbox.appendChild(table);
    
    th.innerHTML = instr;

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
    
    var table = document.createElement("table");
    var tr = document.createElement("tr");
    var th = document.createElement("th");
    th.setAttribute("class", "subtitle");
    tr.appendChild(th);
    table.appendChild(tr);
    textbox.appendChild(table);
    
    th.innerHTML = text;
    
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
    
    var table = document.createElement("table");
    var tr = document.createElement("tr");
    var th = document.createElement("th");

    th.setAttribute("class", "moreresults");
    th.innerHTML = text;

    tr.appendChild(th);
    table.appendChild(tr);
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




    
