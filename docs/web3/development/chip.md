---
description: 本想說管線（L-system）和基板（Shader）這兩個frame也許可以相疊。測試失敗的下一步是，把L-system的動畫直接做成gif
head:
  - - link
    - rel: canonical
      href: https://haruowang.vercel.app/web3/development/chip.html
  - - meta
    - property: og:url
      content: https://haruowang.vercel.app/web3/development/chip.html
  - - meta
    - property: og:title
      content: 第一次開發NFT就上手
  - - meta
    - name: og:description
      content: 本想說管線（L-system）和基板（Shader）這兩個frame也許可以相疊。測試失敗的下一步是，把L-system的動畫直接做成gif
  - - meta
    - name: og:image
      content: /og-image.webp
  - - meta
    - property: twitter:title
      content: 第一次開發NFT就上手
  - - meta
    - name: twitter:description
      content: 本想說管線（L-system）和基板（Shader）這兩個frame也許可以相疊。測試失敗的下一步是，把L-system的動畫直接做成gif
  - - meta
    - name: twitter:image
      content: https://haruowang.vercel.app/og-image.webp
---

# 第一次開發NFT就上手

<p><Badge type="info" text="🌳 Evergreen" /></P>

我對Shader算是一直略有耳聞，不過要等到2024年的《台灣島。鏈》和《若水》開始徵件，才開始短時間密集接觸。

p5倒是一直有在關心。雖然不是在NFT紅的那幾年，甚至像阿亂老師那樣更早開始碰，但也算從舊版介面一路跟到黃新和Zaron上首頁。畢竟p5真的能輕易開啟和使用者互動的可能性。

在這兩項技術的基礎上，我開始了這次動態藝術的創作。那段日子正好和畢製相撞，整個人深陷水深火熱中，但我還是決定試一把。

主題呢，決定挑和印刷電路板（PCB）相關的。

## L系統

PCB板上的管線我想透過L-system來生成。

L系統其實是一套語法規則。基本指令有F、f、+、-（前進且畫線、前進不畫線、原地左轉、原地右轉）這些。

當你要藉此畫圖時，需要定義規則（Rule）和公理（Axiom）。後者代表完成一輪後，「規則所要依循的規則」。此外，還可以選擇旋轉的角度。

舉例來說，如果我們想要讓「規則」所畫出的圖形像銜尾蛇一樣繞回原點，通常會將「公理」設定成「F+F+F+F」，角度90。

一些精彩的範例可以參考這份[L-System manual](https://paulbourke.net/fractals/lsys/)。

實際上用p5.js寫的話，還要配合line和translate這些function。

我自己分別寫了genA和genB，將規則搭配公理後的完整版指令描述清楚。也就是說「公理」中的F要代入「規則」（let F = 規則）。

```js
for (let i = 0; i < axiom.length; i++) {
    genA = rule.map( function(a) {
    
    if(a == "F") return rule;
    if(a == "+") return "+"; 
    
    })
    genB = axiom.map( function(a) {
    
    if(a == "F") return genA;
    if(a == "+") return "+"; 
    
    })
};
fin = genB.join('')
```

這邊要記得把genB陣列用join字串化以利後續操作。

然後從連接完的fin字串裡去抓對應到的指令，並執行動作。

```js
for (let i = 0; i < fin.length; i++) {
    let current = fin[i];

    if (current == "F") {
        p.line(0, 0, 0, -len);
        p.translate(0, -len);
        await sleep(1);
    } else if (current == "+") {
        p.rotate(angle);
    } else if (current == "-") {
        p.rotate(-angle)
    } else if (current == "[") {
        p.push();
    } else if (current == "]") {
        p.pop();
    }
}
```

## Shader

PCB板的綠色基板我想透過Shader來生成。

著色器能做到的特效太多了。光是在Shadertoy上就可以看到太多璀璨的範例。

其主要可分為頂點著色器（.vert）和片段著色器（.frag）兩種。其中依我目前學到的部分，.vert其實不太需要去動。

正常來說在p5編輯器可以用`loadShader('shader.vert', 'shader.frag');`這樣的語法讀取Shader，但透過p5.js架到akaSwap時，必須特別寫在js裡。

```js
const vert = `
attribute vec3 aPosition;

attribute vec2 aTexCoord;

varying vec2 vTexCoord;

void main() {

  vTexCoord = aTexCoord;

  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  gl_Position = positionVec4;
}
`
```

有時我們會看到GLSL這個稱呼。其實GLSL是由OpenGL開發、類似C語言的著色語言。

這次的創作中，我則是援引了[GLSL Noise Algorithms](https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83)頁面裡，由Ian McEwan, Stefan Gustavson打造的Simplex 3D Noise。真的是前人種樹，後人乘涼。

另外還有做出讓波紋可以跟隨滑鼠做變化的功能。

本想說管線（L-system）和基板（Shader）這兩個frame也許可以相疊。測試失敗的下一步是，把L-system的動畫直接做成gif。

取名階段時，想到了cheap as chips這段俚語，便打定要在作品中放進和薯片相關的事物。

於是又結合了國影中心開放給群眾使用的[台影新聞片](https://tfai.openmuseum.tw/newsreel)資料。在最後關頭加入「台南縣甘薯技術綜合示範」之影像，並上傳akaSwap後，終於完成此NFT。

如果是從p5線上編輯器載下來，記得要在html裡引入該引入的js喔。

也可以參考一下hicetnunc提供的[template](https://github.com/hicetnunc2000/hicetnunc/tree/main/templates)做設定。

很可惜這次沒有獲得c2x3和akaSwap評審團的青睞。祝自己從哪裡跌倒就從哪裡爬起來。

![cheap as chips](/development/ch1.gif)

## [專案連結](https://github.com/HaruoWang/cheap-as-chips)