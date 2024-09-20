---
description: 輸入npx thirdweb create app --vite（KryptoCamp影片裡的舊版是npx thirdweb create app --evm），新建前端頁面
head:
  - - link
    - rel: canonical
      href: https://haruowang.vercel.app/web3/development/thirdweb
  - - meta
    - property: og:url
      content: https://haruowang.vercel.app/web3/development/thirdweb
  - - meta
    - property: og:title
      content: 用thirdweb快速開發dapp，但是踩坑
  - - meta
    - name: og:description
      content: 輸入npx thirdweb create app --vite（KryptoCamp影片裡的舊版是npx thirdweb create app --evm），新建前端頁面
  - - meta
    - name: og:image
      content: /development/th5.webp
  - - meta
    - property: twitter:title
      content: 用thirdweb快速開發dapp，但是踩坑
  - - meta
    - name: twitter:description
      content: 輸入npx thirdweb create app --vite（KryptoCamp影片裡的舊版是npx thirdweb create app --evm），新建前端頁面
  - - meta
    - name: twitter:image
      content: /development/th5.webp
---

# 用thirdweb快速開發dapp，但是踩坑

<p><Badge type="info" text="🌿 Budding" /></P>

感謝KryptoCamp詳盡的[影片教學](https://youtu.be/0fMmRTtW0ik)，但看似簡單的過程還是有很多坑可以踩。

## [基本設定](https://portal.thirdweb.com/cli)

首先以管理員身分輸入`npm i -g thirdweb`。

接著`npx thirdweb create contract`。

完成之後記得要cd進新創出來的資料夾裡。

![thirdweb cli](/development/th1.webp)

### Yarn踩坑

這段其實應該要很順，但後來發現得使用自家vs code讀不到的yarn指令，不得不先來處理報錯。

添加環境變數時，發現我的NPM路徑也跟範例長得不太一樣，又走了點彎路。

總之在環境變數>系統變數>PATH裡加上NPM路徑就行了。

## 部署合約

這邊先借用KryptoCamp提供的[合約範例](https://hackmd.io/@KryptoCamp/lottery-dapp)。

但在終端機輸入yarn dev時，即便yarn指令已可執行，卻無法成功部署。

參考[Issue linking device on the authorization page via thirdweb cli – Support | thirdweb](https://support.thirdweb.com/troubleshooting-errors/7Y1BqKNvtLdBv5fZkRZZB3/issue-linking-device-on-the-authorization-page-via-thirdweb-cli/cn9LRA3ax7XCP6uxwRYdvx)，發現是要加上api key才能成功。

重新輸入`npx thirdweb deploy -k 你的key`，這下過關。

![thirdweb contract](/development/th2.webp)

話說合約上鏈時，手續費所需的測試幣我目前是用[Sepolia PoW Faucet](https://sepolia-faucet.pk910.de/)領取，好用。

![Sepolia PoW Faucet](/development/th3.webp)

## [Dapp設定](https://github.com/thirdweb-example/vite-starter)

輸入`npx thirdweb create app --vite`（KryptoCamp影片裡的舊版是`npx thirdweb create app --evm`），新建前端頁面。

和教學一樣挑了vite，然後不能挑要用JS還是TS了。

因為我的node版本（v18.12.1）太舊，途中還升了個版到目前LTS的v20.17.0。

記得也要cd進你的dapp資料夾。輸入`yarn dev`。

這時會發現port 5713的畫面一片空白……

免驚，看一下console。從錯誤訊息`Uncaught Error: clientId or secretKey must be provided`不難得知，又跟親愛的api key有關了。

去src裡的client.ts看看，原來是要在根目錄新增.env檔放client id的部分啊。

不確定是否因為我在基本設定時沒用`yarn global add thirdweb`，把網站上傳到vercel時npm和yarn會發生衝突，於是在.gitignore中加入yarn.lock，問題解決。

## 約定式提交

這次開發想說順便來導入一下Conventional Commits。

感謝PJCHENder詳盡的[介紹](https://pjchender.dev/npm/note-git-conventional-commit/)，甚至還包含影片教學。

咱們先來裝個Commitizen：

第一步，繼續以管理員身分輸入`npx commitizen init cz-conventional-changelog --save-dev --save-exact`。

隨後輸入拿來取代`git commit`的`npx cz`。

### Commitizen踩坑

結果我的npx cz會跳出記事本……

輸入`git config --global core.editor "code --wait"`，還是沒辦法把編輯器設成vs code。

解方又是修改環境變數。

這次是在環境變數>使用者變數裡，加上vs code路徑。

對，我的路徑又跟範例長得不太一樣了。不過這次是因為我的vs code裝在D槽，哈。

![Commitizen](/development/th4.webp)

### Standard-version踩坑

正常狀態下，輸入`npx standard-version --first-release`時，package.version裡應該會出現版號。不過我在嘗試時也遇過沒變化的狀況，還自己先手動寫了"version": "0.1.0"呢。

standard-version就是根據這個version的資訊做更新，並且會新增一個記載版本變更歷史的CHANGELOG.md。

使用者還可以輸入`npx standard-version --dry-run`預覽會發生的變化。跟在Foundry裡沒寫`--broadcast`有異曲同工之妙。

## 約定式提交流程
### 初始化
```sh
git init 
git add .
npx cz
git branch -M main
git remote add origin 你的git
npx standard-version
git push --follow-tags origin main
```
### 正常推送
```sh
npx cz
npx standard-version
git push --follow-tags origin main
```

## Dapp開發

可以看到，影片範例中的`ConnectWallet`變成`ConnectButton`了。

後來有試著換回去，但會出bug。便繼續保留`import { ConnectButton } from "thirdweb/react"`。

這時候仔細看會發現，我們要用的Hook`useContract`，其實放在跟`ConnectButton`不同的地方：`@thirdweb-dev/react`。

不過真正讓人崩潰的，是看似人畜無害的`Web3Button`。

我不斷遇到的瓶頸，是`Uncaught Error: Invariant failed: useSDK must be called from within a ThirdwebProvider, did you forget to wrap your app in a <ThirdwebProvider />?`。但我明明有在main.tsx用`<ThirdwebProvider />`把`App`包起來啊。

所以直接把合約地址寫進`Web3Button`的props裡，但仍然跳出`useAddress() hook must be used within a <ThirdwebProvider/>？`。

結果發現好像是因為`ConnectButton`不相容於`@thirdweb-dev/react`體系，切去用`ConnectWallet`。

搭配換成從`@thirdweb-dev/react`引入的`<ThirdwebProvider/>`，一度以為終於要成功了。

沒想到此時的警告變成`Uncaught Error: No QueryClient set, use QueryClientProvider to set one`。

只好裝裝看`@tanstack/react-query`測試，但問題果然也不在於此。

仔細回想，在套件安裝時曾跳出vulnerabilities，於是由此著手。

然而`npm audit fix –force`的結果也只是降個版，問題還更多；`npm audit`也同樣無效。

只好先將自己的不解放置一旁，留待他日有力再戰。

![thirdweb vite-starter](/development/th5.webp)

## 後記

> 「我隨即恍然大悟，成就功業者有何稟賦，文學才俊尤其如此，莎翁更見粲然大備……我所指，乃無所為之能（Negative Capability），亦即身處惶恐、奧秘、疑慮，卻不著惱煩躁、急於追尋實情與事理。」——濟慈

這天一再想起的話，或許正昭示著我，莫要因急於一時功成，而亂了自身的節奏吧。

