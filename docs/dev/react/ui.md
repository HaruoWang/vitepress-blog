# 【現在學React還來得及嗎：UI】

<p><Badge type="info" text="🌳 Evergreen" /></P>

## 源起與基本觀念

### 前言

且說前陣子在半路咖啡和Bar手搭話時，聊到設計出身的他現在正職是寫Vue。我一面吞下遞過來的Tequila，一面想著多年前大概料不到自己會主動找人談Coding，還是置身於這個由賤民解放區延伸而來、藝文人士薈萃的安那其場景。

連在吧檯chill一下都陰魂不散，三大框架像是避不開的暑氣，始終盤據於前端職缺的JD。但真的開始循序了解後，會發現滑稽的是React根本不算三大「框架」。而Svelte的崛起，特別是在數位敘事圈的廣泛使用，也讓我對其比Angular更保有興趣。此時對Vue最大的印象，則依然是おたく看了會老淚縱橫的版本代號。

不過我還是選擇從React著手。畢竟由簡入深難，由深入淺易。
現在學React還來得及嗎？會不會哪天就被新技術取代？我想鐵人賽的意義不僅於此，更在於系統性地為自我成長安排挑戰。猶豫兩三屆了，此時不參與，更待何時？

### Takeaway
-	React是函式庫，需要和生態系一起看才相當於框架
-	框架裡包含函式庫；使用者可自由使用函式庫，但要配合框架
-	React近似於MVC架構裡的View
-	React的關注點分離：以視覺而非技術為界
-	React的好處是讓Components可重複使用
-	React是以改變Components的State來重繪介面
-	React提倡的是單向資料流，不會從DOM更新資料
-	React要用onChange提供反向資料流
-	Vue是透過v-model達成雙向綁定；Svelte則是透過bind
-	React是由Jordan Walke創立，首先用在News Feed，再來是IG
-	React Native和Flutter一樣可以寫跨平台app

## Components & JSX

