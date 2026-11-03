// ============================================================================
// ¿DÓNDE COMEMOS, AMOR? · DYLAN & MARIA
// Lógica 100% Funcional y Optimizada
// ============================================================================

const STORAGE_KEYS = {
  FAVORITES: "rv_couple_favorites_v5",
  HISTORY: "rv_couple_history_v5",
  CUSTOM_PLACES: "rv_couple_custom_places_v5",
  SOUND_ENABLED: "rv_couple_sound_v5",
  SELECTED_MALL: "rv_couple_selected_mall_v5",
  COUPLE_REVIEWS: "rv_dylan_maria_reviews_v5"
};

const STEP_HEADLINES = {
  1: "Paso 1 · Elegir Mall",
  2: "Paso 2 · Antojo",
  3: "Paso 3 · Modo de Decisión",
  4: "Paso 4 · Resultado"
};

// Estado reactivo de la aplicación
const state = {
  activeTab: "game", // "game" | "visited" | "catalog"
  gameStep: 1, // 1 | 2 | 3 | 4
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

// Sonido sutil para el juego
let audioCtx = null;
function playTick(freq = 520, duration = 0.035) {
  if (!state.soundEnabled) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {}
}

function playFanfare() {
  if (!state.soundEnabled) return;
  [523, 659, 783, 1046].forEach((f, i) => {
    setTimeout(() => playTick(f, 0.12), i * 90);
  });
}

// Carga y guardado seguro en LocalStorage
function loadPersistedState() {
  try {
    const favs = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    const custom = localStorage.getItem(STORAGE_KEYS.CUSTOM_PLACES);
    const sound = localStorage.getItem(STORAGE_KEYS.SOUND_ENABLED);
    const mall = localStorage.getItem(STORAGE_KEYS.SELECTED_MALL);
    const reviews = localStorage.getItem(STORAGE_KEYS.COUPLE_REVIEWS);

    if (favs) state.favorites = JSON.parse(favs);
    if (custom) state.customPlaces = JSON.parse(custom);
    if (sound !== null) state.soundEnabled = JSON.parse(sound);
    if (mall && mall !== "undefined") {
      state.selectedMallId = mall;
      state.catalogMallId = mall;
    }
    if (reviews) state.coupleReviews = JSON.parse(reviews);
  } catch (err) {
    console.warn("Error cargando LocalStorage:", err);
  }
}

function savePersistedState() {
  try {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(state.favorites));
    localStorage.setItem(STORAGE_KEYS.CUSTOM_PLACES, JSON.stringify(state.customPlaces));
    localStorage.setItem(STORAGE_KEYS.SOUND_ENABLED, JSON.stringify(state.soundEnabled));
    localStorage.setItem(STORAGE_KEYS.SELECTED_MALL, state.selectedMallId);
    localStorage.setItem(STORAGE_KEYS.COUPLE_REVIEWS, JSON.stringify(state.coupleReviews));
  } catch (err) {
    console.warn("Error guardando LocalStorage:", err);
  }
}

// ============================================================================
// NORMALIZACIÓN DE DATOS (PROTECCIÓN TOTAL CONTRA UNDEFINED)
// ============================================================================
function getAllPlaces() {
  const rawList = window.RESTAURANTS_DATA || [];
  const base = rawList.map((r) => {
    const cleanId = String(r.uid || r.id || `${r.brandId || "place"}__${r.mallId || "scl"}`);
    const ratingNum = Number(r.stars || r.rating || 4.5);
    const meals = Array.isArray(r.mealTypes)
      ? r.mealTypes
      : Array.isArray(r.mealTimes)
      ? r.mealTimes
      : ["almuerzo", "cena"];

    return {
      id: cleanId,
      uid: cleanId,
      brandId: r.brandId || cleanId,
      name: r.name || "Sin nombre",
      mallId: r.mallId || "all",
      mallName: r.mallName || "",
      zone: r.zone || "Principal",
      cuisine: r.cuisine || "Cocina Variada",
      category: r.category || "restaurante",
      mealTypes: meals,
      mealTimes: meals,
      rating: ratingNum,
      stars: ratingNum,
      waitTimeMins: Number(r.waitTimeMins) || (r.category === "rapida" ? 10 : r.category === "dulce" ? 8 : 20),
      mustTry: r.mustTry || "Plato recomendado de la casa",
      vibe: r.vibe || r.description || "Excelente ambiente para dos."
    };
  });

  const customs = (state.customPlaces || []).map((c) => {
    const cleanId = String(c.id || `custom-${Date.now()}`);
    const ratingNum = Number(c.stars || c.rating || 4.8);
    const meals = Array.isArray(c.mealTypes) ? c.mealTypes : ["almuerzo", "cena"];

    return {
      id: cleanId,
      uid: cleanId,
      brandId: cleanId,
      name: c.name || "Sin nombre",
      mallId: c.mallId || "all",
      mallName: c.mallName || "Santiago",
      zone: c.zone || "Principal",
      cuisine: c.cuisine || "Cocina",
      category: c.category || "restaurante",
      mealTypes: meals,
      mealTimes: meals,
      rating: ratingNum,
      stars: ratingNum,
      waitTimeMins: Number(c.waitTimeMins) || 15,
      mustTry: c.mustTry || "Especialidad",
      vibe: c.vibe || "Agregado por Dylan y Maria."
    };
  });

  return [...base, ...customs];
}

function getMallById(mallId) {
  if (!window.MALLS_DATA) return null;
  return window.MALLS_DATA.find((m) => m.id === mallId) || null;
}

function isFavorite(id) {
  return state.favorites.includes(String(id));
}

function isVisited(id, name) {
  const sid = String(id);
  const sname = (name || "").toLowerCase().trim();
  return state.coupleReviews.some(
    (r) => String(r.placeId) === sid || (sname && (r.placeName || "").toLowerCase().trim() === sname)
  );
}

function getReview(id, name) {
  const sid = String(id);
  const sname = (name || "").toLowerCase().trim();
  return state.coupleReviews.find(
    (r) => String(r.placeId) === sid || (sname && (r.placeName || "").toLowerCase().trim() === sname)
  );
}

// ============================================================================
// FILTRADO DE CANDIDATOS
// ============================================================================
function getFilteredCandidates() {
  const all = getAllPlaces();
  return all.filter((item) => {
    if (state.selectedMallId !== "all" && item.mallId !== state.selectedMallId) return false;
    if (state.selectedZone !== "all" && item.zone !== state.selectedZone) return false;
    if (state.selectedCategory !== "all" && item.category !== state.selectedCategory) return false;
    if (state.selectedMealTime !== "all" && (!item.mealTypes || !item.mealTypes.includes(state.selectedMealTime))) return false;
    if (state.highRatedOnly && item.rating < 4.6) return false;
    if (state.excludeVisited && isVisited(item.id, item.name)) return false;
    if (state.onlyFavorites && !isFavorite(item.id)) return false;
    return true;
  });
}

