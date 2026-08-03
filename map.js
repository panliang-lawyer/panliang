(function() {
  // Inject Leaflet CSS
  var lfCss = document.createElement('link');
  lfCss.rel = 'stylesheet';
  lfCss.href = 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css';
  document.head.appendChild(lfCss);

  // Inject map styles - mobile-friendly
  var style = document.createElement('style');
  style.textContent = [
    '.map-container{max-width:720px;width:100%;margin:24px auto 0;border-radius:8px;overflow:hidden;border:1px solid #e8e5e0;box-sizing:border-box}',
    '#map{height:320px;width:100% !important;min-height:200px}',
    '.leaflet-popup-content-wrapper{border-radius:6px;font-family:inherit;box-shadow:0 3px 14px rgba(0,0,0,0.12)}',
    '.leaflet-popup-content{font-size:13px;color:#5c5c5c;margin:10px 14px;line-height:1.6}',
    '.leaflet-popup-content b{color:#1a1a1a;font-weight:700}',
    '@media(max-width:768px){.map-container{margin-left:0;margin-right:0}#map{height:260px}}'
  ].join('');
  document.head.appendChild(style);

  // Load Leaflet JS
  var lfJs = document.createElement('script');
  lfJs.src = 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js';
  lfJs.onload = initMap;
  lfJs.onerror = function() {
    // Fallback: try unpkg if jsdelivr fails
    var fallback = document.createElement('script');
    fallback.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    fallback.onload = initMap;
    document.head.appendChild(fallback);
  };
  document.head.appendChild(lfJs);

  function initMap() {
    var contactRow = document.querySelector('.contact-row');
    if (!contactRow) return;

    var mapContainer = document.createElement('div');
    mapContainer.className = 'map-container';
    var mapDiv = document.createElement('div');
    mapDiv.id = 'map';
    mapContainer.appendChild(mapDiv);
    contactRow.insertAdjacentElement('afterend', mapContainer);

    // Fix Leaflet default icon path (loaded from CDN)
    L.Icon.Default.prototype.options.imagePath = 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/';
    var map = L.map('map', {
      center: [22.5432, 114.0580],
      zoom: 16,
      zoomControl: true,
      scrollWheelZoom: false,
      dragging: true,
      tap: true
    });

    L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
      subdomains: ['1', '2', '3', '4'],
      attribution: '&copy; 高德地图',
      maxZoom: 18
    }).addTo(map);

    var marker = L.marker([22.5432, 114.0580]).addTo(map);
    marker.bindPopup('<b>北京中银（深圳）律师事务所</b><br>福田区益田路6003号<br>荣超商务中心A座5楼');

    // Fix sizing after render
    setTimeout(function() { map.invalidateSize(); }, 200);

    // Fix sizing when switching tabs
    document.querySelectorAll('.nav-links a').forEach(function(link) {
      link.addEventListener('click', function() {
        setTimeout(function() { map.invalidateSize(); }, 400);
      });
    });
  }
})();
