const getLettersName = (name) => {
  if (!name) return 'AW';
  const nameArr = name.split(' ');

  switch (nameArr.length) {
    case 0:
      return 'AW';
    case 1:
      return nameArr[0].charAt(0).toUpperCase();
    default:
      return nameArr
        .map((item) => item.charAt(0))
        .slice(0, 2)
        .join('');
  }
};

function camelCase(str = '') {
  if (str === '') return '';
  var a = str
    .toLowerCase()
    .trim()
    .split(' ')
    .map((v) => v[0].toUpperCase() + v.substr(1).toLowerCase())
    .join(' ');

  return str
    .toLowerCase()
    .trim()
    .split(' ')
    .map((v) => v[0].toUpperCase() + v.substr(1).toLowerCase())
    .join(' ');
}

// format HH:MM:SS to HH:MM
const parseHour = (hour) => {
  const hourList = hour.split(':');
  const newHourList = hourList.slice(0, -1);
  return newHourList.join(':');
};

const parseDataForSelector = (data, keyId, keyVal) => {
  const newData = data.map((item) => {
    return { id: item[keyId], val: item[keyVal] };
  });
  return newData;
};

export { getLettersName, camelCase, parseHour, parseDataForSelector };
