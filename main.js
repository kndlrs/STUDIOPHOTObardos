import {, loadAudio, loadVideo} from "./libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    //initiate the AR 3 object
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './assets/targets/Alltargets.mind'
    });
    const {renderer, scene, camera} = mindarThree;

   
    const video1 = await loadVideo("./assets/videos/sintel/sintel.mp4);
    const texture1 = new THREE.VideoTexture(video1);
    const geometry1 = new THREE.PlaneGeometry(1, 204/480);
    const material1 = new THREE.MeshBasicMaterial({map: texture1});
    const plane1 = new THREE.Mesh(geometry1, material1);
    
    const anchor1 = mindarThree.addAnchor(0);
    anchor1.group.add(plane1);

    anchor1.onTargetFound = () => {
      video.play();
    }
    anchor1.onTargetLost = () => {
      video1.pause();
    }
    video1.addEventListener( 'play', () => {
      video1.currentTime = 6;
    });
     
   // const video2 = await loadVideo("./assets/videos/Softbox Info.mp4");
   // const texture2 = new THREE.VideoTexture(video);
   // const geometry2 = new THREE.PlaneGeometry(1, 204/480);
   // const material2 = new THREE.MeshBasicMaterial({map: texture});
   // const plane2 = new THREE.Mesh(geometry, material);
    
  //  const video3 = await loadVideo("./assets/videos/BackdropInfo.mov");
  //  const texture = new THREE.VideoTexture(video);
  //  const geometry = new THREE.PlaneGeometry(1, 204/480);
  //  const material = new THREE.MeshBasicMaterial({map: texture});
  //  const plane = new THREE.Mesh(geometry, material);
   
   
  

    //start the experience
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  //to πλήκτρο start δουλεύει για μια φορά μόνο
  //const startButton = document.createElement("button");
  //startButton.textContent = "Start";
  //startButton.addEventListener("click", start);
  //document.body.appendChild(startButton);
  start();
});
