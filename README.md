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

#### typescriptの設定項目

- es2015をes5に変換する設定。
- libで呼んでいるes2019はthreeの内部でes2015+の機能を使用しているため指定している。
- 厳格な設定は理解し次第追加。
- typescrptの設定は[tsconfig.json]に記述

### 運用方法

- ビルド

```shell
> npm run build
```

- 保存時に自動ビルド

```shell
> npm run watch
```
