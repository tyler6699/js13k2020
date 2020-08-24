const types = {
  WALL_R: 0,
  WALL_L: 1,
  WALL_T: 2,
  WALL_B: 3,
  WALL_RT: 4,
  WALL_LT: 5,
  WALL_BR: 6,
  WALL_BL: 7,
  FLOOR: 8,
  AIR: 9,
  HERO: 10,
  TABLE: 11,
  CHAIR_T: 12,
  CHAIR_B: 13,
  PC: 14,
  PC_B: 15
}

function getEnumKeys(e) {
  return Object.keys(e);
}

function getEnumValues(e) {
  return getEnumKeys(e).map(function(key) {
    return e[key];
  });
}

function getValueByName(e, key) {
  return e[getEnumKeys(e).filter(function(k) {
    return key === k;
  }).pop() || ''];
}

function getNameByValue(e, val) {
  return getEnumKeys(e).filter(function(k) {
    return e[k] === val;
  }).pop() || null;
}