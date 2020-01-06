// Cannon.js と　Three.js　の緩衝用型
type ObjectStatus = {
    position: number[],
    quaternion: number[],
}

//　DNA生成時のカラーペア定義用型
type MaterialPair = [THREE.Material,THREE.Material];
type ColorPair = [number,number];

// JSON認識用型(かなりガバいので注意)
type Json = {
    [key: string]: JsonValue
};

type JsonValue =
    | string
    | number
    | boolean
    | JsonValueArray
    | Json;

interface JsonValueArray extends Array<JsonValue>{}

// reading webpack Define Plugin
declare const CONFIG: Json;
