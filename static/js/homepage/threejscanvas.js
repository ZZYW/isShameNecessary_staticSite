// var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// var renderer = new THREE.WebGLRenderer();
// var scrollDistance;
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.getElementById('actual-homepage').appendChild(renderer.domElement);
// var geometry = new THREE.BoxGeometry(1,1,1);
// var material = new THREE.MeshBasicMaterial({color:0x00ff00});
// var cube = new THREE.Mesh(geometry, material);
// scene.add(cube);
// camera.position.z = 5;

// render();

// function THREEupdate(){
// 	scrollDistance = $(window).scrollTop();
// 	if(scrollDistance >= $('#landing-page').height()){
// 		cube.rotation.x += 0.1;
// 		cube.rotation.y += 0.1;
// 	}
// }


// function render(){
// 	requestAnimationFrame(render);
// 	THREEupdate();
// 	renderer.render(scene,camera);
// }


var scrollDistance;
var container, scene, renderer, camera, light, clock, loader;
var WIDTH, HEIGHT, VIEW_ANGLE, ASPECT, NEAR, FAR;

container = document.querySelector('#navigation');

clock = new THREE.Clock();

WIDTH = window.innerWidth,
HEIGHT = window.innerHeight;

VIEW_ANGLE = 45,
ASPECT = WIDTH / HEIGHT,
NEAR = 1,
FAR = 10000;

scene = new THREE.Scene();

renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize(WIDTH, HEIGHT);
renderer.shadowMapEnabled = true;
renderer.shadowMapSoft = true;
renderer.shadowMapType = THREE.PCFShadowMap;
renderer.shadowMapAutoUpdate = true;

container.appendChild(renderer.domElement);

camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

camera.position.set(0, HEIGHT/2, 100);

scene.add(camera);

light = new THREE.DirectionalLight(0xffffff);

light.position.set(0, 100, 60);
light.castShadow = true;
light.shadowCameraLeft = -60;
light.shadowCameraTop = -60;
light.shadowCameraRight = 60;
light.shadowCameraBottom = 60;
light.shadowCameraNear = 1;
light.shadowCameraFar = 1000;
light.shadowBias = -.0001
light.shadowMapWidth = light.shadowMapHeight = 1024;
light.shadowDarkness = .7;

scene.add(light);

loader = new THREE.JSONLoader();
var theTotem;
loader.load('/static/models/totempole.js', function (geometry, materials) {
	var material = new THREE.MeshLambertMaterial();

	theTotem = new THREE.Mesh(
		geometry,
		material
		);

	theTotem.receiveShadow = true;
	theTotem.castShadow = true;
	theTotem.position.set(0,0,0);
	theTotem.rotation.y = -Math.PI/5;

	scene.add(theTotem);
	// render(); 
});

function render() {

	scrollDistance = $(window).scrollTop();
	if(scrollDistance >= $('#landing-page').height()){
		var time = clock.getElapsedTime();
		theTotem.rotation.y += .01;
	}



	renderer.render(scene, camera);
	setTimeout(function(){
		requestAnimationFrame( render );
	}, 1000 / 30 );

}



