const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const DomParser = require('dom-parser');

var parser = new DomParser();

const Http = new XMLHttpRequest();
const url = 'https://bobiler.org/Content/LoadNewFeed?currentTab=0&pageIndex=0';
Http.open("GET", url);
Http.send();

Http.onreadystatechange = (e) => {
    if (Http.readyState == 4 && Http.status == 200) {
        const response = Http.responseText;
        const dom = parser.parseFromString(response);
        const list = dom.getElementsByClassName("bobi-feed-monte");
        let headerList = [];

        for (let item of list) {
            headerList.push(decodeEntities(item.getElementsByClassName("uk-margin-remove")[0].innerHTML.trim()));
        }

        console.log(headerList);
    }
}

function decodeEntities(encodedString) {
    var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
    var translate = {
        "nbsp":" ",
        "amp" : "&",
        "quot": "\"",
        "lt"  : "<",
        "gt"  : ">"
    };
    return encodedString.replace(translate_re, function(match, entity) {
        return translate[entity];
    }).replace(/&#(\d+);/gi, function(match, numStr) {
        var num = parseInt(numStr, 10);
        return String.fromCharCode(num);
    });
}