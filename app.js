// ============================================================================
// RENDEZ-VOUS À DEUX — DYLAN & MARIA (Edición Paso a Paso, Sin Iconos)
// ============================================================================

const STORAGE_KEYS = {
  FAVORITES: "rv_couple_favorites_v3",
  HISTORY: "rv_couple_history_v3",
  CUSTOM_PLACES: "rv_couple_custom_places_v3",
  SOUND_ENABLED: "rv_couple_sound_v3",
  SELECTED_MALL: "rv_couple_selected_mall_v3",
  COUPLE_REVIEWS: "rv_dylan_maria_reviews_v3"
};

const PRICE_RATING_LABELS = {
  5: "5.0 Estrellas · Muy Económico / Excelente Valor",
  4: "4.0 Estrellas · Precio Justo / Accesible",
  3: "3.0 Estrellas · Precio Moderado / Estándar",
  2: "2.0 Estrellas · Algo Costoso / Especial",
  1: "1.0 Estrella · Muy Costoso / Lujo"
};

const STEP_META = {
  1: {
    indicator: "Paso 1 de 4 · Punto de Partida",
    headline: "¿Dónde saldremos hoy, Dylan y Maria?"
  },
  2: {
    indicator: "Paso 2 de 4 · Nuestro Antojo",
    headline: "Personalicen qué formato y momento buscan hoy"
  },
  3: {
    indicator: "Paso 3 de 4 · Dinámica de Juego",
    headline: "¿Cómo quieren elegir el lugar de su cita?"
  },
  4: {
    indicator: "Paso 4 de 4 · Resultado de la Salida",
    headline: "La elección para Dylan y Maria"
  }
};

// Estado de la aplicación
const state = {
  activeTab: "game", // "game" | "visited" | "catalog"
  gameStep: 1, // 1 | 2 | 3 | 4
  lastGameMode: "Ruleta Directa",
  selectedMallId: "all",
  catalogMallId: "all",
  selectedZone: "all",
  selectedCategory: "all",
  selectedMealTime: "all",
  highRatedOnly: false,
  excludeVisited: false,
  onlyFavorites: false,
  searchQuery: "",
  sortBy: "rating-desc",
  favorites: [],
  history: [],
  customPlaces: [],
  coupleReviews: [],
  soundEnabled: true,
  isSpinning: false,
  currentWinner: null
};

// Audio Web API para feedback táctil durante el sorteo
let audioCtx = null;
function playTickSound(freq = 520, duration = 0.035, type = "triangle") {
  if (!state.soundEnabled) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Ignorar si el navegador bloquea audio sin interacción previa
  }
}

function playWinFanfare() {
  if (!state.soundEnabled) return;
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((note, i) => {
    setTimeout(() => playTickSound(note, 0.14, "sine"), i * 95);
  });
}

// ============================================================================
// CARGA Y GUARDADO DE DATOS (LocalStorage)
// ============================================================================
function loadPersistedState() {
  try {
    const favs = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    const hist = localStorage.getItem(STORAGE_KEYS.HISTORY);
    const custom = localStorage.getItem(STORAGE_KEYS.CUSTOM_PLACES);
    const sound = localStorage.getItem(STORAGE_KEYS.SOUND_ENABLED);
    const mall = localStorage.getItem(STORAGE_KEYS.SELECTED_MALL);
    const reviews = localStorage.getItem(STORAGE_KEYS.COUPLE_REVIEWS);

    if (favs) state.favorites = JSON.parse(favs);
    if (hist) state.history = JSON.parse(hist);
    if (custom) state.customPlaces = JSON.parse(custom);
    if (sound !== null) state.soundEnabled = JSON.parse(sound);
    if (mall) {
      state.selectedMallId = mall;
      state.catalogMallId = mall;
    }
    if (reviews) state.coupleReviews = JSON.parse(reviews);
  } catch (err) {
    console.warn("Error cargando estado local:", err);
  }
}

function savePersistedState() {
  try {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(state.favorites));
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(state.history));
    localStorage.setItem(STORAGE_KEYS.CUSTOM_PLACES, JSON.stringify(state.customPlaces));
    localStorage.setItem(STORAGE_KEYS.SOUND_ENABLED, JSON.stringify(state.soundEnabled));
    localStorage.setItem(STORAGE_KEYS.SELECTED_MALL, state.selectedMallId);
    localStorage.setItem(STORAGE_KEYS.COUPLE_REVIEWS, JSON.stringify(state.coupleReviews));
  } catch (err) {
    console.warn("Error guardando estado local:", err);
  }
}

// ============================================================================
// UTILIDADES DE DATOS Y FORMATO
// ============================================================================
function getAllRestaurants() {
  return [...RESTAURANTS_DATA, ...state.customPlaces];
}

function getMallById(mallId) {
  return MALLS_DATA.find((m) => m.id === mallId) || null;
}

function getCategoryMeta(catId) {
  return CATEGORIES_META[catId] || { label: "Restaurante", badgeClass: "bg-stone-100 text-stone-800 border-stone-200" };
}

function formatStarsText(rating) {
  const num = Number(rating) || 0;
  return `${num.toFixed(1)} / 5.0 Estrellas`;
}

function getPriceRatingShort(priceLevel) {
  const lvl = Number(priceLevel) || 3;
  return PRICE_RATING_LABELS[lvl] || `${lvl}.0 Estrellas de Precio`;
}

function isFavorite(id) {
  return state.favorites.includes(id);
}

function isVisitedToday(id) {
  const visitedInHistory = state.history.some((h) => h.id === id);
  const visitedInReviews = state.coupleReviews.some((r) => r.placeId === id);
  return visitedInHistory || visitedInReviews;
}

function getCoupleReviewForPlace(placeId, placeName) {
  return state.coupleReviews.find(
    (r) => r.placeId === placeId || (placeName && r.placeName.toLowerCase() === placeName.toLowerCase())
  );
}

// ============================================================================
// FILTRADO PARA EL JUEGO Y PARA EL CATÁLOGO
// ============================================================================
function getFilteredRestaurants() {
  const all = getAllRestaurants();

  return all.filter((item) => {
    if (state.selectedMallId !== "all" && item.mallId !== state.selectedMallId) {
      return false;
    }
    if (state.selectedZone !== "all" && item.zone !== state.selectedZone) {
      return false;
    }
    if (state.selectedCategory !== "all" && item.category !== state.selectedCategory) {
      return false;
    }
    if (state.selectedMealTime !== "all" && (!item.mealTimes || !item.mealTimes.includes(state.selectedMealTime))) {
      return false;
    }
    if (state.highRatedOnly && item.rating < 4.5) {
      return false;
    }
    if (state.excludeVisited && isVisitedToday(item.id)) {
      return false;
    }
    if (state.onlyFavorites && !isFavorite(item.id)) {
      return false;
    }
    return true;
  });
}

function getCatalogRestaurants() {
  const all = getAllRestaurants();

  const filtered = all.filter((item) => {
    if (state.catalogMallId !== "all" && item.mallId !== state.catalogMallId) {
      return false;
    }
    if (state.searchQuery.trim() !== "") {
      const q = state.searchQuery.toLowerCase().trim();
      const matchName = item.name.toLowerCase().includes(q);
      const matchCuisine = item.cuisine.toLowerCase().includes(q);
      const matchTags = (item.tags || []).some((t) => t.toLowerCase().includes(q));
      const matchCravings = (item.cravingTags || []).some((t) => t.toLowerCase().includes(q));
      const matchDish = (item.mustTry || "").toLowerCase().includes(q);
      const matchZone = (item.zone || "").toLowerCase().includes(q);
      if (!matchName && !matchCuisine && !matchTags && !matchCravings && !matchDish && !matchZone) {
        return false;
      }
    }
    return true;
  });

  return filtered.sort((a, b) => {
    switch (state.sortBy) {
      case "rating-desc":
        return b.rating - a.rating;
      case "wait-asc":
        return (a.waitTimeMins || 15) - (b.waitTimeMins || 15);
      case "name-asc":
        return a.name.localeCompare(b.name);
      default:
        return b.rating - a.rating;
    }
  });
}

// ============================================================================
// NAVEGACIÓN POR PESTAÑAS (APARTADOS) Y PASOS DEL JUEGO
// ============================================================================
function switchTab(tabId) {
  state.activeTab = tabId;

  const panels = {
    game: document.getElementById("tabPanelGame"),
    visited: document.getElementById("tabPanelVisited"),
    catalog: document.getElementById("tabPanelCatalog")
  };

  Object.entries(panels).forEach(([key, panel]) => {
    if (!panel) return;
    if (key === tabId) {
      panel.classList.remove("hidden");
    } else {
      panel.classList.add("hidden");
    }
  });

  document.querySelectorAll(".nav-tab-btn").forEach((btn) => {
    const isTarget = btn.getAttribute("data-tab") === tabId;
    if (isTarget) {
      btn.className =
        "nav-tab-btn flex-1 sm:flex-initial px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all bg-rose-900 text-white shadow-sm";
    } else {
      btn.className =
        "nav-tab-btn flex-1 sm:flex-initial px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all text-stone-600 hover:text-stone-900 hover:bg-stone-100";
    }
  });

  if (tabId === "visited") {
    renderCoupleVisitedSection();
  } else if (tabId === "catalog") {
    renderDirectory();
  }
}

