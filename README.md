# 📢 Portfolio ver2.0

## 🌴 環境情報

[Astro](https://astro.build/)

## 👷 環境準備

### 1. パッケージインストール

```shell
pnpm i
```

### 2. 開発サーバー立ち上げ

```shell
pnpm run dev
```

## 💻 実装

### 1. ファイル構成

```shell
├── public/　#静的アセット
├── src/　#作業ディレクトリ
│   ├── assets/　#最適化用アセット
│   ├── components/　#共通コンポーネント
│   ├── data/　# 共通データ。Content Collectionsなど
│   ├── icons/ 　#SVG（Astro Icon）
│   ├── layouts/ #共通レイアウト
│   ├── libs/ #SSG処理関連
│   └── pages/　#各ページのHTML
│   ├── styles/ #css（sass）
│   ├── scripts/ #js（クライアントサイド）
└── astro.config.ts　#開発環境設定ファイル
```

### 2. アセット

[Astro Imagesコンポーネント](https://docs.astro.build/ja/guides/images/)で画像を最適化しています。  
faviconなどの最適化不要のアセットは`public`に格納しています。

```js
---
import { Image } from 'astro:assets';
import ImageSample from '@/assets/sample.png';
---

<Image src={ImageSample} alt="" />
```

### 3. SVG

[Astro Icon](https://www.astroicon.dev/)を使用することでインライン上でSVGファイルを簡単に出力できます。
なお、Iconコンポーネントで参照するSVGファイルは`src/icons`に格納してください。

```js
---
import { Icon } from "astro-icon";
---

<Icon name='icon_sample' />

// => <svg data-icon="icon_sample"><symbol id="ai:local:icon_sample" viewBox="...">...</symbol><use href="#ai:local:icon_sample"></use></svg>
```

### 🏠 ビルド

以下のコマンドで`dist/`に出力します。

```shell
pnpm run build
```
