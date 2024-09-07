// Parses character files, formats the data in a "characters" object and exports it

const fs = require('node:fs');
const path = require('node:path');
const log = require("../utils/log.js");
const loc = require("../utils/loc.js");

const characters = {};
const characterFiles = fs.readdirSync(path.join(__dirname, `../characters`));
const regexp = new RegExp(/^[\p{Ll}\p{Lm}\p{Lo}\p{N}\p{sc=Devanagari}\p{sc=Thai}_-]+$/u);
for (const characterFile of characterFiles) {
    let errors = 0;
    const character = characterFile.replace(".json", "");
    const characterJSON = fs.readFileSync(path.join(__dirname, `../characters/${characterFile}`)).toString("utf-8");
    let characterObject = {};

    try { characterObject = JSON.parse(characterJSON) } catch {
        log.error(`Could not create character "${character}": File "./characters/${characterFile}" is not valid JSON`);
        continue;
    };

    locNameCheck: {
        let key = `character.${character}.name`;
        if (loc.find(key) === undefined) {
            log.error(`Character "${character}" is missing required localization key "${key}" in "./locales/en-US.json"`);
            errors++;
            break locNameCheck;
        };
        for (const [locale, value] of Object.entries(loc.get(key))) {
            if ( value.length > 100 ) {
                log.error(`Value of localization key "${key}" in locale "${locale}" exceeds character limit of 100`);
                errors++;
            };
        };
    };
    
    locStrictNameCheck: {
        let key = `command.dialog.subcommand.${character}.name.strict`;
        if (loc.find(key) === undefined) {
            log.error(`Character "${character}" is missing required localization key "${key}" in "./locales/en-US.json"`);
            errors++;
            break locStrictNameCheck;
        };

        for (const [locale, value] of Object.entries(loc.get(key))) {
            if ( value.length > 32 ) {
                log.error(`Value of localization key "${key}" in locale "${locale}" exceeds character limit of 32`);
                errors++;
            };

            if ( !regexp.test(value) ) {
                log.error(`Value of localization key "${key}" in locale "${locale}" contains capital letters, spaces or unsupported symbols`);
                errors++;
            };
        };
    };

    locDescriptionCheck: {
        let key = `command.dialog.subcommand.${character}.description`;
        if (loc.find(key) === undefined) {
            log.error(`Character "${character}" is missing required localization key "${key}" in "./locales/en-US.json"`);
            errors++;
            break locDescriptionCheck;
        };
        for (const [locale, value] of Object.entries(loc.get(key))) {
            if ( value.length > 100 ) {
                log.error(`Value of localization key "${key}" in locale "${locale}" exceeds character limit of 100`);
                errors++;
            };
        };
    };

    characterCheck: {
        if (!("portraits" in characterObject)) {
            log.error(`Character "${character}" is missing required "portraits" property`);
            errors++;
            break characterCheck;
        };
        
        if (!Array.isArray(characterObject.portraits)) {
            log.error(`"portraits" property of character "${character}" is not an array`);
            errors++;
            break characterCheck;
        };

        if (characterObject.portraits.length == 0) {
            log.error(`Character "${character}" doesn't have a portrait`);
            errors++;
        };

        if (characterObject.portraits.length > 25) {
            log.error(`Character "${character}" exceeded limit of 25 portraits`);
            errors++;
        };

        for (const portrait of characterObject.portraits) {
            if (typeof portrait != "string") {
                log.error(`"portraits" property of character "${character}" is not an array of strings`);
                errors++;
                break characterCheck;
            };

            locPortraitCheck: {
                let key = `portrait.${portrait}.name`;
                if (loc.find(key) === undefined) {
                    log.error(`Portrait "${portrait}" is missing required localization key "${key}" in "./locales/en-US.json"`);
                    errors++;
                    break locPortraitCheck;
                };
                for (const [locale, value] of Object.entries(loc.get(key))) {
                    if ( value.length > 100 ) {
                        log.error(`Value of localization key "${key}" in locale "${locale}" exceeds character limit of 100`);
                        errors++;
                    };
                };
            };

            try { fs.readFileSync(path.join(__dirname, `../assets/portraits/${character}/${portrait}.png`)) } catch {
                log.error(`Character "${character}" is missing portrait image file "./assets/portraits/${character}/${portrait}.png"`);
                errors++;
            };
        };
    };

    if (!("textbox" in characterObject)) {
        log.warn(`Character "${character}" doesn't have "textbox" property`);
        characterObject.textbox = "default";
    };

    try { fs.readFileSync(path.join(__dirname, `../assets/textboxes/${characterObject.textbox}.png`)) } catch {
        log.error(`Character "${character}" is missing textbox image file "./assets/textboxes/${characterObject.textbox}.png"`);
        errors++;
    };

    if (errors > 0) { log.error(`Could not create character "${character}": ${errors} error(s) have occurred while creating character`); continue }
    characters[character] = characterObject;
};

module.exports = { characters: characters };