function goToGameStep(stepNumber) {
  const step = Math.max(1, Math.min(4, Number(stepNumber) || 1));
  state.gameStep = step;

  [1, 2, 3, 4].forEach((n) => {
    const el = document.getElementById(`gameStep${n}`);
    if (!el) return;
    if (n === step) {
      el.classList.remove("hidden");
    } else {
      el.classList.add("hidden");
    }
  });

  const meta = STEP_META[step];
  const indicatorEl = document.getElementById("gameStepIndicator");
  const headlineEl = document.getElementById("gameStepHeadline");
  if (indicatorEl && meta) indicatorEl.textContent = meta.indicator;
  if (headlineEl && meta) headlineEl.textContent = meta.headline;

  document.querySelectorAll(".step-progress-pill").forEach((pill) => {
    const pillStep = Number(pill.getAttribute("data-goto-step"));
    if (pillStep === step) {
      pill.className =
        "step-progress-pill text-left p-3 rounded-xl border-2 border-rose-800 bg-rose-50/70 transition-all shadow-sm";
    } else if (pillStep < step) {
      pill.className =
        "step-progress-pill text-left p-3 rounded-xl border border-emerald-300 bg-emerald-50/40 transition-all hover:border-emerald-400";
    } else {
      pill.className =
        "step-progress-pill text-left p-3 rounded-xl border border-stone-200 bg-stone-50/60 transition-all hover:border-stone-300";
    }
  });

  updateStepSummaries();
}

function updateStepSummaries() {
  const mallEl = document.getElementById("stepSummaryMall");
  const cravingEl = document.getElementById("stepSummaryCraving");
  const modeEl = document.getElementById("stepSummaryMode");

  if (mallEl) {
    const mallObj = getMallById(state.selectedMallId);
    mallEl.textContent = mallObj ? mallObj.shortName : "Todos los Malls";
  }

  if (cravingEl) {
    const parts = [];
    if (state.selectedCategory !== "all") {
      parts.push(getCategoryMeta(state.selectedCategory).label);
    }
    if (state.selectedMealTime !== "all") {
      const mealNames = {
        almuerzo: "Almuerzo",
        once: "Once / Café",
        cena: "Cena",
        "cita-romantica": "Cita Especial",
        "salida-rapida": "Al Paso"
      };
      parts.push(mealNames[state.selectedMealTime] || state.selectedMealTime);
    }
    if (state.selectedZone !== "all") {
      parts.push(state.selectedZone);
    }
    cravingEl.textContent = parts.length > 0 ? parts.join(" · ") : "Sin filtro restrictivo";
  }

  if (modeEl) {
    modeEl.textContent = state.lastGameMode || "Pendiente";
  }

  // Actualizar contadores de candidatos disponibles
  const poolCount = getFilteredRestaurants().length;
  document.querySelectorAll(".active-pool-counter").forEach((el) => {
    el.textContent = poolCount;
  });
}

// ============================================================================
// RENDERIZADO DE INTERFAZ: PASO 1 (MALLS) Y PASO 2 (ZONAS)
// ============================================================================
function renderMallSelector() {
  const container = document.getElementById("mallSelectorGrid");
  if (!container) return;

  const allRestaurants = getAllRestaurants();

  const allCardActive = state.selectedMallId === "all";
  let html = `
    <button type="button" data-mall-id="all"
      class="mall-card text-left p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
        allCardActive
          ? "active border-rose-800 bg-rose-50/70 shadow-sm"
          : "border-stone-200/90 bg-white hover:border-rose-300 hover:bg-stone-50/60"
      }">
      <div class="flex items-center justify-between w-full mb-2">
        <span class="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${
          allCardActive ? "bg-rose-900 text-white" : "bg-stone-100 text-stone-600"
        }">Santiago Completo</span>
        <span class="text-xs font-bold text-stone-500">${allRestaurants.length} locales</span>
      </div>
      <div>
        <h3 class="font-bold text-stone-900 text-sm sm:text-base leading-snug">Todos los Malls</h3>
        <p class="text-xs text-stone-500 mt-0.5 line-clamp-1">Sorteo abierto en todos los centros comerciales</p>
      </div>
    </button>
  `;

  MALLS_DATA.forEach((mall) => {
    const count = allRestaurants.filter((r) => r.mallId === mall.id).length;
    const isActive = state.selectedMallId === mall.id;

    html += `
      <button type="button" data-mall-id="${mall.id}"
        class="mall-card text-left p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
          isActive
            ? "active border-rose-800 bg-rose-50/70 shadow-sm"
            : "border-stone-200/90 bg-white hover:border-rose-300 hover:bg-stone-50/60"
        }">
        <div class="flex items-center justify-between w-full mb-2">
          <span class="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${
            isActive ? "bg-rose-900 text-white" : "bg-stone-100 text-stone-600"
          }">${mall.commune}</span>
          <span class="text-xs font-bold text-stone-500">${count} locales</span>
        </div>
        <div>
          <h3 class="font-bold text-stone-900 text-sm sm:text-base leading-snug">${mall.shortName}</h3>
          <p class="text-xs text-stone-500 mt-0.5 line-clamp-1">${mall.highlight}</p>
        </div>
      </button>
    `;
  });

  container.innerHTML = html;

  const summaryEl = document.getElementById("selectedMallSummary");
  if (summaryEl) {
    if (state.selectedMallId === "all") {
      summaryEl.textContent = "Mostrando todos los centros comerciales de Santiago";
    } else {
      const m = getMallById(state.selectedMallId);
      summaryEl.textContent = m ? `${m.name} (${m.commune}) — ${m.address}` : "";
    }
  }

  container.querySelectorAll("button[data-mall-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const newMall = btn.getAttribute("data-mall-id");
      state.selectedMallId = newMall;
      state.catalogMallId = newMall;
      state.selectedZone = "all";
      const catalogSelect = document.getElementById("catalogMallSelect");
      if (catalogSelect) catalogSelect.value = newMall;
      savePersistedState();
      renderMallSelector();
      renderZoneFilterBar();
      updateStepSummaries();
      renderDirectory();
    });
  });
}

function populateCatalogMallSelect() {
  const select = document.getElementById("catalogMallSelect");
  const modalMallSelect = document.getElementById("customMall");
  const visitMallSelect = document.getElementById("visitMallSelect");

  if (select) {
    let optionsHtml = `<option value="all">Todos los Malls de Santiago</option>`;
    MALLS_DATA.forEach((m) => {
      optionsHtml += `<option value="${m.id}">${m.name} (${m.commune})</option>`;
    });
    select.innerHTML = optionsHtml;
    select.value = state.catalogMallId;
  }

  if (modalMallSelect) {
    modalMallSelect.innerHTML = MALLS_DATA.map(
      (m) => `<option value="${m.id}">${m.name} (${m.commune})</option>`
    ).join("");
  }

  if (visitMallSelect) {
    let visitMallHtml = `<option value="Otro / Fuera de Mall">Local Independiente / Fuera de Mall</option>`;
    MALLS_DATA.forEach((m) => {
      visitMallHtml += `<option value="${m.name}">${m.name} (${m.commune})</option>`;
    });
    visitMallSelect.innerHTML = visitMallHtml;
  }
}

function renderZoneFilterBar() {
  const wrapper = document.getElementById("gameZoneWrapper");
  const bar = document.getElementById("zoneFilterBar");
  if (!bar || !wrapper) return;

  if (state.selectedMallId === "all") {
    wrapper.classList.add("hidden");
    return;
  }

  const mall = getMallById(state.selectedMallId);
  if (!mall || !mall.zones || mall.zones.length === 0) {
    wrapper.classList.add("hidden");
    return;
  }

  wrapper.classList.remove("hidden");

  let pillsHtml = `
    <button type="button" data-zone="all"
      class="filter-pill px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all ${
        state.selectedZone === "all"
          ? "active"
          : "border-stone-200 bg-white text-stone-600 hover:bg-stone-100"
      }">
      Todos los sectores de ${mall.shortName}
    </button>
  `;

  mall.zones.forEach((zone) => {
    const active = state.selectedZone === zone;
    pillsHtml += `
      <button type="button" data-zone="${zone}"
        class="filter-pill px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all ${
          active ? "active" : "border-stone-200 bg-white text-stone-600 hover:bg-stone-100"
        }">
        ${zone}
      </button>
    `;
  });

  bar.innerHTML = pillsHtml;

  bar.querySelectorAll("button[data-zone]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.selectedZone = btn.getAttribute("data-zone");
      renderZoneFilterBar();
      updateStepSummaries();
    });
  });
}

