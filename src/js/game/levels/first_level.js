//0 - forbiden zone;
//1 - road

var first_level = {
  mov_map: [
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [1, 1, 0, 0, 1, 0, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  map: [
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    ['r:l:0', 'r:l:0', 'r:r:0', 0, 0, 0, 1, 0, 0, 0],
    ['b:b2', 0, 'r:l:90', 'b:b2', 0, 0, 1, 0, 0, 0],
    [0, 0, 'r:r:180', 'r:r:0', 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 'r:l:90', 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 'r:r:180', 'r:r:0', 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [1, 1, 0, 0, 1, 0, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  textures: {
    buildings: [
      { pos: [[0,0], [0,1]], path: './none' }
    ],
  },
  enemies: [
    { trajectory: [[4,5], [4,6], [4,7], [4,8]], name: 'sobaka1' }
  ],
  items: [
    { path: '', name: 'govno' }
  ]
}
