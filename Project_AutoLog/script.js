// ===== AutoLog - script.js =====

const STORAGE_KEY = "autolog_data";

// ---------- Stato ----------
let state = {
  cars: [],
  deadlines: [],
  expenses: [],
  activeCarId: null
};

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) state = Object.assign(state, JSON.parse(saved));
  } catch (e) {
    console.warn("Impossibile leggere i dati salvati", e);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    alert("Impossibile salvare i dati nel browser.");
  }
}

// ---------- Utilità ----------
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function euro(n) {
  return n.toLocaleString("it-IT", { style: "currency", currency: "EUR" });
}

function formatDate(iso) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function todayISO() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function daysUntil(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  const target = new Date(y, m - 1, d);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((target - today) / 86400000);
}

function activeCar() {
  return state.cars.find(c => c.id === state.activeCarId) || null;
}

function carLabel(car) {
  return `${car.marca} ${car.modello} (${car.targa})`;
}

// crea un elemento in modo sicuro (niente innerHTML con dati utente)
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function emptyMessage(text) {
  return el("li", "empty", text);
}

// ---------- Tab ----------
document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

// ---------- Selezione auto ----------
const carSelect = document.getElementById("carSelect");

carSelect.addEventListener("change", () => {
  state.activeCarId = carSelect.value;
  saveState();
  renderAll();
});

function renderCarSelect() {
  carSelect.innerHTML = "";
  if (state.cars.length === 0) {
    const opt = el("option", "", "Nessuna auto");
    opt.value = "";
    carSelect.appendChild(opt);
    carSelect.disabled = true;
    return;
  }
  carSelect.disabled = false;
  state.cars.forEach(car => {
    const opt = el("option", "", carLabel(car));
    opt.value = car.id;
    if (car.id === state.activeCarId) opt.selected = true;
    carSelect.appendChild(opt);
  });
}

// ---------- AUTO ----------
document.getElementById("formAuto").addEventListener("submit", e => {
  e.preventDefault();
  const car = {
    id: uid(),
    marca: document.getElementById("auMarca").value.trim(),
    modello: document.getElementById("auModello").value.trim(),
    targa: document.getElementById("auTarga").value.trim().toUpperCase(),
    anno: Number(document.getElementById("auAnno").value)
  };
  state.cars.push(car);
  state.activeCarId = car.id;
  saveState();
  e.target.reset();
  renderAll();
});

function renderCars() {
  const list = document.getElementById("listaAuto");
  list.innerHTML = "";
  if (state.cars.length === 0) {
    list.appendChild(emptyMessage("Non hai ancora aggiunto nessuna auto."));
    return;
  }
  state.cars.forEach(car => {
    const li = el("li");
    const info = el("div", "info");
    info.appendChild(el("span", "title", `${car.marca} ${car.modello}`));
    info.appendChild(el("span", "sub", `Targa ${car.targa} · Anno ${car.anno}`));

    const right = el("div", "right");
    if (car.id === state.activeCarId) {
      right.appendChild(el("span", "badge active", "Attiva"));
    } else {
      const sel = el("button", "btn-small select", "Seleziona");
      sel.addEventListener("click", () => {
        state.activeCarId = car.id;
        saveState();
        renderAll();
      });
      right.appendChild(sel);
    }
    const del = el("button", "btn-small", "Elimina");
    del.addEventListener("click", () => deleteCar(car.id));
    right.appendChild(del);

    li.append(info, right);
    list.appendChild(li);
  });
}

function deleteCar(id) {
  if (!confirm("Eliminare questa auto con tutte le sue scadenze e spese?")) return;
  state.cars = state.cars.filter(c => c.id !== id);
  state.deadlines = state.deadlines.filter(d => d.carId !== id);
  state.expenses = state.expenses.filter(s => s.carId !== id);
  if (state.activeCarId === id) {
    state.activeCarId = state.cars.length ? state.cars[0].id : null;
  }
  saveState();
  renderAll();
}

// ---------- SCADENZE ----------
document.getElementById("formScadenza").addEventListener("submit", e => {
  e.preventDefault();
  if (!activeCar()) {
    alert("Aggiungi prima un'auto nella sezione \"Le mie auto\".");
    return;
  }
  state.deadlines.push({
    id: uid(),
    carId: state.activeCarId,
    tipo: document.getElementById("scTipo").value,
    data: document.getElementById("scData").value
  });
  saveState();
  e.target.reset();
  renderAll();
});

function deadlineStatus(days) {
  if (days < 0) return { cls: "danger", text: `Scaduta da ${Math.abs(days)} g` };
  if (days === 0) return { cls: "danger", text: "Scade oggi" };
  if (days <= 30) return { cls: "warn", text: `Tra ${days} g` };
  return { cls: "ok", text: `Tra ${days} g` };
}

function carDeadlines() {
  return state.deadlines
    .filter(d => d.carId === state.activeCarId)
    .sort((a, b) => a.data.localeCompare(b.data));
}

