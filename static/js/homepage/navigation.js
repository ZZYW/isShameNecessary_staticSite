var container;
var stats;
var scene, camera, renderer, controls, composer;
var plane, book, totem, frames, humanhead, map, bookText;
var clickableObjects;
var mouse = new THREE.Vector2();
var radius = 10;
var raycaster, INTERSECTED;
var particle1, particle2, particle2, light1, light2, light3, light4;
var bookOriPos, totemOriPos, framesOriPos, headOriPos, mapOriPos;
var bookA = 0.01,
    totemA = 0.011,
    headA = 0.012,
    mapA = 0.009,
    framesA = 0.008;
var center = new THREE.Vector3(0, 0, 0);



//run animation only after a click occurs
document.getElementById("landing-page").onclick = function() {

    //setup cookie
    var d = new Date();
    d.setTime(d.getTime() + (10*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cookieString + "=1" + "; " + expires;

    if (titleOnHover()) {
        if (Detector.webgl && !mobilecheck()) {
            console.log("Desktop AND Browser supports WebGL! :D");
            init();
            animate();
        } else {
            console.log("Mobile OR Browser doesn't suppport WebGL... :(  ");
        }
    }
};

function init() {


    //get container from DOM
    raycaster = new THREE.Raycaster();
    container = document.getElementById("navigation");
    //setup camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0.6552424135382265, 18.54417452524206, 14.835580445033164);
    camera.lookAt(0,0,0);
    //stats
    // stats = new Stats();
    // stats.domElement.style.position = 'absolute';
    // stats.domElement.style.top = '50px';
    // container.appendChild(stats.domElement);

//     .______       _______ .__   __.  _______   _______ .______       _______ .______      
// |   _  \     |   ____||  \ |  | |       \ |   ____||   _  \     |   ____||   _  \     
// |  |_)  |    |  |__   |   \|  | |  .--.  ||  |__   |  |_)  |    |  |__   |  |_)  |    
// |      /     |   __|  |  . `  | |  |  |  ||   __|  |      /     |   __|  |      /     
// |  |\  \----.|  |____ |  |\   | |  '--'  ||  |____ |  |\  \----.|  |____ |  |\  \----.
// | _| `._____||_______||__| \__| |_______/ |_______|| _| `._____||_______|| _| `._____|
                                                                                      

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#fff', 0.05);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('#fff');
    renderer.sortObjects = false;
    renderer.shadowMapEnabled = true;
    //append renderer to container div
    container.appendChild(renderer.domElement);
    //Listeners
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('mousedown', onDocumentMouseDown);
    window.addEventListener('resize', onWindowResize, false);
    clickableObjects = new THREE.Object3D(); //add all clickable objects into this group
    scene.add(clickableObjects);



// .___  ___.   ______    __    __       _______. _______ 
// |   \/   |  /  __  \  |  |  |  |     /       ||   ____|
// |  \  /  | |  |  |  | |  |  |  |    |   (----`|  |__   
// |  |\/|  | |  |  |  | |  |  |  |     \   \    |   __|  
// |  |  |  | |  `--'  | |  `--'  | .----)   |   |  |____ 
// |__|  |__|  \______/   \______/  |_______/    |_______|
                                                       
//   ______   ______   .__   __. .___________..______        ______    __       __       _______ .______      
//  /      | /  __  \  |  \ |  | |           ||   _  \      /  __  \  |  |     |  |     |   ____||   _  \     
// |  ,----'|  |  |  | |   \|  | `---|  |----`|  |_)  |    |  |  |  | |  |     |  |     |  |__   |  |_)  |    
// |  |     |  |  |  | |  . `  |     |  |     |      /     |  |  |  | |  |     |  |     |   __|  |      /     
// |  `----.|  `--'  | |  |\   |     |  |     |  |\  \----.|  `--'  | |  `----.|  `----.|  |____ |  |\  \----.
//  \______| \______/  |__| \__|     |__|     | _| `._____| \______/  |_______||_______||_______|| _| `._____|
                                                                                                           
        
    controls = new THREE.TrackballControls(camera);
    // controls.enabled = false;
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = true;
    controls.staticMoving = true;
    controls.minDistance = 19;
    controls.maxDistance = 30;
    controls.dynamicDampingFactor = 0.3;




//  __       __    _______  __    __  .___________.    _______.
// |  |     |  |  /  _____||  |  |  | |           |   /       |
// |  |     |  | |  |  __  |  |__|  | `---|  |----`  |   (----`
// |  |     |  | |  | |_ | |   __   |     |  |        \   \    
// |  `----.|  | |  |__| | |  |  |  |     |  |    .----)   |   
// |_______||__|  \______| |__|  |__|     |__|    |_______/    
                   


    
    var sphere = new THREE.SphereGeometry(0.5,10,5);
        
    // scene.add(new THREE.AmbientLight("#000"));
    light1 = new THREE.PointLight('#11AD11', 1, 50);
    light1.castShadow = false;
    light1.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({
        color: '#11AD11'
    })));
    scene.add(light1);
    light2 = new THREE.PointLight('#4219FB', 1, 50);
    light2.castShadow = false;
    light2.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({
        color: '#4219FB'
    })));
    scene.add(light2);
    light3 = new THREE.PointLight('#AD5109', 1, 50);
    light3.castShadow = false;
    light3.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({
        color: '#AD5109'
    })));
    scene.add(light3);
    light4 = new THREE.PointLight("#C76214", 1, 50);
    light4.castShadow = false;
    light4.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({
        color: '#C76214'
    })));
    scene.add(light4);

    centerLight = new THREE.SpotLight('#fff',3);
    centerLight.castShadow = true;
    // centerLight.target.position.set(0,0,0);
    // centerLight.shadowMapWidth = 1024;
    // centerLight.shadowMapHeight = 1024;
    // centerLight.shadowCameraNear = 500;
    // centerLight.shadowCameraFar = 4000;
    // centerLight.shadowCameraFov = 30;
    centerLight.position.set(0,20,0);
    centerLight.add(new THREE.Mesh(new THREE.SphereGeometry(3, 16, 8), new THREE.MeshBasicMaterial({
        color: '#00fa00',
        wireframe: true
        // emissive: ''
    })));
    scene.add(centerLight);


    // var topLight = new THREE.SpotLight('#B4FD0D', 0.5);
    // topLight.position.set(0, 16, 10);
    // topLight.castShadow = true;
    // scene.add(topLight);
    // var topLeftLight = new THREE.SpotLight('#C76214', 0.2);
    // topLeftLight.castShadow = true;
    // topLeftLight.position.set(7, 16, 10);
    // topLeftLight.lookAt(scene);
    // scene.add(topLeftLight);
    // var topRightLight = new THREE.SpotLight('#00FA00', 0.2);
    // topRightLight.castShadow = true;
    // topRightLight.position.set(-7, 16, 10);
    // topRightLight.lookAt(scene);
    // scene.add(topRightLight);