function getCatalogCandidates() {
  const all = getAllPlaces();
  return all
    .filter((item) => {
      if (state.catalogMallId !== "all" && item.mallId !== state.catalogMallId) return false;
      if (state.searchQuery.trim() !== "") {
        const q = state.searchQuery.toLowerCase().trim();
        const m1 = (item.name || "").toLowerCase().includes(q);
        const m2 = (item.cuisine || "").toLowerCase().includes(q);
        const m3 = (item.mustTry || "").toLowerCase().includes(q);
        const m4 = (item.zone || "").toLowerCase().includes(q);
        if (!m1 && !m2 && !m3 && !m4) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (state.sortBy === "rating-desc") return (b.rating || 0) - (a.rating || 0);
      if (state.sortBy === "wait-asc") return (a.waitTimeMins || 15) - (b.waitTimeMins || 15);
      if (state.sortBy === "name-asc") return (a.name || "").localeCompare(b.name || "");
      return (b.rating || 0) - (a.rating || 0);
    });
}

// ============================================================================
// NAVEGACIÓN ENTRE PESTAÑAS (APARTADOS)
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
      btn.className = "nav-tab-btn text-xs font-bold px-3.5 py-1.5 rounded-lg transition bg-rose-600 text-white shadow";
    } else {
      btn.className = "nav-tab-btn text-xs font-semibold px-3.5 py-1.5 rounded-lg transition text-slate-300 hover:text-white";
    }
  });

  if (tabId === "visited") renderVisitedSection();
  if (tabId === "catalog") renderCatalog();
}

// ============================================================================
// NAVEGACIÓN PASO A PASO DEL JUEGO (1 A 4)
// ============================================================================
function goToStep(step) {
  state.gameStep = Math.max(1, Math.min(4, Number(step) || 1));

  // Alternar visibilidad de contenedores
  [1, 2, 3, 4].forEach((n) => {
    const el = document.getElementById(`gameStep${n}`);
    if (el) {
      if (n === state.gameStep) {
        el.classList.remove("hidden");
      } else {
        el.classList.add("hidden");
      }
    }
  });

  // Título del paso actual
  const headlineEl = document.getElementById("gameStepHeadline");
  if (headlineEl) headlineEl.textContent = STEP_HEADLINES[state.gameStep] || `Paso ${state.gameStep}`;

  // Resaltar píldoras superiores
  document.querySelectorAll("[data-goto-step]").forEach((pill) => {
    const pillStep = Number(pill.getAttribute("data-goto-step"));
    if (pillStep === state.gameStep) {
      pill.className = "step-pill active text-center p-2 rounded-xl border border-rose-500/60 bg-rose-500/25 transition text-xs font-bold truncate text-white shadow-[0_0_12px_rgba(244,63,94,0.25)]";
    } else {
      pill.className = "step-pill text-center p-2 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] transition text-xs font-bold truncate text-slate-400";
    }
  });

  updateCounters();
  updateStep2MallBadge();
}

function updateCounters() {
  const count = getFilteredCandidates().length;
  const badge = document.getElementById("poolCounterBadge");
  if (badge) badge.textContent = `${count} ${count === 1 ? "opción" : "opciones"}`;

  const visitedCountBadge = document.getElementById("badgeVisitedCount");
  if (visitedCountBadge) visitedCountBadge.textContent = state.coupleReviews.length;
}

function updateStep2MallBadge() {
  const badge = document.getElementById("step2MallBadge");
  if (!badge) return;

  if (state.selectedMallId === "all") {
    badge.innerHTML = `
      <span class="text-slate-400">Mall: Todos</span>
      <button type="button" id="btnStep2GoChooseMall" class="ml-1.5 text-rose-300 font-bold hover:underline">
        (Elegir Mall)
      </button>
    `;
    document.getElementById("btnStep2GoChooseMall")?.addEventListener("click", () => goToStep(1));
  } else {
    const m = getMallById(state.selectedMallId);
    badge.innerHTML = `
      <span class="text-rose-300 font-bold">${m ? m.shortName : "Mall"}</span>
      <button type="button" id="btnStep2DeselectMall" class="ml-1.5 text-slate-400 hover:text-white underline font-normal">
        (Deseleccionar)
      </button>
    `;
    document.getElementById("btnStep2DeselectMall")?.addEventListener("click", () => {
      state.selectedMallId = "all";
      state.catalogMallId = "all";
      state.selectedZone = "all";
      savePersistedState();
      renderMallSelector();
      renderZoneBar();
      updateCounters();
      updateStep2MallBadge();
    });
  }
}

// ============================================================================
// PASO 1: SELECCIONAR Y DESELECCIONAR MALL
// ============================================================================
function renderMallSelector() {
  const grid = document.getElementById("mallSelectorGrid");
  if (!grid) return;

  const allPlaces = getAllPlaces();
  const mallList = (window.MALLS_DATA || []).filter((m) => m.id !== "all");
  const isAll = state.selectedMallId === "all";

  // Botón "Todos los Malls"
  let html = `
    <button type="button" data-mall-id="all"
      class="text-left p-3.5 rounded-xl border transition cursor-pointer ${
        isAll
          ? "bg-rose-500/25 border-rose-500 text-white shadow-[0_0_12px_rgba(244,63,94,0.2)] ring-1 ring-rose-400/50"
          : "glass-pill text-slate-300 hover:border-white/20 hover:bg-white/[0.06]"
      }">
      <div class="flex items-center justify-between">
        <span class="font-extrabold text-sm text-white">Todos los Malls</span>
        <span class="text-xs text-rose-300 font-bold">${allPlaces.length}</span>
      </div>
      <div class="text-[11px] text-slate-400 mt-0.5">Santiago completo</div>
    </button>
  `;

  // Cada mall individual
  mallList.forEach((mall) => {
    const count = allPlaces.filter((p) => p.mallId === mall.id).length;
    const active = state.selectedMallId === mall.id;

    html += `
      <button type="button" data-mall-id="${mall.id}"
        class="text-left p-3.5 rounded-xl border transition cursor-pointer ${
          active
            ? "bg-rose-500/25 border-rose-500 text-white shadow-[0_0_12px_rgba(244,63,94,0.2)] ring-1 ring-rose-400/50"
            : "glass-pill text-slate-300 hover:border-white/20 hover:bg-white/[0.06]"
        }">
        <div class="flex items-center justify-between">
          <span class="font-extrabold text-sm text-white">${mall.shortName}</span>
          <span class="text-xs text-rose-300 font-bold">${count}</span>
        </div>
        <div class="text-[11px] text-slate-400 mt-0.5 truncate">${mall.comuna || "Santiago"}</div>
      </button>
    `;
  });

  grid.innerHTML = html;

  // Actualizar resumen en la esquina superior del paso 1
  const summary = document.getElementById("selectedMallSummary");
  if (summary) {
    if (state.selectedMallId === "all") {
      summary.innerHTML = `<span class="text-slate-400 font-normal">Todos los Malls</span>`;
    } else {
      const m = getMallById(state.selectedMallId);
      summary.innerHTML = `
        <span class="text-rose-300 font-bold">${m ? m.shortName : state.selectedMallId}</span>
        <button type="button" id="btnClearMallHeader" class="ml-2 text-[11px] text-slate-400 hover:text-white underline font-normal">
          (Deseleccionar)
        </button>
      `;
      document.getElementById("btnClearMallHeader")?.addEventListener("click", (e) => {
        e.stopPropagation();
        deselectMall();
      });
    }
  }

  // Asignar eventos de clic
  grid.querySelectorAll("button[data-mall-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-mall-id");

      if (id === "all") {
        state.selectedMallId = "all";
        state.catalogMallId = "all";
      } else if (state.selectedMallId === id) {
        // Si hace clic en el que ya estaba activo, se deselecciona
        state.selectedMallId = "all";
        state.catalogMallId = "all";
      } else {
        state.selectedMallId = id;
        state.catalogMallId = id;
      }

      state.selectedZone = "all";
      savePersistedState();
      renderMallSelector();
      renderZoneBar();
      updateCounters();
      updateStep2MallBadge();
      goToStep(2);
    });
  });
}

