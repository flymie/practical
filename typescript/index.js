function assertIsNumber(value, name) {
    if (typeof value !== 'number') {
        throw Error("Except ".concat(name, " to be a number"));
    }
}
function myRange(from, to) {
    assertIsNumber(from, 'from');
    assertIsNumber(to, 'to');
    var res = [];
    for (var i = from; i < to; i++) {
        res.push(i);
    }
    return res;
}
var res = myRange('c', 5);
console.log(res);
