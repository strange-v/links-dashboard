fetch("config.json")
	.then(response => response.json())
	.then(data => showAll(data));

function showAll(data) {
	const name = document.getElementById('site-name');

	name.innerHTML = data.title;
	buildCategories(data.categories);
}

function buildCategories(categories) {
	const list = document.getElementById('sites');


	categories.forEach(c => {
		const title = document.createElement('h2');

		title.className = "category-title";
		title.innerHTML = c.title;

		list.appendChild(title);
		buildSites(c.items);
	});
}

function buildSites(sites) {
	const list = document.getElementById('sites');

	sites.forEach(site => list.appendChild(buildSite(site)));
}

function buildSite(site) {
	const card = document.createElement('a');
	const cardBody = document.createElement('div');
	const cardTitle = document.createElement('h5');
	const cardText = document.createElement('div');
	const cardLink = document.createElement('div');

	if (site.icon) {
		const cardIcon = document.createElement('img');

		cardIcon.className = 'card-icon';
		cardIcon.src = site.icon;

		cardBody.appendChild(cardIcon);
	}

	card.className = 'site-card';
	card.href = getUrl(site);
	card.target = '_blank'

	cardBody.className = 'card-body';

	cardTitle.className = 'card-title';
	cardTitle.innerHTML = site.title;

	cardText.className = 'card-text';
	cardText.innerHTML = site.description;

	cardLink.className = 'card-link';
	cardLink.innerHTML = getUrl(site);



	cardBody.appendChild(cardTitle);
	cardBody.appendChild(cardText);
	cardBody.appendChild(cardLink);
	card.appendChild(cardBody);

	return card;
}

function getUrl(site) {
	return site.localhost
		? site.url.replace('//localhost', '//' + window.location.hostname)
		: site.url
}