// ============================================================================
// PASO 3 Y 4: MODOS DE JUEGO (RULETA DIRECTA, DUELO 2, TERNA 3)
// ============================================================================
function spinRoulette() {
  if (state.isSpinning) return;

  const candidates = getFilteredRestaurants();
  const slotTitle = document.getElementById("slotTitle");
  const slotSubtitle = document.getElementById("slotSubtitle");
  const slotBadge = document.getElementById("slotBadge");
  const slotBox = document.getElementById("slotMachineBox");
  const resultContainer = document.getElementById("winnerResultContainer");

  state.lastGameMode = "Ruleta Directa";
  goToGameStep(4);

  if (slotBox) slotBox.classList.remove("hidden");

  if (candidates.length === 0) {
    if (slotBadge) slotBadge.textContent = "Sin coincidencias con los filtros";
    if (slotTitle) slotTitle.textContent = "No hay locales con esa combinación";
    if (slotSubtitle) {
      slotSubtitle.textContent =
        "Vuelvan al Paso 2 para ampliar el formato o desactivar filtros restrictivos.";
    }
    if (resultContainer) {
      resultContainer.innerHTML = `
        <div class="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
          <p class="text-sm font-bold text-amber-900 mb-3">No encontramos locales que cumplan todos los filtros a la vez.</p>
          <button type="button" id="btnBackToStep2Empty" class="px-5 py-2.5 rounded-xl bg-rose-900 text-white text-xs font-bold hover:bg-rose-800 transition-all">
            Volver al Paso 2 y Ajustar Antojo
          </button>
        </div>
      `;
      resultContainer.classList.remove("hidden");
      document.getElementById("btnBackToStep2Empty")?.addEventListener("click", () => goToGameStep(2));
    }
    return;
  }

  state.isSpinning = true;
  if (resultContainer) resultContainer.classList.add("hidden");
  if (slotBox) slotBox.classList.add("ring-2", "ring-rose-400");

  const winner = candidates[Math.floor(Math.random() * candidates.length)];
  const totalSteps = 22;
  let currentStep = 0;

  function stepAnimation() {
    const tempPick = candidates[Math.floor(Math.random() * candidates.length)];
    const tempMall = getMallById(tempPick.mallId);

    if (slotBadge) {
      slotBadge.textContent = `${tempMall ? tempMall.shortName : "Santiago"} · ${tempPick.zone}`;
    }
    if (slotTitle) slotTitle.textContent = tempPick.name;
    if (slotSubtitle) slotSubtitle.textContent = `${tempPick.cuisine} · ${formatStarsText(tempPick.rating)}`;

    playTickSound(360 + currentStep * 16, 0.03);
    currentStep++;

    if (currentStep < totalSteps) {
      const delay = 40 + Math.pow(currentStep / totalSteps, 2.1) * 180;
      setTimeout(stepAnimation, delay);
    } else {
      finishSpin(winner);
    }
  }

  stepAnimation();
}

function finishSpin(winner) {
  state.isSpinning = false;
  state.currentWinner = winner;

  const slotTitle = document.getElementById("slotTitle");
  const slotSubtitle = document.getElementById("slotSubtitle");
  const slotBadge = document.getElementById("slotBadge");
  const slotBox = document.getElementById("slotMachineBox");

  const mall = getMallById(winner.mallId);

  if (slotBox) slotBox.classList.remove("ring-2", "ring-rose-400");
  if (slotBadge) {
    slotBadge.textContent = `DECISIÓN LISTA · ${mall ? mall.shortName.toUpperCase() : "SANTIAGO"}`;
  }
  if (slotTitle) slotTitle.textContent = winner.name;
  if (slotSubtitle) {
    slotSubtitle.textContent = `${winner.cuisine} en ${winner.zone} — Recomendado: ${winner.mustTry}`;
  }

  playWinFanfare();
  renderWinnerResultCard(winner);
}

