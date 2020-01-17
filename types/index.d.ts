// Cannon.js と　Three.js　の緩衝用型
type ObjectStatus = {
    position: number[],
    quaternion: number[],
}

//　DNA生成時のカラーペア定義用型
type MaterialPair = [THREE.Material,THREE.Material];
type ColorPair = [number,number];

// JSON認識用型(かなりガバいので注意)

// type JsonValue =
//     | string
//     | number
//     | boolean
//     | JsonValueArray
//     | JsonObject;

// interface JsonObject {
//     [key: string]: JsonValue;
// }

// interface JsonValueArray extends Array<JsonValue>{}

// reading webpack Define Plugin
// declare const CONFIG: JsonObject;

// 冗長になりすぎるので逃げましたごめんなさい。。。。。
declare const CONFIG: any;