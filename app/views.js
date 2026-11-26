// Tampilan tiap halaman: fungsi render yang mengembalikan HTML dari DATA + state.
function kpiCard(label, value, unit, note) {
  return '<article class="kpi"><p class="kpi-label">' + label + '</p><p class="kpi-value">' + value + ' <span>' + unit + '</span></p><p class="kpi-note">' + note + '</p></article>';
}
function trendPoints(key) {
  return DATA.years.map(function (y) { return { label: String(y), v: DATA.yearly[y][key] }; });
}
function chartBlock(state, key, title, unit) {
  var pts = trendPoints(key);
  var chart = state.chartType === "batang" ? svgBarChart(pts, { label: title, color: "#e07a1f" }) : svgLineChart(pts, { label: title });
  return '<section class="card"><h2>' + title + '</h2><p class="sub">' + unit + ' · 2020–2025</p>' + chart +
    '<div class="toggle" role="group" aria-label="Jenis grafik"><button data-chart="garis" class="' + (state.chartType === "garis" ? "on" : "") + '">Garis</button>' +
    '<button data-chart="batang" class="' + (state.chartType === "batang" ? "on" : "") + '">Batang</button></div></section>';
}

function viewHome(state) {
  var y = state.year, r = yearRow(y);
  var html = '<h1>Arunika dalam angka, ' + y + '</h1><p class="lead">Gambaran resmi negara Arunika: penduduk, ekonomi, pekerjaan, dan harga — dari satu sumber yang sama.</p>';
  var growthNote = y === 2020 ? "Tahun dasar seri data" : "Tumbuh " + fmtNum(((r.pop - yearRow(y - 1).pop) / yearRow(y - 1).pop) * 100, 1) + "% dari tahun lalu";
  html += '<div class="kpis">' +
    kpiCard("Penduduk", fmtNum(r.pop, 1), "juta jiwa", growthNote) +
    kpiCard("PDB nominal", fmtNum(r.gdp, 0), "triliun Arun", "Tumbuh " + fmtNum(r.growth, 1) + "%") +
    kpiCard("Inflasi", fmtNum(r.infl, 1), "%", "Target bank sentral 2–4%") +
    kpiCard("Pengangguran", fmtNum(r.unemp, 1), "%", "Terendah sejak 2020") +
    kpiCard("Kemiskinan", fmtNum(r.poverty, 1), "%", "Turun dari 11,2% pada 2020") +
    kpiCard("Upah rata-rata", fmtNum(r.wage, 2), "juta/bulan", "Naik tiap tahun sejak 2020") + '</div>';
  html += chartBlock(state, "gdp", "PDB nominal Arunika", "Triliun Arun");
  html += '<section class="card"><h2>Sekilas ' + y + '</h2><ul class="facts">' +
    '<li><strong>Ekspor ' + fmtNum(r.export, 0) + ' triliun Arun</strong> — impor ' + fmtNum(r.import, 0) + ' triliun, surplus ' + fmtNum(r.export - r.import, 0) + ' triliun.</li>' +
    '<li><strong>PDB per kapita ' + fmtNum(r.gdpCap, 1) + ' juta Arun</strong> — naik dari 37,8 juta pada 2020.</li>' +
    '<li><strong>8 provinsi</strong> — PDB per kapita tertinggi di Kepulauan Cahaya (' + fmtNum(61.3, 1) + ' juta).</li>' +
    '<li><strong>Angkatan kerja 34,1 juta orang</strong> pada 2025, dengan pengangguran 4,9%.</li></ul>' +
    '<p class="src">' + sourceLine(y) + ' Rilis terbaru: November 2025.</p></section>';
  html += '<section class="card"><h2>Jelajahi data</h2><p><a class="btn" href="#/penduduk">Penduduk</a> <a class="btn" href="#/ekonomi">Ekonomi</a> <a class="btn" href="#/kerja">Ketenagakerjaan</a> <a class="btn" href="#/harga">Harga &amp; Inflasi</a> <a class="btn" href="#/wilayah">Wilayah</a> <a class="btn" href="#/data">Data &amp; Tabel</a></p></section>';
  return html;
}