function deselectMall() {
  state.selectedMallId = "all";
  state.catalogMallId = "all";
  state.selectedZone = "all";
  savePersistedState();
  renderMallSelector();
  renderZoneBar();
  updateCounters();
  updateStep2MallBadge();
}

function renderZoneBar() {
  const wrapper = document.getElementById("gameZoneWrapper");
  const bar = document.getElementById("zoneFilterBar");
  if (!wrapper || !bar) return;

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

  let html = `
    <button type="button" data-zone="all" class="text-xs px-2.5 py-1 rounded-lg border transition cursor-pointer ${
      state.selectedZone === "all" ? "bg-rose-500/25 border-rose-500 text-white font-bold" : "glass-pill text-slate-300"
    }">Todos los sectores</button>
  `;

  mall.zones.forEach((z) => {
    const active = state.selectedZone === z;
    html += `
      <button type="button" data-zone="${z}" class="text-xs px-2.5 py-1 rounded-lg border transition cursor-pointer ${
        active ? "bg-rose-500/25 border-rose-500 text-white font-bold" : "glass-pill text-slate-300"
      }">${z}</button>
    `;
  });

  bar.innerHTML = html;

  bar.querySelectorAll("button[data-zone]").forEach((b) => {
    b.addEventListener("click", () => {
      state.selectedZone = b.getAttribute("data-zone");
      renderZoneBar();
      updateCounters();
    });
  });
}

// ============================================================================
// PASO 3 Y 4: MODOS DE JUEGO (RULETA, DUELO, TERNA)
// ============================================================================
function runRoulette() {
  if (state.isSpinning) return;
  const candidates = getFilteredCandidates();
  goToStep(4);

  const slotBox = document.getElementById("slotMachineBox");
  const slotBadge = document.getElementById("slotBadge");
  const slotTitle = document.getElementById("slotTitle");
  const slotSubtitle = document.getElementById("slotSubtitle");
  const container = document.getElementById("winnerResultContainer");

  if (slotBox) slotBox.classList.remove("hidden");

  if (candidates.length === 0) {
    if (slotTitle) slotTitle.textContent = "Sin opciones con esos filtros";
    if (slotSubtitle) slotSubtitle.textContent = "Prueben cambiando el formato o deseleccionando filtros";
    if (container) {
      container.innerHTML = `
        <div class="text-center py-4">
          <button type="button" id="btnBackToFilters" class="text-xs font-bold text-rose-300 underline">
            Volver a Antojo
          </button>
        </div>
      `;
      document.getElementById("btnBackToFilters")?.addEventListener("click", () => goToStep(2));
    }
    return;
  }

  state.isSpinning = true;
  if (container) container.innerHTML = "";

  const winner = candidates[Math.floor(Math.random() * candidates.length)];
  let step = 0;
  const totalSteps = 16;

  function anim() {
    const temp = candidates[Math.floor(Math.random() * candidates.length)];
    if (slotBadge) slotBadge.textContent = "Sorteando...";
    if (slotTitle) slotTitle.textContent = temp.name;
    if (slotSubtitle) slotSubtitle.textContent = `${temp.cuisine} · ${temp.zone}`;
    playTick(420 + step * 18);
    step++;
    if (step < totalSteps) {
      setTimeout(anim, 40 + step * 14);
    } else {
      state.isSpinning = false;
      state.currentWinner = winner;
      if (slotBadge) slotBadge.textContent = "Elegido";
      if (slotTitle) slotTitle.textContent = winner.name;
      if (slotSubtitle) slotSubtitle.textContent = `${winner.cuisine} · ${winner.zone}`;
      playFanfare();
      renderWinnerCard(winner);
    }
  }

  anim();
}

function renderWinnerCard(item) {
  const container = document.getElementById("winnerResultContainer");
  if (!container) return;

  const mall = getMallById(item.mallId);
  const fav = isFavorite(item.id);
  const rev = getReview(item.id, item.name);

  container.innerHTML = `
    <div class="glass-card rounded-2xl p-5 border border-rose-500/30 space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <span class="text-[10px] font-bold uppercase tracking-wider text-rose-400">${mall ? mall.shortName : "Santiago"} · ${item.zone}</span>
          <h3 class="text-xl font-extrabold text-white mt-0.5">${item.name}</h3>
          <p class="text-xs text-rose-300">${item.cuisine}</p>
        </div>
        <span class="text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
          ${item.rating.toFixed(1)} ★
        </span>
      </div>

      <div class="grid grid-cols-2 gap-2 text-xs bg-black/40 border border-white/10 rounded-xl p-3">
        <div>
          <span class="text-slate-400 block text-[10px] uppercase font-bold">Recomendado</span>
          <span class="text-white font-semibold">${item.mustTry}</span>
        </div>
        <div>
          <span class="text-slate-400 block text-[10px] uppercase font-bold">Espera aprox.</span>
          <span class="text-white font-semibold">${item.waitTimeMins} min</span>
        </div>
      </div>

      ${
        rev
          ? `
        <div class="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs">
          <div class="flex items-center justify-between text-emerald-300 font-bold mb-1">
            <span>Ya fuimos (${rev.visitDate})</span>
            <span>Precio: ${rev.priceLevel}.0 ★</span>
          </div>
          <div class="text-slate-300 space-y-0.5">
            <div><strong>Dylan (${Number(rev.dylanRating).toFixed(1)} ★):</strong> "${rev.dylanComment}"</div>
            <div><strong>Maria (${Number(rev.mariaRating).toFixed(1)} ★):</strong> "${rev.mariaComment}"</div>
          </div>
        </div>
      `
          : ""
      }

      <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10">
        <div class="flex items-center gap-2">
          <button type="button" id="btnWinnerEval" class="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition cursor-pointer">
            Guardar en Visitados / Evaluar
          </button>
          <button type="button" id="btnWinnerFav" class="glass-pill text-xs font-semibold px-3 py-2 rounded-xl transition cursor-pointer ${
            fav ? "text-rose-300 border-rose-500/40" : "text-slate-300"
          }">
            ${fav ? "Favorito" : "Guardar"}
          </button>
        </div>
        <button type="button" id="btnWinnerReroll" class="text-xs text-slate-400 hover:text-white underline cursor-pointer">
          Sortear otro
        </button>
      </div>
    </div>
  `;

  document.getElementById("btnWinnerEval")?.addEventListener("click", () => openVisitModal(item));
  document.getElementById("btnWinnerFav")?.addEventListener("click", () => {
    toggleFav(item.id);
    renderWinnerCard(item);
  });
  document.getElementById("btnWinnerReroll")?.addEventListener("click", runRoulette);
}

