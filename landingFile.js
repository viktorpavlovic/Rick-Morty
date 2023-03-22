const url = "https://rickandmortyapi.com/api/character";
const container = document.querySelector("main");
const body = document.body;
async function getCharacters() {
  const response = await fetch(url);
  const result = await response.json();
  return result;
}

getCharacters().then((data) => printCharacters(data));

function printCharacters(obj) {
  obj.results.forEach((element) => {
    const card = document.createElement("div");
    card.classList.add("cardStyle");
    card.innerHTML = `<img src="${element.image}" alt="">
    <p>${element.name}</p>`;
    container.append(card);
    card.addEventListener("click", () => {
      const modal = document.createElement("div");
      modal.classList.add("modal-wrapper");
      body.prepend(modal);
      modal.innerHTML = `
      <section>
      <div class="left">
      <h3>${element.name}</h3>
      <img src="${element.image}" alt="">
      </div>
      <div class="right">
      <p>Gender: ${element.gender}</p>
      <p>Specie: ${element.species}</p>
      <p>Location: ${element.location.name}</p>
      <p class="status">Status: ${element.status}</p>
      </div>
      <span>&#9747;<span/>
  </section>
      `;
      const status = document.querySelector(".status");
      const goOut = document.querySelector("section span");
      const modalSection = document.querySelector(".modal-wrapper section");
      if (element.status === "Dead") {
        status.style.color = "#d00000";
      } else if (element.status === "unknown") {
        status.style.color = "black";
      }
      goOut.addEventListener("click", () => {
        body.removeChild(modal);
      });
      modal.addEventListener("click", () => {
        body.removeChild(modal);
      });
      modalSection.addEventListener("click", (e) => {
        e.stopImmediatePropagation();
      });
    });
  });
}