function renderWinnerResultCard(item) {
  const container = document.getElementById("winnerResultContainer");
  if (!container) return;

  const mall = getMallById(item.mallId);
  const catMeta = getCategoryMeta(item.category);
  const fav = isFavorite(item.id);
  const coupleRev = getCoupleReviewForPlace(item.id, item.name);

  let coupleBannerHtml = "";
  if (coupleRev) {
    const avgCouple = ((Number(coupleRev.dylanRating) + Number(coupleRev.mariaRating)) / 2).toFixed(1);
    coupleBannerHtml = `
      <div class="mb-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-1.5">
          <span class="text-[11px] font-bold uppercase tracking-wider text-emerald-900">Ya visitado por Dylan y Maria (${coupleRev.visitDate})</span>
          <span class="text-xs font-extrabold text-emerald-800">Promedio Pareja: ${avgCouple} / 5.0 Estrellas · Precio: ${coupleRev.priceLevel}.0 Estrellas</span>
        </div>
        <p class="text-xs text-emerald-900"><strong>Dylan (${coupleRev.dylanRating.toFixed(1)}):</strong> "${coupleRev.dylanComment}" · <strong>Maria (${coupleRev.mariaRating.toFixed(1)}):</strong> "${coupleRev.mariaComment}"</p>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="bg-white border-2 border-rose-200 rounded-3xl p-6 sm:p-8 shadow-lg transition-all">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div class="flex flex-wrap items-center gap-2">
          <span class="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${catMeta.badgeClass}">
            ${catMeta.label}
          </span>
          <span class="text-xs font-semibold px-3 py-1 rounded-full bg-stone-100 text-stone-700">
            ${mall ? mall.name : "Santiago"} · ${item.zone}
          </span>
        </div>
        <span class="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-lg">
          Calificación General: ${formatStarsText(item.rating)}
        </span>
      </div>

      <div class="mb-5">
        <h3 class="font-serif text-2xl sm:text-3xl font-bold text-stone-900">${item.name}</h3>
        <p class="text-sm font-medium text-rose-900 mt-1">${item.cuisine}</p>
        <p class="text-sm text-stone-600 mt-2 leading-relaxed">${item.vibe}</p>
      </div>

      ${coupleBannerHtml}

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-stone-50 border border-stone-200/80 mb-5">
        <div>
          <span class="block text-[11px] uppercase tracking-wider text-stone-400 font-semibold">Espera aprox.</span>
          <span class="text-sm font-bold text-stone-800">${item.waitTimeMins} minutos</span>
        </div>
        <div>
          <span class="block text-[11px] uppercase tracking-wider text-stone-400 font-semibold">Plato recomendado para pedir</span>
          <span class="text-sm font-bold text-rose-900">${item.mustTry}</span>
        </div>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100">
        <div class="flex flex-wrap items-center gap-2">
          <button type="button" id="btnConfirmVisitChoice"
            class="px-5 py-2.5 rounded-xl bg-rose-900 hover:bg-rose-800 text-white text-xs sm:text-sm font-bold transition-all shadow-sm">
            Confirmar y Evaluar Salida (Dylan y Maria)
          </button>
          <button type="button" id="btnWinnerFav"
            class="px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
              fav
                ? "border-rose-300 bg-rose-50 text-rose-900"
                : "border-stone-200 bg-white text-stone-700 hover:bg-stone-50"
            }">
            ${fav ? "Guardado en Favoritos" : "Guardar en Favoritos"}
          </button>
        </div>

        <button type="button" id="btnSpinAgainQuick"
          class="px-4 py-2.5 rounded-xl border border-stone-300 hover:border-stone-400 text-stone-700 text-xs sm:text-sm font-semibold transition-all">
          Volver a Sortear Otro Local
        </button>
      </div>
    </div>
  `;

  container.classList.remove("hidden");

  document.getElementById("btnConfirmVisitChoice")?.addEventListener("click", () => {
    registerVisitInHistory(item);
    openVisitReviewModal(item);
  });

  document.getElementById("btnWinnerFav")?.addEventListener("click", () => {
    toggleFavorite(item.id);
    renderWinnerResultCard(item);
    renderDirectory();
  });

  document.getElementById("btnSpinAgainQuick")?.addEventListener("click", () => {
    spinRoulette();
  });
}

// Modo Duelo 2 Opciones
function startDuelMode() {
  const candidates = getFilteredRestaurants();
  const resultContainer = document.getElementById("winnerResultContainer");
  const slotBox = document.getElementById("slotMachineBox");

  state.lastGameMode = "Duelo de 2 Opciones";
  goToGameStep(4);

  if (slotBox) slotBox.classList.add("hidden");

  if (candidates.length < 2) {
    if (resultContainer) {
      resultContainer.innerHTML = `
        <div class="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
          <p class="text-sm font-bold text-amber-900 mb-3">Se necesitan al menos 2 locales disponibles para iniciar un duelo cara a cara.</p>
          <button type="button" id="btnBackToStep2Duel" class="px-5 py-2.5 rounded-xl bg-rose-900 text-white text-xs font-bold hover:bg-rose-800 transition-all">
            Volver al Paso 2 y Ampliar Filtros
          </button>
        </div>
      `;
      resultContainer.classList.remove("hidden");
      document.getElementById("btnBackToStep2Duel")?.addEventListener("click", () => goToGameStep(2));
    }
    return;
  }

  const shuffled = [...candidates].sort(() => Math.random() - 0.5);
  const [optionA, optionB] = [shuffled[0], shuffled[1]];

  playTickSound(600, 0.08, "sine");

  if (!resultContainer) return;

  const mallA = getMallById(optionA.mallId);
  const mallB = getMallById(optionB.mallId);

  resultContainer.innerHTML = `
    <div class="bg-white border-2 border-stone-900 rounded-3xl p-6 sm:p-8 shadow-lg">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-5">
        <div>
          <span class="text-[11px] font-bold uppercase tracking-widest text-rose-800 block">Duelo Cara a Cara · Dylan & Maria</span>
          <h3 class="font-serif text-xl sm:text-2xl font-bold text-stone-900">Dos finalistas al azar: elijan su ganador</h3>
        </div>
        <button type="button" id="btnRerollDuel" class="text-xs font-bold px-3.5 py-2 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 transition-all">
          Sortear Otro Duelo
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${[
          { opt: optionA, mall: mallA, label: "FINALISTA A" },
          { opt: optionB, mall: mallB, label: "FINALISTA B" }
        ]
          .map(
            ({ opt, mall, label }) => `
          <div class="border border-stone-200 rounded-2xl p-5 flex flex-col justify-between bg-stone-50/60 hover:border-rose-400 transition-all">
            <div>
              <div class="flex items-center justify-between gap-2 mb-2">
                <span class="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded bg-stone-900 text-white">${label}</span>
                <span class="text-xs font-bold text-amber-800">${formatStarsText(opt.rating)}</span>
              </div>
              <h4 class="font-serif text-xl font-bold text-stone-900">${opt.name}</h4>
              <p class="text-xs font-semibold text-rose-900 mt-0.5">${opt.cuisine} · ${mall ? mall.shortName : ""} (${opt.zone})</p>
              <p class="text-xs text-stone-600 mt-2 leading-relaxed">${opt.vibe}</p>
              <div class="mt-3 pt-3 border-t border-stone-200/70 text-xs text-stone-700 space-y-1">
                <div><span class="text-stone-400">Imperdible:</span> <strong class="text-rose-900">${opt.mustTry}</strong></div>
                <div><span class="text-stone-400">Espera aprox.:</span> <strong>${opt.waitTimeMins} min</strong></div>
              </div>
            </div>
            <button type="button" data-pick-duel="${opt.id}"
              class="mt-4 w-full py-3 rounded-xl bg-rose-900 hover:bg-rose-800 text-white font-bold text-xs uppercase tracking-wider transition-all">
              Elegir ${opt.name}
            </button>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `;

  resultContainer.classList.remove("hidden");

  document.getElementById("btnRerollDuel")?.addEventListener("click", startDuelMode);

  resultContainer.querySelectorAll("button[data-pick-duel]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-pick-duel");
      const chosen = getAllRestaurants().find((r) => r.id === id);
      if (chosen) {
        if (slotBox) slotBox.classList.remove("hidden");
        finishSpin(chosen);
      }
    });
  });
}

// Modo Terna 3 Opciones (Uno sortea 3, el otro descarta 1 y elige entre los restantes)
function startTrioMode() {
  const candidates = getFilteredRestaurants();
  const resultContainer = document.getElementById("winnerResultContainer");
  const slotBox = document.getElementById("slotMachineBox");

  state.lastGameMode = "Terna 3 Opciones y Descarte";
  goToGameStep(4);

  if (slotBox) slotBox.classList.add("hidden");

  if (candidates.length < 3) {
    if (resultContainer) {
      resultContainer.innerHTML = `
        <div class="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
          <p class="text-sm font-bold text-amber-900 mb-3">Se necesitan al menos 3 locales disponibles para jugar a la Terna con Descarte.</p>
          <button type="button" id="btnBackToStep2Trio" class="px-5 py-2.5 rounded-xl bg-rose-900 text-white text-xs font-bold hover:bg-rose-800 transition-all">
            Volver al Paso 2 y Ampliar Filtros
          </button>
        </div>
      `;
      resultContainer.classList.remove("hidden");
      document.getElementById("btnBackToStep2Trio")?.addEventListener("click", () => goToGameStep(2));
    }
    return;
  }

  const shuffled = [...candidates].sort(() => Math.random() - 0.5);
  let trio = [shuffled[0], shuffled[1], shuffled[2]];
  let vetoedId = null;

  playTickSound(660, 0.08, "sine");

  function renderTrioCards() {
    if (!resultContainer) return;

    resultContainer.innerHTML = `
      <div class="bg-white border-2 border-amber-700 rounded-3xl p-6 sm:p-8 shadow-lg">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-5">
          <div>
            <span class="text-[11px] font-bold uppercase tracking-widest text-amber-800 block">Regla 3-2-1 · Terna de Pareja</span>
            <h3 class="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              ${
                !vetoedId
                  ? "Paso A: Uno de los dos descarta 1 opción que no quiera hoy"
                  : "Paso B: El otro elige el ganador final entre los 2 sobrevivientes"
              }
            </h3>
          </div>
          <button type="button" id="btnRerollTrio" class="text-xs font-bold px-3.5 py-2 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 transition-all">
            Sortear Nueva Terna
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${trio
            .map((opt, idx) => {
              const mall = getMallById(opt.mallId);
              const isVetoed = vetoedId === opt.id;
              return `
              <div class="border rounded-2xl p-5 flex flex-col justify-between transition-all ${
                isVetoed
                  ? "border-stone-200 bg-stone-100 opacity-45"
                  : "border-stone-200 bg-stone-50/60 hover:border-amber-500"
              }">
                <div>
                  <div class="flex items-center justify-between gap-2 mb-2">
                    <span class="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded ${
                      isVetoed ? "bg-stone-400 text-white" : "bg-amber-800 text-white"
                    }">${isVetoed ? "DESCARTADO" : `OPCIÓN ${idx + 1}`}</span>
                    <span class="text-xs font-bold text-amber-800">${formatStarsText(opt.rating)}</span>
                  </div>
                  <h4 class="font-serif text-lg font-bold text-stone-900">${opt.name}</h4>
                  <p class="text-xs font-semibold text-rose-900 mt-0.5">${opt.cuisine} · ${mall ? mall.shortName : ""}</p>
                  <p class="text-xs text-stone-600 mt-2 leading-relaxed">${opt.vibe}</p>
                  <div class="mt-3 pt-3 border-t border-stone-200/70 text-xs text-stone-700 space-y-1">
                    <div><span class="text-stone-400">Imperdible:</span> <strong class="text-rose-900">${opt.mustTry}</strong></div>
                    <div><span class="text-stone-400">Sector:</span> <strong>${opt.zone}</strong></div>
                  </div>
                </div>
                ${
                  isVetoed
                    ? `<div class="mt-4 w-full py-2.5 text-center rounded-xl bg-stone-200 text-stone-500 font-bold text-xs uppercase">Opción Descartada</div>`
                    : !vetoedId
                    ? `<button type="button" data-veto-trio="${opt.id}"
                        class="mt-4 w-full py-2.5 rounded-xl border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-900 font-bold text-xs uppercase tracking-wider transition-all">
                        Descartar Esta Opción
                      </button>`
                    : `<button type="button" data-pick-trio="${opt.id}"
                        class="mt-4 w-full py-2.5 rounded-xl bg-rose-900 hover:bg-rose-800 text-white font-bold text-xs uppercase tracking-wider transition-all">
                        Elegir Ganador Final
                      </button>`
                }
              </div>
            `;
            })
            .join("")}
        </div>
      </div>
    `;

    resultContainer.classList.remove("hidden");

    document.getElementById("btnRerollTrio")?.addEventListener("click", startTrioMode);

    resultContainer.querySelectorAll("button[data-veto-trio]").forEach((btn) => {
      btn.addEventListener("click", () => {
        vetoedId = btn.getAttribute("data-veto-trio");
        playTickSound(320, 0.06, "triangle");
        renderTrioCards();
      });
    });

    resultContainer.querySelectorAll("button[data-pick-trio]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-pick-trio");
        const chosen = getAllRestaurants().find((r) => r.id === id);
        if (chosen) {
          if (slotBox) slotBox.classList.remove("hidden");
          finishSpin(chosen);
        }
      });
    });
  }

  renderTrioCards();
}

// ============================================================================
// SECCIÓN EXCLUSIVA: LUGARES VISITADOS Y PERFILES DE DYLAN & MARIA
// ============================================================================
function renderCoupleVisitedSection() {
  const profilesContainer = document.getElementById("coupleProfilesSummary");
  const listContainer = document.getElementById("visitedPlacesList");
  const countBadge = document.getElementById("visitedTabCount");

  const reviews = state.coupleReviews;
  const totalVisits = reviews.length;

  if (countBadge) {
    countBadge.textContent = totalVisits;
  }

  // Calcular estadísticas individuales de Dylan y Maria
  let dylanAvg = 0;
  let mariaAvg = 0;
  let priceAvg = 0;
  let dylanFavPlace = "Sin registros aún";
  let mariaFavPlace = "Sin registros aún";

  if (totalVisits > 0) {
    const dylanSum = reviews.reduce((acc, r) => acc + Number(r.dylanRating || 0), 0);
    const mariaSum = reviews.reduce((acc, r) => acc + Number(r.mariaRating || 0), 0);
    const priceSum = reviews.reduce((acc, r) => acc + Number(r.priceLevel || 0), 0);

    dylanAvg = (dylanSum / totalVisits).toFixed(1);
    mariaAvg = (mariaSum / totalVisits).toFixed(1);
    priceAvg = (priceSum / totalVisits).toFixed(1);

    const bestDylan = [...reviews].sort((a, b) => Number(b.dylanRating) - Number(a.dylanRating))[0];
    const bestMaria = [...reviews].sort((a, b) => Number(b.mariaRating) - Number(a.mariaRating))[0];

    if (bestDylan) dylanFavPlace = `${bestDylan.placeName} (${Number(bestDylan.dylanRating).toFixed(1)} Estrellas)`;
    if (bestMaria) mariaFavPlace = `${bestMaria.placeName} (${Number(bestMaria.mariaRating).toFixed(1)} Estrellas)`;
  }

  if (profilesContainer) {
    profilesContainer.innerHTML = `
      <!-- Perfil de Dylan -->
      <div class="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="px-3 py-1 rounded-lg bg-stone-900 text-white text-xs font-bold uppercase tracking-wider">Perfil · Dylan</span>
            <span class="text-xs font-semibold text-stone-500">${totalVisits} reseñas escritas</span>
          </div>
          <div class="grid grid-cols-2 gap-3 my-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200/70">
            <div>
              <span class="block text-[10px] font-bold uppercase tracking-wider text-stone-400">Promedio de Dylan</span>
              <span class="text-base font-extrabold text-stone-900">${totalVisits > 0 ? `${dylanAvg} / 5.0 Estrellas` : "—"}</span>
            </div>
            <div>
              <span class="block text-[10px] font-bold uppercase tracking-wider text-stone-400">Su Mejor Calificado</span>
              <span class="text-xs font-bold text-rose-900 line-clamp-1">${dylanFavPlace}</span>
            </div>
          </div>
        </div>
        <p class="text-xs text-stone-500">Evalúa cada lugar con su propio puntaje de estrellas, plato pedido y comentario personal.</p>
      </div>

      <!-- Perfil de Maria -->
      <div class="bg-white border border-rose-200/90 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="px-3 py-1 rounded-lg bg-rose-900 text-white text-xs font-bold uppercase tracking-wider">Perfil · Maria</span>
            <span class="text-xs font-semibold text-stone-500">${totalVisits} reseñas escritas</span>
          </div>
          <div class="grid grid-cols-2 gap-3 my-3 p-3.5 rounded-xl bg-rose-50/50 border border-rose-200/60">
            <div>
              <span class="block text-[10px] font-bold uppercase tracking-wider text-stone-400">Promedio de Maria</span>
              <span class="text-base font-extrabold text-rose-950">${totalVisits > 0 ? `${mariaAvg} / 5.0 Estrellas` : "—"}</span>
            </div>
            <div>
              <span class="block text-[10px] font-bold uppercase tracking-wider text-stone-400">Su Mejor Calificado</span>
              <span class="text-xs font-bold text-rose-900 line-clamp-1">${mariaFavPlace}</span>
            </div>
          </div>
        </div>
        <p class="text-xs text-stone-500">Evalúa cada lugar con su propio puntaje de estrellas, plato pedido y comentario personal.</p>
      </div>

      <!-- Balance General de la Pareja -->
      <div class="bg-stone-900 text-stone-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">Resumen · Dylan & Maria</span>
            <span class="text-xs font-bold text-stone-300">${totalVisits} salidas juntos</span>
          </div>
          <div class="grid grid-cols-2 gap-3 my-3 p-3.5 rounded-xl bg-stone-800/90 border border-stone-700">
            <div>
              <span class="block text-[10px] font-bold uppercase tracking-wider text-stone-400">Nota Media Pareja</span>
              <span class="text-base font-extrabold text-amber-300">${
                totalVisits > 0 ? `${((Number(dylanAvg) + Number(mariaAvg)) / 2).toFixed(1)} / 5.0` : "—"
              }</span>
            </div>
            <div>
              <span class="block text-[10px] font-bold uppercase tracking-wider text-stone-400">Puntaje Precio Medio</span>
              <span class="text-sm font-extrabold text-emerald-300">${
                totalVisits > 0 ? `${priceAvg} / 5.0 Estrellas` : "—"
              }</span>
            </div>
          </div>
        </div>
        <p class="text-xs text-stone-400">Bitácora compartida de todos los restaurantes y cafés que ya han visitado.</p>
      </div>
    `;
  }

  if (!listContainer) return;

  if (totalVisits === 0) {
    listContainer.innerHTML = `
      <div class="bg-white border border-stone-200 rounded-2xl p-8 text-center">
        <h3 class="font-serif text-lg font-bold text-stone-800 mb-1">Aún no han registrado lugares visitados</h3>
        <p class="text-xs sm:text-sm text-stone-500 max-w-lg mx-auto mb-4">
          Cada vez que vayan a comer juntos, presionen <strong>"Registrar Lugar que ya Fuimos"</strong> para anotar el puntaje de estrellas de <strong>Dylan</strong>, el puntaje de <strong>Maria</strong> y la calificación de precio del local.
        </p>
        <button type="button" id="btnEmptyAddVisited"
          class="px-5 py-2.5 rounded-xl bg-rose-900 hover:bg-rose-800 text-white font-bold text-xs uppercase tracking-wider transition-all">
          Agregar Nuestra Primera Salida Evaluada
        </button>
      </div>
    `;
    document.getElementById("btnEmptyAddVisited")?.addEventListener("click", () => openVisitReviewModal(null));
    return;
  }

  listContainer.innerHTML = reviews
    .map((rev) => {
      const avgStars = ((Number(rev.dylanRating) + Number(rev.mariaRating)) / 2).toFixed(1);
      const priceLabel = getPriceRatingShort(rev.priceLevel);

      return `
        <article class="bg-white border border-stone-200/90 rounded-2xl p-5 sm:p-6 shadow-sm hover:border-rose-300 transition-all">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-stone-100">
            <div>
              <div class="flex flex-wrap items-center gap-2 mb-1">
                <span class="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-rose-50 text-rose-900 border border-rose-200">
                  Visitado el ${rev.visitDate}
                </span>
                <span class="text-xs font-semibold text-stone-500">${rev.mallName}</span>
              </div>
              <h3 class="font-serif text-xl sm:text-2xl font-bold text-stone-900">${rev.placeName}</h3>
            </div>

            <div class="flex flex-wrap items-center gap-2">
              <div class="px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200/80 text-right">
                <span class="block text-[10px] font-bold uppercase tracking-wider text-amber-700">Promedio Pareja</span>
                <span class="text-sm font-extrabold text-amber-900">${avgStars} / 5.0 Estrellas</span>
              </div>
              <div class="px-3.5 py-2 rounded-xl bg-stone-100 border border-stone-200 text-right">
                <span class="block text-[10px] font-bold uppercase tracking-wider text-stone-500">Puntaje de Precio</span>
                <span class="text-xs font-bold text-stone-800">${priceLabel}</span>
              </div>
              <button type="button" data-delete-review="${rev.id}"
                class="px-3 py-2 rounded-xl border border-stone-200 hover:border-rose-300 hover:bg-rose-50 text-xs font-semibold text-stone-500 hover:text-rose-800 transition-all">
                Eliminar
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <!-- Reseña de Dylan -->
            <div class="p-4 rounded-xl bg-stone-50 border border-stone-200/80">
              <div class="flex items-center justify-between gap-2 mb-2">
                <span class="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-stone-900 text-white">Reseña de Dylan</span>
                <span class="text-xs font-extrabold text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-md">
                  ${Number(rev.dylanRating).toFixed(1)} / 5.0 Estrellas
                </span>
              </div>
              ${
                rev.dylanDish
                  ? `<p class="text-xs text-stone-500 mb-1.5">Pidió: <strong class="text-stone-800">${rev.dylanDish}</strong></p>`
                  : ""
              }
              <p class="text-xs sm:text-sm text-stone-700 italic leading-relaxed">"${rev.dylanComment}"</p>
            </div>

            <!-- Reseña de Maria -->
            <div class="p-4 rounded-xl bg-rose-50/40 border border-rose-200/70">
              <div class="flex items-center justify-between gap-2 mb-2">
                <span class="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-rose-900 text-white">Reseña de Maria</span>
                <span class="text-xs font-extrabold text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-md">
                  ${Number(rev.mariaRating).toFixed(1)} / 5.0 Estrellas
                </span>
              </div>
              ${
                rev.mariaDish
                  ? `<p class="text-xs text-stone-500 mb-1.5">Pidió: <strong class="text-stone-800">${rev.mariaDish}</strong></p>`
                  : ""
              }
              <p class="text-xs sm:text-sm text-stone-700 italic leading-relaxed">"${rev.mariaComment}"</p>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  listContainer.querySelectorAll("button[data-delete-review]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const revId = btn.getAttribute("data-delete-review");
      state.coupleReviews = state.coupleReviews.filter((r) => r.id !== revId);
      savePersistedState();
      renderCoupleVisitedSection();
      renderDirectory();
      updateStepSummaries();
    });
  });
}