// ____    __    ____  ___       __       __          _______.
// \   \  /  \  /   / /   \     |  |     |  |        /       |
//  \   \/    \/   / /  ^  \    |  |     |  |       |   (----`
//   \            / /  /_\  \   |  |     |  |        \   \    
//    \    /\    / /  _____  \  |  `----.|  `----.----)   |   
//     \__/  \__/ /__/     \__\ |_______||_______|_______/    
                                                           
        
                                            
                                            
    var planeGeo = new THREE.PlaneBufferGeometry(50, 50);
    var planeTop = new THREE.Mesh(planeGeo, new THREE.MeshPhongMaterial({
        color: '#fff'
    }));
    planeTop.position.y = 50;
    planeTop.rotateX(Math.PI / 2);
    // scene.add(planeTop);
    var planeBack = new THREE.Mesh(planeGeo, new THREE.MeshPhongMaterial({
        color: '#fff'
    }));
    planeBack.position.z = -25;
    planeBack.position.y = 25;
    planeBack.receiveShadow = false;
    scene.add(planeBack);
    var planeFront = new THREE.Mesh(planeGeo, new THREE.MeshPhongMaterial({
        color: '#fff'
    }));
    planeFront.position.z = 25;
    planeFront.position.y = 25;
    planeFront.rotateY(Math.PI);
    planeFront.receiveShadow = false;
    scene.add(planeFront);
    var planeRight = new THREE.Mesh(planeGeo, new THREE.MeshPhongMaterial({
        color: '#fff'
    }));
    planeRight.position.x = 25;
    planeRight.position.y = 25;
    planeRight.rotateY(-Math.PI / 2);
    planeRight.receiveShadow = false;
    scene.add(planeRight);
    var planeLeft = new THREE.Mesh(planeGeo, new THREE.MeshPhongMaterial({
        color: '#fff'
    }));
    planeLeft.position.x = -25;
    planeLeft.position.y = 25;
    planeLeft.rotateY(Math.PI / 2);
    planeLeft.receiveShadow = false;
    scene.add(planeLeft);


