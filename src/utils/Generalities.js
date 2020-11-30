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

const random = (inferior, superior) => {
  let numberPossibilities = superior - inferior;
  let random = Math.random() * numberPossibilities;
  random = Math.floor(random);
  return parseInt(inferior) + random;
};

const randomColor = () => {
  let hexadecimal = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F');
  let color = '#';
  for (let i = 0; i < 6; i++) {
    let postArr = random(0, hexadecimal.length);
    color += hexadecimal[postArr];
  }

  return color;
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

const numberAccept = /[\d.]+/g;

const parseNumber = (string) => (string.match(numberAccept) || []).join('');

const formatFloatingPointNumber = (value, maxDigits) => {
  const parsed = parseNumber(value);
  const [head, tail] = parsed.split('.');
  const scaledTail = tail != null ? tail.slice(0, maxDigits) : '';

  const number = Number.parseFloat(`${head}.${scaledTail}`);

  if (Number.isNaN(number)) {
    return '';
  }

  const formatted = number.toLocaleString('de-CH', {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxDigits,
  });

  if (parsed.includes('.')) {
    const [formattedHead] = formatted.split('.');
    const formattedTail =
      scaledTail !== '' && scaledTail[maxDigits - 1] === '0' ? scaledTail.slice(0, -1) : scaledTail;

    return `${formattedHead}.${formattedTail}`;
  }
  return formatted;
};

export { getLettersName, camelCase, parseHour, parseDataForSelector, randomColor, formatFloatingPointNumber };
