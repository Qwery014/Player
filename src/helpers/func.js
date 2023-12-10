export function isColorDark (color) {
  // Преобразование HEX в RGB
  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  };

  // Получение RGB значения цвета
  const rgbColor = color.startsWith('#') ? hexToRgb(color) : color;

  // Разбивка RGB значения на компоненты
  const [r, g, b] = rgbColor.split(',').map((component) => parseInt(component));

  // Вычисление яркости цвета по формуле
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Возвращение результата (если яркость меньше 128, то цвет темный)
  return brightness < 128;
};