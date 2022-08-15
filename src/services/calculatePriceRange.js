// const TWENTY_PERCENT = 20;
// const FORTY_PERCENT = 40;
// const SIXTY_PERCENT = 60;
// const EIGHTY_PERCENT = 80;
// const HUNDRED_PERCENT = 100;

export default function calculateRangeMin(min) {
  const validMin = min === 0 || min === '';
  if (validMin) {
    return 'Até R$150';
  }
  if (!validMin) {
    return `Até R$${min}`;
  }
}

export function calculateRangeAverage(min, max) {
  const validMin = min === 0 || min === '';
  const validMax = max !== 0 || max !== '';
  if (validMin) {
    return 'R$1000 a R$2000';
  }
  if (!validMin && validMax) {
    return `R$${min} a R$${(min * 2)}`;
  }
}

export function calculateRangeMax(min, max) {
  const validMin = min === 0 || min === '';
  const validMax = max !== 0 || max !== '';
  if (validMin) {
    return 'R$2000 a R$4000';
  }
  if (!validMin && validMax) {
    return `R$${min} a R$${(min * 2)}`;
  }
}
