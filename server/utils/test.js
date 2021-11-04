const haversineFormula = require("./haversineFormula");

let gm = [54.597512340679316, 8.30366155439418];

const p1 = [59.9139, 10.7522];
const p2 = [52.52, 13.405];
const p3 = [51.5074, 0.1278];
const p4 = [48.8566, 2.3522];

let d1 =haversineFormula(gm[0], gm[1], p1[0], p1[1]);
let d2 =haversineFormula(gm[0], gm[1], p2[0], p2[1]);
let d3 =haversineFormula(gm[0], gm[1], p3[0], p3[1]);
let d4 = haversineFormula(gm[0], gm[1], p4[0], p4[1]);


console.log(2*d1 + d2 + d3 + d4)

gm = [51.9318555600057, 4.816050296542615];

d1 =haversineFormula(gm[0], gm[1], p1[0], p1[1]);
d2 =haversineFormula(gm[0], gm[1], p2[0], p2[1]);
d3 =haversineFormula(gm[0], gm[1], p3[0], p3[1]);
d4 = haversineFormula(gm[0], gm[1], p4[0], p4[1]);

console.log(2*d1 + d2 + d3 + d4)