// Duelo de 2 Opciones
function runDuel() {
  const candidates = getFilteredCandidates();
  goToStep(4);

  const slotBox = document.getElementById("slotMachineBox");
  const container = document.getElementById("winnerResultContainer");
  if (slotBox) slotBox.classList.add("hidden");

  if (candidates.length < 2) {
    if (container) {
      container.innerHTML = `
        <div class="text-center py-4 text-xs text-slate-400">
          Se necesitan al menos 2 opciones para un duelo.
          <button type="button" id="btnDuelBack" class="block mx-auto mt-2 text-rose-300 font-bold underline cursor-pointer">Volver al Paso 2</button>
        </div>
      `;
      document.getElementById("btnDuelBack")?.addEventListener("click", () => goToStep(2));
    }
    return;
  }

  const shuffled = [...candidates].sort(() => Math.random() - 0.5);
  const [a, b] = [shuffled[0], shuffled[1]];

  if (!container) return;

  container.innerHTML = `
    <div class="glass-card rounded-2xl p-4 sm:p-5 border border-purple-500/30 space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-base font-extrabold text-white">Duelo</h3>
        <button type="button" id="btnDuelReroll" class="text-xs text-slate-400 hover:text-white underline cursor-pointer">Otro duelo</button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        ${[a, b]
          .map((item, idx) => {
            const mall = getMallById(item.mallId);
            return `
            <div class="bg-black/40 border border-white/10 rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-purple-500/40 transition">
              <div>
                <div class="flex items-center justify-between mb-1">
                  <span class="text-[10px] font-bold uppercase text-purple-400">Opción ${idx + 1}</span>
                  <span class="text-xs font-bold text-amber-300">${item.rating.toFixed(1)} ★</span>
                </div>
                <h4 class="text-lg font-extrabold text-white">${item.name}</h4>
                <p class="text-xs text-rose-300">${item.cuisine} · ${mall ? mall.shortName : ""}</p>
                <p class="text-xs text-slate-400 mt-2">Recomendado: <strong class="text-white">${item.mustTry}</strong></p>
              </div>
              <button type="button" data-pick-duel="${item.id}"
                class="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs py-2 rounded-xl transition cursor-pointer">
                Elegir ${item.name}
              </button>
            </div>
          `;
          })
          .join("")}
      </div>
    </div>
  `;

  document.getElementById("btnDuelReroll")?.addEventListener("click", runDuel);

  container.querySelectorAll("button[data-pick-duel]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const chosen = getAllPlaces().find((p) => p.id === btn.getAttribute("data-pick-duel"));
      if (chosen) {
        if (slotBox) slotBox.classList.remove("hidden");
        document.getElementById("slotTitle").textContent = chosen.name;
        document.getElementById("slotSubtitle").textContent = `${chosen.cuisine} · ${chosen.zone}`;
        playFanfare();
        renderWinnerCard(chosen);
      }
    });
  });
}

// Terna de 3 Opciones con Descarte
function runTrio() {
  const candidates = getFilteredCandidates();
  goToStep(4);

  const slotBox = document.getElementById("slotMachineBox");
  const container = document.getElementById("winnerResultContainer");
  if (slotBox) slotBox.classList.add("hidden");

  if (candidates.length < 3) {
    if (container) {
      container.innerHTML = `
        <div class="text-center py-4 text-xs text-slate-400">
          Se necesitan al menos 3 opciones para jugar a la terna.
          <button type="button" id="btnTrioBack" class="block mx-auto mt-2 text-rose-300 font-bold underline cursor-pointer">Volver al Paso 2</button>
        </div>
      `;
      document.getElementById("btnTrioBack")?.addEventListener("click", () => goToStep(2));
    }
    return;
  }

  const shuffled = [...candidates].sort(() => Math.random() - 0.5);
  const trio = [shuffled[0], shuffled[1], shuffled[2]];
  let vetoedId = null;

  function render() {
    if (!container) return;

    container.innerHTML = `
      <div class="glass-card rounded-2xl p-4 sm:p-5 border border-sky-500/30 space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-extrabold text-white">
            ${!vetoedId ? "Descartar 1 opción" : "Elegir ganador final"}
          </h3>
          <button type="button" id="btnTrioReroll" class="text-xs text-slate-400 hover:text-white underline cursor-pointer">Otra terna</button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          ${trio
            .map((item) => {
              const mall = getMallById(item.mallId);
              const isVetoed = vetoedId === item.id;
              return `
              <div class="bg-black/40 border rounded-xl p-3.5 flex flex-col justify-between space-y-3 transition ${
                isVetoed ? "border-white/5 opacity-30" : "border-white/10 hover:border-sky-500/40"
              }">
                <div>
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-[10px] font-bold text-sky-400">${mall ? mall.shortName : ""}</span>
                    <span class="text-xs font-bold text-amber-300">${item.rating.toFixed(1)} ★</span>
                  </div>
                  <h4 class="text-base font-extrabold text-white">${item.name}</h4>
                  <p class="text-xs text-rose-300">${item.cuisine}</p>
                  <p class="text-xs text-slate-400 mt-1 truncate">${item.mustTry}</p>
                </div>
                ${
                  isVetoed
                    ? `<span class="text-[11px] text-center text-slate-500 block py-1.5 font-bold">Descartado</span>`
                    : !vetoedId
                    ? `<button type="button" data-veto="${item.id}"
                        class="w-full bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/40 text-xs font-bold py-1.5 rounded-lg transition cursor-pointer">
                        Descartar
                      </button>`
                    : `<button type="button" data-pick="${item.id}"
                        class="w-full bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold py-1.5 rounded-lg transition cursor-pointer">
                        Elegir
                      </button>`
                }
              </div>
            `;
            })
            .join("")}
        </div>
      </div>
    `;

    document.getElementById("btnTrioReroll")?.addEventListener("click", runTrio);

    container.querySelectorAll("button[data-veto]").forEach((b) => {
      b.addEventListener("click", () => {
        vetoedId = b.getAttribute("data-veto");
        playTick(300);
        render();
      });
    });

    container.querySelectorAll("button[data-pick]").forEach((b) => {
      b.addEventListener("click", () => {
        const chosen = getAllPlaces().find((p) => p.id === b.getAttribute("data-pick"));
        if (chosen) {
          if (slotBox) slotBox.classList.remove("hidden");
          document.getElementById("slotTitle").textContent = chosen.name;
          document.getElementById("slotSubtitle").textContent = `${chosen.cuisine} · ${chosen.zone}`;
          playFanfare();
          renderWinnerCard(chosen);
        }
      });
    });
  }

  render();
}

