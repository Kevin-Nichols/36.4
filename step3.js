const process = require('process');
const fs = require('fs');
const axios = require('axios');

// This is helper for outputting given text and writes to a given file.
function outputHelper(text, output){
     if (output){
        fs.writeFile(output, text, 'utf8', function(err){
            if (err){
                console.error(`Couldn't write ${output}: \n ${err}`);
                process.exit(1);
            }
        });
     }
     console.log(text);
}

// This function reads files at a given path and prints them.
function cat(path, output){
    fs.readFile(path, 'utf8', function(err, data){
        if (err){
            console.error(`Error reading ${path}: \n ${err}`);
            process.exit(1);
        }
        outputHelper(data, output);
    });
}

// This function reads pages and a given url and prints them.
async function webCat(url, output){
    try {
        let res = await axios.get(url);
        outputHelper(res.data, output);
    } catch (err) {
        console.error(`Error fetching ${url}: \n ${err}`);
        process.exit(1);
    }
}

// This function allows you to ender multiple arguments and handle them according to if they are paths or urls. Example: node step3.js --out new.txt one.txt --out google.txt http://google.com
function handleArgs(args){
    for (let i = 0; i< args.length; i++){
        let path;
        let output;

        if (args[i] === '--out'){
            path = args[i + 2];
            output = args[i + 1];
            i += 2;
        } else {
            path = args[i];
        }

        if (path.startsWith('http')){
            webCat(path, output);
        } else {
            cat(path, output);
        }
    }
}

handleArgs(process.argv.slice(2));