function renderDeadlines() {
  const list = document.getElementById("listaScadenze");
  list.innerHTML = "";
  const items = carDeadlines();
  if (items.length === 0) {
    list.appendChild(emptyMessage("Nessuna scadenza inserita per questa auto."));
    return;
  }
  items.forEach(d => {
    const st = deadlineStatus(daysUntil(d.data));
    const li = el("li");
    const info = el("div", "info");
    info.appendChild(el("span", "title", d.tipo));
    info.appendChild(el("span", "sub", formatDate(d.data)));

    const right = el("div", "right");
    right.appendChild(el("span", `badge ${st.cls}`, st.text));
    const del = el("button", "btn-small", "Elimina");
    del.addEventListener("click", () => {
      state.deadlines = state.deadlines.filter(x => x.id !== d.id);
      saveState();
      renderAll();
    });
    right.appendChild(del);

    li.append(info, right);
    list.appendChild(li);
  });
}

// ---------- SPESE ----------
document.getElementById("spData").value = todayISO();

document.getElementById("formSpesa").addEventListener("submit", e => {
  e.preventDefault();
  if (!activeCar()) {
    alert("Aggiungi prima un'auto nella sezione \"Le mie auto\".");
    return;
  }
  const kmValue = document.getElementById("spKm").value;
  state.expenses.push({
    id: uid(),
    carId: state.activeCarId,
    data: document.getElementById("spData").value,
    categoria: document.getElementById("spCat").value,
    importo: Number(document.getElementById("spImporto").value),
    km: kmValue === "" ? null : Number(kmValue),
    note: document.getElementById("spNote").value.trim()
  });
  saveState();
  e.target.reset();
  document.getElementById("spData").value = todayISO();
  renderAll();
});

function carExpenses() {
  return state.expenses
    .filter(s => s.carId === state.activeCarId)
    .sort((a, b) => b.data.localeCompare(a.data));
}

function renderExpenses() {
  const list = document.getElementById("listaSpese");
  list.innerHTML = "";
  const items = carExpenses();
  if (items.length === 0) {
    list.appendChild(emptyMessage("Nessuna spesa registrata per questa auto."));
    return;
  }
  items.forEach(s => {
    const li = el("li");
    const info = el("div", "info");
    info.appendChild(el("span", "title", s.categoria));
    let sub = formatDate(s.data);
    if (s.km !== null) sub += ` · ${s.km.toLocaleString("it-IT")} km`;
    if (s.note) sub += ` · ${s.note}`;
    info.appendChild(el("span", "sub", sub));

    const right = el("div", "right");
    right.appendChild(el("span", "amount", euro(s.importo)));
    const del = el("button", "btn-small", "Elimina");
    del.addEventListener("click", () => {
      state.expenses = state.expenses.filter(x => x.id !== s.id);
      saveState();
      renderAll();
    });
    right.appendChild(del);

    li.append(info, right);
    list.appendChild(li);
  });
}

// ---------- DASHBOARD ----------
function renderDashboard() {
  const expenses = carExpenses();
  const totale = expenses.reduce((sum, s) => sum + s.importo, 0);
  const anno = String(new Date().getFullYear());
  const totaleAnno = expenses
    .filter(s => s.data.startsWith(anno))
    .reduce((sum, s) => sum + s.importo, 0);

  document.getElementById("statTotale").textContent = euro(totale);
  document.getElementById("statAnno").textContent = euro(totaleAnno);

  // costo al km: spesa totale / km percorsi tra la prima e l'ultima lettura
  const kmValues = expenses.filter(s => s.km !== null).map(s => s.km);
  const statKm = document.getElementById("statKm");
  if (kmValues.length >= 2 && Math.max(...kmValues) > Math.min(...kmValues)) {
    const percorsi = Math.max(...kmValues) - Math.min(...kmValues);
    statKm.textContent = `${euro(totale / percorsi)}/km`;
  } else {
    statKm.textContent = "n/d";
  }

  // prossima scadenza (non ancora passata)
  const prossima = carDeadlines().find(d => daysUntil(d.data) >= 0);
  const statPros = document.getElementById("statProssima");
  statPros.textContent = prossima
    ? `${prossima.tipo} · ${formatDate(prossima.data)}`
    : "Nessuna";

  // spese per categoria
  const box = document.getElementById("categorie");
  box.innerHTML = "";
  if (expenses.length === 0) {
    box.appendChild(el("div", "empty", "Registra qualche spesa per vedere il grafico."));
    return;
  }
  const perCat = {};
  expenses.forEach(s => {
    perCat[s.categoria] = (perCat[s.categoria] || 0) + s.importo;
  });
  Object.entries(perCat)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, value]) => {
      const row = el("div", "bar-row");
      const head = el("div", "bar-head");
      head.appendChild(el("span", "", cat));
      head.appendChild(el("span", "", euro(value)));
      const track = el("div", "bar-track");
      const fill = el("div", "bar-fill");
      fill.style.width = `${totale > 0 ? (value / totale) * 100 : 0}%`;
      track.appendChild(fill);
      row.append(head, track);
      box.appendChild(row);
    });
}

// ---------- Avvio ----------
function renderAll() {
  renderCarSelect();
  renderCars();
  renderDeadlines();
  renderExpenses();
  renderDashboard();
}

loadState();
if (!activeCar() && state.cars.length) state.activeCarId = state.cars[0].id;
renderAll();
