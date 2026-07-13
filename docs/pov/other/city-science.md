---
description: 
head:
  - - link
    - rel: canonical
      href: https://haruowang.vercel.app/pov/other/city-science.html
  - - meta
    - property: og:url
      content: https://haruowang.vercel.app/pov/other/city-science.html
  - - meta
    - property: og:title
      content: 關於城市科學的一切
  - - meta
    - name: og:description
      content: 從都市數據到氣候議題的城市科學大小事
  - - meta
    - name: og:image
      content: /og-image.webp
  - - meta
    - property: twitter:title
      content: 關於城市科學的一切
  - - meta
    - name: twitter:description
      content: 從都市數據到氣候議題的城市科學大小事
  - - meta
    - name: twitter:image
      content: https://haruowang.vercel.app/og-image.webp
---

# 關於城市科學的一切

<p><Badge type="info" text="🌱 Seedlings" /></P>

## 城市設計史
- 1960年，Harvard成立Urban Design學科，MIT的Kevin Lynch出版《The Image of the City》
### 新城市科學
-  Metcalfe's Law：網路總價值和使用者數量之平方呈現正相關
-  Bettencourt-West Law：城市規模和居民收入呈現超越線性的關係
-  Zipf's Law：城市規模和居民數量呈現倒冪次關係
-  Thünen's Law：產業類型和距離中心區域遠近的地租有關，即為邱念圈
-  Tobler's First Law of Geography：兩地越近越相關
-  Bussiere's Law：城市發展和中心區域之人口密度呈現負相關
-  Brand’s Law：城市規模和永續程度呈現正相關

## 案例整理
- CityAI的三大特色是Tool Preamble / Human-in-the-loop / Data Lineage
- 北捷、NVIDIA和Linker Vision攜手展開「文湖線人流模擬暨數位孿生」計畫，預計27年完成
- MIT教授Kent Larson曾使用CityScope協助安道爾成為智慧國家
- MIT SCL的[Octopus](https://mit-senseable-city-lab.github.io/octopus-documentation/)可以測量里約乃至世界各地的空汙
### 資料視覺化
- Ed Hawkins：[Climate stripes](https://showyourstripes.info/) & [Climate spirals](https://www.climate-lab-book.ac.uk/2016/spiralling-global-temperatures/)
- Eric Fischer：[See something or say something](https://www.flickr.com/photos/walkingsf/albums/72157627140310742/)

## 地理知識
### 分析技巧
- Huff Model：用來預測消費者造訪某地的機率
- Geohash：根據Z-order curve分類座標。表示所在區域而非特定點，適合保護隱私
- 六角網格：如Uber H3。優點是所有網格中心的距離相等，缺點是不適合加密或簡化
- 面量圖在兩地面積落差懸殊時，應選擇密度進行比較
### 遙測
- SAR：合成孔徑雷達，即衛星影像。發射微波而不受雲層干擾，即使天線短也能透過不斷移動合成出高解析度
- 解析度：X-band > C-band > L-band。X-band解析度高，適合監測都市
- 波長：X-band < C-band < L-band。L-band波長較長穿透力強，適合監測植被多的區域
- ALOS-2衛星使用L-band，再訪週期較長；Sentinel衛星使用C-band，再訪週期較短
- 繼任衛星是ALOS-4和Sentinel-1C
- NISAR是第一顆雙頻SAR衛星。除了搭載L-band、還具有可分析土壤的S-band
- PolSAR：極化合成孔徑雷達。記錄不同偏極訊號，不像SAR只是單偏極化
- InSAR：干涉合成孔徑雷達。可以計算SAR影像間的相位差異，產出干涉圖（彩虹干涉環）
- 因為變形量是依據視衛星方向（LOS），所以要透過比GPS準的GNSS資料修正
- D-InSAR適合廣域，PS-InSAR適合都會區。後者關注PS點（永久散射體，通常是人造物）
- MT-InSAR：多時序雷達干涉技術。能建立地表位移的時間序列

## 能源發展
### 電動車
- 電動車充電標準有CCS1和CCS2
### 氫能
- 氫能是國發會制定12項關鍵戰略之一
- 臺灣的前兩座示範加氫站在2025年底啟用
- 兩座分別是中油高雄楠梓站和聯華林德臺南樹谷站
- 臺灣曾參與和舉辦「H2GP氫能大獎賽」
### 減碳技術
- 去碳燃氫：讓甲烷變成氫氣和碳黑
- 相較碳捕捉，去碳燃氫更環保，但高熱

## 永續政策
- 四種碳定價機制：碳費、自主減量計畫、碳排放交易制度、碳邊境調整機制
- ETS是歐盟的碳排放交易制度，CBAM是歐盟的碳邊境調整機制
- 2030年後，每公噸碳費費率會落在1200至1800元
- 根據CBAM成本模擬，碳費越高越不會賠
- 自主減量計畫對減碳大戶有效
- 根據TCAN比較，總體來說碳稅的效果會比ETS好
- 臺灣是目前唯一設有碳費制度的，由環境部主導。其餘都繳碳稅給財政部
- 除了歐盟ETS，還有加州ETS、日本GX-ETS和韓國K-ETS等
- 德國則是推行「碳差價合約」（CCfD）補貼企業使用低碳技術
- CCUS是「碳捕捉利用與封存」，比CCU多了Storage
- 2008年，厄瓜多將「自然權利」寫進憲法
- 2016年，加拿大市鎮Terrasse-Vaudreuil承認《樹木權利世界宣言》
- 2017年，紐西蘭北島的旺阿努伊河受《河流之魂法》保障擁有人格權

## 永續活動
- IRENA（國際再生能源總署）年會
- INC（全球塑膠公約談判會議）
- CERAWeek（劍橋能源週）
- LCAW（倫敦氣候週）
- Climate Week NYC（紐約氣候週）
- CBD COP（生物多樣性公約大會）
- COP（聯合國氣候變遷大會）

## 永續組織
- GRI（全球報告倡議組織）
- SASB（永續會計準則委員會）
- NZBA（淨零銀行聯盟）

## 永續宣言
- Brundtland Report（布倫特蘭報告）
- UNGC（聯合國全球盟約）
- UNPRI（聯合國責任投資原則）
- NDC（國家自訂貢獻）
- EU Taxonomy（歐盟永續分類標準）
- SFDR（歐盟永續金融揭露規範）
- ETS（歐盟碳排放交易制度）
- CBAM（歐盟碳邊境調整機制）

## 永續賽場
### 足球
- 瑞士公平委員會曾裁定，FIFA無法提供2022年卡達世界盃做到碳中和的證據
- 挪威中場Morten Thorsby曾公開反對FIFA和沙烏地石油公司Aramco的合作關係