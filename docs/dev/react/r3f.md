---
description: 以React官方教學為主，從Components由簡入深，跟隨Haruo在iThome鐵人賽中一同成長
head:
  - - link
    - rel: canonical
      href: https://haruowang.vercel.app/dev/react/r3f.html
  - - meta
    - property: og:url
      content: https://haruowang.vercel.app/dev/react/r3f.html
  - - meta
    - property: og:title
      content: 現在學React還來得及嗎：R3F
  - - meta
    - name: og:description
      content: 以React官方教學為主，從Components由簡入深，跟隨Haruo在iThome鐵人賽中一同成長
  - - meta
    - name: og:image
      content: /og-image.webp
  - - meta
    - property: twitter:title
      content: 現在學React還來得及嗎：R3F
  - - meta
    - name: twitter:description
      content: 以React官方教學為主，從Components由簡入深，跟隨Haruo在iThome鐵人賽中一同成長
  - - meta
    - name: twitter:image
      content: https://haruowang.vercel.app/og-image.webp
---

# 【現在學React還來得及嗎：R3F】

<p><Badge type="info" text="🌳 Evergreen" /></P>

## R3F 1

終於進到實作環節啦——

之前在Codrops曾看到用React Three Fiber做出酷炫3D效果的案例，就想說一定要趁著鐵人賽嘗試。

這次參考的程式碼中出現了interface Props，而這其實是TypeScript的語法。雖說日後若真的靠前端糊口飯吃，我想會有很高的機率寫到TS，不過這邊還是先以JS為主，找時間再深造TypeHero。

打鐵趁熱，首先自然要載three和@react-three/fiber。

此時的畫面沒占滿，所以到CSS設定main的大小。

接著導入Canvas。

```js
// App.js
import { Canvas } from "@react-three/fiber";
import Ring from "./ring";
import "./styles.css";

export default function App() {
  return (
    <main>
      <Canvas>
        <Ring radius={2} height={4} segments={32} />
      </Canvas>
    </main>
  );
}
```
```js
// ring.js
export default function Ring({ radius, height, segments }) {
  return (
    <mesh>
      <cylinderGeometry args={[radius, radius, height, segments]} />
      <meshBasicMaterial />
    </mesh>
  );
}
```

很好，我們有個圓柱體了。

這時為了上字，就要來引入，和R3F同樣由Poimandres開發的超強外掛drei。

```js
// App.js
// 加上測試用的text
<Ring
  radius={2}
  height={4}
  segments={32}
  text="X X X X X X X X X X X X X X X X X X X X X X X X X X X X "
/>
```

```js
// ring.js
import { Text } from "@react-three/drei";

export default function Ring({ text = "", radius, height, segments }) { 
  const textPositions = [];
  const angleStep = (2 * Math.PI) / text.length;
  for (let i = 0; i < text.length; i++) {
    const angle = i * angleStep;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    textPositions.push({ x, z });
  }
}
```

這裡有些小細節可以注意：

像是text如果沒先預設成空字串會沒辦法讀它的length。

另一個小卡關的是要const textPositions = []，不能設成 [0, 0]。

```js
// ring.js
return (
    <group>
      <mesh>
        <cylinderGeometry args={[radius, radius, height, segments]} />
        <meshBasicMaterial />
      </mesh>
      {text.split("").map((char, index) => (
        <Text
          key={index}
          position={[textPositions[index].x, 0, textPositions[index].z]}
          rotation={[0, -angleStep * index + Math.PI / 2, 0]}
          fontSize={0.3}
          lineHeight={1}
          letterSpacing={0.02}
          color="white"
          textAlign="center"
        >
          {char}
        </Text>
      ))}
    </group>
);
```

現在圓柱體外有字了。

一起用useRef + useFrame（R3F的Hook），來讓畫面轉起來。

```js
// ring.js
const ref = useRef();
useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
    ref.current.rotation.z += 0.01;
});
```

記得也要幫group加上ref喔。

再來把`<meshBasicMaterial />`換成`<MeshTransmissionMaterial/>`，就行啦。

透射材質讓整個頁面都高級起來了呢。

