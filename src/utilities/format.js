function formatMMSS (miliseconds) {
  const minutes = Math.floor(miliseconds / 60000);
  const seconds = Math.floor(miliseconds / 1000) % 60;
  const formattedTime = minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
  return formattedTime;
};

export default formatMMSS;