function viewPenduduk(state) {
  var y = state.year, r = yearRow(y);
  var html = '<h1>Penduduk Arunika</h1><p class="lead">' + fmtNum(r.pop, 1) + ' juta jiwa pada ' + y + ' — bertambah rata-rata 0,8 juta jiwa per tahun sejak 2020.</p>';
  html += chartBlock(state, "pop", "Jumlah penduduk", "Juta jiwa");
  var rows = DATA.ageGroups.map(function (g) {
    var pct = (g.value / 52.4 * 100).toFixed(1);
    return '<tr><td>' + g.label + '</td><td>' + fmtNum(g.value, 1) + '</td><td>' + pct + '%</td><td><div class="bar"><span style="width:' + pct + '%"></span></div></td></tr>';
  }).join("");
  html += '<section class="card"><h2>Struktur umur, 2025</h2><table class="tbl"><thead><tr><th>Kelompok umur</th><th>Jiwa (juta)</th><th>Pangsa</th><th></th></tr></thead><tbody>' + rows + '</tbody></table>' +
    '<p class="src">' + sourceLine(2025) + ' Sensus Penduduk 2025; kelompok 25–54 tahun adalah yang terbesar.</p></section>';
  html += '<section class="card"><h2>Catatan</h2><p>Usia median Arunika 31,4 tahun pada 2025. Rasio ketergantungan 44,2 — setiap 100 penduduk usia kerja menanggung 44 penduduk usia non-kerja.</p></section>';
  return html;
}

function viewEkonomi(state) {
  var y = state.year, r = yearRow(y);
  var html = '<h1>Ekonomi Arunika</h1><p class="lead">PDB ' + fmtNum(r.gdp, 0) + ' triliun Arun pada ' + y + ', tumbuh ' + fmtNum(r.growth, 1) + '%.</p>';
  html += '<div class="kpis">' + kpiCard("Pertumbuhan PDB", fmtNum(r.growth, 1), "%", "Rata-rata 2020–2025: 4,9%") +
    kpiCard("PDB per kapita", fmtNum(r.gdpCap, 1), "juta Arun", "Naik 37% sejak 2020") +
    kpiCard("Ekspor", fmtNum(r.export, 0), "triliun", "Surplus " + fmtNum(r.export - r.import, 0) + " triliun") + '</div>';
  html += chartBlock(state, "growth", "Pertumbuhan PDB", "Persen per tahun");
  var srows = DATA.sectors.map(function (s) {
    return '<tr><td>' + s.label + '</td><td>' + fmtNum(s.share, 1) + '%</td><td><div class="bar"><span style="width:' + (s.share * 2.5) + '%"></span></div></td></tr>';
  }).join("");
  html += '<section class="card"><h2>Struktur PDB, 2025</h2><table class="tbl"><thead><tr><th>Sektor</th><th>Pangsa PDB</th><th></th></tr></thead><tbody>' + srows + '</tbody></table>' +
    '<p class="src">' + sourceLine(y) + ' Jasa dan industri menyumbang 60,1% PDB.</p></section>';
  return html;
}

function viewKerja(state) {
  var y = state.year, r = yearRow(y);
  var html = '<h1>Ketenagakerjaan</h1><p class="lead">Pengangguran terbuka ' + fmtNum(r.unemp, 1) + '% pada ' + y + ' — turun 1,9 poin sejak 2020.</p>';
  html += chartBlock(state, "unemp", "Tingkat pengangguran terbuka", "Persen");
  var jrows = DATA.jobs.map(function (j) {
    return '<tr><td>' + j.label + '</td><td>' + fmtNum(j.workers, 1) + '</td><td><div class="bar"><span style="width:' + (j.workers * 6) + '%"></span></div></td></tr>';
  }).join("");
  html += '<section class="card"><h2>Pekerja menurut lapangan usaha, 2025</h2><table class="tbl"><thead><tr><th>Lapangan usaha</th><th>Pekerja (juta)</th><th></th></tr></thead><tbody>' + jrows + '</tbody></table>' +
    '<p class="src">' + sourceLine(2025) + ' Total pekerja 37,3 juta; upah rata-rata ' + fmtNum(r.wage, 2) + ' juta Arun per bulan.</p></section>';
  html += '<section class="card"><h2>Tab: siapa yang bekerja?</h2><div class="tabs" role="tablist">' +
    '<button data-tab="semua" class="' + (state.tab === "semua" ? "on" : "") + '">Semua</button>' +
    '<button data-tab="muda" class="' + (state.tab === "muda" ? "on" : "") + '">Usia muda</button>' +
    '<button data-tab="perempuan" class="' + (state.tab === "perempuan" ? "on" : "") + '">Perempuan</button></div>' +
    '<p id="tab-text">' + tabText(state.tab) + '</p></section>';
  return html;
}
function tabText(tab) {
  if (tab === "muda") return "Pengangguran usia 15–24 tahun 11,8% pada 2025 — lebih tinggi dari rata-rata nasional 4,9%, tetapi turun dari 14,6% pada 2020.";
  if (tab === "perempuan") return "Tingkat partisipasi angkatan kerja perempuan 58,3% pada 2025, naik dari 54,1% pada 2020; upah perempuan 91% dari upah laki-laki.";
  return "Angkatan kerja 34,1 juta orang pada 2025; 37,3 juta orang bekerja termasuk pekerja informal. Tingkat partisipasi angkatan kerja 68,9%.";
}

