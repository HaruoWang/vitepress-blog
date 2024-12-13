---
description: 關於OpenType等數位字型技術的知識整理
head:
  - - link
    - rel: canonical
      href: https://haruowang.vercel.app/pov/font/digi.html
  - - meta
    - property: og:url
      content: https://haruowang.vercel.app/pov/font/digi.html
  - - meta
    - property: og:title
      content: 數位字型學習筆記
  - - meta
    - name: og:description
      content: 關於OpenType等數位字型技術的知識整理
  - - meta
    - name: og:image
      content: /og-image.webp
  - - meta
    - property: twitter:title
      content: 數位字型學習筆記
  - - meta
    - name: twitter:description
      content: 關於OpenType等數位字型技術的知識整理
  - - meta
    - name: twitter:image
      content: https://haruowang.vercel.app/og-image.webp
---

# 數位字型學習筆記

<p><Badge type="info" text="🌱 Seedlings" /></P>

## 知識

- Ikarus字型軟體：使用樣條函數
- Metafont語言：使用三次樣條插值
- Hinting渲染提示：PostScript的突破
- Adobe的T1字型有支援Hinting
- TrueType GX和AAT：後來影響OpenType的Apple規格
- PUA私人使用區：BMP後半部 + Plane 15&16
- utf8mb3：MySQL規格。無法使用emoji，因此有第四代
- CJK A的位置在BMP之前，因為韓文有搬遷過
- Carolingian minuscule：小寫體之祖
- Zalgo：套用很多ccmp
- AFKDO和VOLT都是標記語言
- COLR/CPAL是目前emoji主流技術
- Noto Color Emoji在Safari無法正常顯示，因為用到COLR/CPAL v1
- Plakato：使用COLRv1的經典範例
- 臺灣道路體：使用COLR+SVG
- Fitzpatrick Modifier：將六種膚色對應至五種選擇
- ZWJ：零寬連字，用來接合

## 特性

- dlig：可選連字
- hlig：歷史連字
- c2sc：大寫轉小字大寫
- swsh：花飾字
- salt：風格替代字
- calt：上下文替代
- vrt2：豎排，比vert精準
- ccmp：字符組合

## 參考文獻

- [一起成為新世紀文字藝術師：深入玩轉 Unicode 和 OpenType](https://ithelp.ithome.com.tw/users/20162880/ironman/6994)

作者是justfont字型工程師何青儒，在網路上還有Rutopio和嗜字綠等筆名。

是位用一篇篇優質文將大家領進數位字型之門的引路人。