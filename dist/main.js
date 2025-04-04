'use strict';
const list = [1, 2, 3, 4, 5];
function addOne(list) {
    return list.map((idx) => idx + 1);
}
console.log(addOne(list));
class Car {
    constructor(name) {
        this.name = name;
    }
}
let audi = new Car('audi');
console.log(audi);
console.log(audi.name);
