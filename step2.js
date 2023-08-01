const process = require('process');
const fs = require('fs');
const axios = require('axios');

function cat(path){
    fs.readFile(path, 'utf8', function(err, data){
        if(err){
            console.error(`Error reading ${path}: \n ${err}`);
            process.exit(1);
        }
        console.log(data);
    });
}

async function webCat(url){
    try {
        let res = await axios.get(url);
        console.log(res.data);
    } catch (err) {
        console.error(`Error fetching ${url}: \n ${err}`);
        process.exit(1);
    }
}

let arr = process.argv[2];

if (arr.startsWith('http')){
    webCat(arr);
} else {
    cat(arr);
}