![](https://i.imgur.com/Rs9Kjhv.jpg)

但學習不能只停留在複刻大神的心血，更要向外延伸。

而摸索和試錯也正是寫程式最令人煩躁、也最令人滿足的時光。

加入自己很喜歡、可以讓使用者自由轉動場景的基本功能`<OrbitControls />`後，一時間我最想做的更動即是調整字型，沒料到想來簡單的課題卻耗了段時間。

### Reference
[shalildev / Text Ring](https://codesandbox.io/p/sandbox/text-ring-mf223y)

## R3F 2

不要單純地以為，從CSS改字型可以妝點`<Text />`。

但照著官方文件教的，在`<Text />`裡寫上font={fontUrl}，卻會遇到Cannot destructure property 'ascender' of 'fontObj' as it is undefined.

我想過幾個原因。一開始以為是`<Text />`不支援woff2所致，但換成woff結果相同。插曲是我想直接外連github上的ttf時，遇到CORS問題，哈。所以也試過把字型檔傳到codesandbox上，甚至另闢蹊徑，嘗試`<Text3D />`的useLoader搭配typeface.json等怪招……最後發現是資料格式作祟。

只要一直用陣列，寫成單純map，別麻煩split就沒問題了。

中文內容這邊，借用別具魅力的西幽角色「萬軍破」的詩號。28個字繞一圈蠻剛好的。

私心希望文字是好讀的由左至右，遂將angleStep那邊從2改成-2。

```js
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Text } from "@react-three/drei";

export default function Ring({ text = "", radius, height, segments }) {
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
    ref.current.rotation.z += 0.01;
  });

  const textPositions = [];
  const angleStep = (-2 * Math.PI) / text.length;
  for (let i = 0; i < text.length; i++) {
    const angle = i * angleStep;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    textPositions.push({ x, z });
  }

  return (
    <group ref={ref}>
      <mesh>
        <cylinderGeometry args={[radius, radius, height, segments]} />
        <MeshTransmissionMaterial
          thickness={3}
          roughness={0.1}
          distortion={0.5}
        />
      </mesh>
      {text.map((char, index) => (
        <Text
          key={index}
          position={[textPositions[index].x, 0, textPositions[index].z]}
          rotation={[0, -angleStep * index + Math.PI / 2, 0]}
          font="https://fonts.cdnfonts.com/s/93375/ZenKakuGothicNew-Light.woff"
          fontSize={0.3}
          lineHeight={1}
          letterSpacing={0.02}
          color="white"
          textAlign="center"
        >
          {char}
        </Text>
      ))}
    </group>
  );
}
```

最後我決定把中心的圓柱也改為別的量體。

挑來挑去覺得符合「繞一圈條件」的`<torusGeometry />`蠻順眼，或許是因為甜甜圈外型，喚起我在《媽的多重宇宙》看到the Everything Bagel的震撼了吧。

替換的過程中基本上不會有大狀況，只要新的props有對應到就行。

為了貼合torus不同的半徑，我也把textPositions 乘上了1.5。
再送上一個小叮嚀：要讓站立的torus於虛擬空間中斜倚或平躺，可不是在`<torusGeometry />`裡附上rotate就能了事，而應當在mesh套用旋轉才是正解。

![](https://i.imgur.com/z7HmHIa.jpg)

耶，成品變得像顆繞有星環的天體了。

[![Edit R3F](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/r3f-yzcf8s)

```js
//App.js
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Ring from "./ring";
import "./styles.css";

export default function App() {
  return (
    <main>
      <Canvas>
        <OrbitControls />
        <Ring
          radius={2}
          tube={1}
          radialSegments={16}
          tubularSegments={28}
          text={[
            "招",
            "汚",
            "負",
            "蔑",
            "清",
            "名",
            "礙",
            "豈",
            "識",
            "初",
            "心",
            "未",
            "曾",
            "改",
            "明",
            "朝",
            "浴",
            "血",
            "不",
            "枉",
            "義",
            "吾",
            "之",
            "大",
            "道",
            "吾",
            "主",
            "宰",
          ]}
        />
      </Canvas>
    </main>
  );
}
```
```js
//ring.js
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Text } from "@react-three/drei";

export default function Ring({
  text = "",
  radius,
  tube,
  radialSegments,
  tubularSegments,
}) {
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
    ref.current.rotation.z += 0.01;
  });

  const textPositions = [];
  const angleStep = (-2 * Math.PI) / text.length;
  for (let i = 0; i < text.length; i++) {
    const angle = i * angleStep;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    textPositions.push({ x, z });
  }

  return (
    <group ref={ref}>
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[radius, tube, radialSegments, tubularSegments]} />
        <MeshTransmissionMaterial
          thickness={1.5}
          roughness={0.1}
          distortion={0.5}
        />
      </mesh>
      {text.map((char, index) => (
        <Text
          key={index}
          position={[
            textPositions[index].x * 1.5,
            0,
            textPositions[index].z * 1.5,
          ]}
          rotation={[0, -angleStep * index + Math.PI / 2, 0]}
          font="https://fonts.cdnfonts.com/s/93375/ZenKakuGothicNew-Light.woff"
          fontSize={0.3}
          lineHeight={1}
          letterSpacing={0.02}
          color="white"
          textAlign="center"
        >
          {char}
        </Text>
      ))}
    </group>
  );
}
```

## R3F 3

練習完文字效果後我打算測試導入模型。

事不宜遲，借一下自己快兩年前用Blender練習捏的動漫風人頭。一開始導入只有半張臉，趕快apply鏡像修改器，尷尬。

說到3D模型的檔案格式，如果逛過Sketchfab，大概會知道有fbx, obj云云。而這兩者分別適用動態和靜態模型。不過相較於它們，其實GLTF和GLB更適合網路環境。前者更是採用json格式。

熟悉的Poimandres再次佛心來著，開發者Sara Vieira直接做了個[GLTF轉換器](https://gltf.pmnd.rs/)。把模型丟上去，無痛產出可用程式碼，直接拿來改就行。光預設就給模型猶如旋轉地台的展示空間，感人。

後來看到別的案例，不只GLTF，GLB也可以拿來轉換喔。

![](https://i.imgur.com/M35u0MN.jpg)

進入實作後，我想提升模型的自轉速度。這裡不是用speed，而是用autoRotateSpeed={8}去改數值；調鏡頭焦距則是用adjustCamera，值越大就zoom越遠。

到這有點太容易了，當然要挑戰更多。來模擬相機顫抖吧。

等等，這聽起來不是Blender, AE或UE才做得到嗎？

但drei的`<CameraShake />`就是這麼優雅。

不過我還想要讓模型持續旋轉，但直接搭配不用動腦的autoRate會使整個模型轉出鏡頭外。因為整個stage在公轉。於是沿用useRef + useFrame的旋轉手法。

然而有個似乎無傷大雅，卻讓人渾身不對勁的問題是：點進網頁後的剛開始，整個畫面會抖一下。

把`<CameraShake />`也包在suspense裡解決狀況後，又用background-image覆蓋上一層代表相機畫面的svg。心中暗叫：很有感覺。

![](https://i.imgur.com/6pX4VDa.png)

再來可以做什麼呢？我想還原模型的材質。

本以為依靠glb會很順利，結果沒效還變灰階。

加上寫這段code的那晚，還遇到codesandbox出bug。一整個精神緊張。

![](https://i.imgur.com/j4EgIzh.png)

所幸最終發現是Blender Node能支援匯出的東西很少。只好試一下烘焙貼圖。

別忘了先unwrap一波，配合image texture即可熱騰騰地產出。

據官方指南記載，在Node有用到Bump的話，插值法選cubic比較好。雖然我是看不太出差別啦……還是先依樣bake。

大概凌晨一點半左右，codesandbox也恢復了。好在模型終於展現應有的質感。

![](https://i.imgur.com/OskqxKA.png)

[![Edit R3F2](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/r3f2-nydlsl)

```js
//App.js
import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraShake, Stage } from "@react-three/drei";
import { Model } from "./Model";

export default function Viewer() {
  const ref = useRef();
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
      <Suspense fallback={null}>
        <Stage
          controls={ref}
          preset="rembrandt"
          intensity={1}
          environment="city"
          adjustCamera={1.5}
        >
          false
          <Model />
          false
        </Stage>
        <CameraShake
          maxYaw={(Math.random() - 0.5) / 2}
          maxPitch={(Math.random() - 0.5) / 2}
          maxRoll={(Math.random() - 0.5) / 2}
          yawFrequency={0.1}
          pitchFrequency={0.1}
          rollFrequency={0.1}
          intensity={1}
          decayRate={0.65}
        />
      </Suspense>
    </Canvas>
  );
}
```
```js
//Model.js
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.y += 0.03;
  });

  const { nodes, materials } = useGLTF("./face.glb");
  return (
    <group {...props} dispose={null} ref={ref}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Model.geometry}
        material={materials.Material}
      />
    </group>
  );
}

useGLTF.preload("./face.glb");
```