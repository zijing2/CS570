"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tries_1 = require("./tries");
// var prompt = require('prompt-sync')();
var prompt_f = require("prompt-sync");
var prompt = prompt_f();
var fs = require("graceful-fs");
var input = fs.readFileSync('companies.dat', "utf8");
var companies = input.split("\n");
var companies_table = {};
//init company table
for (var i = 0; i < companies.length; i++) {
    var company_alias = companies[i].split("\t");
    for (var j = 0; j < company_alias.length; j++) {
        companies_table[company_alias[j].replace(",", "").replace(".", "").trim()] = company_alias[0];
    }
}
//console.log(companies_table);
var t = new tries_1.tries();
var prop;
for (prop in companies_table) {
    t.insert(prop);
}
// console.log(t);
var article = '';
var total_words = 0;
while (true) {
    var sub_article = prompt('Please enter your article: ');
    if (sub_article === '.') {
        break;
    }
    article = sub_article;
    var sub_article_arr = sub_article.split(" ");
    total_words += sub_article_arr.length;
    console.log(total_words);
    t.getFreqTable(article);
    //console.log(t.statistics);
    //t.getFreqTable("Microsoft release microapplesoft a apple new product.");
    console.log("Company, Hit Count, Relevance");
    var prop;
    var output = {};
    for (prop in t.statistics) {
        if (t.statistics[prop] != 0) {
            if (output[companies_table[prop]] == undefined) {
                output[companies_table[prop]] = t.statistics[prop];
            }
            else {
                output[companies_table[prop]] += t.statistics[prop];
            }
        }
        //console.log(prop+","+t.statistics[prop]+","+Math.round(t.statistics[prop] / total_words * 10000) / 100.00 + "%");
    }
    var primary_company;
    var Total_Hit = 0;
    for (primary_company in output) {
        Total_Hit += output[primary_company];
        console.log(primary_company + ", " + output[primary_company] + ", " + Math.round(output[primary_company] / total_words * 10000) / 100.00 + "%");
    }
    console.log("Total, " + Total_Hit + ", " + Math.round(Total_Hit / total_words * 10000) / 100.00 + "%");
    console.log("Total words: " + total_words);
}
