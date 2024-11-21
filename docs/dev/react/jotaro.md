---
description: 即便一查發現OpenAI的微調限免時間延長到10/31，還是必須花5美金（時價161元台幣），將帳號升級到階層一才能使用……並且要稍微等個一兩天才會開通權限
head:
  - - link
    - rel: canonical
      href: https://haruowang.vercel.app/dev/react/jotaro.html
  - - meta
    - property: og:url
      content: https://haruowang.vercel.app/dev/react/jotaro.html
  - - meta
    - property: og:title
      content: 第一次微調GPT就上手
  - - meta
    - name: og:description
      content: 即便一查發現OpenAI的微調限免時間延長到10/31，還是必須花5美金（時價161元台幣），將帳號升級到階層一才能使用……並且要稍微等個一兩天才會開通權限
  - - meta
    - name: og:image
      content: /react/jo1.webp
  - - meta
    - property: twitter:title
      content: 第一次微調GPT就上手
  - - meta
    - name: twitter:description
      content: 即便一查發現OpenAI的微調限免時間延長到10/31，還是必須花5美金（時價161元台幣），將帳號升級到階層一才能使用……並且要稍微等個一兩天才會開通權限
  - - meta
    - name: twitter:image
      content: https://haruowang.vercel.app/react/jo1.webp
---

# 第一次微調GPT就上手

<p><Badge type="info" text="🌳 Evergreen" /></P>

![JotaroGPT](/react/jo1.webp)

## 微調訓練

對前端有些理解的話就會覺得這個挑戰不算困難。

首先Git clone完[repo](https://github.com/vercel-labs/shooketh)之後pnpm i，再pnpm run dev。

此時會遇到500 error，記得申請OpenAI的金鑰，並把.env.example改成.env。

準備好訓練資料data.jsonl後，修改fine-tune.ts，輸入pnpm run tune重新微調自己的模型。結果CMD提示我Fine-tuning jobs cannot be created on an Explore plan.

即便一查發現OpenAI的微調限免時間延長到10/31，還是必須花5美金（時價161元台幣），將帳號升級到階層一才能使用……並且要稍微等個一兩天才會開通權限。

既然都要試玩4o，想說那就讓GPT來幫我生成訓練內容。

## 提問內容

以下列出我的簡單提問，ChatGPT每次大約會回答二十條：

> 我想要微調（fine tune）出能夠以《JOJO的奇妙冒險：星塵鬥士》中主角「空條承太郎」身分和口吻回答提問的gpt。可以幫我透過類似以下範例的jsonl格式，想出至少一百條message的jsonl嗎？（user是提問的使用者，assistant是此gpt的回覆。所以兩者的content之間要有問答關係）

> 範例：{"messages": [{"role": "system", "content": "Jotaro GPT"}, {"role": "user", "content": "太慢了太慢了，『世界』才是最強的替身，即使不停止時間，光是速度和力量，也遠超你的『白金之星』。"}, {"role": "assistant", "content": "看來和我的白金之星是同類型的替身呢，雖然活動距離不長，但動作卻精準而有力。"}]}

> 目前還不到一百條，請幫我繼續生成，並在content中適時加入更多和《JOJO的奇妙冒險：星塵鬥士》有關的角色、替身、技能或名台詞，如「波魯納雷夫」、「阿布德爾」、「伊奇」、「流星指刺」、「隱者之紫」、「難不成是……歐拉歐拉嗎？」、「呀咧呀咧」。

> 加入其他作品關鍵字後繼續生成：如「史比特瓦根財團」、「死神13」、「恩雅婆婆」、「歐因哥與波因哥」、「小野大輔」、「子安武人」、「大衛社」、「荒木飛呂彥」。

> 加入其他作品關鍵字後繼續生成：如「黃金精神」、「空條徐倫」、「廣瀨康一」、「埃及九榮神」、「半徑20米的綠寶石水花」、「廁所是波魯納雷夫的舞台」、「人類的讚歌是勇氣的讚歌」、「榮耀永遠屬於星塵遠征軍」。

> 加入「替身使者會被替身使者吸引」、「皇帝」與「吊人」、「歐拉3頁」等關鍵字後繼續生成。

GPT算是回應得相當不錯。只要糾正一些明顯的錯誤，像是把二喬寫成「老爹」這種就好。

把安娜蘇的替身名改回「怒海潛將」，重新run tune，給OpenAI一點時間。完事後將route.ts裡的model改成訓練好的模型，system改成你設定的。途中一樣有可以用suppressHydrationWarning解決的bug，並要將stroke-width這種寫法改成駝峰。剩下就是慢慢調UI的時間了——

## 參考文獻

[Fine-tuning GPT with OpenAI, Next.js and Vercel AI SDK](https://vercel.com/guides/fine-tuning-openai-nextjs)

## [專案連結](https://jotarogpt.vercel.app)