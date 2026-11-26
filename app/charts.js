// Gambar chart SVG murni — tanpa library luar. Dua jenis: garis dan batang.
function svgLineChart(points, opts) {
  var w = 640, h = 260, padL = 44, padB = 28, padT = 14, padR = 12;
  var vals = points.map(function (p) { return p.v; });
  var min = Math.min.apply(null, vals), max = Math.max.apply(null, vals);
  if (max === min) { max = min + 1; }
  var span = max - min, pad = span * 0.15;
  min -= pad; max += pad;
  function x(i) { return padL + (i * (w - padL - padR)) / (points.length - 1); }
  function y(v) { return padT + ((max - v) * (h - padT - padB)) / (max - min); }
  var d = points.map(function (p, i) { return (i === 0 ? "M" : "L") + x(i).toFixed(1) + " " + y(p.v).toFixed(1); }).join(" ");
  var dots = points.map(function (p, i) {
    var anchor = i === 0 ? "start" : i === points.length - 1 ? "end" : "middle";
    return '<circle cx="' + x(i).toFixed(1) + '" cy="' + y(p.v).toFixed(1) + '" r="4.5" fill="#0b5fa5"/>' +
      '<text x="' + x(i).toFixed(1) + '" y="' + (y(p.v) - 10).toFixed(1) + '" text-anchor="' + anchor + '" font-size="12" fill="#1d2b36">' + p.v + '</text>';
  }).join("");
  var labels = points.map(function (p, i) {
    return '<text x="' + x(i).toFixed(1) + '" y="' + (h - 8) + '" text-anchor="middle" font-size="12" fill="#5a6b78">' + p.label + '</text>';
  }).join("");
  return '<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + (opts.label || "Grafik garis") + '" class="chart">' +
    '<line x1="' + padL + '" y1="' + (h - padB) + '" x2="' + (w - padR) + '" y2="' + (h - padB) + '" stroke="#c8d3da"/>' +
    '<line x1="' + padL + '" y1="' + padT + '" x2="' + padL + '" y2="' + (h - padB) + '" stroke="#c8d3da"/>' +
    '<path d="' + d + '" fill="none" stroke="#0b5fa5" stroke-width="3"/>' + dots + labels + '</svg>';
}

function svgBarChart(points, opts) {
  var w = 640, h = 260, padL = 44, padB = 28, padT = 22, padR = 12;
  var vals = points.map(function (p) { return p.v; });
  var max = Math.max.apply(null, vals) * 1.12;
  var slot = (w - padL - padR) / points.length, bw = Math.min(64, slot * 0.62);
  var bars = points.map(function (p, i) {
    var bh = (p.v / max) * (h - padT - padB);
    var bx = padL + i * slot + (slot - bw) / 2;
    var by = h - padB - bh;
    return '<rect x="' + bx.toFixed(1) + '" y="' + by.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + bh.toFixed(1) + '" rx="3" fill="' + (opts.color || "#e07a1f") + '"/>' +
      '<text x="' + (bx + bw / 2).toFixed(1) + '" y="' + (by - 6).toFixed(1) + '" text-anchor="middle" font-size="12" fill="#1d2b36">' + p.v + '</text>' +
      '<text x="' + (bx + bw / 2).toFixed(1) + '" y="' + (h - 8) + '" text-anchor="middle" font-size="11" fill="#5a6b78">' + p.label + '</text>';
  }).join("");
  return '<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + (opts.label || "Grafik batang") + '" class="chart">' +
    '<line x1="' + padL + '" y1="' + (h - padB) + '" x2="' + (w - padR) + '" y2="' + (h - padB) + '" stroke="#c8d3da"/>' + bars + '</svg>';
}

// Peta provinsi sederhana: petak SVG yang diwarnai menurut PDB per kapita.
function svgProvinceMap(provinces, highlight) {
  var cells = provinces.map(function (p, i) {
    var col = i % 4, row = Math.floor(i / 4);
    var x = 20 + col * 150, y = 20 + row * 110;
    var shade = p.gdpCap >= 55 ? "#0b5fa5" : p.gdpCap >= 48 ? "#2f7fb8" : p.gdpCap >= 43 ? "#6aa6cf" : "#a9cbe4";
    var active = highlight === p.name ? ' stroke="#e07a1f" stroke-width="4"' : ' stroke="#fff" stroke-width="2"';
    return '<g><rect x="' + x + '" y="' + y + '" width="138" height="96" rx="8" fill="' + shade + '"' + active + '/>' +
      '<text x="' + (x + 69) + '" y="' + (y + 38) + '" text-anchor="middle" font-size="13" font-weight="700" fill="#fff">' + p.name + '</text>' +
      '<text x="' + (x + 69) + '" y="' + (y + 60) + '" text-anchor="middle" font-size="12" fill="#eaf2f8">' + fmtNum(p.gdpCap, 1) + ' jt/orang</text>' +
      '<text x="' + (x + 69) + '" y="' + (y + 78) + '" text-anchor="middle" font-size="11" fill="#eaf2f8">' + fmtNum(p.pop, 1) + ' jt jiwa</text></g>';
  }).join("");
  return '<svg viewBox="0 0 640 250" role="img" aria-label="Peta provinsi Arunika" class="chart">' + cells + '</svg>' +
    '<p class="hint">Warna lebih gelap = PDB per kapita lebih tinggi. Klik baris tabel di bawah untuk menyorot provinsi di peta.</p>';
}
