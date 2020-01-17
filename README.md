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

- 保存時ビルド＆ブラウザ更新

```shell
> npm run serve
```

## データ定義

- 学内審査用JSONデータ<br />
    Python からwebSocketを利用しクライアントに送信するJSONデータ構造

    ``` json
    {
        "type": "result",
        "pulse": {
            "avg": 1,
            "datas":[
                1,
                1,
                1,
                1,
                1
            ]
        },
        "sick": {
            "name": "",
            "place": 0,
            "message": ""
        }
    }
    ```

    - `type` => データ定義
        - `result` => 結果データ
    - `pulse` => 脈
        - `avg` => 平均(数値)
        - `datas` => 脈データ(数値配列)
    - `sick` => 病気
        - `name` => 病気名(文字列)
        - `place` => 発症場所(数値/ 0 = 上 : 1 = 真ん中 : 2 = 下)
        - `message` => 病気の説明(文字列)

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

## config

## 命名規則

- key: アッパーキャメル

### 運用方法(暫定)

- 基本的には、ディレクトリごとに階層を定義(ファイル単位で分けるとなおよし)
- 配列に関しては、イテレータがあるといい場合かつ、別の解釈が生まれない場合にのみ使用

- 環境ごとで替わる値だろうが、設定はまずdefault.jsonに記述すること。
- 本番環境で値が変わる物はproduction.jsonに**同じKeyで**値を記述することでオーバーライドされる。
- ※　上記は、記述漏れ等でconfigを参照できなくなる問題を避けるため。

### Access方法

- 今回は、frontendのプロジェクトのため、限定的使い方しかできない（webpack.DefinePluginsを使用）
- CONFIGは、DefinePluginで定義した名前
- 下の階層へは、「.」を使用してアクセスする。

``` js
// ex.)
    const config = CONFIG.Websocket;
    console.log(config.address);
```

## その他設定

### webserver(イルPC)

- port: 80

### browser-sync

- port: 8888

### signaling（まさかつPC）

- port: 8080

### cliant(里中PC)
