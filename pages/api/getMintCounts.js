var fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

// function getRndInteger(min, max) {
//     return Math.floor(Math.random() * (max - min)) + min;
// }

export default async function handler(req, res) {

    
    var content = await readFile('img/total', 'utf8');
    var totals = JSON.parse(content);
    var _totals = totals.filter((total) => (total==-1))
    
    res.status(200).json({
        total: totals.length,
        minted: _totals.length
    })
}