export const modeBtn = (e) => { process.browser ?
  document
  .querySelector("#light-dark-mode-container")
  .addEventListener("click", function() {
    const everything = document.querySelectorAll('*');
    const projectTiles = document.querySelectorAll('.navbar');
    everything.forEach((item) => {
      item.classList.toggle('dark');
    });

    projectTiles.forEach((item)=> {
      item.classList.remove('dark');
    });
  }) : null
};