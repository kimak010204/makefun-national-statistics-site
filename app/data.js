// Data resmi Kantor Statistik Arunika — negara fiksi, angka konsisten antar tahun.
// Semua angka di situs ini berasal dari objek DATA di bawah; tidak ada sumber luar.
var DATA = {
  country: "Arunika",
  office: "Kantor Statistik Arunika",
  sourceNote: "Kantor Statistik Arunika",
  years: [2020, 2021, 2022, 2023, 2024, 2025],
  // Seri tahunan: satu baris per tahun, dipakai semua halaman agar angka cocok.
  yearly: {
    2020: { pop: 48.2, gdp: 1820, growth: 2.1, infl: 1.9, unemp: 6.8, poverty: 11.2, gdpCap: 37.8, export: 412, import: 388, wage: 4.62 },
    2021: { pop: 48.9, gdp: 1950, growth: 4.8, infl: 2.4, unemp: 6.1, poverty: 10.8, gdpCap: 39.9, export: 468, import: 431, wage: 4.91 },
    2022: { pop: 49.7, gdp: 2120, growth: 5.2, infl: 3.8, unemp: 5.7, poverty: 10.4, gdpCap: 42.7, export: 531, import: 489, wage: 5.28 },
    2023: { pop: 50.6, gdp: 2310, growth: 5.6, infl: 3.1, unemp: 5.4, poverty: 9.9, gdpCap: 45.7, export: 574, import: 522, wage: 5.64 },
    2024: { pop: 51.5, gdp: 2505, growth: 5.1, infl: 2.6, unemp: 5.2, poverty: 9.5, gdpCap: 48.6, export: 618, import: 559, wage: 6.02 },
    2025: { pop: 52.4, gdp: 2720, growth: 5.4, infl: 2.3, unemp: 4.9, poverty: 9.1, gdpCap: 51.9, export: 672, import: 604, wage: 6.45 }
  },
  // Penduduk per kelompok umur, 2025 (juta jiwa).
  ageGroups: [
    { label: "0–14 tahun", value: 12.6 },
    { label: "15–24 tahun", value: 9.4 },
    { label: "25–54 tahun", value: 22.1 },
    { label: "55–64 tahun", value: 5.1 },
    { label: "65+ tahun", value: 3.2 }
  ],
  // Sektor PDB 2025 (persen dari PDB).
  sectors: [
    { label: "Pertanian", share: 12.4 },
    { label: "Industri", share: 28.6 },
    { label: "Perdagangan", share: 14.2 },
    { label: "Jasa", share: 31.5 },
    { label: "Konstruksi", share: 8.1 },
    { label: "Lainnya", share: 5.2 }
  ],
  // Delapan provinsi — penduduk 2025 (juta), PDB per kapita 2025 (juta Arun), pengangguran 2025 (%).
  provinces: [
    { name: "Arun Utara", pop: 8.9, gdpCap: 58.4, unemp: 4.2, infl: 2.1 },
    { name: "Arun Selatan", pop: 7.6, gdpCap: 54.9, unemp: 4.6, infl: 2.4 },
    { name: "Teluk Biru", pop: 6.8, gdpCap: 47.2, unemp: 5.1, infl: 2.2 },
    { name: "Dataran Emas", pop: 6.1, gdpCap: 44.8, unemp: 5.3, infl: 2.5 },
    { name: "Pesisir Timur", pop: 7.9, gdpCap: 49.6, unemp: 4.8, infl: 2.3 },
    { name: "Pegunungan Hijau", pop: 4.3, gdpCap: 38.5, unemp: 6.2, infl: 2.7 },
    { name: "Lembah Sari", pop: 6.4, gdpCap: 52.1, unemp: 4.7, infl: 2.0 },
    { name: "Kepulauan Cahaya", pop: 4.4, gdpCap: 61.3, unemp: 4.4, infl: 2.6 }
  ],
  // Kelompok harga (IHK) — inflasi tahunan per kelompok, 2025 (%).
  priceGroups: [
    { label: "Makanan dan minuman", infl: 3.1 },
    { label: "Perumahan dan listrik", infl: 1.8 },
    { label: "Transportasi", infl: 2.9 },
    { label: "Kesehatan", infl: 1.6 },
    { label: "Pendidikan", infl: 2.2 },
    { label: "Pakaian", infl: 1.4 },
    { label: "Komunikasi", infl: 0.6 },
    { label: "Rekreasi", infl: 2.0 }
  ],
  // Ketenagakerjaan 2025.
  jobs: [
    { label: "Pertanian", workers: 12.8 },
    { label: "Industri", workers: 6.9 },
    { label: "Perdagangan", workers: 5.4 },
    { label: "Jasa", workers: 7.6 },
    { label: "Konstruksi", workers: 2.7 },
    { label: "Lainnya", workers: 1.9 }
  ],
  // Indikator untuk halaman Data & Tabel: nilai per tahun 2020–2025.
  indicators: [
    { name: "Penduduk (juta jiwa)", unit: "juta", values: [48.2, 48.9, 49.7, 50.6, 51.5, 52.4] },
    { name: "PDB nominal (triliun Arun)", unit: "triliun", values: [1820, 1950, 2120, 2310, 2505, 2720] },
    { name: "Pertumbuhan PDB (%)", unit: "%", values: [2.1, 4.8, 5.2, 5.6, 5.1, 5.4] },
    { name: "PDB per kapita (juta Arun)", unit: "juta", values: [37.8, 39.9, 42.7, 45.7, 48.6, 51.9] },
    { name: "Inflasi tahunan (%)", unit: "%", values: [1.9, 2.4, 3.8, 3.1, 2.6, 2.3] },
    { name: "Pengangguran terbuka (%)", unit: "%", values: [6.8, 6.1, 5.7, 5.4, 5.2, 4.9] },
    { name: "Kemiskinan (%)", unit: "%", values: [11.2, 10.8, 10.4, 9.9, 9.5, 9.1] },
    { name: "Upah rata-rata (juta Arun/bulan)", unit: "juta", values: [4.62, 4.91, 5.28, 5.64, 6.02, 6.45] },
    { name: "Ekspor (triliun Arun)", unit: "triliun", values: [412, 468, 531, 574, 618, 672] },
    { name: "Impor (triliun Arun)", unit: "triliun", values: [388, 431, 489, 522, 559, 604] },
    { name: "Neraca perdagangan (triliun Arun)", unit: "triliun", values: [24, 37, 42, 52, 59, 68] },
    { name: "Angkatan kerja (juta orang)", unit: "juta", values: [30.1, 30.9, 31.8, 32.6, 33.4, 34.1] }
  ]
};

function yearRow(year) { return DATA.yearly[year]; }
function fmtNum(n, digits) {
  return Number(n).toLocaleString("id-ID", { minimumFractionDigits: digits || 1, maximumFractionDigits: digits || 1 });
}
function sourceLine(year) { return "Sumber: " + DATA.sourceNote + ", " + year + "."; }
