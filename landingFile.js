let url = "https://rickandmortyapi.com/api/character/?page=1";
const container = document.querySelector("main");
const body = document.body;
const next = document.querySelector(".next");
const previous = document.querySelector(".previous");

const pagPrev = document.querySelector(".prev");
const pagCur = document.querySelector(".cur");
const pagNext = document.querySelector(".later");
pagPrev.textContent = "";
let MAXPAGE;
let MINPAGE = 1;

async function getCharacters() {
  const response = await fetch(url);
  const result = await response.json();
  return result;
}
getCharacters().then((data) => {
  printCharacters(data);
  MAXPAGE = data.info.pages;
});
let counter = 1;

next.addEventListener("click", () => {
  ++counter;
  if (counter <= MAXPAGE) {
    pagCur.textContent = counter;
    pagNext.textContent = counter + 1;
    url = `https://rickandmortyapi.com/api/character/?page=${counter}`;
    getCharacters().then((data) => printCharacters(data));
    pagPrev.textContent = counter - 1;
    if (counter === MAXPAGE) {
      pagNext.textContent = "";
    }
  } else {
    counter = MAXPAGE;
  }
});

previous.addEventListener("click", () => {
  --counter;
  if (counter >= MINPAGE) {
    pagCur.textContent = counter;
    pagPrev.textContent = counter - 1;
    url = `https://rickandmortyapi.com/api/character/?page=${counter}`;
    getCharacters().then((data) => printCharacters(data));
    pagNext.textContent = counter + 1;
    if (counter === MINPAGE) {
      pagPrev.textContent = "";
    }
  } else {
    counter = MINPAGE;
  }
});

function printCharacters(obj) {
  container.innerHTML = "";
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
