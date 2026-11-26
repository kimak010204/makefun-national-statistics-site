// Router hash: #/penduduk, #/ekonomi, dst. Tanpa router, halaman Beranda tampil.
var ROUTES = ["", "penduduk", "ekonomi", "kerja", "harga", "wilayah", "data", "metode"];
function currentRoute() {
  var h = window.location.hash || "";
  var name = h.replace(/^#\/?/, "").split("?")[0];
  return ROUTES.indexOf(name) !== -1 ? name : "";
}
function routeTitle(route) {
  var titles = { "": "Beranda", "penduduk": "Penduduk", "ekonomi": "Ekonomi", "kerja": "Ketenagakerjaan", "harga": "Harga & Inflasi", "wilayah": "Wilayah", "data": "Data & Tabel", "metode": "Metodologi & Sumber" };
  return titles[route] || "Beranda";
}
function markNav(route) {
  var links = document.querySelectorAll("nav a");
  for (var i = 0; i < links.length; i++) {
    var r = links[i].getAttribute("href").replace(/^#\/?/, "");
    links[i].classList.toggle("active", r === route);
  }
}
