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
  HERO: 10
}

function getEnumKeys(enumType) {
  return Object.keys(enumType);
}

function getEnumValues(enumType) {
  return getEnumKeys(enumType).map(function(key) {
    return enumType[key];
  });
}

function getValueByName(enumType, key) {
  return enumType[getEnumKeys(enumType).filter(function(k) {
    return key === k;
  }).pop() || ''];
}

function getNameByValue(enumType, value) {
  return getEnumKeys(enumType).filter(function(k) {
    return enumType[k] === value;
  }).pop() || null;
}