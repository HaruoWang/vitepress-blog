---
description: 2024年3月「網路自由小聚」的重點筆記
head:
  - - link
    - rel: canonical
      href: https://haruowang.vercel.app/pov/participation/did
  - - meta
    - property: og:url
      content: https://haruowang.vercel.app/pov/participation/did
  - - meta
    - property: og:title
      content: 小聚小記：數位皮夾
  - - meta
    - name: og:description
      content: 2024年3月「網路自由小聚」的重點筆記
  - - meta
    - name: og:image
      content: /og-image.webp
  - - meta
    - property: twitter:title
      content: 小聚小記：數位皮夾
  - - meta
    - name: twitter:description
      content: 2024年3月「網路自由小聚」的重點筆記
  - - meta
    - name: twitter:image
      content: /og-image.webp
---

# 【小聚小記：數位皮夾】

<p><Badge type="info" text="🌳 Evergreen" /></P>

數位公共建設是近年數發部在推動的計畫，本次討論的數位皮夾正是一環。這是我第一次來網路自由小聚（有默默關注共筆），也是第一次來三創對面、原價屋樓上、常被網路社群提起的摩茲工寮。很有趣的是小聚採取Chatham House rule，保障暢所欲言的可能性，因此以下用「與會者」通稱所有發言者：

關於處理「數位時代的身分問題」，國際上已有許多案例。不過像國土安全部的數位駕照有回報（phone home）機制，在隱私安全上有疑慮。而My Number Card和延安鏈的RealDID，也各自掀起了討論。相較起來，歐盟剛通過的eiDAS2.0標準更符合數位皮夾的精神：選擇性揭露身分。

數位皮夾的主要組成是分散式身分識別符（DID）+可驗證憑證（VC），並透過讓使用者「選擇性揭露」（SD）來落實身分自主權（SSI）。而實際上VC還要包裝成更結構化的可驗證陳述（VP）才好應用。聽說前後端工程師耳熟能詳的JWT即為目前推行的VP格式。

到了討論時間，更是靈光四射。有人提出不同發證者見解衝突的問題，有人擔心皮夾開源會被有心人士走後門，一位笑稱自己是John Titor的與會者（會是Steins;Gate粉絲嗎？）則回應「能防範權力集中」，縮小尋租是更要緊的，而且這樣的混亂有時反而能彼此制衡和加速發展。可供參考的是，喜歡自訂規格的蘋果不忘初心，後來也在搞自己的IDs in Wallet。

來現場的另一個深刻印象，是很開心能聽到諸多政府採購的八卦。或許「設計競賽」確實是理想化的招標做法吧。說到理想，有位與會者便是從公益角度出發，我也認同「數位皮夾或能協助身障者簡化繁文縟節」的這層意義。

數位皮夾的英文全名是Digital Identity Wallet，而Identity的其中一個意思正是「認同」。小聚來時路上，我正好從一篇社運工作者的回顧文中讀到：協作的前提是接受「認同問題即差異問題」，否則無架構的組織就會陷入「狀態討論」，於比較「誰付出更多」的非正式關係中內耗。再次證明，和金錢不見得有關聯的「認同問題」，並沒有更容易處理。但這也不是新技術物誕生才有的煩惱，而是人性所致。在嚴謹、隱私性和彈性、便利性之間的取捨，果然很重要呢。