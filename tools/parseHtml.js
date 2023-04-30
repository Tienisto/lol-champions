// https://leagueoflegends.fandom.com/wiki/List_of_champions

const { JSDOM } = require('jsdom');
const fs = require('fs');

const htmlString = fs.readFileSync('input.txt', 'utf8');
const dom = new JSDOM(htmlString);
const table = dom.window.document.querySelector('.article-table');
const rows = table.querySelectorAll('tbody tr');

const champions = [];
rows.forEach(row => {
    // Get the champion cell
    const championCell = row.querySelector('td[data-sort-value]');

    // Get the champion name
    const championName = championCell.getAttribute('data-sort-value');

    // Define a regex pattern to extract the champion alias
    const aliasPattern = new RegExp(`${championName.replaceAll('&', '&amp;')}<br>(.*?)<`, 'i');

    // Extract the champion alias using the regex pattern
    const match = htmlString.match(aliasPattern);
    const championAlias = match ? match[1] : '';

    const releaseDate= row.cells[2].textContent.replaceAll('\n', '').trim();

    const classesCell = row.cells[1];
    const classLinks = classesCell.querySelectorAll('a');
    const classes = Array.from(classLinks).map(link => link.textContent.replaceAll('\n', '').trim()).filter(s => s);

    // Add champion data to the array
    champions.push({
        name: championName,
        alias: championAlias,
        releaseDate: releaseDate,
        classes: classes,
    });
});

console.log(champions.length);

const content = JSON.stringify(champions, null, 2);

fs.writeFileSync('../champions.json', content);