//   _______ .______        ______    __    __  .__   __.  _______  
//  /  _____||   _  \      /  __  \  |  |  |  | |  \ |  | |       \ 
// |  |  __  |  |_)  |    |  |  |  | |  |  |  | |   \|  | |  .--.  |
// |  | |_ | |      /     |  |  |  | |  |  |  | |  . `  | |  |  |  |
// |  |__| | |  |\  \----.|  `--'  | |  `--'  | |  |\   | |  '--'  |
//  \______| | _| `._____| \______/   \______/  |__| \__| |_______/ 
               




    var planeGeo = new THREE.PlaneBufferGeometry( 50, 50);
    var planeMar = new THREE.MeshLambertMaterial({color:'#fff'});
    plane = new THREE.Mesh(planeGeo,planeMar);
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);


//  ____    _______     .___  ___.   ______    _______   _______  __          _______.
// |___ \  |       \    |   \/   |  /  __  \  |       \ |   ____||  |        /       |
//   __) | |  .--.  |   |  \  /  | |  |  |  | |  .--.  ||  |__   |  |       |   (----`
//  |__ <  |  |  |  |   |  |\/|  | |  |  |  | |  |  |  ||   __|  |  |        \   \    
//  ___) | |  '--'  |   |  |  |  | |  `--'  | |  '--'  ||  |____ |  `----.----)   |   
// |____/  |_______/    |__|  |__|  \______/  |_______/ |_______||_______|_______/    
                                                                                   
                                                         
    // var shadowMakerGeo = new THREE.BoxGeometry(1,1,1);
    // var shadowMakerMar = new THREE.MeshLambertMaterial({color:'#000'});
    // var shadowMaker = new THREE.Mesh(shadowMakerGeo,shadowMakerMar);
    // shadowMaker.position.set(0,9,0);
    // shadowMaker.castShadow = true;
    // scene.add(shadowMaker);


    var shininess = 4;
    var wireframevalue = false;
    //calculate objects init positions
    var floatingHeight = 5;
    bookOriPos = new THREE.Vector3(radius, floatingHeight, 0);
    headOriPos = new THREE.Vector3(radius * Math.cos((Math.PI * 2) / 5), floatingHeight, radius * Math.sin((Math.PI * 2) / 5));
    framesOriPos = new THREE.Vector3(radius * Math.cos(((Math.PI * 2) / 5) * 2), floatingHeight, radius * Math.sin(((Math.PI * 2) / 5) * 2));
    totemOriPos = new THREE.Vector3(radius * Math.cos(((Math.PI * 2) / 5) * 3), floatingHeight, radius * Math.sin(((Math.PI * 2) / 5) * 3));
    mapOriPos = new THREE.Vector3(radius * Math.cos(((Math.PI * 2) / 5) * 4), floatingHeight, radius * Math.sin(((Math.PI * 2) / 5) * 4));

    var modelsColor = "#00fa00";
    var modelsAmbientColor = "#C76214";
    var modelsSpecularColor = "#000";
    var naturalEmissiveColor = "#000";

    //BOOK MODEL
    var bookTexture = THREE.ImageUtils.loadTexture("static/models/newbook/booktexture_uk.jpg");
    loader = new THREE.JSONLoader();
    loader.load("static/models/newbook/book.js", function(geometry) {
        var material = new THREE.MeshLambertMaterial({
            fog: true,
            color: modelsColor,
            shininess: shininess,
            wireframe: wireframevalue,
            emissive:naturalEmissiveColor,
            map:bookTexture,
            ambient: modelsAmbientColor,
            specular: modelsSpecularColor
        });
        book = new THREE.Mesh(geometry, material);
        book.position.set(bookOriPos.x, bookOriPos.y, bookOriPos.z);
        book.scale.set(0.7, 0.7, 0.7);
        book.castShadow = true;
        book.rotation.y = Math.PI;
        clickableObjects.add(book);
    });


    //  TOTEM POLE
    // var totemTexture = THREE.ImageUtils.loadTexture("static/models/newtotem/stone.png")
    // totemTexture.wrapS = THREE.RepeatWrapping;
    // totemTexture.wrapT = THREE.RepeatWrapping;
    loader.load("static/models/newtotem/newtotem.js", function(geometry) {
        var material = new THREE.MeshLambertMaterial({
            fog: true,
            color: modelsColor,
            shininess: shininess,
            wireframe: wireframevalue,
            emissive:naturalEmissiveColor,
            ambient: modelsAmbientColor,
            specular: modelsSpecularColor
                // map:totemTexture
        });

        totem = new THREE.Mesh(geometry, material);
        totem.position.set(totemOriPos.x, totemOriPos.y, totemOriPos.z);
        totem.scale.set(0.4, 0.4, 0.4);
        totem.castShadow = true;
        clickableObjects.add(totem);
    });
    //Frame Model
    var framesTexture = THREE.ImageUtils.loadTexture('static/models/_Metal_A.jpg');
    framesTexture.wrapS = THREE.RepeatWrapping;
    framesTexture.wrapT = THREE.RepeatWrapping;
    loader.load("static/models/frames.js", function(geometry) {
        var material = new THREE.MeshLambertMaterial({
            fog: true,
            color: modelsColor,
            shininess: shininess,
            wireframe: wireframevalue,
            emissive:naturalEmissiveColor,
            ambient: modelsAmbientColor,
            specular: modelsSpecularColor
        });
        frames = new THREE.Mesh(geometry, material);
        frames.castShadow = true;
        frames.position.set(framesOriPos.x, framesOriPos.y, framesOriPos.z);
        frames.scale.set(3, 3, 3);
        clickableObjects.add(frames);
    });
    //Human Head Model
    // var headTexture = THREE.ImageUtils.loadTexture("static/models/faceshiftCapture/Smile.png");
    // headTexture.wrapS = THREE.RepeatWrapping;
    // headTexture.wrapT = THREE.RepeatWrapping;
    loader.load("static/models/humanhead.js", function(geometry) {
        var material = new THREE.MeshLambertMaterial({
            fog: true,
            color: modelsColor,
            shininess: shininess,
            emissive:naturalEmissiveColor,      
            wireframe: wireframevalue,
            ambient: modelsAmbientColor,
            specular: modelsSpecularColor,
            // map:headTexture
        });
        humanhead = new THREE.Mesh(geometry, material);
        humanhead.position.set(headOriPos.x, headOriPos.y, headOriPos.z);
        humanhead.scale.set(2, 2, 2);
        humanhead.castShadow = true;
        clickableObjects.add(humanhead);
    });
    //map model
    // var mapTexture = THREE.ImageUtils.loadTexture( "static/models/maptexture-2.png");
    // mapTexture.wrapS = THREE.RepeatWrapping;
    // mapTexture.wrapT = THREE.RepeatWrapping;
    loader.load("static/models/newmap/map.js", function(geometry) {
        var material = new THREE.MeshLambertMaterial({
            fog: true,
            color: modelsColor,
            shininess: shininess,
            wireframe: wireframevalue,
            emissive:naturalEmissiveColor,
            // map: mapTexture,
            ambient: modelsAmbientColor,
            specular: modelsSpecularColor
        });
        map = new THREE.Mesh(geometry, material);
        map.position.set(mapOriPos.x, mapOriPos.y, mapOriPos.z);
        map.castShadow = true;
        clickableObjects.add(map);
    });

}






