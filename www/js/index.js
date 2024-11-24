 // Wait for the deviceready event before using any of Cordova's device APIs.
 document.addEventListener('deviceready', onDeviceReady, false);

 function onDeviceReady() {
     // Cordova is now initialized
     document.getElementById("getPosition").addEventListener("click", getPosition);
     document.getElementById("cameraTakePicture").addEventListener("click", cameraTakePicture);
     console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
     document.getElementById('deviceready').classList.add('ready');

     // Initialize Mapbox
     mapboxgl.accessToken = '';
     const map = new mapboxgl.Map({
         container: 'map', // Container ID for the map
         style: 'mapbox://styles/mapbox/streets-v12', // Style URL
         center: [-24, 42], // Initial map center in [lng, lat]
         zoom: 1 // Initial zoom level
     });

     // Add geolocate control to the map.
     const geolocate = new mapboxgl.GeolocateControl({
         positionOptions: {
             enableHighAccuracy: true
         },
         trackUserLocation: true,
         showUserHeading: true
     });

     map.addControl(geolocate);

     // Event listener for centering map on user's location after 'geolocate' event
     geolocate.on('geolocate', (e) => {
         map.flyTo({
             center: [e.coords.longitude, e.coords.latitude],
             zoom: 14
         });
     });

     // Start geolocation when map is ready
     map.on('load', () => {
         geolocate.trigger();
     });
 }

 function getPosition() {
     var options = {
         enableHighAccuracy: true,
         maximumAge: 3600000
     };

     navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

     function onSuccess(position) {
         var locationDisplay = document.getElementById('locationDisplay');
         locationDisplay.innerHTML = 'Latitude: ' + position.coords.latitude + '<br>' +
                                     'Longitude: ' + position.coords.longitude + '<br>' +
                                     'Altitude: ' + position.coords.altitude + '<br>' +
                                     'Accuracy: ' + position.coords.accuracy + '<br>' +
                                     'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br>' +
                                     'Heading: ' + position.coords.heading + '<br>' +
                                     'Speed: ' + position.coords.speed + '<br>' +
                                     'Timestamp: ' + new Date(position.timestamp).toLocaleString();
     }

     function onError(error) {
         alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
     }
 }

 function cameraTakePicture() {
     navigator.camera.getPicture(onSuccess, onFail, {  
         quality: 50, 
         destinationType: Camera.DestinationType.DATA_URL 
     });  

     function onSuccess(imageData) { 
         var image = document.getElementById('myImage'); 
         image.src = "data:image/jpeg;base64," + imageData; 
         image.style.display = 'block';
     }  

     function onFail(message) { 
         alert('Failed because: ' + message); 
     } 
 }