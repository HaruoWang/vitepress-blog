---
description: 按照官方給的dotlottie-react，程式碼可以寫到很簡潔，但做不到onScroll的效果。查找之後發現目前還可以用Lottie for React達成，寫法大致如下
head:
  - - link
    - rel: canonical
      href: https://haruowang.vercel.app/dev/react/msft.html
  - - meta
    - property: og:url
      content: https://haruowang.vercel.app/dev/react/msft.html
  - - meta
    - property: og:title
      content: 微軟收購史：開發紀錄
  - - meta
    - name: og:description
      content: 按照官方給的dotlottie-react，程式碼可以寫到很簡潔，但做不到onScroll的效果。查找之後發現目前還可以用Lottie for React達成，寫法大致如下
  - - meta
    - name: og:image
      content: /react/ms1.webp
  - - meta
    - property: twitter:title
      content: 微軟收購史：開發紀錄
  - - meta
    - name: twitter:description
      content: 按照官方給的dotlottie-react，程式碼可以寫到很簡潔，但做不到onScroll的效果。查找之後發現目前還可以用Lottie for React達成，寫法大致如下
  - - meta
    - name: twitter:image
      content: https://haruowang.vercel.app/react/ms1.webp
---

# 【微軟收購史：開發紀錄】

<p><Badge type="info" text="🌳 Evergreen" /></P>

![Microsoft's Top-10 Acquisitions](/react/ms1.webp)

## shadecn

趁這次做side project，來試用心儀已久的shadcn/ui。

首先照著指示輸入pnpm dlx shadcn@latest init -d，但這個官方指令會跳出"Something went wrong creating a new Next.js project. Please try again.”

也就是說，必須要先建立next專案。輸入pnpm create next-app@latest my-app --typescript --tailwind –eslint，再按照官方設定來。一個大重點是記得cd進my-app，再執行pnpm dlx shadcn@latest init -d。

完成後便可以pnpm run dev。這時主控台出現Warning: Extra attributes from the server，在layout.tsx裡的html標籤加入suppressHydrationWarning解決問題。

可以用pnpm dlx shadcn@latest add button先新增一個按鈕試試看。接下來要注意的就剩下：「每次新增組件時都要先add！」

在「微軟十大收購」這個網站中，我本來就打算放入數位專題常用的圖表。add chart完之後，在調整XAxis（圖表的X軸）時會跳出警告：”XAxis: Support for defaultProps will be removed from function components in a future major release”，這時要裝一下recharts的alpha版。而recharts其實就是shadcn背後所用到的圖表庫。

這次還有玩到card、carousel和progress組件等，運用得宜真的會很吸睛。

## Lottie

除了長條圖之外，近年一直在UI領域被提及的Lottie也是我打算應用的。但想要不依賴AE來做MG還是有些坑要踩。像是官方提供的Lottie Creator實在太占瀏覽器資源，跑起來很卡。不過這也讓我發現到了Jitter的好，甚至可以直接匯出Lottie檔。

按照官方給的dotlottie-react，程式碼可以寫到很簡潔，但做不到onScroll的效果。查找之後發現目前還可以用[Lottie for React](https://lottiereact.com)達成，寫法大致如下：

```ts
import { useLottie, useLottieInteractivity } from "lottie-react";
import msftLogo from "./msftLogo.json";

const options = {
  animationData: msftLogo,
};

const style = {
  maxWidth: 640
};

const lottieObj = useLottie(options, style);
  const Animation = useLottieInteractivity({
    lottieObj,
    mode: "scroll",
    actions: [
      {
        visibility: [0, 1],
        type: "seek",
        frames: [0, 120],
      }
    ]
  });

{Animation}
```

現在的Lottie東一個限制西一個限制，尤其是免費版只能上傳十次檔案（不是十個）真的很惱人，所以要借重一些過往的小工具作為輔助。個人很推薦[dotLottie轉換器](https://lottiefiles.com/tools/lottie-to-dotlottie)和[JSON編輯器](https://lottiefiles.github.io/lottie-docs/playground/json_editor)。

## 設定

幫網站調標題時發現這個專案的metadata不在next/head裡，要去layout.tsx裡找到export const metadata: Metadata進行修改。

另外就是部署當下遇到eslint和vercel相互衝突的解法。這部分我稍微取巧了點，直接在.eslintrc.json關閉規則：

```json
{
  "extends": "next",
  "rules": {
    "react/no-unescaped-entities": "off",
    "@next/next/no-page-custom-font": "off"
  }
}
```

## 文本

最後列出網站中的文字內容，也算是我選擇這個主題的原因之一：趁機了解並整理一間科技大廠近年的故事。

> 「自從2000年開始，微軟的併購規模越來越大。其中2022年的動視暴雪一案，付出比LinkedIn昂貴不只兩倍的代價。還是靠著總裁Brad Smith和政府的良好關係，以及讓渡歐盟外「雲端媒體權益」給予育碧的善意，才躲過聯邦貿易委員會（FTC）和英國競爭與市場管理局（CMA）的反壟斷審查。」

> 「回顧往昔的大買賣，不乏能找出敗筆。其中像廣告商aQuantive的62億美元商譽減值，就幾乎把這檔投資賠光了。而Nokia從手機霸主摔落，被HMD和「鴻海小金雞」富智康納入旗下的故事，亦是老生常談。吃下「工程師交友平台」GitHub的決定，更讓開源社群褒貶不一。」

> 「不過，微軟畢竟能在科技圈站穩一席之地，自仍有其高明之處。特別是近年來和OpenAI之間的恩怨情仇，令這間老牌大廠在街談巷議中重現活力。提前部署AI醫療，進補Nuance Communications的效應也正逐漸發酵。了解歷史，梳理資訊。從圖表製作到AI，微軟至2024為止的十大併購，讓我們一探究竟。」

> 「誠如所見，超過10億美元規模的案例目前只有三件。而就是仰仗動視暴雪、LinkedIn和Nuance Communications，讓微軟在目前最大的那些科技收購案中，分別佔據第一、第七和第九名。」

## [專案連結](https://msft-acquisition.vercel.app)