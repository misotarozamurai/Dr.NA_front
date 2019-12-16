# Dr.NA_front

## 初期設定

### npmの準備

```shell
> npm init
```

### webpack,babel,typescriptのインストール

```shell
> npm i -D webpack webpack-cli babel-loader @babel/core @babel/preset-env typescript ts-loader
```

### css-loader,style-loader のインストール

``` shell
$ npm i -D css-loader style-loader
```

### regenerator-runtime のインストール

``` shell
$ npm i -S regenerator-runtime
```

#### webpackの設定項目

- entrypointは[index.js](./src/index.js)
- 基本的に、jsからもtsのメソッドを呼べるように設定してある。
- webpackの設定は[webpack.config.js](./webpack.config.js)に記述

#### babelの設定項目

- babel+corejsを使用している。（@babel/polyfillが非推奨となったため）

```shell
> npm i -S core-js@3
```

- babelの設定は[.babelrc](./.babelrc)に記述

#### css-loader,style-loader の設定

- webpack.config.js 追記

    ``` js
    module: {
        rules: [
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }
        ],
    }
    ```

#### typescriptの設定項目

- es2015をes5に変換する設定。
- libで呼んでいるes2019はthreeの内部でes2015+の機能を使用しているため指定している。
- 厳格な設定は理解し次第追加。
- typescrptの設定は[tsconfig.json]に記述
- nodeの基本機能用の型定義ファイルを追加

```shell
> npm i -S @types/node
```

#### regenerator-runtime を利用する

目的 => `async / await` を利用すため。<br />
`index.js`  に下記を記述。

``` js
import 'regenerator-runtime/runtime'
```

### 運用方法

- ビルド

```shell
> npm run build
```

- 保存時に自動ビルド

```shell
> npm run watch
```

## データ定義

- JSONデータ<br >
    Dr.NA_Py から`DataChannel` にて受け取るデータ構造

    ``` json
    {
        // 【脈データ】か【病気データ】かの判断
        "type": "",
        // 脈データ
        "avreage_pulse": 1,
        "pulse": [
            1,
            1,
            1,
            1,
            1
        ],
        // 病気データ
        "sick": {
            // 病名
            "type": "",
            // 部位
            "place": "",
            // 解説
            "message": ""
        }
    }
    ```
