document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("animeList");
  const search = document.getElementById("search");

  // Darkmode laden
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }

  // Anime laden (nur wenn auf Inhaltsverzeichnis)
  if (list) {
    fetch("data/animes.json")
      .then((res) => res.json())
      .then((animes) => {
        animes.sort((a, b) => a.titleEN.localeCompare(b.titleEN));
        for (const anime of animes) {
          const card = document.createElement("div");
          card.className = "anime-card";
          card.innerHTML = `
            <img src="img/anime/${anime.image}" alt="${anime.titleEN}">
            <div class="anime-title">${anime.titleEN}</div>
          `;
          card.addEventListener("click", () => {
            window.location.href = `anime/${anime.id}.html`;
          });
          list.appendChild(card);
        }
      });
  }

  // Live-Suche
  if (search) {
    search.addEventListener("input", () => {
      const term = search.value.toLowerCase();
      for (const card of document.querySelectorAll(".anime-card")) {
        const title = card.querySelector(".anime-title").textContent.toLowerCase();
        card.style.display = title.includes(term) ? "block" : "none";
      }
    });
  }
});

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
}