// ============================================================================
// MODAL PARA AGREGAR / EDITAR RESEÑA DE LUGAR VISITADO (DYLAN Y MARIA)
// ============================================================================
function populateVisitExistingPlacesSelect() {
  const select = document.getElementById("visitExistingPlaceSelect");
  if (!select) return;

  const all = getAllRestaurants().sort((a, b) => a.name.localeCompare(b.name));
  let html = `<option value="">— Seleccionar del catálogo o escribir nombre abajo —</option>`;

  all.forEach((r) => {
    const mall = getMallById(r.mallId);
    html += `<option value="${r.id}">${r.name} — ${mall ? mall.shortName : "Santiago"}</option>`;
  });

  select.innerHTML = html;
}

function openVisitReviewModal(preselectedPlace = null) {
  const modal = document.getElementById("visitReviewModal");
  if (!modal) return;

  populateVisitExistingPlacesSelect();

  const existingSelect = document.getElementById("visitExistingPlaceSelect");
  const nameInput = document.getElementById("visitPlaceName");
  const mallSelect = document.getElementById("visitMallSelect");
  const dateInput = document.getElementById("visitDateInput");
  const priceLevelInput = document.getElementById("visitPriceLevel");

  const dylanRatingInput = document.getElementById("dylanRatingInput");
  const dylanDishInput = document.getElementById("dylanDishInput");
  const dylanCommentInput = document.getElementById("dylanCommentInput");

  const mariaRatingInput = document.getElementById("mariaRatingInput");
  const mariaDishInput = document.getElementById("mariaDishInput");
  const mariaCommentInput = document.getElementById("mariaCommentInput");

  const todayStr = new Date().toISOString().split("T")[0];
  if (dateInput) dateInput.value = todayStr;

  if (preselectedPlace) {
    if (existingSelect) existingSelect.value = preselectedPlace.id;
    if (nameInput) nameInput.value = preselectedPlace.name;
    const mall = getMallById(preselectedPlace.mallId);
    if (mall && mallSelect) {
      mallSelect.value = mall.name;
    }
    if (priceLevelInput) priceLevelInput.value = String(5 - (preselectedPlace.priceLevel || 2) + 1);

    const existingRev = getCoupleReviewForPlace(preselectedPlace.id, preselectedPlace.name);
    if (existingRev) {
      if (dylanRatingInput) dylanRatingInput.value = String(existingRev.dylanRating);
      if (dylanDishInput) dylanDishInput.value = existingRev.dylanDish || "";
      if (dylanCommentInput) dylanCommentInput.value = existingRev.dylanComment || "";
      if (mariaRatingInput) mariaRatingInput.value = String(existingRev.mariaRating);
      if (mariaDishInput) mariaDishInput.value = existingRev.mariaDish || "";
      if (mariaCommentInput) mariaCommentInput.value = existingRev.mariaComment || "";
      if (priceLevelInput) priceLevelInput.value = String(existingRev.priceLevel);
    } else {
      if (dylanRatingInput) dylanRatingInput.value = "5";
      if (dylanDishInput) dylanDishInput.value = preselectedPlace.mustTry || "";
      if (dylanCommentInput) dylanCommentInput.value = "";
      if (mariaRatingInput) mariaRatingInput.value = "5";
      if (mariaDishInput) mariaDishInput.value = "";
      if (mariaCommentInput) mariaCommentInput.value = "";
    }
  } else {
    if (existingSelect) existingSelect.value = "";
    if (nameInput) nameInput.value = "";
    if (priceLevelInput) priceLevelInput.value = "4";
    if (dylanRatingInput) dylanRatingInput.value = "5";
    if (dylanDishInput) dylanDishInput.value = "";
    if (dylanCommentInput) dylanCommentInput.value = "";
    if (mariaRatingInput) mariaRatingInput.value = "5";
    if (mariaDishInput) mariaDishInput.value = "";
    if (mariaCommentInput) mariaCommentInput.value = "";
  }

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeVisitReviewModal() {
  const modal = document.getElementById("visitReviewModal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

// ============================================================================
// CATÁLOGO COMPLETO DE LOCALES (APARTADO 3)
// ============================================================================
function renderDirectory() {
  const grid = document.getElementById("restaurantsGrid");
  const badge = document.getElementById("directoryCountBadge");
  if (!grid) return;

  const list = getCatalogRestaurants();

  if (badge) {
    badge.textContent = `${list.length} ${list.length === 1 ? "local disponible" : "locales disponibles"}`;
  }

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full bg-white border border-stone-200 rounded-3xl p-10 text-center">
        <h3 class="font-serif text-xl font-bold text-stone-800 mb-2">No encontramos locales con esa búsqueda</h3>
        <p class="text-sm text-stone-500 max-w-md mx-auto mb-5">
          Prueba limpiando el buscador o seleccionando "Todos los Malls" en el selector superior.
        </p>
        <button type="button" id="btnEmptyResetCatalog"
          class="px-5 py-2.5 rounded-xl bg-rose-900 hover:bg-rose-800 text-white text-xs font-bold uppercase tracking-wider transition-all">
          Restablecer Catálogo
        </button>
      </div>
    `;
    document.getElementById("btnEmptyResetCatalog")?.addEventListener("click", () => {
      state.catalogMallId = "all";
      state.searchQuery = "";
      const searchInput = document.getElementById("searchInput");
      const catalogSelect = document.getElementById("catalogMallSelect");
      if (searchInput) searchInput.value = "";
      if (catalogSelect) catalogSelect.value = "all";
      renderDirectory();
    });
    return;
  }

  grid.innerHTML = list
    .map((item) => {
      const mall = getMallById(item.mallId);
      const catMeta = getCategoryMeta(item.category);
      const fav = isFavorite(item.id);
      const coupleRev = getCoupleReviewForPlace(item.id, item.name);

      let coupleTagHtml = "";
      if (coupleRev) {
        const avgCouple = ((Number(coupleRev.dylanRating) + Number(coupleRev.mariaRating)) / 2).toFixed(1);
        coupleTagHtml = `
          <div class="mb-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-xs text-emerald-950">
            <div class="flex items-center justify-between font-bold mb-0.5">
              <span>Ya fuimos (${coupleRev.visitDate})</span>
              <span>Pareja: ${avgCouple} / 5.0</span>
            </div>
            <div class="text-[11px] text-emerald-800">
              Dylan: ${Number(coupleRev.dylanRating).toFixed(1)} · Maria: ${Number(coupleRev.mariaRating).toFixed(1)} · Precio: ${coupleRev.priceLevel}.0 Estrellas
            </div>
          </div>
        `;
      }

      return `
        <article class="restaurant-card bg-white border border-stone-200/90 rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md">
          <div>
            <div class="flex items-center justify-between gap-2 mb-3">
              <span class="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${catMeta.badgeClass}">
                ${catMeta.label}
              </span>
              <span class="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200/70 px-2.5 py-0.5 rounded-md">
                ${formatStarsText(item.rating)}
              </span>
            </div>

            <div class="mb-2">
              <h3 class="font-serif text-lg font-bold text-stone-900 leading-snug">${item.name}</h3>
              <p class="text-xs font-semibold text-rose-900 mt-0.5">${item.cuisine}</p>
            </div>

            <p class="text-xs text-stone-600 leading-relaxed mb-4 line-clamp-2">${item.vibe}</p>

            ${coupleTagHtml}

            <div class="space-y-1.5 pt-3 border-t border-stone-100 text-xs">
              <div class="flex items-center justify-between">
                <span class="text-stone-400 font-medium">Mall / Ubicación:</span>
                <span class="font-semibold text-stone-800 text-right">${mall ? mall.shortName : "Santiago"} · ${item.zone}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-stone-400 font-medium">Espera aprox.:</span>
                <span class="font-semibold text-stone-700">${item.waitTimeMins} min</span>
              </div>
              <div class="pt-1">
                <span class="text-stone-400 font-medium block">Plato recomendado:</span>
                <span class="font-semibold text-rose-900">${item.mustTry}</span>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-1.5 mt-5 pt-3 border-t border-stone-100">
            <button type="button" data-detail-id="${item.id}"
              class="py-2 px-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition-all">
              Ver Ficha
            </button>
            <button type="button" data-review-id="${item.id}"
              class="py-2 px-2 rounded-xl bg-rose-900 hover:bg-rose-800 text-white font-semibold text-xs transition-all">
              ${coupleRev ? "Editar Reseña" : "Ya Fuimos"}
            </button>
            <button type="button" data-fav-id="${item.id}"
              class="py-2 px-2 rounded-xl border text-xs font-semibold transition-all ${
                fav
                  ? "border-rose-300 bg-rose-50 text-rose-900"
                  : "border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
              }">
              ${fav ? "Favorito" : "Guardar"}
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  grid.querySelectorAll("button[data-detail-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-detail-id");
      const item = getAllRestaurants().find((r) => r.id === id);
      if (item) openDetailModal(item);
    });
  });

  grid.querySelectorAll("button[data-review-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-review-id");
      const item = getAllRestaurants().find((r) => r.id === id);
      if (item) openVisitReviewModal(item);
    });
  });

  grid.querySelectorAll("button[data-fav-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-fav-id");
      toggleFavorite(id);
      renderDirectory();
      updateStepSummaries();
    });
  });
}