// Descarte de 5 Locales (Top 5 con descarte progresivo)
function runFiveMode() {
  const candidates = getFilteredCandidates();
  goToStep(4);

  const slotBox = document.getElementById("slotMachineBox");
  const container = document.getElementById("winnerResultContainer");
  if (slotBox) slotBox.classList.add("hidden");

  if (candidates.length < 3) {
    if (container) {
      container.innerHTML = `
        <div class="text-center py-4 text-xs text-slate-400">
          Se necesitan al menos 3 opciones disponibles para el modo descarte.
          <button type="button" id="btnFiveBack" class="block mx-auto mt-2 text-rose-300 font-bold underline cursor-pointer">Volver al Paso 2</button>
        </div>
      `;
      document.getElementById("btnFiveBack")?.addEventListener("click", () => goToStep(2));
    }
    return;
  }

  const countToPick = Math.min(5, candidates.length);
  const shuffled = [...candidates].sort(() => Math.random() - 0.5);
  const pool = shuffled.slice(0, countToPick);
  const discardedIds = new Set();

  function render() {
    if (!container) return;

    const remaining = pool.filter((p) => !discardedIds.has(p.id));

    // Si solo queda 1 sobreviviente, es el ganador automático
    if (remaining.length === 1) {
      const winner = remaining[0];
      if (slotBox) slotBox.classList.remove("hidden");
      document.getElementById("slotTitle").textContent = winner.name;
      document.getElementById("slotSubtitle").textContent = `${winner.cuisine} · ${winner.zone}`;
      playFanfare();
      renderWinnerCard(winner);
      return;
    }

    const isFinalTwo = remaining.length === 2;

    container.innerHTML = `
      <div class="glass-card rounded-2xl p-4 sm:p-5 border border-amber-500/30 space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div>
            <div class="text-xs font-bold text-amber-400 uppercase tracking-wider">
              ${isFinalTwo ? "¡Finalistas cara a cara!" : `Descarte Top ${countToPick}`}
            </div>
            <h3 class="text-base font-extrabold text-white mt-0.5">
              ${isFinalTwo ? "Elijan su ganador o descarten 1 más" : `Quedan ${remaining.length} opciones · Vayan descartando las que no quieran`}
            </h3>
          </div>
          <button type="button" id="btnFiveReroll" class="text-xs text-slate-400 hover:text-white underline cursor-pointer">
            Sortear otros ${countToPick}
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${countToPick === 5 ? '5' : '3'} gap-3">
          ${pool
            .map((item) => {
              const mall = getMallById(item.mallId);
              const isDiscarded = discardedIds.has(item.id);

              return `
              <div class="bg-black/40 border rounded-xl p-3 flex flex-col justify-between space-y-2.5 transition ${
                isDiscarded
                  ? "border-white/5 opacity-25 grayscale scale-95"
                  : isFinalTwo
                  ? "border-amber-400/60 bg-amber-500/10 shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                  : "border-white/10 hover:border-amber-500/40"
              }">
                <div>
                  <div class="flex items-center justify-between gap-1 mb-1">
                    <span class="text-[10px] font-bold text-slate-400 truncate">${mall ? mall.shortName : ""}</span>
                    <span class="text-xs font-bold text-amber-300 shrink-0">${item.rating.toFixed(1)} ★</span>
                  </div>
                  <h4 class="text-sm font-extrabold text-white leading-snug line-clamp-1">${item.name}</h4>
                  <p class="text-[11px] text-rose-300 truncate">${item.cuisine}</p>
                  <p class="text-[11px] text-slate-400 mt-1 line-clamp-2">${item.mustTry}</p>
                </div>

                <div class="pt-1">
                  ${
                    isDiscarded
                      ? `<span class="text-[10px] text-center text-slate-500 block py-1.5 font-bold uppercase tracking-wider">Eliminado</span>`
                      : isFinalTwo
                      ? `
                        <button type="button" data-pick-five="${item.id}"
                          class="w-full bg-gradient-to-r from-amber-500 to-rose-600 hover:opacity-95 text-white text-xs font-bold py-2 rounded-lg transition cursor-pointer shadow-md mb-1.5">
                          Elegir Ganador
                        </button>
                        <button type="button" data-discard-five="${item.id}"
                          class="w-full bg-white/5 hover:bg-white/10 text-slate-400 text-[10px] py-1 rounded transition cursor-pointer">
                          Descartar
                        </button>
                      `
                      : `
                        <button type="button" data-discard-five="${item.id}"
                          class="w-full bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/40 text-xs font-bold py-1.5 rounded-lg transition cursor-pointer">
                          Descartar
                        </button>
                      `
                  }
                </div>
              </div>
            `;
            })
            .join("")}
        </div>
      </div>
    `;

    document.getElementById("btnFiveReroll")?.addEventListener("click", runFiveMode);

    container.querySelectorAll("button[data-discard-five]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-discard-five");
        discardedIds.add(id);
        playTick(300, 0.04);
        render();
      });
    });

    container.querySelectorAll("button[data-pick-five]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-pick-five");
        const chosen = getAllPlaces().find((p) => p.id === id);
        if (chosen) {
          if (slotBox) slotBox.classList.remove("hidden");
          document.getElementById("slotTitle").textContent = chosen.name;
          document.getElementById("slotSubtitle").textContent = `${chosen.cuisine} · ${chosen.zone}`;
          playFanfare();
          renderWinnerCard(chosen);
        }
      });
    });
  }

  render();
}

