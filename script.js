// Three.jsの基本設定
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 500, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, 500);
document.getElementById('3d-container').appendChild(renderer.domElement);

// ライトの設定
const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 10, 7.5);
scene.add(pointLight);

// スピーカーのマテリアル
const speakerMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });

// スピーカーのグループを作成
const speakerGroup = new THREE.Group();

for (let i = 0; i < 5; i++) {
    const geometry = new THREE.BoxGeometry(0.6, 1, 0.6);
    const speaker = new THREE.Mesh(geometry, speakerMaterial);
    speaker.position.y = i * 1.1 - 2.2;
    speaker.name = `speaker_${i}`;
    speakerGroup.add(speaker);
}

scene.add(speakerGroup);

// オーディオの設定
const listener = new THREE.AudioListener();
camera.add(listener);

const audioLoader = new THREE.AudioLoader();
const sound = new THREE.PositionalAudio(listener);

audioLoader.load('sound.mp3', function(buffer) {
    sound.setBuffer(buffer);
    sound.setRefDistance(20);
});

// スピーカーに音声を追加
speakerGroup.children.forEach(speaker => {
    const speakerSound = sound.clone();
    speaker.add(speakerSound);
    speaker.userData.sound = speakerSound;
});

// ユーザー操作のためのコントロール
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;

// レイキャスターの設定
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseClick(event) {
    // マウス位置を正規化デバイス座標に変換
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = - ((event.clientY - rect.top) / renderer.domElement.clientHeight) * 2 + 1;

    // レイキャストを設定
    raycaster.setFromCamera(mouse, camera);

    // オブジェクトとの交差を取得
    const intersects = raycaster.intersectObjects(speakerGroup.children);

    if (intersects.length > 0) {
        const selectedSpeaker = intersects[0].object;
        const speakerSound = selectedSpeaker.userData.sound;

        if (speakerSound.isPlaying) {
            speakerSound.stop();
        } else {
            speakerSound.play();
        }
    }
}

renderer.domElement.addEventListener('click', onMouseClick, false);

// ウィンドウリサイズへの対応
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, 500);
    camera.aspect = window.innerWidth / 500;
    camera.updateProjectionMatrix();
});

// アニメーションループ
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();