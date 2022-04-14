# ディレクトリ構造

```
.
├── dist　// npm run buildで生成されるファイル群
├── icon.png
├── manifest.json //chrome extensionの設定ファイル
├── optional.html // chrome extensionのユーザー設定を行うoptionページ
├── popup.html // chromeのアイコンアイコンをクリックすると表示されるpopupのhtmlファイル
├── src //build元となるsrcファイル群 (それぞれディレクトリ内のindexファイルがbuildされて出力される)
│   ├── background //backgroundでapi通信や、ユーザーが開いているtabのurlなどを取得できる
│   │   └── index.ts
│   ├── content //特定のページに埋め込んで、DOMを操作できたりCSSを書き換えたりできる
│   │   └── index.ts
│   └── popup //chrome extensionのiconを開いた時に表示されるpopup。reactで作られている
│       ├── App.tsx
│       └── index.tsx
├── tsconfig.json // typescriptの設定ファイル
└── webpack.config.ts //バンドラー&コンパイラーの設定ファイル

```