// ============================================================================
// APARTADO 2: LUGARES VISITADOS (DYLAN Y MARIA)
// ============================================================================
function renderVisitedSection() {
  const summaryEl = document.getElementById("coupleProfilesSummary");
  const listEl = document.getElementById("visitedPlacesList");
  const reviews = state.coupleReviews || [];

  updateCounters();

  let dylanAvg = 0;
  let mariaAvg = 0;
  let priceAvg = 0;

  if (reviews.length > 0) {
    const dSum = reviews.reduce((acc, r) => acc + Number(r.dylanRating || 0), 0);
    const mSum = reviews.reduce((acc, r) => acc + Number(r.mariaRating || 0), 0);
    const pSum = reviews.reduce((acc, r) => acc + Number(r.priceLevel || 0), 0);
    dylanAvg = (dSum / reviews.length).toFixed(1);
    mariaAvg = (mSum / reviews.length).toFixed(1);
    priceAvg = (pSum / reviews.length).toFixed(1);
  }

  if (summaryEl) {
    summaryEl.innerHTML = `
      <div class="bg-black/40 border border-sky-500/30 rounded-xl p-3.5">
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs font-extrabold text-sky-400">Dylan</span>
          <span class="text-sm font-extrabold text-amber-300">${reviews.length > 0 ? `${dylanAvg} ★` : "—"}</span>
        </div>
        <div class="text-[11px] text-slate-400">${reviews.length} calificaciones</div>
      </div>

      <div class="bg-black/40 border border-rose-500/30 rounded-xl p-3.5">
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs font-extrabold text-rose-400">Maria</span>
          <span class="text-sm font-extrabold text-amber-300">${reviews.length > 0 ? `${mariaAvg} ★` : "—"}</span>
        </div>
        <div class="text-[11px] text-slate-400">${reviews.length} calificaciones</div>
      </div>

      <div class="bg-black/40 border border-white/10 rounded-xl p-3.5">
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs font-extrabold text-slate-200">Promedio Pareja</span>
          <span class="text-sm font-extrabold text-amber-300">${
            reviews.length > 0 ? `${((Number(dylanAvg) + Number(mariaAvg)) / 2).toFixed(1)} ★` : "—"
          }</span>
        </div>
        <div class="text-[11px] text-slate-400">Precio promedio: ${reviews.length > 0 ? `${priceAvg} ★` : "—"}</div>
      </div>
    `;
  }

  if (!listEl) return;

  if (reviews.length === 0) {
    listEl.innerHTML = `
      <div class="col-span-full text-center py-8 glass-card rounded-2xl border border-white/10">
        <h4 class="text-sm font-bold text-slate-300 mb-2">Sin lugares registrados aún</h4>
        <button type="button" id="btnEmptyAdd" class="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition cursor-pointer">
          Agregar Primer Lugar
        </button>
      </div>
    `;
    document.getElementById("btnEmptyAdd")?.addEventListener("click", () => openVisitModal(null));
    return;
  }

  listEl.innerHTML = reviews
    .map((rev) => {
      const avg = ((Number(rev.dylanRating || 5) + Number(rev.mariaRating || 5)) / 2).toFixed(1);
      return `
        <article class="bg-black/40 border border-white/10 rounded-xl p-4 flex flex-col justify-between space-y-3">
          <div>
            <div class="flex items-center justify-between gap-2 mb-1">
              <span class="text-[10px] font-bold uppercase text-slate-400">${rev.visitDate || "Salida"} · ${rev.mallName || "Santiago"}</span>
              <span class="text-xs font-extrabold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded">
                ${avg} ★
              </span>
            </div>
            <h3 class="text-base font-extrabold text-white">${rev.placeName}</h3>
            <span class="text-[11px] text-emerald-400 font-semibold">Precio: ${rev.priceLevel || 4}.0 ★</span>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/10 text-xs">
              <div class="bg-sky-500/10 border border-sky-500/20 rounded-lg p-2.5">
                <div class="flex items-center justify-between font-bold text-sky-300 mb-1">
                  <span>Dylan</span>
                  <span>${Number(rev.dylanRating || 5).toFixed(1)} ★</span>
                </div>
                ${rev.dylanDish ? `<div class="text-[11px] text-slate-400 mb-1">Pidió: <strong class="text-slate-200">${rev.dylanDish}</strong></div>` : ""}
                <p class="text-slate-300 italic">"${rev.dylanComment}"</p>
              </div>

              <div class="bg-rose-500/10 border border-rose-500/20 rounded-lg p-2.5">
                <div class="flex items-center justify-between font-bold text-rose-300 mb-1">
                  <span>Maria</span>
                  <span>${Number(rev.mariaRating || 5).toFixed(1)} ★</span>
                </div>
                ${rev.mariaDish ? `<div class="text-[11px] text-slate-400 mb-1">Pidió: <strong class="text-slate-200">${rev.mariaDish}</strong></div>` : ""}
                <p class="text-slate-300 italic">"${rev.mariaComment}"</p>
              </div>
            </div>
          </div>

          <div class="flex justify-end pt-1">
            <button type="button" data-del-review="${rev.id}" class="text-[11px] text-slate-500 hover:text-rose-400 cursor-pointer">
              Eliminar
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  listEl.querySelectorAll("button[data-del-review]").forEach((b) => {
    b.addEventListener("click", () => {
      const id = b.getAttribute("data-del-review");
      state.coupleReviews = state.coupleReviews.filter((r) => r.id !== id);
      savePersistedState();
      renderVisitedSection();
      renderCatalog();
    });
  });
}

// ============================================================================
// APARTADO 3: CATÁLOGO COMPLETO
// ============================================================================
function renderCatalog() {
  const grid = document.getElementById("restaurantsGrid");
  const countBadge = document.getElementById("directoryCountBadge");
  if (!grid) return;

  const list = getCatalogCandidates();
  if (countBadge) countBadge.textContent = list.length;

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-8 glass-card rounded-2xl text-xs text-slate-400">
        No hay locales que coincidan con la búsqueda.
      </div>
    `;
    return;
  }

  grid.innerHTML = list
    .map((item) => {
      const mall = getMallById(item.mallId);
      const fav = isFavorite(item.id);
      const rev = getReview(item.id, item.name);

      return `
        <article class="bg-black/40 border border-white/10 rounded-xl p-3.5 flex flex-col justify-between space-y-3 hover:border-white/20 transition">
          <div>
            <div class="flex items-center justify-between gap-1 mb-1">
              <span class="text-[10px] font-bold uppercase text-slate-400 truncate">${mall ? mall.shortName : "Santiago"}</span>
              <span class="text-xs font-bold text-amber-300 shrink-0">${item.rating.toFixed(1)} ★</span>
            </div>
            <h3 class="text-sm font-extrabold text-white">${item.name}</h3>
            <p class="text-xs text-rose-300 mt-0.5">${item.cuisine}</p>
            <p class="text-xs text-slate-400 mt-2 line-clamp-2">${item.vibe}</p>

            ${
              rev
                ? `
              <div class="mt-2.5 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 flex items-center justify-between">
                <span>Ya fuimos</span>
                <span class="font-bold">Dylan & Maria: ${(((Number(rev.dylanRating) + Number(rev.mariaRating)) / 2)).toFixed(1)} ★</span>
              </div>
            `
                : ""
            }
          </div>

          <div class="grid grid-cols-3 gap-1.5 pt-2 border-t border-white/10">
            <button type="button" data-cat-detail="${item.id}" class="glass-pill text-[11px] font-bold text-slate-300 py-1.5 rounded-lg cursor-pointer">
              Ficha
            </button>
            <button type="button" data-cat-review="${item.id}" class="bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold py-1.5 rounded-lg transition cursor-pointer">
              ${rev ? "Editar" : "Ya Fuimos"}
            </button>
            <button type="button" data-cat-fav="${item.id}" class="glass-pill text-[11px] font-bold py-1.5 rounded-lg transition cursor-pointer ${
              fav ? "text-rose-300 border-rose-500/40" : "text-slate-400"
            }">
              ${fav ? "Fav" : "Guardar"}
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  grid.querySelectorAll("button[data-cat-detail]").forEach((b) => {
    b.addEventListener("click", () => {
      const item = getAllPlaces().find((p) => p.id === b.getAttribute("data-cat-detail"));
      if (item) openDetailModal(item);
    });
  });

  grid.querySelectorAll("button[data-cat-review]").forEach((b) => {
    b.addEventListener("click", () => {
      const item = getAllPlaces().find((p) => p.id === b.getAttribute("data-cat-review"));
      if (item) openVisitModal(item);
    });
  });

  grid.querySelectorAll("button[data-cat-fav]").forEach((b) => {
    b.addEventListener("click", () => {
      toggleFav(b.getAttribute("data-cat-fav"));
      renderCatalog();
    });
  });
}

function openDetailModal(item) {
  const modal = document.getElementById("detailModal");
  const content = document.getElementById("detailModalContent");
  if (!modal || !content) return;

  const mall = getMallById(item.mallId);
  const rev = getReview(item.id, item.name);

  content.innerHTML = `
    <div class="space-y-4">
      <div>
        <span class="text-xs text-rose-400 uppercase font-bold">${mall ? mall.name : "Santiago"} · ${item.zone}</span>
        <h3 class="text-xl font-extrabold text-white mt-1">${item.name}</h3>
        <p class="text-xs text-rose-300">${item.cuisine}</p>
      </div>

      <p class="text-xs text-slate-300 leading-relaxed">${item.vibe}</p>

      <div class="grid grid-cols-2 gap-2 text-xs bg-black/40 border border-white/10 rounded-xl p-3">
        <div>
          <span class="text-slate-400 block text-[10px] uppercase font-bold">Plato recomendado</span>
          <span class="text-white font-semibold">${item.mustTry}</span>
        </div>
        <div>
          <span class="text-slate-400 block text-[10px] uppercase font-bold">Espera estimada</span>
          <span class="text-white font-semibold">${item.waitTimeMins} min</span>
        </div>
      </div>

      ${
        rev
          ? `
        <div class="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1">
          <div class="text-emerald-300 font-bold">Reseñas de Dylan y Maria (${rev.visitDate})</div>
          <div class="text-slate-300">Dylan (${Number(rev.dylanRating).toFixed(1)} ★): "${rev.dylanComment}"</div>
          <div class="text-slate-300">Maria (${Number(rev.mariaRating).toFixed(1)} ★): "${rev.mariaComment}"</div>
        </div>
      `
          : ""
      }

      <div class="pt-2 flex justify-end">
        <button type="button" id="btnDetailToReview" class="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition cursor-pointer">
          ${rev ? "Editar Evaluación" : "Registrar que Fuimos"}
        </button>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");

  document.getElementById("btnDetailToReview")?.addEventListener("click", () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    openVisitModal(item);
  });
}

// ============================================================================
// MODAL: REGISTRAR LUGAR VISITADO (DYLAN Y MARIA)
// ============================================================================
function openVisitModal(preselected = null) {
  const modal = document.getElementById("visitReviewModal");
  if (!modal) return;

  const catalogSelect = document.getElementById("visitSelectCatalog");
  const nameInput = document.getElementById("visitPlaceName");
  const dateInput = document.getElementById("visitDate");
  const mallInput = document.getElementById("visitMallName");
  const priceInput = document.getElementById("visitPriceLevel");
  const dylanStars = document.getElementById("visitDylanStars");
  const dylanDish = document.getElementById("visitDylanDish");
  const dylanRev = document.getElementById("visitDylanReview");
  const mariaStars = document.getElementById("visitMariaStars");
  const mariaDish = document.getElementById("visitMariaDish");
  const mariaRev = document.getElementById("visitMariaReview");

  if (catalogSelect) {
    catalogSelect.innerHTML =
      `<option value="">-- O escribir abajo --</option>` +
      getAllPlaces()
        .map((p) => `<option value="${p.id}">${p.name}</option>`)
        .join("");
  }

  const today = new Date().toISOString().split("T")[0];
  if (dateInput) dateInput.value = today;

  if (preselected) {
    if (catalogSelect) catalogSelect.value = preselected.id;
    if (nameInput) nameInput.value = preselected.name;
    const mall = getMallById(preselected.mallId);
    if (mallInput) mallInput.value = mall ? mall.shortName : "Santiago";

    const existing = getReview(preselected.id, preselected.name);
    if (existing) {
      if (priceInput) priceInput.value = String(existing.priceLevel || 4);
      if (dylanStars) dylanStars.value = String(existing.dylanRating || 5);
      if (dylanDish) dylanDish.value = existing.dylanDish || "";
      if (dylanRev) dylanRev.value = existing.dylanComment || "";
      if (mariaStars) mariaStars.value = String(existing.mariaRating || 5);
      if (mariaDish) mariaDish.value = existing.mariaDish || "";
      if (mariaRev) mariaRev.value = existing.mariaComment || "";
    } else {
      if (priceInput) priceInput.value = "4";
      if (dylanStars) dylanStars.value = "5";
      if (dylanDish) dylanDish.value = preselected.mustTry || "";
      if (dylanRev) dylanRev.value = "";
      if (mariaStars) mariaStars.value = "5";
      if (mariaDish) mariaDish.value = "";
      if (mariaRev) mariaRev.value = "";
    }
  } else {
    if (catalogSelect) catalogSelect.value = "";
    if (nameInput) nameInput.value = "";
    if (mallInput) mallInput.value = "";
    if (priceInput) priceInput.value = "4";
    if (dylanStars) dylanStars.value = "5";
    if (dylanDish) dylanDish.value = "";
    if (dylanRev) dylanRev.value = "";
    if (mariaStars) mariaStars.value = "5";
    if (mariaDish) mariaDish.value = "";
    if (mariaRev) mariaRev.value = "";
  }

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeVisitModal() {
  const modal = document.getElementById("visitReviewModal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

function toggleFav(id) {
  const sid = String(id);
  if (state.favorites.includes(sid)) {
    state.favorites = state.favorites.filter((f) => f !== sid);
  } else {
    state.favorites.push(sid);
  }
  savePersistedState();
}

// Reset filtros del juego
function resetFilters() {
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

  const c1 = document.getElementById("chkHighRatedOnly");
  const c2 = document.getElementById("chkExcludeVisited");
  const c3 = document.getElementById("chkOnlyFavorites");
  if (c1) c1.checked = false;
  if (c2) c2.checked = false;
  if (c3) c3.checked = false;

  savePersistedState();
  renderMallSelector();
  renderZoneBar();
  updateCounters();
  updateStep2MallBadge();
}

// ============================================================================
// INICIALIZACIÓN GLOBAL (EVENTOS Y LISTENERS)
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  loadPersistedState();

  // Poblar selectores de mall del catálogo y modal de nuevo local
  const catMallSelect = document.getElementById("catalogMallSelect");
  const addMallSelect = document.getElementById("addMallId");
  const mallList = (window.MALLS_DATA || []).filter((m) => m.id !== "all");

  if (catMallSelect) {
    catMallSelect.innerHTML =
      `<option value="all">Todos los Malls</option>` +
      mallList.map((m) => `<option value="${m.id}">${m.shortName}</option>`).join("");
    catMallSelect.value = state.catalogMallId;
  }
  if (addMallSelect) {
    addMallSelect.innerHTML = mallList.map((m) => `<option value="${m.id}">${m.shortName}</option>`).join("");
  }

  // Renderizar componentes
  renderMallSelector();
  renderZoneBar();
  renderVisitedSection();
  renderCatalog();
  goToStep(1);

  // Navegación de pestañas principales (Decisión, Visitados, Catálogo)
  document.querySelectorAll(".nav-tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => switchTab(btn.getAttribute("data-tab")));
  });

  // Navegación de pasos por la barra superior clicable
  document.querySelectorAll("[data-goto-step]").forEach((pill) => {
    pill.addEventListener("click", () => {
      const s = Number(pill.getAttribute("data-goto-step"));
      if (s) goToStep(s);
    });
  });

  // Botones de Siguiente y Volver entre Pasos
  document.getElementById("btnStep1Next")?.addEventListener("click", () => goToStep(2));
  document.getElementById("btnStep2Back")?.addEventListener("click", () => goToStep(1));
  document.getElementById("btnStep2Next")?.addEventListener("click", () => goToStep(3));
  document.getElementById("btnStep3Back")?.addEventListener("click", () => goToStep(2));
  document.getElementById("btnBackToModes")?.addEventListener("click", () => goToStep(3));

  // Botón Reiniciar
  document.getElementById("btnRestartGame")?.addEventListener("click", () => {
    resetFilters();
    goToStep(1);
  });

  // Paso 2: Filtro de Formato
  document.querySelectorAll("#filterCategoryGroup button").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.selectedCategory = btn.getAttribute("data-category");
      document.querySelectorAll("#filterCategoryGroup button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      updateCounters();
    });
  });

  // Paso 2: Filtro de Momento
  document.querySelectorAll("#filterMealGroup button").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.selectedMealTime = btn.getAttribute("data-meal");
      document.querySelectorAll("#filterMealGroup button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      updateCounters();
    });
  });

  // Paso 2: Checkboxes
  document.getElementById("chkHighRatedOnly")?.addEventListener("change", (e) => {
    state.highRatedOnly = e.target.checked;
    updateCounters();
  });
  document.getElementById("chkExcludeVisited")?.addEventListener("change", (e) => {
    state.excludeVisited = e.target.checked;
    updateCounters();
  });
  document.getElementById("chkOnlyFavorites")?.addEventListener("change", (e) => {
    state.onlyFavorites = e.target.checked;
    updateCounters();
  });

  // Paso 3: Modos de juego
  document.getElementById("btnSpinRoulette")?.addEventListener("click", runRoulette);
  document.getElementById("btnBattleMode")?.addEventListener("click", runDuel);
  document.getElementById("btnTrioMode")?.addEventListener("click", runTrio);
  document.getElementById("btnFiveMode")?.addEventListener("click", runFiveMode);
  document.getElementById("btnResetFilters")?.addEventListener("click", resetFilters);

  // Catálogo: Filtros y Búsqueda
  document.getElementById("catalogMallSelect")?.addEventListener("change", (e) => {
    state.catalogMallId = e.target.value;
    renderCatalog();
  });
  document.getElementById("searchInput")?.addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    renderCatalog();
  });
  document.getElementById("sortSelect")?.addEventListener("change", (e) => {
    state.sortBy = e.target.value;
    renderCatalog();
  });

  // Botón de Sonido
  const soundBtn = document.getElementById("btnToggleSound");
  if (soundBtn) {
    soundBtn.textContent = `Sonido: ${state.soundEnabled ? "On" : "Off"}`;
    soundBtn.addEventListener("click", () => {
      state.soundEnabled = !state.soundEnabled;
      soundBtn.textContent = `Sonido: ${state.soundEnabled ? "On" : "Off"}`;
      savePersistedState();
    });
  }

  // Modales
  document.getElementById("btnAddVisitedFromSection")?.addEventListener("click", () => openVisitModal(null));
  document.getElementById("btnCloseVisitReviewModal")?.addEventListener("click", closeVisitModal);
  document.getElementById("btnCancelVisitReview")?.addEventListener("click", closeVisitModal);

  document.getElementById("btnCloseDetailModal")?.addEventListener("click", () => {
    const m = document.getElementById("detailModal");
    m?.classList.add("hidden");
    m?.classList.remove("flex");
  });

  // Cerrar modales al hacer clic fuera del contenido
  window.addEventListener("click", (e) => {
    const detailModal = document.getElementById("detailModal");
    const visitModal = document.getElementById("visitReviewModal");
    const addModal = document.getElementById("addModal");
    if (e.target === detailModal) {
      detailModal.classList.add("hidden");
      detailModal.classList.remove("flex");
    }
    if (e.target === visitModal) {
      visitModal.classList.add("hidden");
      visitModal.classList.remove("flex");
    }
    if (e.target === addModal) {
      addModal.classList.add("hidden");
      addModal.classList.remove("flex");
    }
  });

  // Selector del modal de reseñas
  document.getElementById("visitSelectCatalog")?.addEventListener("change", (e) => {
    const id = e.target.value;
    if (!id) return;
    const p = getAllPlaces().find((item) => item.id === id);
    if (p) {
      const nameInput = document.getElementById("visitPlaceName");
      const mallInput = document.getElementById("visitMallName");
      const dishInput = document.getElementById("visitDylanDish");

      if (nameInput) nameInput.value = p.name;
      const mall = getMallById(p.mallId);
      if (mallInput) mallInput.value = mall ? mall.shortName : "Santiago";
      if (dishInput && !dishInput.value) dishInput.value = p.mustTry || "";
    }
  });

  // Guardar Reseña de Dylan y Maria
  document.getElementById("formVisitReview")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const catalogId = document.getElementById("visitSelectCatalog")?.value || null;
    const placeName = document.getElementById("visitPlaceName").value.trim();
    const mallName = document.getElementById("visitMallName").value.trim() || "Santiago";
    const dateRaw = document.getElementById("visitDate").value;
    const priceLevel = Number(document.getElementById("visitPriceLevel").value) || 4;

    const dylanRating = Number(document.getElementById("visitDylanStars").value) || 5;
    const dylanDish = document.getElementById("visitDylanDish").value.trim();
    const dylanComment = document.getElementById("visitDylanReview").value.trim() || "Buena salida juntos.";

    const mariaRating = Number(document.getElementById("visitMariaStars").value) || 5;
    const mariaDish = document.getElementById("visitMariaDish").value.trim();
    const mariaComment = document.getElementById("visitMariaReview").value.trim() || "Nos gustó mucho.";

    if (!placeName) return;

    const formattedDate = dateRaw
      ? new Date(dateRaw + "T12:00:00").toLocaleDateString("es-CL", { day: "2-digit", month: "short" })
      : "Hoy";

    const newRev = {
      id: "rev-" + Date.now(),
      placeId: catalogId || "custom-" + Date.now(),
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

    // Evitar duplicados por id o nombre
    state.coupleReviews = state.coupleReviews.filter(
      (r) => !(catalogId && r.placeId === catalogId) && r.placeName.toLowerCase() !== placeName.toLowerCase()
    );
    state.coupleReviews.unshift(newRev);

    savePersistedState();
    renderVisitedSection();
    renderCatalog();
    updateCounters();
    closeVisitModal();
    switchTab("visited");
  });

  // Modal para agregar local al catálogo
  const addModal = document.getElementById("addModal");
  document.getElementById("btnOpenAddModal")?.addEventListener("click", () => {
    addModal?.classList.remove("hidden");
    addModal?.classList.add("flex");
  });
  document.getElementById("btnCloseAddModal")?.addEventListener("click", () => {
    addModal?.classList.add("hidden");
    addModal?.classList.remove("flex");
  });

  document.getElementById("formAddPlace")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("addName").value.trim();
    const mallId = document.getElementById("addMallId").value;
    const category = document.getElementById("addCategory").value;
    const cuisine = document.getElementById("addCuisine").value.trim() || "Varios";
    const mustTry = document.getElementById("addMustTry").value.trim() || "Especialidad";

    if (!name) return;

    const newPlace = {
      id: "place-" + Date.now(),
      name,
      mallId,
      zone: "Principal",
      category,
      cuisine,
      stars: 4.8,
      rating: 4.8,
      waitTimeMins: 15,
      mealTypes: ["almuerzo", "cena"],
      mustTry,
      vibe: "Agregado al catálogo por Dylan y Maria."
    };

    state.customPlaces.push(newPlace);
    savePersistedState();
    renderMallSelector();
    renderCatalog();
    updateCounters();

    e.target.reset();
    addModal?.classList.add("hidden");
    addModal?.classList.remove("flex");
  });
});
