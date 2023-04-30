// Convert champions.json to champions.csv
// Finally, run "node convert.js".

const fs = require('fs');

try {
    const input = fs.readFileSync('../champions.json', 'utf8');
    const json = JSON.parse(input);

    // convert json to csv format with "name,alias"
    const lines = [
        'name,alias,releaseDate,classes',
        ...json.map(champion => `${champion.name},${champion.alias},${champion.releaseDate},${champion.classes.join('+')}`),
    ];

    fs.writeFileSync('../champions.csv', lines.join('\r\n'));
} catch (err) {
    console.error(err);
}
