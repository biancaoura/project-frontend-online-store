import { phones } from './const';

export default function brandsCheck(name, catego, str1, str2) {
  if (name.match(/smartphones/i)
  || name.match(/celular/i)
  || name.match(/consoles/i)
  || name.match(/telefones/i)
  || (catego !== undefined
  && catego.match(/smartphones/i))) {
    return name === 'Consoles' || catego === 'Consoles' ? 'Consoles' : phones;
  }
  if (!name.includes(str1)
  && !name.includes(str2)
  && (catego === undefined
  || !catego.includes(str1))
  ) {
    return '';
  }
}