// ============================================================================
// FAVORITOS, HISTORIAL Y MODALES SECUNDARIOS
// ============================================================================
function toggleFavorite(id) {
  if (state.favorites.includes(id)) {
    state.favorites = state.favorites.filter((favId) => favId !== id);
  } else {
    state.favorites.push(id);
  }
  savePersistedState();
}

function registerVisitInHistory(item) {
  const mall = getMallById(item.mallId);
  const entry = {
    id: item.id,
    name: item.name,
    mallName: mall ? mall.shortName : "Santiago",
    zone: item.zone,
    date: new Date().toLocaleDateString("es-CL", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    })
  };
  state.history = [entry, ...state.history.filter((h) => h.id !== item.id)].slice(0, 25);
  savePersistedState();
}

function openDetailModal(item) {
  const modal = document.getElementById("detailModal");
  const content = document.getElementById("detailModalContent");
  if (!modal || !content) return;

  const mall = getMallById(item.mallId);
  const catMeta = getCategoryMeta(item.category);
  const fav = isFavorite(item.id);
  const coupleRev = getCoupleReviewForPlace(item.id, item.name);

  content.innerHTML = `
    <div class="p-6 sm:p-8">
      <div class="flex items-start justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-2">
            <span class="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${catMeta.badgeClass}">
              ${catMeta.label}
            </span>
            <span class="text-xs font-semibold text-stone-500">
              ${mall ? mall.name : "Santiago"} (${mall ? mall.commune : ""})
            </span>
          </div>
          <h3 class="font-serif text-2xl font-bold text-stone-900">${item.name}</h3>
          <p class="text-sm font-semibold text-rose-900 mt-0.5">${item.cuisine}</p>
        </div>
        <button type="button" id="btnCloseDetailModal"
          class="text-xs font-semibold text-stone-500 hover:text-stone-900 px-3 py-1.5 rounded-lg border border-stone-200">
          Cerrar
        </button>
      </div>

      <div class="py-5 space-y-4">
        <p class="text-sm text-stone-700 leading-relaxed">${item.vibe}</p>

        ${
          coupleRev
            ? `
          <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wider text-emerald-900">Evaluación de Dylan y Maria (${coupleRev.visitDate})</span>
              <span class="text-xs font-extrabold text-emerald-900">Precio: ${getPriceRatingShort(coupleRev.priceLevel)}</span>
            </div>
            <p class="text-xs text-stone-800"><strong>Dylan (${coupleRev.dylanRating.toFixed(1)} Estrellas):</strong> "${coupleRev.dylanComment}"</p>
            <p class="text-xs text-stone-800"><strong>Maria (${coupleRev.mariaRating.toFixed(1)} Estrellas):</strong> "${coupleRev.mariaComment}"</p>
          </div>
        `
            : ""
        }

        <div class="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs">
          <div>
            <span class="text-stone-400 block uppercase font-semibold">Sector exacto</span>
            <span class="font-bold text-stone-800 text-sm">${item.zone}</span>
          </div>
          <div>
            <span class="text-stone-400 block uppercase font-semibold">Calificación general</span>
            <span class="font-bold text-amber-800 text-sm">${formatStarsText(item.rating)}</span>
          </div>
          <div>
            <span class="text-stone-400 block uppercase font-semibold">Espera estimada</span>
            <span class="font-bold text-stone-800 text-sm">${item.waitTimeMins} minutos</span>
          </div>
          <div>
            <span class="text-stone-400 block uppercase font-semibold">Recomendación</span>
            <span class="font-bold text-rose-900 text-sm">${item.mustTry}</span>
          </div>
        </div>
      </div>

      <div class="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2">
        <button type="button" id="btnDetailOpenReview"
          class="px-5 py-2.5 rounded-xl bg-rose-900 hover:bg-rose-800 text-white text-xs font-bold uppercase tracking-wider transition-all">
          ${coupleRev ? "Actualizar Reseña de Dylan y Maria" : "Registrar que Ya Fuimos (Dylan y Maria)"}
        </button>
        <button type="button" id="btnDetailToggleFav"
          class="px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
            fav ? "border-rose-300 bg-rose-50 text-rose-900" : "border-stone-200 bg-white text-stone-700"
          }">
          ${fav ? "Quitar de Favoritos" : "Guardar en Favoritos"}
        </button>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");

  document.getElementById("btnCloseDetailModal")?.addEventListener("click", () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  });

  document.getElementById("btnDetailOpenReview")?.addEventListener("click", () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    openVisitReviewModal(item);
  });

  document.getElementById("btnDetailToggleFav")?.addEventListener("click", () => {
    toggleFavorite(item.id);
    openDetailModal(item);
    renderDirectory();
  });
}

function renderHistoryAndFavoritesModal() {
  const favListEl = document.getElementById("favoritesListContainer");
  const histListEl = document.getElementById("historyListContainer");
  const all = getAllRestaurants();

  if (favListEl) {
    const favItems = all.filter((r) => state.favorites.includes(r.id));
    if (favItems.length === 0) {
      favListEl.innerHTML = `<p class="text-xs text-stone-400 italic py-3">Aún no han guardado restaurantes favoritos.</p>`;
    } else {
      favListEl.innerHTML = favItems
        .map((item) => {
          const mall = getMallById(item.mallId);
          return `
            <div class="flex items-center justify-between gap-2 p-3 rounded-xl bg-stone-50 border border-stone-200/80">
              <div>
                <h4 class="text-xs font-bold text-stone-900">${item.name}</h4>
                <p class="text-[11px] text-stone-500">${mall ? mall.shortName : "Santiago"} · ${item.cuisine}</p>
              </div>
              <button type="button" data-remove-fav="${item.id}" class="text-[11px] font-semibold text-rose-800 hover:underline">
                Quitar
              </button>
            </div>
          `;
        })
        .join("");

      favListEl.querySelectorAll("button[data-remove-fav]").forEach((btn) => {
        btn.addEventListener("click", () => {
          toggleFavorite(btn.getAttribute("data-remove-fav"));
          renderHistoryAndFavoritesModal();
          renderDirectory();
          updateStepSummaries();
        });
      });
    }
  }

  if (histListEl) {
    if (state.history.length === 0) {
      histListEl.innerHTML = `<p class="text-xs text-stone-400 italic py-3">Todavía no han confirmado salidas en esta sesión.</p>`;
    } else {
      histListEl.innerHTML = state.history
        .map(
          (h) => `
          <div class="flex items-center justify-between gap-2 p-3 rounded-xl bg-stone-50 border border-stone-200/80">
            <div>
              <h4 class="text-xs font-bold text-stone-900">${h.name}</h4>
              <p class="text-[11px] text-stone-500">${h.mallName} (${h.zone})</p>
            </div>
            <span class="text-[11px] font-medium text-stone-400">${h.date}</span>
          </div>
        `
        )
        .join("");
    }
  }
}

function resetAllFilters() {
  state.selectedMallId = "all";
  state.selectedZone = "all";
  state.selectedCategory = "all";
  state.selectedMealTime = "all";
  state.highRatedOnly = false;
  state.excludeVisited = false;
  state.onlyFavorites = false;

  document.querySelectorAll("#filterCategoryGroup button").forEach((b) => {
    b.classList.toggle("active", b.getAttribute("data-category") === "all");
  });
  document.querySelectorAll("#filterMealGroup button").forEach((b) => {
    b.classList.toggle("active", b.getAttribute("data-meal") === "all");
  });

  const chkHigh = document.getElementById("chkHighRatedOnly");
  const chkVis = document.getElementById("chkExcludeVisited");
  const chkFav = document.getElementById("chkOnlyFavorites");
  if (chkHigh) chkHigh.checked = false;
  if (chkVis) chkVis.checked = false;
  if (chkFav) chkFav.checked = false;

  savePersistedState();
  renderMallSelector();
  renderZoneFilterBar();
  updateStepSummaries();
}

function updateSoundButtonsUI() {
  const label = `Sonido: ${state.soundEnabled ? "Activo" : "Silencio"}`;
  const btnMobile = document.getElementById("btnToggleSound");
  const btnDesktop = document.getElementById("btnToggleSoundDesktop");
  if (btnMobile) btnMobile.textContent = label;
  if (btnDesktop) btnDesktop.textContent = label;
}

// ============================================================================
// INICIALIZACIÓN Y EVENTOS DEL DOM
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  loadPersistedState();
  populateCatalogMallSelect();
  renderMallSelector();
  renderZoneFilterBar();
  renderCoupleVisitedSection();
  renderDirectory();
  updateSoundButtonsUI();
  goToGameStep(1);

  // Navegación entre las 3 pestañas principales
  document.querySelectorAll(".nav-tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-tab");
      if (targetTab) switchTab(targetTab);
    });
  });

  // Navegación del Paso a Paso (Pills superiores + Botones Siguiente/Volver)
  document.querySelectorAll(".step-progress-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      const targetStep = Number(pill.getAttribute("data-goto-step"));
      if (targetStep) goToGameStep(targetStep);
    });
  });

  document.getElementById("btnStep1Next")?.addEventListener("click", () => goToGameStep(2));
  document.getElementById("btnStep2Back")?.addEventListener("click", () => goToGameStep(1));
  document.getElementById("btnStep2Next")?.addEventListener("click", () => goToGameStep(3));
  document.getElementById("btnStep3Back")?.addEventListener("click", () => goToGameStep(2));
  document.getElementById("btnBackToModes")?.addEventListener("click", () => goToGameStep(3));

  document.getElementById("btnRestartGame")?.addEventListener("click", () => {
    resetAllFilters();
    goToGameStep(1);
  });

  // Paso 2: Filtros de Categoría
  document.querySelectorAll("#filterCategoryGroup button").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.selectedCategory = btn.getAttribute("data-category");
      document.querySelectorAll("#filterCategoryGroup button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      updateStepSummaries();
    });
  });

  // Paso 2: Filtros de Momento / Ocasión
  document.querySelectorAll("#filterMealGroup button").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.selectedMealTime = btn.getAttribute("data-meal");
      document.querySelectorAll("#filterMealGroup button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      updateStepSummaries();
    });
  });

  // Paso 2: Checkboxes rápidos
  document.getElementById("chkHighRatedOnly")?.addEventListener("change", (e) => {
    state.highRatedOnly = e.target.checked;
    updateStepSummaries();
  });

  document.getElementById("chkExcludeVisited")?.addEventListener("change", (e) => {
    state.excludeVisited = e.target.checked;
    updateStepSummaries();
  });

  document.getElementById("chkOnlyFavorites")?.addEventListener("change", (e) => {
    state.onlyFavorites = e.target.checked;
    updateStepSummaries();
  });

  // Paso 3: Botones de Modos de Juego
  document.getElementById("btnSpinRoulette")?.addEventListener("click", spinRoulette);
  document.getElementById("btnBattleMode")?.addEventListener("click", startDuelMode);
  document.getElementById("btnTrioMode")?.addEventListener("click", startTrioMode);
  document.getElementById("btnResetFilters")?.addEventListener("click", resetAllFilters);

  // Apartado Catálogo: Filtro por Mall, Búsqueda y Orden
  document.getElementById("catalogMallSelect")?.addEventListener("change", (e) => {
    state.catalogMallId = e.target.value;
    renderDirectory();
  });

  document.getElementById("searchInput")?.addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    renderDirectory();
  });

  document.getElementById("sortSelect")?.addEventListener("change", (e) => {
    state.sortBy = e.target.value;
    renderDirectory();
  });

  // Sonido (móvil y escritorio)
  const toggleSoundHandler = () => {
    state.soundEnabled = !state.soundEnabled;
    updateSoundButtonsUI();
    savePersistedState();
  };
  document.getElementById("btnToggleSound")?.addEventListener("click", toggleSoundHandler);
  document.getElementById("btnToggleSoundDesktop")?.addEventListener("click", toggleSoundHandler);

  // Modal de Lugares Visitados (Reseñas de Dylan y Maria)
  document.getElementById("btnAddVisitedFromSection")?.addEventListener("click", () => openVisitReviewModal(null));
  document.getElementById("btnCloseVisitReviewModal")?.addEventListener("click", closeVisitReviewModal);

  document.getElementById("visitExistingPlaceSelect")?.addEventListener("change", (e) => {
    const selectedId = e.target.value;
    if (!selectedId) return;
    const place = getAllRestaurants().find((r) => r.id === selectedId);
    if (place) {
      const nameInput = document.getElementById("visitPlaceName");
      const mallSelect = document.getElementById("visitMallSelect");
      const dylanDishInput = document.getElementById("dylanDishInput");
      if (nameInput) nameInput.value = place.name;
      const mall = getMallById(place.mallId);
      if (mall && mallSelect) mallSelect.value = mall.name;
      if (dylanDishInput && !dylanDishInput.value) dylanDishInput.value = place.mustTry || "";
    }
  });

  document.getElementById("visitReviewForm")?.addEventListener("submit", (e) => {
    e.preventDefault();

    const existingId = document.getElementById("visitExistingPlaceSelect")?.value || null;
    const placeName = document.getElementById("visitPlaceName").value.trim();
    const mallName = document.getElementById("visitMallSelect").value;
    const visitDateRaw = document.getElementById("visitDateInput").value;
    const priceLevel = Number(document.getElementById("visitPriceLevel").value) || 4;

    const dylanRating = Number(document.getElementById("dylanRatingInput").value) || 5;
    const dylanDish = document.getElementById("dylanDishInput").value.trim();
    const dylanComment = document.getElementById("dylanCommentInput").value.trim();

    const mariaRating = Number(document.getElementById("mariaRatingInput").value) || 5;
    const mariaDish = document.getElementById("mariaDishInput").value.trim();
    const mariaComment = document.getElementById("mariaCommentInput").value.trim();

    if (!placeName || !dylanComment || !mariaComment) return;

    const formattedDate = visitDateRaw
      ? new Date(visitDateRaw + "T12:00:00").toLocaleDateString("es-CL", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        })
      : new Date().toLocaleDateString("es-CL");

    const newReview = {
      id: "rev-" + Date.now(),
      placeId: existingId || "custom-visited-" + Date.now(),
      placeName,
      mallName,
      visitDate: formattedDate,
      priceLevel,
      dylanRating,
      dylanDish,
      dylanComment,
      mariaRating,
      mariaDish,
      mariaComment
    };

    state.coupleReviews = state.coupleReviews.filter(
      (r) => !(existingId && r.placeId === existingId) && r.placeName.toLowerCase() !== placeName.toLowerCase()
    );
    state.coupleReviews.unshift(newReview);

    savePersistedState();
    renderCoupleVisitedSection();
    renderDirectory();
    updateStepSummaries();
    closeVisitReviewModal();
    switchTab("visited");
  });

  // Modal de Historial y Favoritos (escritorio y móvil)
  const historyModal = document.getElementById("historyModal");
  const openHistoryHandler = () => {
    renderHistoryAndFavoritesModal();
    historyModal?.classList.remove("hidden");
    historyModal?.classList.add("flex");
  };
  document.getElementById("btnOpenHistory")?.addEventListener("click", openHistoryHandler);
  document.getElementById("btnOpenHistoryMobile")?.addEventListener("click", openHistoryHandler);

  document.getElementById("btnCloseHistory")?.addEventListener("click", () => {
    historyModal?.classList.add("hidden");
    historyModal?.classList.remove("flex");
  });

  document.getElementById("btnClearHistory")?.addEventListener("click", () => {
    state.history = [];
    savePersistedState();
    renderHistoryAndFavoritesModal();
    updateStepSummaries();
  });

  // Modal para Agregar Nuevo Local Personalizado al Catálogo
  const addModal = document.getElementById("addPlaceModal");
  document.getElementById("btnOpenAddModal")?.addEventListener("click", () => {
    addModal?.classList.remove("hidden");
    addModal?.classList.add("flex");
  });

  document.getElementById("btnCloseAddModal")?.addEventListener("click", () => {
    addModal?.classList.add("hidden");
    addModal?.classList.remove("flex");
  });

  document.getElementById("addPlaceForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("customName").value.trim();
    const mallId = document.getElementById("customMall").value;
    const zone = document.getElementById("customZone").value.trim() || "Nivel Principal";
    const category = document.getElementById("customCategory").value;
    const cuisine = document.getElementById("customCuisine").value.trim() || "Cocina de Autor";
    const mustTry = document.getElementById("customMustTry").value.trim() || "Recomendación de la casa";
    const vibe = document.getElementById("customVibe").value.trim() || "Agregado por Dylan y Maria.";

    if (!name) return;

    const newPlace = {
      id: "custom-" + Date.now(),
      name,
      mallId,
      zone,
      category,
      cuisine,
      priceLevel: 2,
      rating: 4.8,
      waitTimeMins: 15,
      mealTimes: ["almuerzo", "once", "cena", "cita-romantica", "salida-rapida"],
      cravingTags: ["favorito-pareja"],
      vibe,
      mustTry,
      tags: ["Agregado por Dylan y Maria"]
    };

    state.customPlaces.push(newPlace);
    savePersistedState();
    renderMallSelector();
    renderDirectory();
    updateStepSummaries();

    e.target.reset();
    addModal?.classList.add("hidden");
    addModal?.classList.remove("flex");
  });
});
