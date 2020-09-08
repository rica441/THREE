// ページの読み込みを待つ
window.addEventListener('load', init);

function init(){
  // ロードが完了後にWebGLの処理
  
  //①レンダラーの準備
  const width = window.innerWidth;
  const height = 700;
  
    // canvas 要素の参照を取得する
  const canvas = document.querySelector('#myCanvas');
  
  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
  canvas: canvas
  });
  
  //レンダラーのサイズ
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  
  //②シーンを作成する
  //(シーンとは3D空間のことで、3Dオブジェクトや光源などの置き場)
  const scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff);//シーンの背景色
  
  // フォグを設定(色, 開始距離, 終点距離)
  scene.fog = new THREE.Fog(0xffffff, 100, 2000);
  
  //③カメラを作る（3Dではどの視点から空間を撮影するか）
  // ↓new THREE.PerspectiveCamera(画角, アスペクト比
  const camera = new THREE.PerspectiveCamera(45, 960 / 540);
  // カメラの初期座標を設定(x,y)
  camera.position.set(0, 0, +1800);
   
   // グループを作成
  const group = new THREE.Group();
  scene.add(group);//シーンに追加
  
  // ジオメトリ
  const geometry = new THREE.IcosahedronGeometry (60);
  // マテリアル
  const material = new THREE.MeshStandardMaterial({color: 0x6699FF,wireframe: false, roughness:0});
  
  
  for (let i = 0; i < 100; i++) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 2000;
    mesh.position.y = (Math.random() - 0.5) * 2000;
    mesh.position.z = (Math.random() - 0.5) * 2000;
    mesh.rotation.x = Math.random() * 2 * Math.PI;
    mesh.rotation.y = Math.random() * 2 * Math.PI;
    mesh.rotation.z = Math.random() * 2 * Math.PI;
    // グループに格納する
    group.add(mesh);
    
  }
  
  //ライトを作成
  // 環境光源を作成
  const light1 = new THREE.AmbientLight(0xFFFFFF, 1);
  scene.add(light1);  // シーンに追加
  
   // 平行光源を作成
  // new THREE.DirectionalLight(色, 光の強さ)
  const light2 = new THREE.DirectionalLight(0xFFFFF00, .8);
  scene.add(light2);  // シーンに追加
    
  //物体を回転させるアニメーション
   tick();
  
  
// 毎フレーム時に実行されるループイベントです
      function tick() {
        group.rotation.y += 0.001;
        group.rotation.x += 0.001;
        renderer.render(scene, camera); // レンダリング
        requestAnimationFrame(tick);
      }
  
}