function viewHarga(state) {
  var y = state.year, r = yearRow(y);
  var html = '<h1>Harga &amp; Inflasi</h1><p class="lead">Inflasi tahunan ' + fmtNum(r.infl, 1) + '% pada ' + y + ' — di dalam sasaran 2–4%.</p>';
  html += chartBlock(state, "infl", "Inflasi tahunan", "Persen");
  var prows = DATA.priceGroups.map(function (g) {
    return '<tr><td>' + g.label + '</td><td>' + fmtNum(g.infl, 1) + '%</td><td><div class="bar"><span style="width:' + (g.infl * 22) + '%"></span></div></td></tr>';
  }).join("");
  html += '<section class="card"><h2>Inflasi per kelompok barang, 2025</h2><table class="tbl"><thead><tr><th>Kelompok</th><th>Inflasi</th><th></th></tr></thead><tbody>' + prows + '</tbody></table>' +
    '<p class="src">' + sourceLine(2025) + ' Indeks Harga Konsumen (IHK) dihitung dari 412 komoditas di 8 ibu kota provinsi.</p></section>';
  return html;
}

function viewWilayah(state) {
  var list = DATA.provinces.slice();
  if (state.regionFilter && state.regionFilter !== "semua") {
    list = list.filter(function (p) { return p.name === state.regionFilter; });
  }
  var opts = '<option value="semua">Semua provinsi</option>' + DATA.provinces.map(function (p) {
    return '<option value="' + p.name + '"' + (state.regionFilter === p.name ? " selected" : "") + '>' + p.name + '</option>';
  }).join("");
  var rows = list.map(function (p) {
    return '<tr data-prov="' + p.name + '" tabindex="0"><td>' + p.name + '</td><td>' + fmtNum(p.pop, 1) + '</td><td>' + fmtNum(p.gdpCap, 1) + '</td><td>' + fmtNum(p.unemp, 1) + '%</td><td>' + fmtNum(p.infl, 1) + '%</td></tr>';
  }).join("");
  var html = '<h1>Wilayah: 8 Provinsi</h1><p class="lead">Bandingkan provinsi — penduduk, PDB per kapita, pengangguran, dan inflasi 2025.</p>';
  html += '<section class="card"><h2>Peta provinsi</h2>' + svgProvinceMap(DATA.provinces, state.highlight) + '</section>';
  html += '<section class="card"><h2>Tabel provinsi</h2><label class="filter">Filter provinsi: <select id="region-filter">' + opts + '</select></label>' +
    '<table class="tbl"><thead><tr><th>Provinsi</th><th>Penduduk (juta)</th><th>PDB/kapita (juta)</th><th>Pengangguran</th><th>Inflasi</th></tr></thead><tbody>' + rows + '</tbody></table>' +
    '<p class="src">' + sourceLine(2025) + ' Kepulauan Cahaya tertinggi PDB per kapitanya; Pegunungan Hijau tertinggi penganggurannya (6,2%).</p></section>';
  return html;
}

