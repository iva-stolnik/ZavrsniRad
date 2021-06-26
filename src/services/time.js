export const newTime = () => {
  let hours = new Date().getHours();
  let minutes = new Date().getMinutes();
  let updatedMinutes = minutes > 9 ? minutes : `0${minutes}`;
  let time = `${hours}:${updatedMinutes}`;
  return time;
};
