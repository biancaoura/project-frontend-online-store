export default function imgToHD(imgUrl) {
  const imgHD = imgUrl.includes('O.jpg') ? imgUrl.replace(/O.jpg/g, 'F.jpg')
    : imgUrl.replace(/I.jpg/g, 'W.jpg');
  return imgHD;
}

export function imgToHDBigger(imgUrl) {
  return imgUrl.replace(/I.jpg/g, 'F.jpg');
}

export function numberWithCommas(price) {
  const priceWithComa = price.toString().split('.');
  priceWithComa[0] = priceWithComa[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const num = priceWithComa.join(',');
  return num;
}

export function areaWithCommas(area) {
  const areaWithComa = area.toString().split('m²');
  areaWithComa[0] = areaWithComa[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${areaWithComa[0]} m²`;
}

export function calculateOffer(price, product) {
  const OFF = Math
    .round(((product.original_price - price) * 100) / product.original_price);
  return OFF;
}

export function validateProduct(attributes) {
  return {
    brand: attributes.filter(({ id }) => id === 'BRAND'),
    color: attributes.filter(({ id }) => id === 'COLOR'),
    line: attributes.filter(({ id }) => id === 'LINE'),
  };
}

export function checkIfHouse(name) {
  return name.match(/Im[o ó]veis/i) || name.match(/casas/i)
  || name.match(/apartamentos/i);
}

export function checkDomainId(domain) {
  return domain.match(/MLB-INDIVIDUAL_HOUSES_FOR_SALE/i)
  || domain.match(/MLB-INDIVIDUAL_APARTMENTS_FOR_SALE/i)
  || domain.match(/MLB-HOUSES_FOR_RENT/i)
  || domain.match(/MLB-FARM_HOUSES_FOR_SALE/i)
  || domain.match(/MLB-APARTMENTS_FOR_RENT/i)
  || domain.match(/MLB-OTHER_PROPERTIES_FOR_SALE/i);
}
