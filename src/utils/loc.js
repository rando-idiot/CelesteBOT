// Parses localization files and formats the data in a "locales" object
// Exports functions to retrieve localization values from this object

const fs = require('node:fs');
const path = require('node:path');
const log = require("./log.js");
const { Locale } = require('discord.js');

//Initialize keys, using en-US as a template because english is the default language
const locales = {};
let template = JSON.parse(fs.readFileSync(path.join(__dirname, `../locales/en-US.json`)).toString("utf-8"))
for (const key of Object.keys(template)) {
    locales[key] = {};
};


//Sets the locale of each key
const localeFiles = fs.readdirSync(path.join(__dirname, `../locales`))
for (const f of localeFiles) {
    let locale = f.replace(".json", "")
    if (!Object.values(Locale).includes(locale)) { log.error(`Invalid locale ${locale}, not parseable by Discord`); continue };
    const localeString = fs.readFileSync(path.join(__dirname, `../locales/${f}`)).toString("utf-8");
    let localeObject = {};
    try { localeObject = JSON.parse(localeString) } catch { log.warn(`File ${f} is not valid JSON`); continue };
    for (const [key, value] of Object.entries(localeObject)) {
        if (locales[key] === undefined) continue;
        locales[key][locale] = value;
    };
    for (const key of Object.keys(locales)) {
        if (locales[key][locale] === undefined) log.warn(`Missing key "${key}" in locale "${locale}"`)
    };
};

module.exports = {
    get(key) {
        return locales[key];
    },

    find(key, loc) {
        if (locales[key] === undefined) return undefined;
        return locales[key][loc] ?? locales[key]["en-US"];
    },
}