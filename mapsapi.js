// Initialize and add the map
function initMap() {
    const r2h = { lat: 35.041446257618134, lng: -80.83900364213677 };
    const atlFarmersMarket = { lat: 34.082658104441826, lng: -84.23522243920829}
    const cltFarmersMarket = { lat: 35.24281919158605, lng: -80.89433922883636}
    const ausFarmersMarket = { lat: 30.315924949095137, lng: -97.70235186247218}
    const richFarmersMarket = { lat: 37.59139663329062, lng:-77.4903499571033}
    // The map, centered at R2H
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 8,
      center: r2h,
    });
    // Markers
    const marker = new google.maps.Marker({
      position: r2h,
      map: map,
    });
    const atl = new google.maps.Marker({
      position: atlFarmersMarket,
      map: map,
    });
    const clt = new google.maps.Marker({
      position: cltFarmersMarket,
      map: map,
    });
    const aus = new google.maps.Marker({
      position: ausFarmersMarket,
      map: map,
    });
    const rich = new google.maps.Marker({
      position: richFarmersMarket,
      map: map,
    });
  }
  window.initMap = initMap;