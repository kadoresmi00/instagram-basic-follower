const { readFileSync, promises: fsPromises } = require('fs');
const path = require('path');

function accountArray() {
    const contents = readFileSync(path.join(__dirname, 'accounts.txt'), 'utf-8');
    const arr = contents.split(/\r?\n/);
    if (arr[0].length === 0) return false;
    let acc = [];
    arr.forEach(x => {
        const account = x.split(':');
        const email = account[0];
        const password = account[1];
        if (!email || !password) return false;
        acc.push({ email, password });
    })
    
    return acc;
}


module.exports = {
    accountArray
}