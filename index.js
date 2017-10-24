"use strict";
const net = require('net');
const iconv = require('iconv-lite');

const client = new net.Socket();

let tempknp = [];

client.on('data', data => {
    let d = iconv.decode(data, "Shift_JIS");
    if (d.match(/200 OK/)) {
        d = d.replace(/^[\s\S]*?\]$\n/, "");
    }
    d = d.split('\nEOS');
    d.pop();
    for (let q of d) {
        tempknp.shift()(q + '\nEOS');
    }
});

module.exports = {
    setup: (HOST, PORT) => new Promise((resolve, reject) => {
        client.connect(PORT, HOST, () => {
            client.write('RUN -tab\n');
            resolve();
        });
    }),
    run: str => new Promise((resolve, reject) => {
        client.write(iconv.encode(`${str}\n`, "Shift_JIS"));
        tempknp.push(resolve);
    })
};
