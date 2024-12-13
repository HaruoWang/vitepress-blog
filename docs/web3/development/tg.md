---
description: 到env裡存api key，並在main.tsx裡引入`<ThirdwebProvider>`。這可說是使用thirdweb開發的基本動作
head:
  - - link
    - rel: canonical
      href: https://haruowang.vercel.app/web3/development/tg.html
  - - meta
    - property: og:url
      content: https://haruowang.vercel.app/web3/development/tg.html
  - - meta
    - property: og:title
      content: TG Mini App：臺股走勢小鏈遊
  - - meta
    - name: og:description
      content: 到env裡存api key，並在main.tsx裡引入`<ThirdwebProvider>`。這可說是使用thirdweb開發的基本動作
  - - meta
    - name: og:image
      content: /development/tg1.webp
  - - meta
    - property: twitter:title
      content: TG Mini App：臺股走勢小鏈遊
  - - meta
    - name: twitter:description
      content: 到env裡存api key，並在main.tsx裡引入`<ThirdwebProvider>`。這可說是使用thirdweb開發的基本動作
  - - meta
    - name: twitter:image
      content: https://haruowang.vercel.app/development/tg1.webp
---

# 【TG Mini App：臺股走勢小鏈遊】

<p><Badge type="info" text="🌳 Evergreen" /></P>

![TW Chart Game｜臺股走勢小鏈遊](/development/tg1.webp)

## 前置

先pnpm create vite，cd進資料夾，然後add @vkruglikov/react-telegram-web-app。

因為要讓網頁可以直接在Telegram裡開啟，到index.html加入`<script src="https://telegram.org/js/telegram-web-app.js"></script>`。

pnpm run dev之後，5713埠就會正確顯示。接著pnpm i thirdweb，在src資料夾新增一個client.ts。

到env裡存api key，並在main.tsx裡引入`<ThirdwebProvider>`。這可說是使用thirdweb開發的基本動作。

要記得去thirdweb網頁的contracts裡deploy合約喔。

## Lightweight

思考這個遊戲要做成什麼樣的時候，剛好打算要實作Lightweight Charts。

它是TradingView圖表套件的開源免費版，資料自然要自己串證交所API。

而根據線型讓使用者做出交易決策的應用，則有Chart Game和Trading Train這樣的先例。

實際操作時有幾段語法比較有印象，簡單列出：

- `chart.timeScale().fitContent()`：可以讓不同時間區段的圖形都符合圖表大小，好用
- `lastValueVisible: false`：隱藏最後一個價格的標籤
- `priceLineVisible: false`：隱藏最後一個價格的的標示線

## 子傳父

算是開發途中，比起讀教學更能切身體會到React邏輯的一段插曲。

由於子組件裡showModal的狀態會影響到父組件，遂將`const [showModal, setShowModal] = useState(false)`移至父組件，再用prop傳下來。類似狀態提升。

## Mini App

1. 和Telegram機器人BotFather互動
2. /start
3. /newbot
4. 命名你的App
5. 命名你的Bot（某某bot，相當於帳號）
6. /newapp
7. 命名（影響不大）
8. 提供描述
9. 上傳圖片（640*360px）
10. 上傳gif
11. BotFather回傳url（t.me/某某bot）
12. 路徑子名稱（t.me/某某bot/子名稱）

## 參考文獻
- [How to Build a Web3 Telegram Mini App](https://blog.thirdweb.com/guides/build-web3-telegram-mini-game)

## [專案連結](https://twchartgame.vercel.app)