(function(w, d) {

	var COINS = [ 'BTC', 'LTC', 'PPC', 'XPM', 'PTS' ];
	var CURRENCIES = [ 'bitcoin', 'litecoin', 'peercoin', 'primecoin', 'protoShares' ];

	var COIN_TMP = '<li>'
			+ '<a class="logo" href="{currency}:{address}" target="_blank"><i title="{type}" class="icon {type}-icon"></i></a>' 
			+ '<span class="address"><input readonly="readonly" type="text" value="{address}" /></span>'
		+ '</li>';

	function getData(element, name) {
		return element.getAttribute('data-' + name);
	}

	function setData(element, name, value) {
		element.setAttribute('data-' + name, value);
	}

	function querySelector(name) {
		return d.querySelectorAll('.' + name);
	}

	function render(card) {
		var button = d.createElement('div');
		button.className = 'title';
		button.innerHTML = 'Coin Card';
		card.appendChild(button);
		
		var address, type;
		var i = 0, l = COINS.length;
		var display = getData(card, 'display');

		var listContainer = d.createElement('div');
		listContainer.className = 'list-container';
		listContainer.style.display = display === 'true' ? 'block' : 'none';

		var list = d.createElement('ul');
		list.className = 'list';
		var items = '';

		for (; i < l; i++) {
			type = COINS[i];
			address = getData(card, type);
			if (address) {
				items += COIN_TMP
					.replace(/{currency}/, CURRENCIES[i])
					.replace(/{type}/g, type)
					.replace(/{address}/g, address);
			}
		}

		var arrow = d.createElement('div');
		arrow.className = 'arrow';
		list.innerHTML = items;
		listContainer.appendChild(list);
		listContainer.appendChild(arrow);
		card.appendChild(listContainer);
	}

	function toggle(card, listContainer, status) {

		if (!status) {
			listContainer.style.visibility = 'hidden';
			listContainer.style.display = 'inline-block';

			var title = card.querySelector('.title');
			// bound title
			var bT = title.getBoundingClientRect();
			listContainer.style.top = bT.height + 4 + 'px';
			listContainer.style.left = '0px';
			// bound list-container
			var bC = listContainer.getBoundingClientRect();

			var arrow = card.querySelector('.arrow');
			arrow.className += ' at';
			arrow.style.left = bT.width / 2 / bC.width * 100 + '%';
		}

		listContainer.style.visibility = 'visible';
		listContainer.style.display = status ? 'none' : 'inline-block';

		setData(card, 'display', status ? 'false' : 'true');
	}

	function inputSelect(elem) {
		elem.addEventListener('click', function (e) {
			elem.querySelector('input').select();
		}, false);
	}

	function listen(card) {
		var display = getData(card, 'display');
		var status = display === 'true';
		var listContainer = card.querySelector('.list-container');
		listContainer.style.display = status ? 'inline-block' : 'none';
		card.addEventListener('click', function (e) {
			var display = getData(card, 'display');
			var status = display === 'true';
			toggle(card, listContainer, status);
		}, false);
		listContainer.addEventListener('click', function (e) {
			if (e.stopPropagation) {
				e.stopPropagation();
			} else {
				e.cancelBubble = true;
			}
		}, false);
		var items = card.querySelectorAll('.list > li');
		for (var i = 0, l = items.length; i < l; i++) {
			inputSelect(items[i]);
		}
	}

	var cards = querySelector('coin-card');
	for (var i = 0, l = cards.length, card; i < l; i++) {
		card = cards[i];
		render(card);
		listen(card);
	}

	if (l) {
		var style = d.createElement('link');
		style.setAttribute('rel', 'stylesheet');
		style.setAttribute('type', 'text/css');
		style.setAttribute('href', 'widget.css');
		d.querySelector('head').appendChild(style);
	}


})(window, document);
