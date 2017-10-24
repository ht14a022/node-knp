"use strict";
let juman = require('node-juman');
let knp = require('./index');
(async () => {
    await juman.setup('localhost', 32000);
    await knp.setup('localhost', 31000);
    let pp1 = await juman.run("本日は晴天なり");
    console.log(pp1);
    let pp2 = await knp.run(pp1);
    console.log(pp2);

    let pp3 = await juman.run("隣の客はよく柿食う客だ");
    console.log(pp3);
    let pp4 = await knp.run(pp3);
    console.log(pp4);
})();