//  _______  .______          ___   ____    __    ____     __        ______     ______   .______   
// |       \ |   _  \        /   \  \   \  /  \  /   /    |  |      /  __  \   /  __  \  |   _  \  
// |  .--.  ||  |_)  |      /  ^  \  \   \/    \/   /     |  |     |  |  |  | |  |  |  | |  |_)  | 
// |  |  |  ||      /      /  /_\  \  \            /      |  |     |  |  |  | |  |  |  | |   ___/  
// |  '--'  ||  |\  \----./  _____  \  \    /\    /       |  `----.|  `--'  | |  `--'  | |  |      
// |_______/ | _| `._____/__/     \__\  \__/  \__/        |_______| \______/   \______/  | _|      
                                                                                                





function animate() {
    requestAnimationFrame(animate);
    // stats.update();
    render();
}

function render() {

    //control regulation
    // if (camera.position.y < 3) {
    //     camera.position.y = 3;
    // };


    // camera.position.x = p5.prototype.map(mouseX,0,window.innerWidth,-10,10);
    //lights
    var time = Date.now() * 0.0003;
    light1.position.x = Math.sin(time * 0.7) * 30 / 1.3;
    light1.position.y = Math.cos(time * 0.5) * 40 / 1.3;
    light1.position.z = Math.cos(time * 0.3) * 30 / 1.3;
    light2.position.x = Math.cos(time * 0.3) * 30 / 1.3;
    light2.position.y = Math.sin(time * 0.5) * 40 / 1.3;
    light2.position.z = Math.sin(time * 0.7) * 30 / 1.3;
    light3.position.x = Math.sin(time * 0.7) * 30 / 1.3;
    light3.position.y = Math.cos(time * 0.3) * 40 / 1.3;
    light3.position.z = Math.sin(time * 0.5) * 30 / 1.3;
    light4.position.x = Math.sin(time * 0.3) * 30 / 1.3;
    light4.position.y = Math.cos(time * 0.7) * 40 / 1.3;
    light4.position.z = Math.sin(time * 0.5) * 30 / 1.3;

    try {
        book.position.add(new THREE.Vector3(0, bookA, 0));
        if (book.position.y > bookOriPos.y + 1 || book.position.y < bookOriPos.y - 1) {
            bookA *= -1;
        }
        totem.position.add(new THREE.Vector3(0, totemA, 0));
        if (totem.position.y > totemOriPos.y + 1 || totem.position.y < totemOriPos.y - 1) {
            totemA *= -1;
        }
        humanhead.position.add(new THREE.Vector3(0, headA, 0));
        if (humanhead.position.y > headOriPos.y + 1 || humanhead.position.y < headOriPos.y - 1) {
            headA *= -1;
        }
        frames.position.add(new THREE.Vector3(0, framesA, 0));
        if (frames.position.y > framesOriPos.y + 1 || frames.position.y < framesOriPos.y - 1) {
            framesA *= -1;
        }
        map.position.add(new THREE.Vector3(0, mapA, 0));
        if (map.position.y > mapOriPos.y + 1 || map.position.y < mapOriPos.y - 1) {
            mapA *= -1;
        }
    } catch (err) {
        
    }
    // find intersections
    var vector = new THREE.Vector3(mouse.x, mouse.y, 1).unproject(camera);
    raycaster.set(camera.position, vector.sub(camera.position).normalize());
    var intersects = raycaster.intersectObjects(clickableObjects.children);
    if (intersects.length > 0) {
        if (INTERSECTED != intersects[0].object) {
            if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
            INTERSECTED = intersects[0].object;
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setRGB(0, 0.7, 0);
            //fade in tooptip here
            switch (INTERSECTED) {
                case humanhead:
                    $('#txtbox-face').fadeIn();
                    break;
                case book:
                    $('#txtbox-book').fadeIn();
                    break;
                case frames:
                    $('#txtbox-gallery').fadeIn();
                    break;
                case map:
                    $('#txtbox-map').fadeIn();
                    break;
                case totem:
                    $('#txtbox-totem').fadeIn();
                    break;
            }
        }
    } else {
        if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
        INTERSECTED = null;
        //fade out all toop tip here
        $('#captions').children().fadeOut();
    }
    controls.update();
    renderer.render(scene, camera);
    // composer.render();
}


