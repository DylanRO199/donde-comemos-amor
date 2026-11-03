/**
 * Lógica principal de "Generador de Decisiones para Comidas"
 * Selección de mall, filtros por formato/horario/presupuesto/nota,
 * sorteo aleatorio directo, modo duelo (2 opciones), modo terna con descarte (3 opciones),
 * favoritos, bitácora de salidas, vetados y locales personalizados.
 * Diseño 100% libre de íconos y emojis.
 */

(function () {
  const STORAGE_KEYS = {
    FAVORITES: "couple_mall_favorites_v1",
    VISITED: "couple_mall_visited_v1",
    VETOED: "couple_mall_vetoed_v1",
    CUSTOM_PLACES: "couple_mall_custom_places_v1",
    COUPLE_NAMES: "couple_mall_names_v1",
    SELECTED_MALL: "couple_mall_last_selected_v1",
    SOUND_ENABLED: "couple_mall_sound_v1"
  };

  const state = {
    selectedMallId: localStorage.getItem(STORAGE_KEYS.SELECTED_MALL) || "costanera-center",
    selectedZone: "all",
    selectedCategory: "all",
    selectedMeal: "all",
    selectedBudget: "all",
    highRatedOnly: false,
    excludeVisited: false,
    onlyFavorites: false,
    searchQuery: "",
    sortBy: "stars-desc",
    isSpinning: false,
    soundEnabled: localStorage.getItem(STORAGE_KEYS.SOUND_ENABLED) !== "false",
    lastWinner: null,
    favorites: JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES) || "[]"),
    visited: JSON.parse(localStorage.getItem(STORAGE_KEYS.VISITED) || "[]"),
    vetoed: JSON.parse(localStorage.getItem(STORAGE_KEYS.VETOED) || "[]"),
    customPlaces: JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_PLACES) || "[]"),
    coupleNames: JSON.parse(localStorage.getItem(STORAGE_KEYS.COUPLE_NAMES) || '{"p1":"Dylan","p2":"Mi Pareja"}')
  };

  function getAllPlaces() {
    return [...(window.RESTAURANTS_DATA || []), ...state.customPlaces];
  }

  let audioCtx = null;
  function playTickSound(freq = 520, duration = 0.035) {
    if (!state.soundEnabled) return;
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
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (_) {}
  }

  function playWinFanfare() {
    if (!state.soundEnabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      setTimeout(() => playTickSound(freq, 0.14), idx * 95);
    });
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
    localStorage.setItem(STORAGE_KEYS.SOUND_ENABLED, String(state.soundEnabled));
    updateNavbarBadges();
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function updateNavbarBadges() {
    const badge = document.getElementById("badgeVisitedCount");
    if (badge) badge.textContent = state.visited.length;

    const soundBtn = document.getElementById("btnToggleSound");
    if (soundBtn) {
      soundBtn.textContent = state.soundEnabled ? "Sonido: Activo" : "Sonido: Silenciado";
    }

    const subtitle = document.getElementById("coupleSubtitle");
    if (subtitle && state.coupleNames.p1 && state.coupleNames.p2) {
      subtitle.innerHTML = `Panel de decisión para <strong class="text-rose-300">${escapeHtml(state.coupleNames.p1)} y ${escapeHtml(state.coupleNames.p2)}</strong> · Seleccionen un mall y generen su próxima parada`;
    }
  }

  function getFilteredPlaces({ forRoulette = false } = {}) {
    const all = getAllPlaces();

    let list = all.filter((item) => {
      if (state.selectedMallId !== "all") {
        return item.mallId === state.selectedMallId;
      }
      return item.isPrimaryBranch !== false;
    });

    if (state.selectedMallId !== "all" && state.selectedZone !== "all") {
      list = list.filter((item) => item.zone === state.selectedZone);
    }

    if (state.selectedCategory !== "all") {
      list = list.filter((item) => item.category === state.selectedCategory);
    }

    if (state.selectedMeal !== "all") {
      list = list.filter((item) => item.mealTypes && item.mealTypes.includes(state.selectedMeal));
    }

    if (state.selectedBudget !== "all") {
      list = list.filter((item) => item.priceRange === state.selectedBudget);
    }

    if (state.highRatedOnly) {
      list = list.filter((item) => item.stars >= 4.6 || item.uberEatsRating >= 4.7);
    }

    if (forRoulette) {
      list = list.filter((item) => !isVetoed(item.brandId));
      if (state.excludeVisited) {
        list = list.filter((item) => !isVisited(item.uid, item.brandId));
      }
      if (state.onlyFavorites) {
        list = list.filter((item) => isFavorite(item.brandId));
      }
    } else {
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

      list.sort((a, b) => {
        if (state.sortBy === "stars-desc") return b.stars - a.stars;
        if (state.sortBy === "ubereats-desc") return b.uberEatsRating - a.uberEatsRating;
        if (state.sortBy === "google-desc") return b.googleRating - a.googleRating;
        if (state.sortBy === "name-asc") return a.name.localeCompare(b.name);
        if (state.sortBy === "price-asc") return a.priceRange.length - b.priceRange.length;
        if (state.sortBy === "price-desc") return b.priceRange.length - a.priceRange.length;
        return 0;
      });
    }

    return list;
  }

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
              ? "bg-gradient-to-br " + mall.gradient + " text-white border-white/40 shadow-lg shadow-rose-500/20 scale-[1.01]"
              : "glass-card hover:bg-white/10 text-slate-200 border-white/10"
          }"
        >
          <div class="flex items-center justify-between gap-1 mb-1">
            <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
              isSelected ? "bg-black/30 text-white" : "bg-white/10 text-slate-300"
            }">
              ${escapeHtml(mall.comuna)}
            </span>
            <span class="text-xs font-extrabold ${isSelected ? "text-white" : "text-rose-400"}">
              ${count} locales
            </span>
          </div>
          <div class="font-extrabold text-sm sm:text-base leading-snug truncate">
            ${escapeHtml(mall.shortName)}
          </div>
          <div class="text-[11px] mt-1 truncate ${isSelected ? "text-white/90" : "text-slate-400"}">
            ${escapeHtml(mall.badge)}
          </div>
        </button>
      `;
    }).join("");

    const activeMall = window.MALLS_DATA.find((m) => m.id === state.selectedMallId) || window.MALLS_DATA[0];
    summaryEl.innerHTML = `<strong class="text-rose-400">${escapeHtml(activeMall.name)}:</strong> ${escapeHtml(activeMall.description)}`;

    container.querySelectorAll(".mall-card-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.selectedMallId = btn.getAttribute("data-mall-id");
        state.selectedZone = "all";
        saveState();
        renderAll();
      });
    });
  }

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
      `<span class="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1">Sector del Mall:</span>`,
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

  function updateFilterUI() {
    document.querySelectorAll(".filter-cat-btn").forEach((btn) => {
      const cat = btn.getAttribute("data-category");
      if (cat === state.selectedCategory) {
        btn.className =
          "filter-cat-btn text-xs font-bold py-2.5 px-3 rounded-xl border transition text-center bg-gradient-to-r from-rose-500 to-pink-600 text-white border-rose-400 shadow-md shadow-rose-500/20";
      } else {
        btn.className =
          "filter-cat-btn text-xs font-bold py-2.5 px-3 rounded-xl border transition text-center glass-pill text-slate-300 hover:bg-white/10";
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

    document.querySelectorAll(".filter-budget-btn").forEach((btn) => {
      const b = btn.getAttribute("data-budget");
      if (b === state.selectedBudget) {
        btn.className =
          "filter-budget-btn text-xs font-bold py-2 px-2 rounded-xl border transition text-center bg-rose-500 text-white border-rose-400";
      } else {
        btn.className =
          "filter-budget-btn text-xs font-bold py-2 px-2 rounded-xl border transition text-center glass-pill text-slate-300 hover:bg-white/10";
      }
    });

    document.getElementById("chkHighRatedOnly").checked = state.highRatedOnly;
    document.getElementById("chkExcludeVisited").checked = state.excludeVisited;
    document.getElementById("chkOnlyFavorites").checked = state.onlyFavorites;

    const pool = getFilteredPlaces({ forRoulette: true });
    const poolBadge = document.getElementById("poolCounterBadge");
    poolBadge.textContent = `${pool.length} ${pool.length === 1 ? "local habilitado" : "locales habilitados"}`;
  }

  function renderDirectoryGrid() {
    const grid = document.getElementById("restaurantsGrid");
    const countBadge = document.getElementById("directoryCountBadge");
    const places = getFilteredPlaces({ forRoulette: false });

    countBadge.textContent = `${places.length} locales`;

    if (places.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full glass-card rounded-3xl p-10 text-center space-y-3">
          <div class="text-xs font-bold uppercase tracking-widest text-rose-400">Sin resultados</div>
          <h3 class="text-lg font-bold text-white">No se encontraron locales con los filtros seleccionados</h3>
          <p class="text-xs text-slate-400 max-w-md mx-auto">
            Restablece los filtros o cambia de categoría para visualizar todas las alternativas disponibles en este centro comercial.
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
            ? `<span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30">Restaurante</span>`
            : place.category === "rapida"
            ? `<span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">Rápida / Patio</span>`
            : `<span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-pink-500/20 text-pink-300 border border-pink-500/30">Café y Dulce</span>`;

        const firstReview = place.reviews && place.reviews[0];

        return `
          <article class="glass-card rounded-3xl p-5 flex flex-col justify-between transition hover:border-rose-500/40 relative group ${
            vet ? "opacity-50 grayscale-[40%]" : ""
          }">
            <div>
              <!-- Encabezado de tarjeta sin iconos -->
              <div class="flex items-start justify-between gap-2 mb-3">
                <div>
                  <div class="flex items-center gap-1.5 flex-wrap">
                    ${categoryBadge}
                    <span class="text-[10px] font-semibold text-slate-400">${escapeHtml(place.priceRange)} · ${escapeHtml(place.avgPriceCLP)}</span>
                  </div>
                  <h3 class="text-base sm:text-lg font-extrabold text-white leading-tight mt-1.5">
                    ${escapeHtml(place.name)}
                  </h3>
                  <p class="text-xs text-rose-300 font-medium mt-0.5">${escapeHtml(place.cuisine)}</p>
                </div>

                <button
                  type="button"
                  data-action="toggle-fav"
                  data-brand="${place.brandId}"
                  class="px-2.5 py-1 rounded-xl text-[11px] font-bold border transition shrink-0 ${
                    fav
                      ? "bg-rose-500/25 text-rose-200 border-rose-500/40"
                      : "glass-pill text-slate-400 hover:text-white"
                  }"
                >
                  ${fav ? "Favorito" : "Guardar"}
                </button>
              </div>

              <!-- Ubicación Mall y Zona -->
              <div class="flex items-center justify-between text-[11px] bg-black/30 border border-white/5 rounded-xl px-3 py-1.5 mb-3">
                <span class="text-slate-300 font-semibold truncate">${escapeHtml(place.mallName)}</span>
                <span class="text-rose-400 font-bold truncate ml-2">${escapeHtml(place.zone)}</span>
              </div>

              <!-- Puntajes numéricos limpios -->
              <div class="grid grid-cols-3 gap-1.5 text-center bg-white/[0.03] border border-white/10 rounded-2xl p-2.5 mb-3">
                <div>
                  <div class="text-[10px] text-slate-400 uppercase font-bold">General</div>
                  <div class="text-xs font-extrabold text-amber-400 mt-0.5">${place.stars.toFixed(1)} / 5.0</div>
                </div>
                <div class="border-x border-white/10">
                  <div class="text-[10px] text-emerald-400 uppercase font-bold">Uber Eats</div>
                  <div class="text-xs font-extrabold text-white mt-0.5">${place.uberEatsRating.toFixed(1)} / 5.0</div>
                </div>
                <div>
                  <div class="text-[10px] text-sky-400 uppercase font-bold">Google</div>
                  <div class="text-xs font-extrabold text-white mt-0.5">${place.googleRating.toFixed(1)} / 5.0</div>
                </div>
              </div>

              <!-- Descripción -->
              <p class="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-3">
                ${escapeHtml(place.description)}
              </p>

              <!-- Destacado de Redes Sociales -->
              <div class="bg-gradient-to-r from-rose-500/10 to-purple-500/10 border border-rose-500/20 rounded-xl p-2.5 text-[11px] text-rose-200 mb-3">
                ${escapeHtml(place.socialHighlight)}
              </div>

              <!-- Platos imperdibles -->
              <div class="flex flex-wrap gap-1 mb-3">
                ${(place.mustTry || [])
                  .slice(0, 3)
                  .map(
                    (dish) =>
                      `<span class="text-[10px] px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">${escapeHtml(dish)}</span>`
                  )
                  .join("")}
              </div>

              <!-- Comentario Destacado -->
              ${
                firstReview
                  ? `
                <div class="bg-black/35 border border-white/5 rounded-xl p-2.5 text-[11px] text-slate-300 italic mb-4">
                  "${escapeHtml(firstReview.text)}"
                  <div class="not-italic text-[10px] text-slate-400 font-semibold mt-1 flex justify-between">
                    <span>${escapeHtml(firstReview.user)}</span>
                    <span class="text-emerald-400">${escapeHtml(firstReview.source)} (${firstReview.rating}/5)</span>
                  </div>
                </div>
              `
                  : ""
              }
            </div>

            <!-- Acciones inferiores -->
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
                  ${vis ? "Visitado" : "Marcar visita"}
                </button>
                <button
                  type="button"
                  data-action="toggle-veto"
                  data-brand="${place.brandId}"
                  class="text-[11px] font-bold px-2.5 py-1.5 rounded-xl border transition ${
                    vet
                      ? "bg-red-500/30 text-red-200 border-red-500/40"
                      : "glass-pill text-slate-400 hover:text-red-300"
                  }"
                >
                  ${vet ? "Vetado" : "Vetar"}
                </button>
              </div>

              <button
                type="button"
                data-action="open-detail"
                data-uid="${place.uid}"
                class="text-xs font-extrabold text-rose-400 hover:text-rose-300"
              >
                Ver ficha completa
              </button>
            </div>
          </article>
        `;
      })
      .join("");

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

  function spinRoulette() {
    if (state.isSpinning) return;

    const pool = getFilteredPlaces({ forRoulette: true });
    const slotBadge = document.getElementById("slotBadge");
    const slotTitle = document.getElementById("slotTitle");
    const slotSubtitle = document.getElementById("slotSubtitle");
    const winnerContainer = document.getElementById("winnerResultContainer");
    const spinBtn = document.getElementById("btnSpinRoulette");
    const spinBtnText = document.getElementById("btnSpinText");

    if (pool.length === 0) {
      slotBadge.textContent = "Sin candidatos";
      slotTitle.textContent = "No hay locales disponibles con estos filtros";
      slotSubtitle.textContent = "Amplía o restablece los filtros del panel izquierdo para sortear.";
      return;
    }

    state.isSpinning = true;
    spinBtn.disabled = true;
    spinBtnText.textContent = "Seleccionando...";
    winnerContainer.classList.add("hidden");

    const randomBuffer = new Uint32Array(1);
    window.crypto.getRandomValues(randomBuffer);
    const winnerIndex = randomBuffer[0] % pool.length;
    const winner = pool[winnerIndex];
    state.lastWinner = winner;

    const totalSteps = 26;
    let currentStep = 0;

    function nextTick() {
      currentStep++;
      const randomPreview = pool[Math.floor(Math.random() * pool.length)];
      const itemToShow = currentStep === totalSteps ? winner : randomPreview;

      slotBadge.textContent =
        currentStep < totalSteps
          ? `Sorteando entre ${pool.length} opciones`
          : "Decisión Confirmada";
      slotTitle.textContent = itemToShow.name;
      slotSubtitle.textContent = `${itemToShow.cuisine} · ${itemToShow.mallName} (${itemToShow.zone})`;

      playTickSound(380 + currentStep * 14, 0.04);

      if (currentStep < totalSteps) {
        const delay = 45 + Math.pow(currentStep / totalSteps, 2.4) * 280;
        setTimeout(nextTick, delay);
      } else {
        state.isSpinning = false;
        spinBtn.disabled = false;
        spinBtnText.textContent = "Volver a Sortear";
        playWinFanfare();
        if (typeof window.confetti === "function") {
          window.confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
        renderWinnerCard(winner);
      }
    }

    nextTick();
  }

  function renderWinnerCard(winner) {
    const container = document.getElementById("winnerResultContainer");
    container.classList.remove("hidden");

    const reviewsHtml = (winner.reviews || [])
      .map(
        (r) => `
        <div class="bg-black/40 border border-white/10 rounded-xl p-3 text-xs">
          <div class="flex items-center justify-between text-[11px] font-bold mb-1">
            <span class="text-rose-300">${escapeHtml(r.user)}</span>
            <span class="text-emerald-400">${escapeHtml(r.source)} · ${r.rating}/5</span>
          </div>
          <p class="text-slate-300 italic">"${escapeHtml(r.text)}"</p>
        </div>
      `
      )
      .join("");

    container.innerHTML = `
      <div class="winner-glow bg-gradient-to-br from-rose-500/15 via-purple-500/10 to-black/60 border-2 border-rose-500/60 rounded-3xl p-5 sm:p-6 space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-rose-500 text-white shadow">
            Lugar Seleccionado
          </span>
          <span class="text-xs font-bold text-slate-300">
            ${escapeHtml(winner.mallFullName)} · <strong class="text-rose-300">${escapeHtml(winner.zone)}</strong>
          </span>
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 class="text-2xl sm:text-3xl font-extrabold text-white">${escapeHtml(winner.name)}</h3>
            <p class="text-sm text-rose-300 font-semibold mt-0.5">${escapeHtml(winner.cuisine)} · ${escapeHtml(winner.avgPriceCLP)}</p>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <div class="bg-black/50 border border-white/10 rounded-2xl px-3 py-2 text-center">
              <div class="text-[10px] text-slate-400 uppercase font-bold">General</div>
              <div class="text-sm font-extrabold text-amber-400">${winner.stars.toFixed(1)} / 5</div>
            </div>
            <div class="bg-black/50 border border-white/10 rounded-2xl px-3 py-2 text-center">
              <div class="text-[10px] text-emerald-400 uppercase font-bold">Uber Eats</div>
              <div class="text-sm font-extrabold text-white">${winner.uberEatsRating.toFixed(1)} / 5</div>
            </div>
            <div class="bg-black/50 border border-white/10 rounded-2xl px-3 py-2 text-center">
              <div class="text-[10px] text-sky-400 uppercase font-bold">Google</div>
              <div class="text-sm font-extrabold text-white">${winner.googleRating.toFixed(1)} / 5</div>
            </div>
          </div>
        </div>

        <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">
          ${escapeHtml(winner.description)}
        </p>

        <div class="bg-white/5 border border-white/10 rounded-2xl p-3.5 space-y-2">
          <div class="text-xs font-bold text-rose-300">
            Ambiente y experiencia: <span class="text-slate-200 font-normal">${escapeHtml(winner.vibe)}</span>
          </div>
          <div class="text-xs font-bold text-purple-300">
            Tendencia en redes (${escapeHtml(winner.socialHandle)}): <span class="text-slate-200 font-normal">${escapeHtml(winner.socialHighlight)}</span>
          </div>
        </div>

        <div>
          <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Platos recomendados para pedir:</div>
          <div class="flex flex-wrap gap-1.5">
            ${(winner.mustTry || [])
              .map(
                (dish) =>
                  `<span class="text-xs font-semibold px-3 py-1 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-200">${escapeHtml(dish)}</span>`
              )
              .join("")}
          </div>
        </div>

        <div>
          <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Comentarios en Uber Eats, Google y Redes:</div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            ${reviewsHtml}
          </div>
        </div>

        <div class="pt-3 border-t border-white/15 flex flex-wrap items-center justify-between gap-2">
          <div class="flex flex-wrap gap-2">
            <button
              id="btnAcceptWinner"
              class="bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-extrabold px-4 py-2.5 rounded-xl transition shadow-lg shadow-emerald-500/25"
            >
              Confirmar decisión y registrar visita
            </button>
            <button
              id="btnFavWinner"
              class="glass-pill hover:bg-white/15 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl transition"
            >
              ${isFavorite(winner.brandId) ? "Guardado en Favoritos" : "Agregar a Favoritos"}
            </button>
          </div>
          <button
            id="btnRerollWinner"
            class="text-xs font-bold text-slate-400 hover:text-white underline py-2"
          >
            Sortear otra alternativa
          </button>
        </div>
      </div>
    `;

    document.getElementById("btnAcceptWinner").addEventListener("click", () => {
      if (!isVisited(winner.uid, winner.brandId)) {
        toggleVisited(winner.uid, winner.brandId, winner.name);
      }
      const btn = document.getElementById("btnAcceptWinner");
      btn.textContent = "Guardado en la Bitácora de Salidas";
      btn.className = "bg-rose-600 text-white text-xs sm:text-sm font-extrabold px-4 py-2.5 rounded-xl";
    });

    document.getElementById("btnFavWinner").addEventListener("click", () => {
      toggleFavorite(winner.brandId);
      renderWinnerCard(winner);
    });

    document.getElementById("btnRerollWinner").addEventListener("click", () => {
      spinRoulette();
    });
  }

  function startBattleMode() {
    if (state.isSpinning) return;
    const pool = getFilteredPlaces({ forRoulette: true });
    const winnerContainer = document.getElementById("winnerResultContainer");

    if (pool.length < 2) {
      spinRoulette();
      return;
    }

    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const optionA = shuffled[0];
    const optionB = shuffled[1];

    playTickSound(600, 0.08);
    winnerContainer.classList.remove("hidden");

    winnerContainer.innerHTML = `
      <div class="bg-white/5 border border-purple-500/40 rounded-3xl p-5 space-y-4">
        <div class="text-center">
          <span class="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
            Modo Duelo · 2 Finalistas
          </span>
          <h3 class="text-lg sm:text-xl font-extrabold text-white mt-2">
            El sistema seleccionó estas dos alternativas al azar. ¿Cuál prefieren?
          </h3>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${[optionA, optionB]
            .map(
              (opt, idx) => `
              <div class="glass-card border border-white/15 hover:border-rose-500 rounded-2xl p-4 flex flex-col justify-between transition">
                <div>
                  <div class="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>Opción ${idx + 1} · ${escapeHtml(opt.zone)}</span>
                    <span class="text-emerald-400 font-bold">Uber Eats ${opt.uberEatsRating.toFixed(1)}/5</span>
                  </div>
                  <h4 class="text-lg font-extrabold text-white">${escapeHtml(opt.name)}</h4>
                  <p class="text-xs text-rose-300 font-semibold mb-2">${escapeHtml(opt.cuisine)} (${escapeHtml(opt.avgPriceCLP)})</p>
                  <p class="text-xs text-slate-300 line-clamp-3 mb-3">${escapeHtml(opt.description)}</p>
                </div>
                <button
                  type="button"
                  data-choose-idx="${idx}"
                  class="choose-duel-btn w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-xs py-2.5 rounded-xl transition"
                >
                  Elegir ${escapeHtml(opt.name)}
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

  // Modo Terna (3 Opciones con Descarte): Uno descarta 1 y el otro elige entre las 2 restantes
  function startTrioMode() {
    if (state.isSpinning) return;
    const pool = getFilteredPlaces({ forRoulette: true });
    const winnerContainer = document.getElementById("winnerResultContainer");

    if (pool.length < 3) {
      startBattleMode();
      return;
    }

    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    let trio = [shuffled[0], shuffled[1], shuffled[2]];
    let discardedAssigned = false;

    playTickSound(640, 0.08);
    winnerContainer.classList.remove("hidden");

    function renderTrioStep() {
      winnerContainer.innerHTML = `
        <div class="bg-white/5 border border-rose-500/40 rounded-3xl p-5 space-y-4">
          <div class="text-center">
            <span class="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
              ${!discardedAssigned ? "Paso 1 de 2 · Descarte" : "Paso 2 de 2 · Elección Final"}
            </span>
            <h3 class="text-lg sm:text-xl font-extrabold text-white mt-2">
              ${
                !discardedAssigned
                  ? `${escapeHtml(state.coupleNames.p1 || "Uno de ustedes")} descarta 1 opción que no quiera hoy`
                  : `Ahora ${escapeHtml(state.coupleNames.p2 || "el otro")} elige el ganador entre los 2 finalistas`
              }
            </h3>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-${trio.length} gap-3.5">
            ${trio
              .map(
                (opt, idx) => `
                <div class="glass-card border border-white/15 rounded-2xl p-4 flex flex-col justify-between transition">
                  <div>
                    <div class="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                      <span>${escapeHtml(opt.zone)}</span>
                      <span class="text-amber-400 font-bold">Nota ${opt.stars.toFixed(1)}</span>
                    </div>
                    <h4 class="text-base font-extrabold text-white">${escapeHtml(opt.name)}</h4>
                    <p class="text-xs text-rose-300 font-semibold mb-2">${escapeHtml(opt.cuisine)} · ${escapeHtml(opt.priceRange)}</p>
                    <p class="text-xs text-slate-300 line-clamp-3 mb-3">${escapeHtml(opt.description)}</p>
                  </div>
                  <button
                    type="button"
                    data-trio-idx="${idx}"
                    class="trio-action-btn w-full ${
                      !discardedAssigned
                        ? "bg-white/10 hover:bg-red-500/30 border border-white/15 text-slate-200"
                        : "bg-gradient-to-r from-rose-500 to-pink-600 text-white"
                    } font-bold text-xs py-2.5 rounded-xl transition"
                  >
                    ${!discardedAssigned ? "Descartar esta opción" : "Confirmar este lugar"}
                  </button>
                </div>
              `
              )
              .join("")}
          </div>
        </div>
      `;

      winnerContainer.querySelectorAll(".trio-action-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = Number(btn.getAttribute("data-trio-idx"));
          if (!discardedAssigned) {
            trio.splice(idx, 1);
            discardedAssigned = true;
            playTickSound(440, 0.07);
            renderTrioStep();
          } else {
            const chosen = trio[idx];
            playWinFanfare();
            if (typeof window.confetti === "function") {
              window.confetti({ particleCount: 75, spread: 65, origin: { y: 0.65 } });
            }
            renderWinnerCard(chosen);
          }
        });
      });
    }

    renderTrioStep();
  }

  function openDetailModal(uid) {
    const place = getAllPlaces().find((p) => p.uid === uid);
    if (!place) return;

    const modal = document.getElementById("detailModal");
    const content = document.getElementById("detailModalContent");

    const allBranches = getAllPlaces().filter((p) => p.brandId === place.brandId);

    content.innerHTML = `
      <div class="space-y-5">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-rose-400">${escapeHtml(place.cuisine)}</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">${escapeHtml(place.name)}</h2>
          <p class="text-xs sm:text-sm text-slate-300 mt-1">
            ${escapeHtml(place.mallFullName)} · <strong class="text-rose-300">${escapeHtml(place.zone)}</strong> · ${escapeHtml(place.avgPriceCLP)}
          </p>
        </div>

        <div class="grid grid-cols-3 gap-3 text-center">
          <div class="bg-white/5 border border-white/10 rounded-2xl p-3">
            <div class="text-xs text-slate-400 font-bold">Calificación General</div>
            <div class="text-lg font-extrabold text-amber-400 mt-1">${place.stars.toFixed(1)} / 5.0</div>
          </div>
          <div class="bg-white/5 border border-white/10 rounded-2xl p-3">
            <div class="text-xs text-emerald-400 font-bold">Nota Uber Eats</div>
            <div class="text-lg font-extrabold text-white mt-1">${place.uberEatsRating.toFixed(1)} / 5.0</div>
          </div>
          <div class="bg-white/5 border border-white/10 rounded-2xl p-3">
            <div class="text-xs text-sky-400 font-bold">Google Maps</div>
            <div class="text-lg font-extrabold text-white mt-1">${place.googleRating.toFixed(1)} / 5.0</div>
          </div>
        </div>

        <div class="space-y-2">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">Descripción del Local</h4>
          <p class="text-sm text-slate-200 leading-relaxed">${escapeHtml(place.description)}</p>
        </div>

        <div class="bg-gradient-to-r from-rose-500/15 to-purple-500/15 border border-rose-500/30 rounded-2xl p-4 space-y-1.5">
          <div class="text-xs font-bold text-rose-300">Reseña en Redes Sociales (${escapeHtml(place.socialHandle || "@gastronomiascl")}):</div>
          <p class="text-xs sm:text-sm text-white">${escapeHtml(place.socialHighlight)}</p>
          <div class="text-xs text-purple-200 pt-1"><strong>Ambiente recomendado:</strong> ${escapeHtml(place.vibe)}</div>
        </div>

        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Especialidades y Platos Recomendados</h4>
          <div class="flex flex-wrap gap-2">
            ${(place.mustTry || [])
              .map(
                (m) =>
                  `<span class="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-white">${escapeHtml(m)}</span>`
              )
              .join("")}
          </div>
        </div>

        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Opiniones de Clientes</h4>
          <div class="space-y-2.5">
            ${(place.reviews || [])
              .map(
                (r) => `
                <div class="bg-black/40 border border-white/10 rounded-2xl p-3.5">
                  <div class="flex items-center justify-between text-xs font-bold mb-1">
                    <span class="text-rose-300">${escapeHtml(r.user)}</span>
                    <span class="text-emerald-400">${escapeHtml(r.source)} · ${r.rating} / 5</span>
                  </div>
                  <p class="text-xs sm:text-sm text-slate-200 italic">"${escapeHtml(r.text)}"</p>
                </div>
              `
              )
              .join("")}
          </div>
        </div>

        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Sucursales en Malls de Santiago</h4>
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

  function renderHistoryModal() {
    document.getElementById("inputPartner1").value = state.coupleNames.p1 || "";
    document.getElementById("inputPartner2").value = state.coupleNames.p2 || "";

    const body = document.getElementById("historyModalBody");
    const all = getAllPlaces();

    const favPlaces = all.filter((p) => p.isPrimaryBranch !== false && state.favorites.includes(p.brandId));
    const vetoPlaces = all.filter((p) => p.isPrimaryBranch !== false && state.vetoed.includes(p.brandId));

    body.innerHTML = `
      <div>
        <h4 class="text-sm font-extrabold text-emerald-400 mb-2">
          Lugares Visitados (${state.visited.length})
        </h4>
        ${
          state.visited.length === 0
            ? `<p class="text-xs text-slate-400 bg-white/5 rounded-xl p-3">Aún no han registrado salidas. Presiona "Marcar visita" en cualquier tarjeta para llevar su registro.</p>`
            : `<div class="space-y-2">
                ${state.visited
                  .map(
                    (v) => `
                  <div class="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs">
                    <div>
                      <span class="font-bold text-white">${escapeHtml(v.name)}</span>
                      <span class="text-slate-400 ml-2">${escapeHtml(v.date)}</span>
                    </div>
                    <button data-remove-visited="${v.uid}" class="text-rose-400 hover:underline font-semibold">Quitar</button>
                  </div>
                `
                  )
                  .join("")}
              </div>`
        }
      </div>

      <div>
        <h4 class="text-sm font-extrabold text-rose-400 mb-2">
          Favoritos Guardados (${favPlaces.length})
        </h4>
        ${
          favPlaces.length === 0
            ? `<p class="text-xs text-slate-400 bg-white/5 rounded-xl p-3">Usa el botón "Guardar" en las tarjetas para añadir locales a su lista de favoritos.</p>`
            : `<div class="flex flex-wrap gap-2">
                ${favPlaces
                  .map(
                    (f) => `
                  <span class="text-xs bg-rose-500/20 border border-rose-500/30 text-rose-200 px-3 py-1.5 rounded-xl flex items-center gap-2">
                    <span>${escapeHtml(f.name)}</span>
                    <button data-unfav="${f.brandId}" class="text-white hover:text-rose-400 font-bold">Quitar</button>
                  </span>
                `
                  )
                  .join("")}
              </div>`
        }
      </div>

      <div>
        <h4 class="text-sm font-extrabold text-red-400 mb-2">
          Locales Vetados del Sorteo (${vetoPlaces.length})
        </h4>
        ${
          vetoPlaces.length === 0
            ? `<p class="text-xs text-slate-400 bg-white/5 rounded-xl p-3">Ningún local vetado. Si prefieren excluir un restaurante de los sorteos, presionen "Vetar" en su tarjeta.</p>`
            : `<div class="flex flex-wrap gap-2">
                ${vetoPlaces
                  .map(
                    (v) => `
                  <span class="text-xs bg-red-500/20 border border-red-500/30 text-red-200 px-3 py-1.5 rounded-xl flex items-center gap-2">
                    <span>${escapeHtml(v.name)}</span>
                    <button data-unveto="${v.brandId}" class="text-white font-bold underline">Habilitar</button>
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

  function renderAll() {
    updateNavbarBadges();
    renderMallSelector();
    renderZoneFilterBar();
    updateFilterUI();
    renderDirectoryGrid();
  }

  document.addEventListener("DOMContentLoaded", () => {
    const addMallSelect = document.getElementById("addMallId");
    addMallSelect.innerHTML = window.MALLS_DATA.filter((m) => m.id !== "all")
      .map((m) => `<option value="${m.id}">${escapeHtml(m.shortName)}</option>`)
      .join("");

    document.getElementById("btnToggleSound").addEventListener("click", () => {
      state.soundEnabled = !state.soundEnabled;
      saveState();
    });

    document.querySelectorAll(".filter-cat-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.selectedCategory = btn.getAttribute("data-category");
        renderAll();
      });
    });

    document.querySelectorAll(".filter-meal-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.selectedMeal = btn.getAttribute("data-meal");
        renderAll();
      });
    });

    document.querySelectorAll(".filter-budget-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.selectedBudget = btn.getAttribute("data-budget");
        renderAll();
      });
    });

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

    document.getElementById("btnResetFilters").addEventListener("click", () => {
      state.selectedCategory = "all";
      state.selectedMeal = "all";
      state.selectedBudget = "all";
      state.selectedZone = "all";
      state.highRatedOnly = false;
      state.excludeVisited = false;
      state.onlyFavorites = false;
      state.searchQuery = "";
      document.getElementById("searchInput").value = "";
      renderAll();
    });

    document.getElementById("searchInput").addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      renderDirectoryGrid();
    });
    document.getElementById("sortSelect").addEventListener("change", (e) => {
      state.sortBy = e.target.value;
      renderDirectoryGrid();
    });

    document.getElementById("btnSpinRoulette").addEventListener("click", spinRoulette);
    document.getElementById("btnBattleMode").addEventListener("click", startBattleMode);
    document.getElementById("btnTrioMode").addEventListener("click", startTrioMode);

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
      const p2 = document.getElementById("inputPartner2").value.trim() || "Mi Pareja";
      state.coupleNames = { p1, p2 };
      saveState();
      renderAll();
    });

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
      const reviewText = document.getElementById("addReviewText").value.trim() || "Excelente lugar agregado a nuestra lista.";

      const mallObj = window.MALLS_DATA.find((m) => m.id === mallId);
      const customId = "custom-" + Date.now();

      const newPlace = {
        uid: `${customId}__${mallId}`,
        brandId: customId,
        name,
        mallId,
        mallName: mallObj ? mallObj.shortName : mallId,
        mallFullName: mallObj ? mallObj.name : mallId,
        zone: "Personalizado",
        cuisine,
        category,
        mealTypes: ["almuerzo", "cena", "dulce"],
        priceRange: "$$",
        avgPriceCLP: "$10.000 - $18.000 p/p",
        stars,
        uberEatsRating: uberRating,
        googleRating: stars,
        socialHandle: "@nuestrosdatos",
        socialHighlight: "Agregado manualmente a nuestra base de datos del mall.",
        description,
        mustTry: ["Especialidad de la Casa"],
        vibe: "Seleccionado especialmente para nuestras salidas.",
        reviews: [
          { source: "Reseña Propia", user: `${state.coupleNames.p1} y ${state.coupleNames.p2}`, rating: stars, text: reviewText }
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
