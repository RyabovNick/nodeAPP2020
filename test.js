const t = 'a'
// t = 'b'

let c = 'c'
c = 'b'
console.log(c)

var v = 'c'

let one = '1c'
let two = 1
let three = true

if (one === two) {
  console.log(true)
} else {
  console.log(false)
}

console.log(two + one)
console.log(one + three)
console.log(two + three)
console.log(three + three)

console.log(two - one)
console.log(two - three)
console.log(one - three)

function name() {
  console.log(bb)
  // console.log(tt)

  if (1 === 1) {
    var bb = 'b'
    const tt = 'c'
    let ll = 'l'
  }

  console.log(bb)
  // console.log(tt)
  // console.log(ll)
}

name()

// console.log(bb)

console.log('test ' + c + ' abc')
console.log(`test ${c} abc`)
