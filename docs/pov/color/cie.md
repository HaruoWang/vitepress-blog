---
description: Yxy空間和XYZ空間不同之處在於，它「能夠」詮釋色彩三要素。將代表明度的函數Y拿掉之後，原本是三維空間的Yxy空間，便成了大家熟知的「馬蹄圖」
head:
  - - link
    - rel: canonical
      href: https://haruowang.vercel.app/pov/color/cie.html
  - - meta
    - property: og:url
      content: https://haruowang.vercel.app/pov/color/cie.html
  - - meta
    - property: og:title
      content: 淺介CIE 1931與1976
  - - meta
    - name: og:description
      content: Yxy空間和XYZ空間不同之處在於，它「能夠」詮釋色彩三要素。將代表明度的函數Y拿掉之後，原本是三維空間的Yxy空間，便成了大家熟知的「馬蹄圖」
  - - meta
    - name: og:image
      content: /color/ci3.webp
  - - meta
    - property: twitter:title
      content: 淺介CIE 1931與1976
  - - meta
    - name: twitter:description
      content: Yxy空間和XYZ空間不同之處在於，它「能夠」詮釋色彩三要素。將代表明度的函數Y拿掉之後，原本是三維空間的Yxy空間，便成了大家熟知的「馬蹄圖」
  - - meta
    - name: twitter:image
      content: /color/ci3.webp
---

# 淺介CIE 1931與1976

<p><Badge type="info" text="🌳 Evergreen" /></P>

## CIE之前：LMS空間
人眼有三種視錐細胞，分別稱為「L、M、S」，能夠感知不同波長的光。而使用它們接收到的「三刺激值」（Tristimulus Value），來描述任一顏色的色彩空間，則被稱作「LMS空間」——換句話說，可以將人眼接收到的LMS數據視作空間座標的三軸來看待，會比較容易理解。

## CIE XYZ
不過相較於LMS，常被拿來當作標準的色彩空間其實是「CIE 1931 XYZ」。它的三刺激值並不單純只是人眼對不同波長的反應，而是一組再經過數學轉換的函數「X、Y、Z」。由於具備這種不受限於設備差異的特性，XYZ空間也成為其他色彩空間的發展基石。有趣的是，XYZ空間中還存在著一些肉眼無法觀察的「禁色」（Impossible Color），令人不禁聯想起「宇宙恐怖」大師洛夫克拉夫特對於「星之彩」的設定。

## xyz≠XYZ
在此釐清特別容易混淆的一點：XYZ空間所採用的座標「x、y、z」「不等於」前述的三刺激值函數「X、Y、Z」。

## CIE Yxy與CIE xy色度圖
由於使用者無法只靠座標「x、y、z」就回推函數「X、Y、Z」，再加上函數XYZ無法詮釋色彩三要素——又一次經過數學轉換的色彩空間「CIE 1931 Yxy」應運而生。Yxy空間和XYZ空間不同之處在於，它「能夠」詮釋色彩三要素。將代表明度的函數Y拿掉之後，原本是三維空間的Yxy空間，便成了大家熟知的「馬蹄圖」——平面的「CIE xy色度圖」。

![CIE xy Chromaticity Diagram](/color/ci1.webp)

## CIE 1931的缺點報你知
- CIE 1931無法讓人識別「同色異譜」（Metamerism）的顏色。只要兩色座標相同，就算組成光譜不同也無從辨認。
- CIE 1931並非等量均質（例如：馬蹄圖上，兩色的直線距離不等於實際色差），因此無法對色彩進行數學計算。

## CIE LAB與Delta E
為了修正CIE 1931的缺陷，國際照明委員會在1976年制定了新的色彩空間——「CIE 1976 LAB」。需要注意的是，這裡的`「a*軸」`是紅色-綠色，`「b*軸」`是黃色-藍色。當時在CIE LAB之中，兩色的直線距離公式被稱為`「ΔE*76」`。時間來到2000年，經過修訂的`「ΔE*76」`成了`「ΔE*00」`——而套用此公式所得出的數值，正是各大顯示器廠商最喜歡強調的「Delta E」。只要Delta E小於等於2，肉眼便難以分辨螢幕顯色和真實顏色之差異。

![CIE LAB](/color/ci2.webp)

## CIE LCH
由於使用CIE LAB進行溝通有些不易（大家還是習慣色彩三要素），國際照明委員會發展出了更直觀的「CIE 1976 LCH」空間。CIE LCH又被稱作「圓柱形的LAB」（Cylindrical CIE LAB）。

![在D65照明下，CIE LCH的可見色域範圍](/color/ci3.webp)