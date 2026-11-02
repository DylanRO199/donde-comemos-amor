/**
 * Lógica principal de "¿Dónde Comemos Amor?"
 * Maneja selección de mall, filtros, animación de ruleta/tragamonedas con sonido WebAudio,
 * modo duelo (2 opciones), favoritos, historial de salidas en pareja, vetados y locales personalizados.
 */

(function () {
  // Claves de almacenamiento local
  const STORAGE_KEYS = {
    FAVORITES: "couple_mall_favorites_v1",
    VISITED: "couple_mall_visited_v1",
    VETOED: "couple_mall_vetoed_v1",
    CUSTOM_PLACES: "couple_mall_custom_places_v1",
    COUPLE_NAMES: "couple_mall_names_v1",
    SELECTED_MALL: "couple_mall_last_selected_v1"
  };

  // Estado de la aplicación
  const state = {
    selectedMallId: localStorage.getItem(STORAGE_KEYS.SELECTED_MALL) || "costanera-center",
    selectedZone: "all",
    selectedCategory: "all",
    selectedMeal: "all",
    highRatedOnly: false,
    excludeVisited: false,
    onlyFavorites: false,
    searchQuery: "",
    sortBy: "stars-desc",
    isSpinning: false,
    lastWinner: null,
    favorites: JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES) || "[]"),
    visited: JSON.parse(localStorage.getItem(STORAGE_KEYS.VISITED) || "[]"), // [{ uid, date, note }]
    vetoed: JSON.parse(localStorage.getItem(STORAGE_KEYS.VETOED) || "[]"),
    customPlaces: JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_PLACES) || "[]"),
    coupleNames: JSON.parse(localStorage.getItem(STORAGE_KEYS.COUPLE_NAMES) || '{"p1":"Dylan","p2":"Mi Amor"}')
  };

  // Integrar locales personalizados al catálogo en memoria
  function getAllPlaces() {
    return [...window.RESTAURANTS_DATA, ...state.customPlaces];
  }

  // Sonidos suaves con Web Audio API (sin depender de archivos mp3 externos)
  let audioCtx = null;
  function playTickSound(freq = 520, duration = 0.035) {
    try {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) audioCtx = new AudioContextClass();
      }
      if (!audioCtx) return;
      if (audioCtx.state === "suspended") audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (_) {
      // Ignorar si el navegador bloquea audio
    }
  }

  function playWinFanfare() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      setTimeout(() => playTickSound(freq, 0.14), idx * 95);
    });
  }

  // Helpers para estrellas visuales
  function renderStarIcons(stars) {
    const full = Math.floor(stars);
    const half = stars - full >= 0.4 ? 1 : 0;
    let html = "";
    for (let i = 0; i < full; i++) html += "★";
    if (half) html += "½";
    return `<span class="text-amber-400 tracking-tight font-bold">${html}</span> <span class="text-white font-bold">${stars.toFixed(1)}</span>`;
  }

  function isFavorite(brandId) {
    return state.favorites.includes(brandId);
  }

  function isVisited(uid, brandId) {
    return state.visited.some((v) => v.uid === uid || v.brandId === brandId);
  }

  function isVetoed(brandId) {
    return state.vetoed.includes(brandId);
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(state.favorites));
    localStorage.setItem(STORAGE_KEYS.VISITED, JSON.stringify(state.visited));
    localStorage.setItem(STORAGE_KEYS.VETOED, JSON.stringify(state.vetoed));
    localStorage.setItem(STORAGE_KEYS.CUSTOM_PLACES, JSON.stringify(state.customPlaces));
    localStorage.setItem(STORAGE_KEYS.COUPLE_NAMES, JSON.stringify(state.coupleNames));
    localStorage.setItem(STORAGE_KEYS.SELECTED_MALL, state.selectedMallId);
    updateNavbarBadges();
  }

  function updateNavbarBadges() {
    const badge = document.getElementById("badgeVisitedCount");
    if (badge) badge.textContent = state.visited.length;

    const subtitle = document.getElementById("coupleSubtitle");
    if (subtitle && state.coupleNames.p1 && state.coupleNames.p2) {
      subtitle.innerHTML = `App exclusiva de <strong class="text-rose-300">${escapeHtml(state.coupleNames.p1)} & ${escapeHtml(state.coupleNames.p2)}</strong> · Elijan mall y giren la ruleta ❤️`;
    }
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // Obtener lista filtrada para la ruleta y para el directorio
  function getFilteredPlaces({ forRoulette = false } = {}) {
    const all = getAllPlaces();

    // Si está en "Todos los malls", evitamos duplicar la misma marca 6 veces en el sorteo
    let list = all.filter((item) => {
      if (state.selectedMallId !== "all") {
        return item.mallId === state.selectedMallId;
      }
      return item.isPrimaryBranch !== false;
    });

    // Filtro por zona del mall
    if (state.selectedMallId !== "all" && state.selectedZone !== "all") {
      list = list.filter((item) => item.zone === state.selectedZone);
    }

    // Filtro por categoría (restaurante / rapida / dulce)
    if (state.selectedCategory !== "all") {
      list = list.filter((item) => item.category === state.selectedCategory);
    }

    // Filtro por momento / comida (almuerzo / cena / dulce / tragos)
    if (state.selectedMeal !== "all") {
      list = list.filter((item) => item.mealTypes && item.mealTypes.includes(state.selectedMeal));
    }

    // Filtro nota alta >= 4.6
    if (state.highRatedOnly) {
      list = list.filter((item) => item.stars >= 4.6 || item.uberEatsRating >= 4.7);
    }

    // En la ruleta nunca sorteamos lugares vetados
    if (forRoulette) {
      list = list.filter((item) => !isVetoed(item.brandId));
      if (state.excludeVisited) {
        list = list.filter((item) => !isVisited(item.uid, item.brandId));
      }
      if (state.onlyFavorites) {
        list = list.filter((item) => isFavorite(item.brandId));
      }
    } else {
      // En el directorio inferior aplicamos además búsqueda por texto
      if (state.onlyFavorites) {
        list = list.filter((item) => isFavorite(item.brandId));
      }
      if (state.excludeVisited) {
        list = list.filter((item) => !isVisited(item.uid, item.brandId));
      }
      if (state.searchQuery.trim() !== "") {
        const q = state.searchQuery.toLowerCase().trim();
        list = list.filter(
          (item) =>
            item.name.toLowerCase().includes(q) ||
            item.cuisine.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            item.zone.toLowerCase().includes(q) ||
            (item.mustTry && item.mustTry.some((m) => m.toLowerCase().includes(q)))
        );
      }

      // Ordenar directorio
      list.sort((a, b) => {
        if (state.sortBy === "stars-desc") return b.stars - a.stars;
        if (state.sortBy === "ubereats-desc") return b.uberEatsRating - a.uberEatsRating;
        if (state.sortBy === "name-asc") return a.name.localeCompare(b.name);
        if (state.sortBy === "price-asc") return a.priceRange.length - b.priceRange.length;
        return 0;
      });
    }

    return list;
  }

  // Renderizar Selector de Malls
  function renderMallSelector() {
    const container = document.getElementById("mallSelectorGrid");
    const summaryEl = document.getElementById("selectedMallSummary");
    const allPlaces = getAllPlaces();

    container.innerHTML = window.MALLS_DATA.map((mall) => {
      const isSelected = mall.id === state.selectedMallId;
      const count =
        mall.id === "all"
          ? allPlaces.filter((p) => p.isPrimaryBranch !== false).length
          : allPlaces.filter((p) => p.mallId === mall.id).length;

      return `
        <button
          type="button"
          data-mall-id="${mall.id}"
          class="mall-card-btn text-left p-3.5 rounded-2xl border transition-all relative overflow-hidden group ${
            isSelected
              ? "bg-gradient-to-br " + mall.gradient + " text-white border-white/40 shadow-lg shadow-rose-500/25 scale-[1.01]"
              : "glass-card hover:bg-white/10 text-slate-200 border-white/10"
          }"
        >
          <div class="flex items-center justify-between gap-1 mb-1">
            <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
              isSelected ? "bg-black/30 text-white" : "bg-white/10 text-slate-300"
            }">
              ${mall.comuna}
            </span>
            <span class="text-xs font-extrabold ${isSelected ? "text-white" : "text-rose-400"}">
              ${count} locales
            </span>
          </div>
          <div class="font-extrabold text-sm sm:text-base leading-snug truncate">
            ${mall.shortName}
          </div>
          <div class="text-[11px] mt-1 truncate ${isSelected ? "text-white/90" : "text-slate-400"}">
            ${mall.badge}
          </div>
        </button>
      `;
    }).join("");

    const activeMall = window.MALLS_DATA.find((m) => m.id === state.selectedMallId) || window.MALLS_DATA[0];
    summaryEl.innerHTML = `<strong class="text-rose-400">${activeMall.name}:</strong> ${activeMall.description}`;

    container.querySelectorAll(".mall-card-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.selectedMallId = btn.getAttribute("data-mall-id");
        state.selectedZone = "all";
        saveState();
        renderAll();
      });
    });
  }

  // Renderizar barra de zonas del mall seleccionado
  function renderZoneFilterBar() {
    const zoneBar = document.getElementById("zoneFilterBar");
    if (state.selectedMallId === "all") {
      zoneBar.classList.add("hidden");
      zoneBar.classList.remove("flex");
      return;
    }

    const mallPlaces = getAllPlaces().filter((p) => p.mallId === state.selectedMallId);
    const zones = Array.from(new Set(mallPlaces.map((p) => p.zone)));

    if (zones.length <= 1) {
      zoneBar.classList.add("hidden");
      return;
    }

    zoneBar.classList.remove("hidden");
    zoneBar.classList.add("flex");

    const buttonsHtml = [
      `<span class="text-xs font-bold text-slate-400 mr-1">📍 Sector del Mall:</span>`,
      `<button data-zone="all" class="zone-pill text-xs font-bold px-3 py-1.5 rounded-xl border transition ${
        state.selectedZone === "all"
          ? "bg-rose-500 text-white border-rose-400"
          : "glass-pill text-slate-300 hover:bg-white/10"
      }">Todos los sectores (${mallPlaces.length})</button>`
    ];

    zones.forEach((z) => {
      const c = mallPlaces.filter((p) => p.zone === z).length;
      const active = state.selectedZone === z;
      buttonsHtml.push(`
        <button data-zone="${escapeHtml(z)}" class="zone-pill text-xs font-bold px-3 py-1.5 rounded-xl border transition ${
          active
            ? "bg-rose-500 text-white border-rose-400"
            : "glass-pill text-slate-300 hover:bg-white/10"
        }">${escapeHtml(z)} (${c})</button>
      `);
    });

    zoneBar.innerHTML = buttonsHtml.join("");

    zoneBar.querySelectorAll(".zone-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.selectedZone = btn.getAttribute("data-zone");
        renderAll();
      });
    });
  }

  // Actualizar estilos de botones de filtro
  function updateFilterUI() {
    document.querySelectorAll(".filter-cat-btn").forEach((btn) => {
      const cat = btn.getAttribute("data-category");
      if (cat === state.selectedCategory) {
        btn.className =
          "filter-cat-btn text-xs font-bold py-2.5 px-3 rounded-xl border transition flex items-center justify-center gap-1.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white border-rose-400 shadow-md shadow-rose-500/20";
      } else {
        btn.className =
          "filter-cat-btn text-xs font-bold py-2.5 px-3 rounded-xl border transition flex items-center justify-center gap-1.5 glass-pill text-slate-300 hover:bg-white/10";
      }
    });

    document.querySelectorAll(".filter-meal-btn").forEach((btn) => {
      const meal = btn.getAttribute("data-meal");
      if (meal === state.selectedMeal) {
        btn.className =
          "filter-meal-btn text-xs font-bold py-1.5 px-3 rounded-full border transition bg-purple-600 text-white border-purple-400";
      } else {
        btn.className =
          "filter-meal-btn text-xs font-semibold py-1.5 px-3 rounded-full border transition glass-pill text-slate-300 hover:bg-white/10";
      }
    });

    document.getElementById("chkHighRatedOnly").checked = state.highRatedOnly;
    document.getElementById("chkExcludeVisited").checked = state.excludeVisited;
    document.getElementById("chkOnlyFavorites").checked = state.onlyFavorites;

    const pool = getFilteredPlaces({ forRoulette: true });
    const poolBadge = document.getElementById("poolCounterBadge");
    poolBadge.textContent = `${pool.length} ${pool.length === 1 ? "local disponible" : "locales disponibles"}`;
  }

  // Renderizar Grilla de Locales del Directorio
  function renderDirectoryGrid() {
    const grid = document.getElementById("restaurantsGrid");
    const countBadge = document.getElementById("directoryCountBadge");
    const places = getFilteredPlaces({ forRoulette: false });

    countBadge.textContent = `${places.length} locales`;

    if (places.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full glass-card rounded-3xl p-10 text-center space-y-3">
          <div class="text-4xl">🕵️‍♂️</div>
          <h3 class="text-lg font-bold text-white">No encontramos locales con esos filtros exactos</h3>
          <p class="text-xs text-slate-400 max-w-md mx-auto">
            Prueba limpiando los filtros o cambiando de categoría para ver todas las opciones del mall.
          </p>
        </div>
      `;
      return;
    }

    grid.innerHTML = places
      .map((place) => {
        const fav = isFavorite(place.brandId);
        const vis = isVisited(place.uid, place.brandId);
        const vet = isVetoed(place.brandId);

        const categoryBadge =
          place.category === "restaurante"
            ? `<span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30">🥂 Restaurante</span>`
            : place.category === "rapida"
            ? `<span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">🍔 Rápida / Patio</span>`
            : `<span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-pink-500/20 text-pink-300 border border-pink-500/30">🧇 Café & Dulce</span>`;

        const firstReview = place.reviews && place.reviews[0];

        return `
          <article class="glass-card rounded-3xl p-5 flex flex-col justify-between transition hover:border-rose-500/40 relative group ${
            vet ? "opacity-50 grayscale-[40%]" : ""
          }">
            <div>
              <!-- Header tarjeta -->
              <div class="flex items-start justify-between gap-2 mb-3">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl shrink-0">
                    ${place.emoji}
                  </div>
                  <div>
                    <div class="flex items-center gap-1.5 flex-wrap">
                      ${categoryBadge}
                      <span class="text-[10px] font-semibold text-slate-400">${escapeHtml(place.priceRange)} · ${escapeHtml(place.avgPriceCLP)}</span>
                    </div>
                    <h3 class="text-base sm:text-lg font-extrabold text-white leading-tight mt-0.5">
                      ${escapeHtml(place.name)}
                    </h3>
                    <p class="text-xs text-rose-300 font-medium">${escapeHtml(place.cuisine)}</p>
                  </div>
                </div>

                <!-- Botón Favorito rápido -->
                <button
                  type="button"
                  data-action="toggle-fav"
                  data-brand="${place.brandId}"
                  title="${fav ? "Quitar de favoritos" : "Guardar en favoritos"}"
                  class="w-9 h-9 rounded-xl glass-pill flex items-center justify-center text-base hover:scale-110 transition shrink-0"
                >
                  ${fav ? "❤️" : "🤍"}
                </button>
              </div>

              <!-- Ubicación Mall y Zona -->
              <div class="flex items-center justify-between text-[11px] bg-black/30 border border-white/5 rounded-xl px-3 py-1.5 mb-3">
                <span class="text-slate-300 font-semibold truncate">📍 ${escapeHtml(place.mallName)}</span>
                <span class="text-rose-400 font-bold truncate ml-2">${escapeHtml(place.zone)}</span>
              </div>

              <!-- Puntajes Estrellas + Uber Eats + Google -->
              <div class="grid grid-cols-3 gap-1.5 text-center bg-white/[0.03] border border-white/10 rounded-2xl p-2 mb-3">
                <div>
                  <div class="text-[10px] text-slate-400 uppercase font-bold">Estrellas</div>
                  <div class="text-xs mt-0.5">${renderStarIcons(place.stars)}</div>
                </div>
                <div class="border-x border-white/10">
                  <div class="text-[10px] text-emerald-400 uppercase font-bold">Uber Eats</div>
                  <div class="text-xs font-extrabold text-white mt-0.5">🛵 ${place.uberEatsRating.toFixed(1)} ★</div>
                </div>
                <div>
                  <div class="text-[10px] text-sky-400 uppercase font-bold">Google</div>
                  <div class="text-xs font-extrabold text-white mt-0.5">📍 ${place.googleRating.toFixed(1)} ★</div>
                </div>
              </div>

              <!-- Descripción -->
              <p class="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-3">
                ${escapeHtml(place.description)}
              </p>

              <!-- Dato de Redes Sociales -->
              <div class="bg-gradient-to-r from-rose-500/10 to-purple-500/10 border border-rose-500/20 rounded-xl p-2.5 text-[11px] text-rose-200 mb-3">
                ${escapeHtml(place.socialHighlight)}
              </div>

              <!-- Platos imperdibles -->
              <div class="flex flex-wrap gap-1 mb-3">
                ${(place.mustTry || [])
                  .slice(0, 3)
                  .map(
                    (dish) =>
                      `<span class="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">🍴 ${escapeHtml(dish)}</span>`
                  )
                  .join("")}
              </div>

              <!-- Primer Comentario Destacado -->
              ${
                firstReview
                  ? `
                <div class="bg-black/35 border border-white/5 rounded-xl p-2.5 text-[11px] text-slate-300 italic mb-4">
                  "${escapeHtml(firstReview.text)}"
                  <div class="not-italic text-[10px] text-slate-400 font-semibold mt-1 flex justify-between">
                    <span>— ${escapeHtml(firstReview.user)}</span>
                    <span class="text-emerald-400">${escapeHtml(firstReview.source)} (${firstReview.rating}★)</span>
                  </div>
                </div>
              `
                  : ""
              }
            </div>

            <!-- Footer de acciones de tarjeta -->
            <div class="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
              <div class="flex items-center gap-1.5">
                <button
                  type="button"
                  data-action="toggle-visited"
                  data-uid="${place.uid}"
                  data-brand="${place.brandId}"
                  data-name="${escapeHtml(place.name)}"
                  class="text-[11px] font-bold px-2.5 py-1.5 rounded-xl border transition ${
                    vis
                      ? "bg-emerald-500/25 text-emerald-300 border-emerald-500/40"
                      : "glass-pill text-slate-300 hover:bg-white/10"
                  }"
                >
                  ${vis ? "✅ Ya fuimos" : "📌 Marcar ido"}
                </button>
                <button
                  type="button"
                  data-action="toggle-veto"
                  data-brand="${place.brandId}"
                  title="Vetar o habilitar en la ruleta"
                  class="text-[11px] font-bold px-2 py-1.5 rounded-xl border transition ${
                    vet
                      ? "bg-red-500/30 text-red-200 border-red-500/40"
                      : "glass-pill text-slate-400 hover:text-red-300"
                  }"
                >
                  ${vet ? "🚫 Vetado" : "🚫"}
                </button>
              </div>

              <button
                type="button"
                data-action="open-detail"
                data-uid="${place.uid}"
                class="text-xs font-extrabold text-rose-400 hover:text-rose-300 flex items-center gap-1"
              >
                <span>Ver reseñas</span>
                <span>→</span>
              </button>
            </div>
          </article>
        `;
      })
      .join("");

    // Eventos delegados de las tarjetas
    grid.querySelectorAll("button[data-action]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const action = btn.getAttribute("data-action");
        const brandId = btn.getAttribute("data-brand");
        const uid = btn.getAttribute("data-uid");

        if (action === "toggle-fav") {
          toggleFavorite(brandId);
        } else if (action === "toggle-visited") {
          toggleVisited(uid, brandId, btn.getAttribute("data-name"));
        } else if (action === "toggle-veto") {
          toggleVeto(brandId);
        } else if (action === "open-detail") {
          openDetailModal(uid);
        }
      });
    });
  }

  // Acciones de Favoritos, Visitados y Vetados
  function toggleFavorite(brandId) {
    if (state.favorites.includes(brandId)) {
      state.favorites = state.favorites.filter((id) => id !== brandId);
    } else {
      state.favorites.push(brandId);
    }
    saveState();
    renderAll();
  }

  function toggleVisited(uid, brandId, placeName) {
    const existingIdx = state.visited.findIndex((v) => v.uid === uid || v.brandId === brandId);
    if (existingIdx >= 0) {
      state.visited.splice(existingIdx, 1);
    } else {
      const today = new Date().toLocaleDateString("es-CL");
      state.visited.unshift({
        uid,
        brandId,
        name: placeName,
        date: today
      });
    }
    saveState();
    renderAll();
  }

  function toggleVeto(brandId) {
    if (state.vetoed.includes(brandId)) {
      state.vetoed = state.vetoed.filter((id) => id !== brandId);
    } else {
      state.vetoed.push(brandId);
    }
    saveState();
    renderAll();
  }

  // Sorteo Principal de la Ruleta / Tragamonedas
  function spinRoulette() {
    if (state.isSpinning) return;

    const pool = getFilteredPlaces({ forRoulette: true });
    const slotEmoji = document.getElementById("slotEmoji");
    const slotTitle = document.getElementById("slotTitle");
    const slotSubtitle = document.getElementById("slotSubtitle");
    const winnerContainer = document.getElementById("winnerResultContainer");
    const spinBtn = document.getElementById("btnSpinRoulette");
    const spinBtnText = document.getElementById("btnSpinText");

    if (pool.length === 0) {
      slotEmoji.textContent = "🥺";
      slotTitle.textContent = "¡No quedaron locales con esos filtros!";
      slotSubtitle.textContent = "Desmarca algún filtro a la izquierda para volver a girar.";
      return;
    }

    state.isSpinning = true;
    spinBtn.disabled = true;
    spinBtnText.textContent = "Girando la ruleta...";
    winnerContainer.classList.add("hidden");

    // Elegir ganador 100% aleatorio criptográficamente o con Math.random
    const randomBuffer = new Uint32Array(1);
    window.crypto.getRandomValues(randomBuffer);
    const winnerIndex = randomBuffer[0] % pool.length;
    const winner = pool[winnerIndex];
    state.lastWinner = winner;

    // Secuencia de animación tipo tragamonedas con desaceleración realista
    const totalSteps = 26;
    let currentStep = 0;

    function nextTick() {
      currentStep++;
      const randomPreview = pool[Math.floor(Math.random() * pool.length)];
      const itemToShow = currentStep === totalSteps ? winner : randomPreview;

      slotEmoji.textContent = itemToShow.emoji;
      slotEmoji.className = "text-5xl sm:text-6xl transition-transform duration-75 scale-110";
      slotTitle.textContent = itemToShow.name;
      slotSubtitle.textContent = `${itemToShow.cuisine} · 📍 ${itemToShow.mallName} (${itemToShow.zone})`;

      playTickSound(380 + currentStep * 14, 0.04);

      if (currentStep < totalSteps) {
        // Curva de desaceleración progresiva
        const delay = 45 + Math.pow(currentStep / totalSteps, 2.4) * 280;
        setTimeout(nextTick, delay);
      } else {
        // ¡Tenemos ganador!
        state.isSpinning = false;
        spinBtn.disabled = false;
        spinBtnText.textContent = "🔄 ¡Girar de Nuevo!";
        slotEmoji.className = "text-6xl sm:text-7xl animate-bounce";
        playWinFanfare();
        if (typeof window.confetti === "function") {
          window.confetti({
            particleCount: 85,
            spread: 75,
            origin: { y: 0.6 }
          });
        }
        renderWinnerCard(winner);
      }
    }

    nextTick();
  }

  // Mostrar Tarjeta del Ganador del Sorteo
  function renderWinnerCard(winner) {
    const container = document.getElementById("winnerResultContainer");
    container.classList.remove("hidden");

    const reviewsHtml = (winner.reviews || [])
      .map(
        (r) => `
        <div class="bg-black/40 border border-white/10 rounded-xl p-3 text-xs">
          <div class="flex items-center justify-between text-[11px] font-bold mb-1">
            <span class="text-rose-300">💬 ${escapeHtml(r.user)}</span>
            <span class="text-emerald-400">${escapeHtml(r.source)} · ${r.rating}★</span>
          </div>
          <p class="text-slate-300 italic">"${escapeHtml(r.text)}"</p>
        </div>
      `
      )
      .join("");

    container.innerHTML = `
      <div class="winner-glow bg-gradient-to-br from-rose-500/15 via-purple-500/10 to-black/60 border-2 border-rose-500/60 rounded-3xl p-5 sm:p-6 space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-rose-500 text-white shadow">
            🎉 ¡Hoy comen aquí!
          </span>
          <span class="text-xs font-bold text-slate-300">
            📍 ${escapeHtml(winner.mallFullName)} · <strong class="text-rose-300">${escapeHtml(winner.zone)}</strong>
          </span>
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3.5">
            <div class="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-4xl shrink-0">
              ${winner.emoji}
            </div>
            <div>
              <h3 class="text-2xl sm:text-3xl font-extrabold text-white">${escapeHtml(winner.name)}</h3>
              <p class="text-sm text-rose-300 font-semibold">${escapeHtml(winner.cuisine)} · ${escapeHtml(winner.avgPriceCLP)}</p>
            </div>
          </div>

          <!-- Puntajes Destacados -->
          <div class="flex items-center gap-2 shrink-0">
            <div class="bg-black/50 border border-white/10 rounded-2xl px-3 py-2 text-center">
              <div class="text-[10px] text-slate-400 uppercase font-bold">General</div>
              <div class="text-sm font-extrabold text-amber-400">★ ${winner.stars.toFixed(1)}</div>
            </div>
            <div class="bg-black/50 border border-white/10 rounded-2xl px-3 py-2 text-center">
              <div class="text-[10px] text-emerald-400 uppercase font-bold">Uber Eats</div>
              <div class="text-sm font-extrabold text-white">🛵 ${winner.uberEatsRating.toFixed(1)}</div>
            </div>
            <div class="bg-black/50 border border-white/10 rounded-2xl px-3 py-2 text-center">
              <div class="text-[10px] text-sky-400 uppercase font-bold">Google</div>
              <div class="text-sm font-extrabold text-white">📍 ${winner.googleRating.toFixed(1)}</div>
            </div>
          </div>
        </div>

        <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">
          ${escapeHtml(winner.description)}
        </p>

        <div class="bg-white/5 border border-white/10 rounded-2xl p-3.5 space-y-2">
          <div class="text-xs font-bold text-rose-300">
            💡 Ideal para su cita: <span class="text-slate-200 font-normal">${escapeHtml(winner.vibe)}</span>
          </div>
          <div class="text-xs font-bold text-purple-300">
            📱 Redes (${escapeHtml(winner.socialHandle)}): <span class="text-slate-200 font-normal">${escapeHtml(winner.socialHighlight)}</span>
          </div>
        </div>

        <!-- Qué pedir sí o sí -->
        <div>
          <div class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">🍴 Qué pedir sí o sí para compartir:</div>
          <div class="flex flex-wrap gap-1.5">
            ${(winner.mustTry || [])
              .map(
                (dish) =>
                  `<span class="text-xs font-semibold px-3 py-1 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-200">✨ ${escapeHtml(dish)}</span>`
              )
              .join("")}
          </div>
        </div>

        <!-- Comentarios -->
        <div>
          <div class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">⭐ Comentarios en Uber Eats, Google & Redes:</div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            ${reviewsHtml}
          </div>
        </div>

        <!-- Botones de confirmación de pareja -->
        <div class="pt-3 border-t border-white/15 flex flex-wrap items-center justify-between gap-2">
          <div class="flex flex-wrap gap-2">
            <button
              id="btnAcceptWinner"
              class="bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-extrabold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-lg shadow-emerald-500/25"
            >
              <span>✅ ¡Aceptamos el reto! Guardar salida</span>
            </button>
            <button
              id="btnFavWinner"
              class="glass-pill hover:bg-white/15 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl transition"
            >
              ${isFavorite(winner.brandId) ? "❤️ En nuestros Favoritos" : "🤍 Agregar a Favoritos"}
            </button>
          </div>
          <button
            id="btnRerollWinner"
            class="text-xs font-bold text-slate-400 hover:text-white underline py-2"
          >
            Paso, gira otra vez 🎲
          </button>
        </div>
      </div>
    `;

    document.getElementById("btnAcceptWinner").addEventListener("click", () => {
      if (!isVisited(winner.uid, winner.brandId)) {
        toggleVisited(winner.uid, winner.brandId, winner.name);
      }
      const btn = document.getElementById("btnAcceptWinner");
      btn.textContent = "💖 ¡Guardado en Nuestras Salidas!";
      btn.className = "bg-rose-600 text-white text-xs sm:text-sm font-extrabold px-4 py-2.5 rounded-xl flex items-center gap-1.5";
    });

    document.getElementById("btnFavWinner").addEventListener("click", () => {
      toggleFavorite(winner.brandId);
      renderWinnerCard(winner);
    });

    document.getElementById("btnRerollWinner").addEventListener("click", () => {
      spinRoulette();
    });
  }

  // Modo Duelo: Sortea 2 opciones al azar y la pareja vota cuál prefiere
  function startBattleMode() {
    if (state.isSpinning) return;
    const pool = getFilteredPlaces({ forRoulette: true });
    const winnerContainer = document.getElementById("winnerResultContainer");

    if (pool.length < 2) {
      spinRoulette();
      return;
    }

    // Elegir 2 distintos al azar
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const optionA = shuffled[0];
    const optionB = shuffled[1];

    playTickSound(600, 0.08);
    winnerContainer.classList.remove("hidden");

    winnerContainer.innerHTML = `
      <div class="bg-white/5 border border-purple-500/40 rounded-3xl p-5 space-y-4">
        <div class="text-center">
          <span class="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
            ⚔️ Duelo Relámpago de Pareja
          </span>
          <h3 class="text-lg sm:text-xl font-extrabold text-white mt-2">
            La ruleta sacó estos 2 finalistas... ¿Cuál eligen?
          </h3>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${[optionA, optionB]
            .map(
              (opt, idx) => `
              <div class="glass-card border border-white/15 hover:border-rose-500 rounded-2xl p-4 flex flex-col justify-between transition">
                <div>
                  <div class="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>Opción ${idx + 1} · 📍 ${escapeHtml(opt.zone)}</span>
                    <span class="text-emerald-400 font-bold">🛵 ${opt.uberEatsRating.toFixed(1)}★</span>
                  </div>
                  <div class="text-3xl mb-1">${opt.emoji}</div>
                  <h4 class="text-lg font-extrabold text-white">${escapeHtml(opt.name)}</h4>
                  <p class="text-xs text-rose-300 font-semibold mb-2">${escapeHtml(opt.cuisine)} (${escapeHtml(opt.avgPriceCLP)})</p>
                  <p class="text-xs text-slate-300 line-clamp-3 mb-3">${escapeHtml(opt.description)}</p>
                </div>
                <button
                  type="button"
                  data-choose-idx="${idx}"
                  class="choose-duel-btn w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-xs py-2.5 rounded-xl transition"
                >
                  🏆 Elegir ${escapeHtml(opt.name)}
                </button>
              </div>
            `
            )
            .join("")}
        </div>
      </div>
    `;

    winnerContainer.querySelectorAll(".choose-duel-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.getAttribute("data-choose-idx"));
        const chosen = idx === 0 ? optionA : optionB;
        playWinFanfare();
        if (typeof window.confetti === "function") {
          window.confetti({ particleCount: 70, spread: 65, origin: { y: 0.65 } });
        }
        renderWinnerCard(chosen);
      });
    });
  }

  // Modal de Detalle Completo de un Local
  function openDetailModal(uid) {
    const place = getAllPlaces().find((p) => p.uid === uid);
    if (!place) return;

    const modal = document.getElementById("detailModal");
    const content = document.getElementById("detailModalContent");

    const allBranches = getAllPlaces().filter((p) => p.brandId === place.brandId);

    content.innerHTML = `
      <div class="space-y-5">
        <div class="flex items-start gap-4">
          <div class="w-16 h-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-4xl shrink-0">
            ${place.emoji}
          </div>
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-rose-400">${escapeHtml(place.cuisine)}</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white">${escapeHtml(place.name)}</h2>
            <p class="text-xs sm:text-sm text-slate-300 mt-0.5">
              📍 ${escapeHtml(place.mallFullName)} · <strong class="text-rose-300">${escapeHtml(place.zone)}</strong> · ${escapeHtml(place.avgPriceCLP)}
            </p>
          </div>
        </div>

        <!-- Tarjetas de Puntajes -->
        <div class="grid grid-cols-3 gap-3 text-center">
          <div class="bg-white/5 border border-white/10 rounded-2xl p-3">
            <div class="text-xs text-slate-400 font-bold">Estrellas General</div>
            <div class="text-lg font-extrabold text-amber-400 mt-1">★ ${place.stars.toFixed(1)} / 5.0</div>
          </div>
          <div class="bg-white/5 border border-white/10 rounded-2xl p-3">
            <div class="text-xs text-emerald-400 font-bold">Puntaje Uber Eats</div>
            <div class="text-lg font-extrabold text-white mt-1">🛵 ${place.uberEatsRating.toFixed(1)} ★</div>
          </div>
          <div class="bg-white/5 border border-white/10 rounded-2xl p-3">
            <div class="text-xs text-sky-400 font-bold">Google Maps</div>
            <div class="text-lg font-extrabold text-white mt-1">📍 ${place.googleRating.toFixed(1)} ★</div>
          </div>
        </div>

        <div class="space-y-2">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">📖 Descripción Completa</h4>
          <p class="text-sm text-slate-200 leading-relaxed">${escapeHtml(place.description)}</p>
        </div>

        <div class="bg-gradient-to-r from-rose-500/15 to-purple-500/15 border border-rose-500/30 rounded-2xl p-4 space-y-1.5">
          <div class="text-xs font-bold text-rose-300">📱 Lo que se dice en Redes Sociales (${escapeHtml(place.socialHandle || "@foodiescl")}):</div>
          <p class="text-xs sm:text-sm text-white">${escapeHtml(place.socialHighlight)}</p>
          <div class="text-xs text-purple-200 pt-1">💑 <strong>Onda para ir en pareja:</strong> ${escapeHtml(place.vibe)}</div>
        </div>

        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">🍴 Platos Imperdibles Recomendados</h4>
          <div class="flex flex-wrap gap-2">
            ${(place.mustTry || [])
              .map(
                (m) =>
                  `<span class="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-white">✨ ${escapeHtml(m)}</span>`
              )
              .join("")}
          </div>
        </div>

        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">💬 Comentarios en Uber Eats, Google & Redes</h4>
          <div class="space-y-2.5">
            ${(place.reviews || [])
              .map(
                (r) => `
                <div class="bg-black/40 border border-white/10 rounded-2xl p-3.5">
                  <div class="flex items-center justify-between text-xs font-bold mb-1">
                    <span class="text-rose-300">${escapeHtml(r.user)}</span>
                    <span class="text-emerald-400">${escapeHtml(r.source)} · ${r.rating} ★</span>
                  </div>
                  <p class="text-xs sm:text-sm text-slate-200 italic">"${escapeHtml(r.text)}"</p>
                </div>
              `
              )
              .join("")}
          </div>
        </div>

        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">🏬 Malls donde está disponible este local:</h4>
          <div class="flex flex-wrap gap-1.5">
            ${allBranches
              .map(
                (b) =>
                  `<span class="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300">${escapeHtml(b.mallName)} (${escapeHtml(b.zone)})</span>`
              )
              .join("")}
          </div>
        </div>
      </div>
    `;

    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }

  // Modal de Bitácora / Historial de la Pareja
  function renderHistoryModal() {
    document.getElementById("inputPartner1").value = state.coupleNames.p1 || "";
    document.getElementById("inputPartner2").value = state.coupleNames.p2 || "";

    const body = document.getElementById("historyModalBody");
    const all = getAllPlaces();

    const favPlaces = all.filter((p) => p.isPrimaryBranch !== false && state.favorites.includes(p.brandId));
    const vetoPlaces = all.filter((p) => p.isPrimaryBranch !== false && state.vetoed.includes(p.brandId));

    body.innerHTML = `
      <!-- Lugares Visitados -->
      <div>
        <h4 class="text-sm font-extrabold text-emerald-400 mb-2 flex items-center gap-1.5">
          <span>✅ Lugares que ya visitamos juntos (${state.visited.length})</span>
        </h4>
        ${
          state.visited.length === 0
            ? `<p class="text-xs text-slate-400 bg-white/5 rounded-xl p-3">Aún no han marcado salidas juntos. Cuando giren la ruleta o vayan a un local, presiona "Marcar ido".</p>`
            : `<div class="space-y-2">
                ${state.visited
                  .map(
                    (v) => `
                  <div class="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs">
                    <div>
                      <span class="font-bold text-white">${escapeHtml(v.name)}</span>
                      <span class="text-slate-400 ml-2">📅 ${escapeHtml(v.date)}</span>
                    </div>
                    <button data-remove-visited="${v.uid}" class="text-rose-400 hover:underline font-semibold">Quitar</button>
                  </div>
                `
                  )
                  .join("")}
              </div>`
        }
      </div>

      <!-- Favoritos -->
      <div>
        <h4 class="text-sm font-extrabold text-rose-400 mb-2">
          ❤️ Nuestros Favoritos (${favPlaces.length})
        </h4>
        ${
          favPlaces.length === 0
            ? `<p class="text-xs text-slate-400 bg-white/5 rounded-xl p-3">Toca el corazón 🤍 en cualquier tarjeta para guardarlo en sus favoritos.</p>`
            : `<div class="flex flex-wrap gap-2">
                ${favPlaces
                  .map(
                    (f) => `
                  <span class="text-xs bg-rose-500/20 border border-rose-500/30 text-rose-200 px-3 py-1.5 rounded-xl flex items-center gap-2">
                    <span>${f.emoji} ${escapeHtml(f.name)}</span>
                    <button data-unfav="${f.brandId}" class="text-white hover:text-rose-400 font-bold">✕</button>
                  </span>
                `
                  )
                  .join("")}
              </div>`
        }
      </div>

      <!-- Vetados de la ruleta -->
      <div>
        <h4 class="text-sm font-extrabold text-red-400 mb-2">
          🚫 Vetados de la Ruleta (${vetoPlaces.length})
        </h4>
        ${
          vetoPlaces.length === 0
            ? `<p class="text-xs text-slate-400 bg-white/5 rounded-xl p-3">Ningún local vetado. Si hay un lugar al que no quieren que la ruleta los mande, toca el botón 🚫 en su tarjeta.</p>`
            : `<div class="flex flex-wrap gap-2">
                ${vetoPlaces
                  .map(
                    (v) => `
                  <span class="text-xs bg-red-500/20 border border-red-500/30 text-red-200 px-3 py-1.5 rounded-xl flex items-center gap-2">
                    <span>${escapeHtml(v.name)}</span>
                    <button data-unveto="${v.brandId}" class="text-white font-bold">Habilitar</button>
                  </span>
                `
                  )
                  .join("")}
              </div>`
        }
      </div>
    `;

    body.querySelectorAll("[data-remove-visited]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const uid = btn.getAttribute("data-remove-visited");
        state.visited = state.visited.filter((v) => v.uid !== uid);
        saveState();
        renderHistoryModal();
        renderAll();
      });
    });

    body.querySelectorAll("[data-unfav]").forEach((btn) => {
      btn.addEventListener("click", () => {
        toggleFavorite(btn.getAttribute("data-unfav"));
        renderHistoryModal();
      });
    });

    body.querySelectorAll("[data-unveto]").forEach((btn) => {
      btn.addEventListener("click", () => {
        toggleVeto(btn.getAttribute("data-unveto"));
        renderHistoryModal();
      });
    });
  }

  // Renderizar todo
  function renderAll() {
    updateNavbarBadges();
    renderMallSelector();
    renderZoneFilterBar();
    updateFilterUI();
    renderDirectoryGrid();
  }

  // Inicializar eventos al cargar DOM
  document.addEventListener("DOMContentLoaded", () => {
    // Poblar selector de malls en el formulario de agregar local
    const addMallSelect = document.getElementById("addMallId");
    addMallSelect.innerHTML = window.MALLS_DATA.filter((m) => m.id !== "all")
      .map((m) => `<option value="${m.id}">${escapeHtml(m.shortName)}</option>`)
      .join("");

    // Eventos de categoría
    document.querySelectorAll(".filter-cat-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.selectedCategory = btn.getAttribute("data-category");
        renderAll();
      });
    });

    // Eventos de ocasión / comida
    document.querySelectorAll(".filter-meal-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.selectedMeal = btn.getAttribute("data-meal");
        renderAll();
      });
    });

    // Checkboxes
    document.getElementById("chkHighRatedOnly").addEventListener("change", (e) => {
      state.highRatedOnly = e.target.checked;
      renderAll();
    });
    document.getElementById("chkExcludeVisited").addEventListener("change", (e) => {
      state.excludeVisited = e.target.checked;
      renderAll();
    });
    document.getElementById("chkOnlyFavorites").addEventListener("change", (e) => {
      state.onlyFavorites = e.target.checked;
      renderAll();
    });

    // Limpiar filtros
    document.getElementById("btnResetFilters").addEventListener("click", () => {
      state.selectedCategory = "all";
      state.selectedMeal = "all";
      state.selectedZone = "all";
      state.highRatedOnly = false;
      state.excludeVisited = false;
      state.onlyFavorites = false;
      state.searchQuery = "";
      document.getElementById("searchInput").value = "";
      renderAll();
    });

    // Buscador y ordenamiento
    document.getElementById("searchInput").addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      renderDirectoryGrid();
    });
    document.getElementById("sortSelect").addEventListener("change", (e) => {
      state.sortBy = e.target.value;
      renderDirectoryGrid();
    });

    // Botones Ruleta y Modo Duelo
    document.getElementById("btnSpinRoulette").addEventListener("click", spinRoulette);
    document.getElementById("btnBattleMode").addEventListener("click", startBattleMode);

    // Cerrar modal de detalle
    const detailModal = document.getElementById("detailModal");
    document.getElementById("btnCloseDetailModal").addEventListener("click", () => {
      detailModal.classList.add("hidden");
      detailModal.classList.remove("flex");
    });
    detailModal.addEventListener("click", (e) => {
      if (e.target === detailModal) {
        detailModal.classList.add("hidden");
        detailModal.classList.remove("flex");
      }
    });

    // Modal de Historial / Bitácora
    const historyModal = document.getElementById("historyModal");
    document.getElementById("btnOpenHistory").addEventListener("click", () => {
      renderHistoryModal();
      historyModal.classList.remove("hidden");
      historyModal.classList.add("flex");
    });
    document.getElementById("btnCloseHistoryModal").addEventListener("click", () => {
      historyModal.classList.add("hidden");
      historyModal.classList.remove("flex");
    });
    document.getElementById("btnSaveCoupleNames").addEventListener("click", () => {
      const p1 = document.getElementById("inputPartner1").value.trim() || "Dylan";
      const p2 = document.getElementById("inputPartner2").value.trim() || "Mi Amor";
      state.coupleNames = { p1, p2 };
      saveState();
      renderAll();
    });

    // Modal de Agregar Local Personalizado
    const addModal = document.getElementById("addModal");
    document.getElementById("btnOpenAddModal").addEventListener("click", () => {
      if (state.selectedMallId !== "all") {
        document.getElementById("addMallId").value = state.selectedMallId;
      }
      addModal.classList.remove("hidden");
      addModal.classList.add("flex");
    });
    document.getElementById("btnCloseAddModal").addEventListener("click", () => {
      addModal.classList.add("hidden");
      addModal.classList.remove("flex");
    });

    document.getElementById("formAddPlace").addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("addName").value.trim();
      const mallId = document.getElementById("addMallId").value;
      const category = document.getElementById("addCategory").value;
      const cuisine = document.getElementById("addCuisine").value.trim() || "Especialidad";
      const uberRating = parseFloat(document.getElementById("addUberRating").value) || 4.7;
      const stars = parseFloat(document.getElementById("addStars").value) || 4.7;
      const description = document.getElementById("addDescription").value.trim();
      const reviewText = document.getElementById("addReviewText").value.trim() || "¡Excelente lugar agregado por nosotros!";

      const mallObj = window.MALLS_DATA.find((m) => m.id === mallId);
      const customId = "custom-" + Date.now();

      const newPlace = {
        uid: `${customId}__${mallId}`,
        brandId: customId,
        name,
        mallId,
        mallName: mallObj ? mallObj.shortName : mallId,
        mallFullName: mallObj ? mallObj.name : mallId,
        zone: "Agregado por Nosotros ✨",
        cuisine,
        category,
        mealTypes: ["almuerzo", "cena", "dulce"],
        emoji: category === "dulce" ? "🍰" : category === "rapida" ? "🍔" : "🍽️",
        priceRange: "$$",
        avgPriceCLP: "$10.000 - $18.000 p/p",
        stars,
        uberEatsRating: uberRating,
        googleRating: stars,
        socialHandle: "@nuestrosdatos",
        socialHighlight: "💖 Agregado personalmente a nuestra lista de locales del mall.",
        description,
        mustTry: ["Recomendado de la Casa"],
        vibe: "Elegido especialmente por nosotros para nuestras salidas.",
        reviews: [
          { source: "Nuestra Nota", user: `${state.coupleNames.p1} & ${state.coupleNames.p2}`, rating: stars, text: reviewText }
        ],
        isPrimaryBranch: true
      };

      state.customPlaces.unshift(newPlace);
      saveState();
      e.target.reset();
      addModal.classList.add("hidden");
      addModal.classList.remove("flex");
      renderAll();
    });

    renderAll();
  });
})();
