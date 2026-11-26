// State + wiring: pemilih tahun, toggle chart, tab, filter wilayah, cari + sort tabel.
var state = { year: 2025, chartType: "garis", tab: "semua", regionFilter: "semua", highlight: null, search: "", sortKey: "name", sortDir: 1 };

function render() {
  var route = currentRoute();
  document.getElementById("view").innerHTML = renderView(route, state);
  document.title = routeTitle(route) + " — Statistik Arunika";
  markNav(route);
  wireView(route);
  window.scrollTo(0, 0);
}

function wireView(route) {
  var toggles = document.querySelectorAll("[data-chart]");
  for (var i = 0; i < toggles.length; i++) {
    toggles[i].addEventListener("click", function (e) { state.chartType = e.currentTarget.getAttribute("data-chart"); render(); });
  }
  var tabs = document.querySelectorAll("[data-tab]");
  for (var j = 0; j < tabs.length; j++) {
    tabs[j].addEventListener("click", function (e) { state.tab = e.currentTarget.getAttribute("data-tab"); render(); });
  }
  var rf = document.getElementById("region-filter");
  if (rf) rf.addEventListener("change", function (e) { state.regionFilter = e.target.value; state.highlight = state.regionFilter === "semua" ? null : state.regionFilter; render(); });
  var rows = document.querySelectorAll("[data-prov]");
  for (var k = 0; k < rows.length; k++) {
    rows[k].addEventListener("click", function (e) { state.highlight = e.currentTarget.getAttribute("data-prov"); render(); });
  }
  var search = document.getElementById("indicator-search");
  if (search) {
    search.addEventListener("input", function (e) {
      state.search = e.target.value;
      var pos = e.target.selectionStart;
      render();
      var again = document.getElementById("indicator-search");
      if (again) { again.focus(); again.setSelectionRange(pos, pos); }
    });
  }
  var heads = document.querySelectorAll("[data-sort]");
  for (var m = 0; m < heads.length; m++) {
    heads[m].addEventListener("click", function (e) {
      var key = e.currentTarget.getAttribute("data-sort");
      if (state.sortKey === key) { state.sortDir = state.sortDir * -1; } else { state.sortKey = key; state.sortDir = 1; }
      render();
    });
  }
}

function initSite() {
  var sel = document.getElementById("year-select");
  DATA.years.forEach(function (y) {
    var o = document.createElement("option");
    o.value = String(y); o.textContent = String(y);
    if (y === state.year) o.selected = true;
    sel.appendChild(o);
  });
  sel.addEventListener("change", function (e) { state.year = Number(e.target.value); render(); });
  window.addEventListener("hashchange", render);
  render();
}

document.addEventListener("DOMContentLoaded", initSite);