//  ___________    ____  _______ .__   __. .___________.    _______.
// |   ____\   \  /   / |   ____||  \ |  | |           |   /       |
// |  |__   \   \/   /  |  |__   |   \|  | `---|  |----`  |   (----`
// |   __|   \      /   |   __|  |  . `  |     |  |        \   \    
// |  |____   \    /    |  |____ |  |\   |     |  |    .----)   |   
// |_______|   \__/     |_______||__| \__|     |__|    |_______/    
                                                                 
        
function onMouseMove(e) {
    e.preventDefault();
    //Get Mouse Positions on the 2D Canvas
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    // console.log("mouse x -> " + mouse.x + " | mouse y -> " + mouse.y);
}

function onWindowResize() {
    containerWidth = container.clientWidth;
    containerHeight = container.clientHeight;
    renderer.setSize(containerWidth, containerHeight);
    camera.aspect = containerWidth / containerHeight;
    camera.updateProjectionMatrix();
}

function onDocumentMouseDown(e) {
    e.preventDefault();
    switch (INTERSECTED) {
        case book:
            window.open("/book","_self");
            break;
        case totem:
            // window.open("/#","_self");
            break;
        case frames:
            window.open("/shamegallery","_self");
            break;
        case humanhead:
            window.open("/fe","_self");
            break;
        case map:
            window.open("/map","_self");
            break;
    }
}