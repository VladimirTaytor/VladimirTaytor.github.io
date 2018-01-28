//0 - forbiden zone;
//1 - road

let a = 'r:l:0';

let c = 'r:l:90';
let b = 'r:t:90';
let d = 'r:t:270';

let e = 'r:t:0';
let f = 'r:t:0';
let g = 'r:t:180';

let h = 'r:r:0';
let i = 'r:r:90';
let j = 'r:r:180';
let k = 'r:r:270';

var first_level = {
  mov_map: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  map: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 'f1', 0, 'g1', 0, 't1', c, 0, 0, 0, 0, 0, 0, 0, 0, 0, c, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [a, a, a, a, a, a, b, 0, 0, 0, 0, 0, 0, a, a, a, c, 0, 0, 0, 0, 0, 0, c, 0, 0, 0, 0, c, 0],
    ['f1', 0, 'g1', 0, 't1', 0, c, 0, 0, 0, 0, 0, 0, 0, 0, 0, d, a, a, a, f, a, a, b, 0, 0, 0, 0, c, 0],
    [0, 0, 0, 0, 0, 0, d, a, a, a, a, a, e, a, a, a, b, 0, 0, 0, c, 0, 0, c, 0, 0, k, a, i, 0],
    [0, 'b:b5', 0, 'b:b8', 0, 0, c, 0, 0, 0, 0, 0, c, 0, 0, 0, c, 0, 0, 0, c, 0, 0, c, 0, 0, c, 0, 0, 0],
    [0, 0, k, a, a, a, b, 'b:b1', 0, 0, 0, 0, c, 0, 0, 0, c, 0, 0, 0, c, 0, 0, d, a, a, b, 0, 0, 0],
    ['b:b6', 0, c, 0, 0, 0, c, 0, 0, 0, 0, 0, c, 0, 0, 0, c, 0, 0, 0, c, 0, 0, c, 0, 0, c, 0, 0, 0],
    [0, 0, c, 0, 0, '', c, `b:b4`, 0, 0, 0, 0, c, 0, 0, 0, c, 0, 0, 0, 0, 0, 0, c, 0, 0, c, 0, 0, 0],
    ['b:b2', 0, c, 'b:b7', 0, 't1', c, 0, 0, 0, 0, 0, d, a, a, a, b, 0, 0, 0, 0, 0, 0, c, 0, 0, c, 0, k, a],
    [0, 0, c, 'f1', 't1', 'f1', c, 'b:b2', 0, 0, 0, 0, c, 0, 0, 0, c, 0, 0, 0, 0, 0, 0, c, 0, 0, c, 0, c, 0],
    [0, 0, d, a, a, a, b, 0, 0, 0, 0, 0, c, 0, 0, 0, d, a, a, a, f, a, a, b, 0, 0, c, 0, c, 0],
    [0, 'b:b9', c, 0, 0, 0, c, 'b:b4', 0, 'b:b9', 0, 0, c, 0, 0, 0, c, 0, 0, 0, c, 0, 0, c, 0, 0, c, 0, c, 0],
    [0, 0, 'f1', 0, 0, 0, j, a, a, a, a, a, g, a, a, a, i, 0, 0, 0, c, 0, 0, 0, 0, 0, j, a, i, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  textures: {
    buildings: [
      { pos: [[0,0], [0,1]], path: './none' }
    ],
  },
  enemies: [
    { trajectory: [3,6], name: 'sobaka1' },
    { trajectory: [4,6], name: 'sobaka1' },
    { trajectory: [5,6], name: 'sobaka1' }
  ],
  items: [
    { path: '', name: 'govno' }
  ]
}
