#!/usr/bin/env node

const reader = require('xlsx')
const fs = require("fs");

const filepath = process.argv.slice(2);

(async () => {

	const file = reader.readFile(filepath[0]);
	const writeFilePath = filepath[1];

	const sheets = file.Sheets;
	const sheetNames = file.SheetNames;
	console.log(`All Sheets = ${sheetNames}, firstSheet=${sheets[sheetNames[0]]}`);

	const firstSheetForProcessing = reader.utils.sheet_to_json(sheets[sheetNames[0]]);

	const languagesSupported = Object.keys(firstSheetForProcessing[0])
									.filter((s) => s != "key" && !s.includes("exclude"))
									.sort((a, b) => {
										if (a > b) return 1;
										if (a < b) return -1;
										return 0
									});
	
	console.log("Reading file...");
	const languageFileLocaleData = {};
	for (const language of languagesSupported) {
		languageFileLocaleData[language] = {
			"@@locale": language,
		};
	}
	

	for (const sheetName of sheetNames) {
		const jsonDataForSheet = reader.utils.sheet_to_json(sheets[sheetName]);
		for (const index in jsonDataForSheet) {
			let translatedString;
			for(const language of languagesSupported) {
				translatedString = jsonDataForSheet[index][language];
				const localizationKey = jsonDataForSheet[index]['key'];
				if (localizationKey != null && translatedString != null) {
					// Strip out line breaks that get introduced in the excel for some reason
					translatedString = translatedString.trim();
					// Some times, excel sheet has added "\n" since it was added by translators
					languageFileLocaleData[language][localizationKey.trim()] = translatedString.trim();
				}
			}
		}
	}

	console.log("Read Done!");


	console.log("Writing Files...");
	for (const language of languagesSupported) {
	
		// Stringify turns \n to \\n. Let's replace it back
		// Also replaces the \\" with \"
		const fileData = JSON.stringify(languageFileLocaleData[language], null, '\t')
							.replace(/\\\\n/g, "\\n")
							.replace(/\\\\"/g, "\"")
							.replace(/\\\\u/g, "\\u");
		const relativePath = writeFilePath == undefined ? '' : `${writeFilePath}`;
		const filePath = `${relativePath}intl_${language}.arb`;
		console.log(`Writing intl_${language}.arb at ${filePath}`);
		fs.writeFileSync(filePath, fileData, {
			encoding: 'utf-8',
		});
	}
	console.log("Write Done!");
})();
