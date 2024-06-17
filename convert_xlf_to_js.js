const fs = require('fs');
const xml2js = require('xml2js');

const convertXliffToJson = (filePath, outputFilePath) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the XLIFF file:', err);
            return;
        }

        xml2js.parseString(data, (err, result) => {
            if (err) {
                console.error('Error parsing the XLIFF file:', err);
                return;
            }

            const translations = {};

            const transUnits = result.xliff.file[0].body[0]['trans-unit'];
            transUnits.forEach(unit => {
                const sourceText = unit.source[0];
                const targetText = unit.target ? unit.target[0] : '';
                translations[sourceText] = targetText;
            });

            fs.writeFile(outputFilePath, JSON.stringify(translations, null, 2), (err) => {
                if (err) {
                    console.error('Error writing the JSON file:', err);
                    return;
                }
                console.log('JSON file created successfully.');
            });
        });
    });
};

convertXliffToJson('messages.pt.xlf', 'translations.json');
