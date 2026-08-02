(function() {
  // Inject Leaflet CSS
  var lfCss = document.createElement('link');
  lfCss.rel = 'stylesheet';
  lfCss.href = 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css';
  document.head.appendChild(lfCss);

  // Inject map styles
  var style = document.createElement('style');
  style.textContent = '.map-container{max-width:720px;margin:24px auto 0;border-radius:8px;overflow:hidden;border:1px solid #e8e5e0}#map{height:320px;width:100%}.leaflet-popup-content-wrapper{border-radius:6px;font-family:inherit;box-shadow:0 3px 14px rgba(0,0,0,0.12)}.leaflet-popup-content{font-size:13px;color:#5c5c5c;margin:10px 14px;line-height:1.6}.leaflet-popup-content b{color:#1a1a1a;font-weight:700}@media(max-width:768px){.map-container{margin-left:16px;margin-right:16px}#map{height:260px}}';
  document.head.appendChild(style);

  // Load Leaflet JS
  var lfJs = document.createElement('script');
  lfJs.src = 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js';
  lfJs.onload = function() {
    var contactRow = document.querySelector('.contact-row');
    if (!contactRow) return;

    var mapContainer = document.createElement('div');
    mapContainer.className = 'map-container';
    mapContainer.innerHTML = '<div id="map"></div>';
    contactRow.insertAdjacentElement('afterend', mapContainer);

    var map = L.map('map', {
      center: [22.5432, 114.0580],
      zoom: 16,
      zoomControl: true,
      scrollWheelZoom: true
    });

    L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
      subdomains: ['1', '2', '3', '4'],
      attribution: '&copy; 高德地图',
      maxZoom: 18
    }).addTo(map);

    var marker = L.marker([22.5432, 114.0580]).addTo(map);
    marker.bindPopup('<b>北京中银（深圳）律师事务所</b><br>福田区益田路6003号<br>荣超商务中心A座5楼').openPopup();
  };
  document.head.appendChild(lfJs);
})();
