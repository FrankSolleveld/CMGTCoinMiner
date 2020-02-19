const hash = require('./index')

let string = "000078454c038871fa4d67b0022a30baaf25eaa231f8991b108e2624f052f3f8CMGT Mining CorporationBob PIKAB11548689513858154874778871610312"
let answer = "00005d430ce77ad654b5309a770350bfb4cf49171c682330a2eccc98fd8853cf"

test('hashes text through mod10 algorithm', () => {
    expect(hash(string)).toBe(answer)
})