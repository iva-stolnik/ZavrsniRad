export const getRandomColor = () => {
  let color = "#" + Math.floor(Math.random() * 0xffffff).toString(16);
  //if random method returns 6 char (#xfxfx) add 0 to it
  let colorCheck = color.length === 6 ? (color = color + 0) : color;
  localStorage.setItem("color", colorCheck);
  return colorCheck;
};
