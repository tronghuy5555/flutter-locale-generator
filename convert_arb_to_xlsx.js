#!/usr/bin/env node

const xlsx = require('xlsx')
const fs = require("fs");
const path = require('path');


// Function to read JSON data from a file
function readJSONFile(filePath) {
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
}


function readFiles(folderPath) {
    const files = [];

    // Read the contents of the folder
    const folderContents = fs.readdirSync(folderPath);

    // Loop through each item in the folder
    for (const item of folderContents) {
        const filePath = path.join(folderPath, item);

        // Check if the item is a file
        if (fs.statSync(filePath).isFile()) {
            // Read the file contents
            const fileContents = fs.readFileSync(filePath, 'utf-8');
            // Add the file contents to the files array
            const localizationKey = item.split(".")[0].split("_")[1]
            files.push({  
                key: localizationKey,
                name: item,
                contents: readJSONFile(filePath)
            });
        }
    }

    return files;
}

function createWorkbook(data) {
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    return workbook;
}

function saveWorkbookToFile(workbook, filePath) {
    xlsx.writeFile(workbook, filePath);
}

(async () => {
    //Edit here
    dir = "example/lib/src/localization"
    //Edit here
    defaultFileName = "app_en.arb"
    files = readFiles(dir)
	defaultFile = files.find((e) => e.name == defaultFileName)
    console.log(defaultFile)
    newContents = []
    for (const [key, value] of Object.entries(defaultFile.contents)) {
        if (key != "@@locale") {
            var row = {
                key: key
            }
            files.forEach((fileContent) => {
                const valueByLocalizationKey = fileContent.contents[key]
                row[fileContent.key] = valueByLocalizationKey
                console.log(key + "-->>>>" + `${fileContent.key} -->>>>` + value)
            })
            newContents.push(row)
        }
    }
    console.log(newContents)
    const workbook = createWorkbook(newContents)
    const filePath = "localization.xlsx";
    saveWorkbookToFile(workbook, filePath);
})();


