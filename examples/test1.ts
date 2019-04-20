import { Counter } from "../src"

const c1 = Counter([ 0, 0, 0 ]);
const f1 = c1.sub(2)
const f5 = c1.sub(5)

var i = 0;

while (++i < 100000) {
  console.log(i, c1())
  console.log(i, f1())
  console.log(i, f5())
}

console.log(f5.sizes)
console.log(f5.id)