function viewData(state) {
  var q = (state.search || "").toLowerCase();
  var rows = DATA.indicators.filter(function (ind) { return !q || ind.name.toLowerCase().indexOf(q) !== -1; });
  var sortKey = state.sortKey, dir = state.sortDir || 1;
  rows = rows.slice().sort(function (a, b) {
    var av = sortKey === "name" ? a.name : a.values[5];
    var bv = sortKey === "name" ? b.name : b.values[5];
    if (av < bv) return -1 * dir; if (av > bv) return 1 * dir; return 0;
  });
  function th(key, label) {
    var mark = sortKey === key ? (dir === 1 ? " ▲" : " ▼") : "";
    return '<th data-sort="' + key + '">' + label + mark + '</th>';
  }
  var body = rows.map(function (ind) {
    var cells = ind.values.map(function (v) { return "<td>" + fmtNum(v, ind.unit === "%" ? 1 : (v < 10 ? 2 : 1)) + "</td>"; }).join("");
    return "<tr><td>" + ind.name + "</td>" + cells + "</tr>";
  }).join("");
  var html = '<h1>Data &amp; Tabel</h1><p class="lead">Semua indikator utama Arunika 2020–2025 dalam satu tabel. Klik judul kolom untuk mengurutkan; ketik di bawah untuk mencari indikator.</p>';
  html += '<section class="card"><label class="filter">Cari indikator: <input id="indicator-search" type="search" placeholder="mis. inflasi, PDB, penduduk" value="' + state.search.replace(/"/g, "") + '"></label>' +
    '<p class="hint">Menampilkan ' + rows.length + ' dari ' + DATA.indicators.length + ' indikator. Klik header "Indikator" atau "2025" untuk mengurutkan.</p>' +
    '<div class="tablewrap"><table class="tbl"><thead><tr>' + th("name", "Indikator") + "<th>2020</th><th>2021</th><th>2022</th><th>2023</th><th>2024</th>" + th("2025", "2025") + '</tr></thead><tbody>' + body + '</tbody></table></div>' +
    '<p class="src">' + sourceLine(2025) + ' Unduhan data tersedia di kantor statistik; tabel ini diperbarui tiap rilis triwulanan.</p></section>';
  return html;
}

function viewMetode(state) {
  return '<h1>Metodologi &amp; Sumber</h1><p class="lead">Bagaimana angka-angka di situs ini dibuat — agar siapa pun bisa memeriksa dan menggunakannya.</p>' +
    '<section class="card"><h2>Sumber data</h2><ul class="facts">' +
    '<li><strong>Sensus Penduduk 2025</strong> — penduduk, umur, wilayah. ' + sourceLine(2025) + '</li>' +
    '<li><strong>Survei Angkatan Kerja Nasional</strong> — pengangguran, upah, lapangan usaha; sampel 48.000 rumah tangga per triwulan.</li>' +
    '<li><strong>Neraca Nasional</strong> — PDB, ekspor-impor; metode produksi dan pengeluaran, tahun dasar 2020.</li>' +
    '<li><strong>Survei Harga Konsumen</strong> — IHK dari 412 komoditas di 8 ibu kota provinsi, dikumpulkan tiap minggu.</li></ul></section>' +
    '<section class="card"><h2>Definisi</h2><ul class="facts">' +
    '<li>Pengangguran terbuka: penduduk 15 tahun ke atas yang tidak bekerja dan sedang mencari pekerjaan.</li>' +
    '<li>Kemiskinan: penduduk dengan pengeluaran per kapita di bawah garis kemiskinan 612 ribu Arun per bulan (2025).</li>' +
    '<li>PDB per kapita: PDB nominal dibagi jumlah penduduk pertengahan tahun.</li></ul></section>' +
    '<section class="card"><h2>Jadwal rilis</h2><p>PDB triwulanan: 5 minggu setelah triwulan berakhir. Inflasi bulanan: tanggal 1 tiap bulan. Sensus penduduk: tiap 10 tahun; survei penduduk antar-sensus tiap 5 tahun.</p>' +
    '<p class="src">' + sourceLine(2025) + ' Pertanyaan data: hubungi Kantor Statistik Arunika.</p></section>';
}

function renderView(route, state) {
  if (route === "penduduk") return viewPenduduk(state);
  if (route === "ekonomi") return viewEkonomi(state);
  if (route === "kerja") return viewKerja(state);
  if (route === "harga") return viewHarga(state);
  if (route === "wilayah") return viewWilayah(state);
  if (route === "data") return viewData(state);
  if (route === "metode") return viewMetode(state);
  return viewHome(state);
}
