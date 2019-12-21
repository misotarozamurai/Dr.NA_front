// Cannon.js と　Three.js　の緩衝用型
type ObjectStatus = {
    position: number[],
    quaternion: number[],
}

//　DNA生成時のカラーペア定義用型
type MaterialPair = [THREE.Material,THREE.Material];
type ColorPair = [number,number];
