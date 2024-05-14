# ctrl-Enter

ウェブサービス間で統一されていない改行と送信キー(Enter, ctrl+Enter, shift+Enter, alt+Enter)を統一するブラウザ拡張機能

[Chrome Web Store](https://chrome.google.com/webstore/detail/ctrl-enter/blfjdamcgeokhjehpkjiodaeabiklekm?hl=ja)

## 対応サイト

- Discord
- Twitter (message)
- Instagram (message)
- Facebook (message)
- Zoom
- Google Meet
- ChatGPT
- Bing Chat
- Bard
- Claude

## 開発手順

### リポジトリのクローンとパッケージのインストール

Plasmo推奨のpnpmを使用しているため、まず初めにpnpmをインストールする

```sh
corepack enable
```

次にパッケージのインストール

```sh
pnpm i --frozen-lockfile
```

### 開発

```sh
pnpm notios
```