我們主要會經由React的[官方教學](https://react.dev/learn/describing-the-ui)進行學習。

如果在挑戰環節中實作到有趣的題目，也會透過線上IDE分享給大家，方便快速上手。目前主要會採用CodeSandbox，萬一免費版遇到什麼限制，還有JSFiddle和Replit備援。

言歸正傳，在這裡我想將Components譯成組件，否則元件很容易不小心寫成元素Elements，哈哈。

### Takeaway
-	組件的名稱必須以大寫開頭 
-	不要在組件裡定義組件
-	Create React App的根組件在src/App.js
-	Next.js的根組件在pages/index.js
-	return的括號裡沒有分號，分號要寫在括號後！
-	默認引入沒有{　}，具名引入要加
-	每個檔案裡只能有一個export default
---
![https://ithelp.ithome.com.tw/upload/images/20240806/20163002LNWRpukfpq.png](https://ithelp.ithome.com.tw/upload/images/20240806/20163002LNWRpukfpq.png)
-	JSX可以讓React.createElement長得更像HTML
-	JSX會透過Babel進行編譯
-	jsx-runtime：使用_jsx方法達成React.createElement的工作
-	從17版開始，jsx-runtime讓使用者不用再import React
-	JSX需要有父元素包多個元素，如空標籤Fragment
-	JSX只能回傳父元素之因：JS裡return也只能傳一個值
-	JSX裡的自閉合標籤都要在結尾加斜線，就像XML
-	data-*或無障礙的aria-*屬性不受駝峰式命名限制
-	如果在JSX裡寫CSS，font-size也要改成駝峰
-	因為class是保留字，JSX裡的class要寫成className
-	React官方推薦的HTML to JSX轉換器：[HTML to JSX](https://transform.tools/html-to-jsx)
-	JSX裡可使用{　}引入JS表達式，用途有點類似樣板字面值
-	連接字串時和JS同樣使用加號，如`src = {url + id + '.png'}`
-	不同於HTML，在JSX裡，空白字元要用引號包住
-	{　}如何使用：作為文本或屬性，外面不會再包引號

### Reference
[React JSX in Depth - GeeksforGeeks](https://www.geeksforgeeks.org/react-jsx-in-depth/)

## Props

### Takeaway
-	HTML標籤的props是訂好的，但傳給組件的props可以自定義
-	在子組件中，可以像讀取參數一樣讀取來自父組件的props
-	例如function Profile({ A, B }) {}
-	Props的默認值不能用0或null
-	展開語法：{...props}，讀取來自父組件的所有props值
-	{children} prop：讀取來自父組件的JSX
-	不要更改props，而是更改state
-	在子組件定義props有哪些，在父組件定義props的值
-	所以會變又結構類似的東西寫在父組件裡
-	Props當參數時記得加{　}，不然會出現Objects are not valid as a React child
-	JSX的{　}裡可以加物件也可以加矩陣
-	在JSX的物件裡不能再寫JS（JS只能作為文本或屬性）
-	寫JSX時，使用等號，不加逗號；但在JSX裡寫物件時，使用冒號，加逗號
-	子組件裡常用到{　}，父組件裡常用到”　”

---

![](https://i.imgur.com/8z4BMDQ.png)

[![Edit Props](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/props-jj8p3j)

```js
//子組件
function Profile({ name, img, tag, award, novel }) {
  return (
    ...
  );
}
```

首先找出頁面中要重複使用但又會變的部分。以範例來說，我列了name姓名、img頭像、tag特色、award星雲賞、novel代表作，也就是要傳給子組件的props。初學者第一次從頭寫容易忘記把props加進(　)裡，加了之後容易忘記在括號裡裝{　}。

這裡可以參考Figma Components輔助了解：Instance swap類似同階層的圖片（img），其他文字（name, tag, award, novel）屬於Text，而Variant則像是CSS樣式。

```js
//父組件
export default function Gallery() {
  return (
    ...
      <Profile
        name="筒井康隆"
        img={{
          src: "5/50/SF-Magazine-1964-September-2",
          alt: "筒井康隆",
          className: "avatar",
          size: 100
        }}
        tag="#諷諭 #實驗性 #筒井World"
        award="1970, 1970, 1971, 1974, 1975, 1976, 1977"
        novel="《穿越時空的少女》《日本以外全部沉沒》"
      />
   ...
  );
}
```

接著先以一個區塊做父子搭配。這裡最大的陷阱是標點符號，過了就一帆風順。像我的話就把img prop寫成物件形式，用到長得跟JSX很不同的鍵值對。

因為星新一的臉不在原圖中央，我在CSS寫了個object-position: center top，不然className其實不用當prop。

還有一個特殊之處：要計算星雲賞獲獎次數。官方範例是把award寫成陣列後，再透過.join(', ')轉成字串呈現，我則剛好相反，用了.split(",")把字串切成陣列。麻煩的是星新一沒得過星雲賞，即便award放空字串也會顯示1。遂將程式碼改成{award.split(",").filter((award) => award != "").length}，把空字串給濾掉。

面對需要「客製化」的情況，也讓我對CSS、JS和星新一等人更加熟悉。這正是耗時投入的Bonus吧。

## Render

### Takeaway
-	JSX不是實例
-	let + if雖然冗長但靈活
-	&&也可以做條件渲染
-	寫成{count > 0 && '✔'}：才不會在count等於0時渲染出0
-	&&的後綴性質很適合做插入間隙
-	filter搭配map好用
-	expression body對block body：隱式返回vs顯式返回。前者單行免return
-	map裡的JSX通常都要指定key值
-	key值搭配多個DOM節點：可用`<Fragment key={person.id}></Fragment>`包住
-	還要記得import { Fragment } from 'react';
-	uuid也可以拿來生成key
-	拿索引值當key的話，增刪或重新排序時可能會有bug
-	不能直接return {ans}，會觸犯大括號限制！要當成文本用標籤包起來！

---

![](https://i.imgur.com/N03NeWv.png)

[![Edit Render](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/render-8k853j)

在這裡要實作的是「把嵌套清單拆成父子組件」。
第一步我會像是在做MVP（最小可行性產品）那樣，先確保父子組件有順利連結。如圖所示，如上次的Takeaway：在子組件Note列出需要的props和HTML，在父組件NoteMap寫好props的值。

```js
import { note } from "./data.js";
  
function Note({ name, tips }) {
  return (
    <div>
      <h2>{name}</h2>
      <ul>
        <li>{tips}</li>
      </ul>
    </div>
  );
}

export default function NoteMap() {
  return (
    <div>
      <h1>現在學React還來得及嗎？</h1>
      <Note 
        name="源起與基本觀念"
        tips="React是函式庫，需要和生態系一起看才相當於框架"
      />
    </div>
  );
}
```

問題來了，此時咱們額外引入的note陣列仍未被使用。而這批沒有寫在父組件裡的資料，還需要不同的處理。先改父組件。

我們需要透過map讓「父組件裡的子組件」可以使用note陣列。記得要設定key是哪個鍵，恰似SQL的主鍵。而map的擺放位置就是把你要重複渲染的東西包住。父組件這裡還用到之前介紹過的「展開語法」{...n}，可以把n的資料整個傳下去。寫完父組件的map之後，子組件的map就顯得容易多了。

```js
import { note } from "./data.js";

function Note({ name, tips }) {
  return (
    <div>
      <h2>{name}</h2>
      <ul>
        {tips.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

export default function NoteMap() {
  return (
    <div>
      <h1>現在學React還來得及嗎？</h1>
      {note.map((n) => (
        <Note key={n.id} {...n} />
      ))}
    </div>
  );
}
```

可以比較一下兩段程式碼之間的差異，更容易理解個中邏輯。

```js
//map前
<ul>
    <li>{tips}</li>
</ul>

//map後
<ul>
    {tips.map((t) => (
      <li key={t}>{t}</li>
    ))}
</ul>

//map前
<Note 
    name="源起與基本觀念"
    tips="React是函式庫，需要和生態系一起看才相當於框架"
/>

//map後
{note.map((n) => (
    <Note key={n.id} {...n} />
))}
```

## Pure Functions & UI Tree

### Takeaway
-	嚴格模式：會調用每個組件函數兩次，確保結果一致 
-	Mutation：更改預先存在的變數
-	Local mutation：在父組件裡更改是ok的
-	不要在組件裡的JSX之外做判斷
-	Side effects：執行某些互動時才變動，屬於Event handlers的領域
-	純函數可以使輸入不會變化的組件跳過渲染，可以隨時停止計算
---
-	除了HTML，React也可以和UIView 或 FrameworkElement配合
-	Render Tree展示組件，Module Dependency Tree展示JS
-	後者是Bundler的依據。像Webpack會生成Dependency Graph

---

因為要在JSX裡做判斷，這裡會容易用到Render章節講過的條件渲染：像三元運算子或&&那些。

```js
export default function Clock({ time }) {
  let hours = time.getHours();
  return (
    <h1 className={hours >= 0 && hours <= 6 ? "night" : "day"}>
      {time.toLocaleTimeString()}
    </h1>
  );
}
```

譬如說根據當下時間切換dark mode的範例，我就直接在className裡寫進三元運算，這樣Local mutation就不會動到其他的東西，而且比官方解答的if…else還精簡，耶。

![](https://i.imgur.com/B2vVjbi.png)

[![Edit Pure Functions 2](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/react-dev-forked-f76279)

另一個練習稍微可惜的是，因為要新增的項目一定在map之外，所以甚至不用判斷要在哪裡加進它，只要在原本map的JSX後面寫上`<li>Create Story</li>`標籤就好，沒設id也不影響map循環。想來我的條件判斷是有點多此一舉。但既然都練習了，當然還是會保留一下走過的思路以供參考。

```js
export default function StoryTray({ stories }) {
  return (
    <ul>
      {stories.map((story) => (
        <li key={story.id}>{story.label}</li>
      ))}
      {
        (stories.id = stories.slice(-1)[0].id && (
          <li key="Create">Create Story</li>
        ))
      }
    </ul>
  );
}
```