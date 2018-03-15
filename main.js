const mapElement = document.getElementById('map');
let marker;

async function getISSPos() {
	const resp = await fetch('http://api.open-notify.org/iss-now.json');
	const jsonData = await resp.json();

	return {
		lat: parseFloat(jsonData.iss_position.latitude),
		lng: parseFloat(jsonData.iss_position.longitude)
	};
}

async function initMap() {
	const whereMap = await getISSPos();

	const map = new google.maps.Map(mapElement, {
		center: whereMap,
		zoom: 4
	});

	let whereMarker = await getISSPos();

	const marker = new google.maps.Marker({
		icon: 'http://www.i2clipart.com/cliparts/9/1/8/b/128045918b2a5460885f6998687faff62eaa93.png',
		position: whereMarker,
		map: map
	});

	(async function moveMarker() {
		whereMarker = await getISSPos();

		marker.setPosition(whereMarker);

		requestAnimationFrame(moveMarker);
	})();
}