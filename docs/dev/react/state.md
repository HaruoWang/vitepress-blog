---
description: 以React官方教學為主，從Components由簡入深，跟隨Haruo在iThome鐵人賽中一同成長
head:
  - - meta
    - property: og:title
      content: 現在學React還來得及嗎：狀態
  - - meta
    - name: og:description
      content: 以React官方教學為主，從Components由簡入深，跟隨Haruo在iThome鐵人賽中一同成長
  - - meta
    - name: og:image
      content: /og-image.webp
  - - meta
    - property: twitter:title
      content: 現在學React還來得及嗎：狀態
  - - meta
    - name: twitter:description
      content: 以React官方教學為主，從Components由簡入深，跟隨Haruo在iThome鐵人賽中一同成長
  - - meta
    - name: twitter:image
      content: /og-image.webp
---

# 【現在學React還來得及嗎：狀態】

<p><Badge type="info" text="🌳 Evergreen" /></P>

## Events

這段比起學React，更像是在複習JS和瀏覽器的互動呢。

事件屬性除了等下會介紹的e.eventPhase，還有熟悉的e.preventDefault以及能自動觸發事件的e.dispatchEvent等。可以多多了解。

### Takeaway
-	事件處理函數：以handle開頭接事件名，在組件裡定義；或在JSX裡用箭頭
-	前者的JSX會寫`<button onClick={事件處理函數}>`，並搭配外面定義的事件；後者會寫`<button onClick={() => 發生什麼}>`
-	事件處理函數作為props：以on開頭，如onHover
-	如果從父組件收到onProps，在JSX裡寫onProps()
-	HTML裡收到的props仍須是預設，如{onClick}。但組件裡傳的可以自己命名
-	事件傳遞：由外而內稱Capture，由內而外稱Bubbling
-	Target Phase：此時不區分捕獲和冒泡
-	傳遞方向為捕獲 → 目標 → 冒泡
-	有寫到「事件物件」（那個e）就會多一層大括號
-	e.eventPhase：回傳目前階段，以整數值1、2、3代表
-	e.stopPropagation()：通常阻止事件冒泡
-	Event Delegation：事件委派。讓父元素代理監聽，不用特別阻止事件傳遞
-	e.target跟隨使用者觸發的元素而變，e.currentTarget始終跟隨監聽對象
-	前者在「傳遞過程」中不變，後者有可能變化
-	e.currentTarget：在一般函式裡等同於this
-	在箭頭函式中，this代表的對象不會改變，和e.currentTarget不同

## State1

### Takeaway
-	State：隨時間而變化，不能藉由現有資料計算出來
-	決定State放在哪：找到用State的組件們，再找它們的共同父組件
-	更改區域變數不會觸發渲染
-	State變數：用來保留資料。如index
-	State setter函數：更新State變數並觸發渲染。如setIndex
-	觸發組件渲染的兩種原因：初次渲染、狀態改變
-	初次渲染其實是：調用createRoot→render組件→在DOM上appendChild。簡寫為觸發 → 渲染 → 提交
-	appendChild只能接收一個參數；append可以接收多個，還能接收字串
-	prepend：把節點插到前面的append
-	常見const [index, setIndex] = useState(0)搭配setIndex(index + 1)
-	Vue的ref類似useState，而非useRef。後者可以保存不用重渲染的資料。
-	Vue的onClick會簡寫成@click，全名是v-on:click
-	Hook只能在組件或自訂Hook的最頂端調用
-	Hook擺錯位置會被eslint-plugin-react-hooks抓包，顯示錯誤「渲染的Hook比預期還要少」
-	State具獨立及私有性。渲染同組件時兩次時，可以有不同狀態
-	兩個State想同步？從子組件移到父組件中
-	如果組件要重渲染才會需要State，不然事件處理函數有時就夠了
-	useState也要記得import
-	Closure：閉包。內部函式可以從外部函式取得變數，也就是事件處理函數及JSX，可以取得外部函式變數和State的原因。
-	閉包適合緩存，但缺點是外部宣告的變數如果沒用到，會造成記憶體洩漏

## State2

### Takeaway
-	渲染時傳回的JSX被形容為是Snapshot快照，會固定State的值
-	React會等事件處理函數運作完才更新State，這被稱作Batching批處理
-	寫三個setNumber(number + 1)，輸出的還是以1為遞增
-	寫三個setNumber(n => n + 1)，輸出的才會是以3為遞增
-	n => n + 1：被稱為Updater function更新函數
-	更新函數跟組件一樣應該要是純函數，都會調用兩次做測試
-	更新函數在寫非同步時容易用到
-	幫更新函數命名：使用setter的駝峰。如setPageIndex(pi => pi * 2);
-	在替換State後更新State，兩段程式碼都能正常運行；在更新State後替換State，只保留在後的替換結果
-	useState裡的內容應被視為不可變，請搭配setter觸發渲染
-	State要替換的值不只一個時，setter裡可以放物件，有時會用到展開語法
-	展開語法的本質其實是淺拷貝，和Object.assign一致
-	淺拷貝：原型鏈相同，不像深拷貝只複製結構。白話來說，淺拷貝的物件和原物件不同，但指向的內容物相同，即Call by reference傳址
-	深拷貝實作則要用到JSON方法、2022年推出的structuredClone()或lodash的cloneDeep
-	改三欄input的值時，如果用`[e.target.name]: e.target.value`，就可以只寫一個事件處理函數，而不用分成email: e.target.value等

## State3

### Takeaway
-	嵌套裡的物件用展開語法會寫成像這樣：...person.artwork
-	被嵌套的物件看似像被嵌套，但其實狀態上有點像淺拷貝
-	讓嵌套裡的物件可以更直觀被取得的方式：使用Immer
-	先import並const useImmer（不是useState了），再到Immer版的setter（以update開頭）裡用draft取代state變數寫箭頭函式。draft相當於Proxy
-	不直接改state導致mutation的好處：好除錯、有助優化、有助版控或reset（需求變更時更彈性）
-	因為+=是mutation，所以即便計算結果相同，在setter物件裡仍要修正成+
-	因為draft能作為Proxy，所以在Immer裡是可以寫+=的！
-	Immer讓React不只是immutable
-	不要用會改變原始陣列的方法，像slice可以用，splice不能。或者引入Immer就都可以寫了
-	把展開語法寫在後面，就可以實作插入前面的unshift
-	複製陣列之後就可以用sort和reverse了
-	增：setter搭配展開語法；刪：setter搭配filter；改：setter搭配map

---

先來看以下這段程式碼：

```js
setPlayer({
  ...player,
  score: player.score + 1
});
```

要寫這麼費工的原因是，我們不能直接改player.score。

score: player.score + 1，代表和前面State裡變得不同的鍵值對。

…player則可以代表，需要和前面State裡保持一致的鍵值對。

---

![](https://i.imgur.com/CDDLjou.png)

[![Edit State3](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/state3-c5zhmt)

另一個練習我們寫購物車的遞減按鈕，但從1減到0時要直接把項目移除。

首先自然是把遞增按鈕的程式碼複製過來，把綁定的事件處理函數改成handleDecreaseClick，邏輯只差在變成減一。

然後我的做法是直接在onClick這，用if判斷+filter濾出要保留的項目，再麻煩setProducts送出。

一開始條件設成p => p.count > 1，很開心想說寫完了。但此時萬一有兩個項目剛好都剩1的話，會一起被送走。所以要改成p => p.id != product.id，也就是保留「不符合if條件的id」所代表的項目，才能正確破關。

```js
<button
onClick={() => {
  handleDecreaseClick(product.id);
  if (product.count < 2) {
    setProducts(products.filter((p) => p.id != product.id));
  }
}}
>
-
</button>
```

## State managing 1

> “React stands at the intersection of design and computer science, so both of these ideas are sources of inspiration.”

很喜歡這段話，前端有趣的點對我正是如此：在設計和技術間取得平衡。可以讓你寫的東西和使用者互動，串各種即時資料或功能，還美美的。

### Takeaway
-	原生DOM是命令式UI，React是聲明式UI
-	React將組件視為狀態機
-	官方推薦在React重現UI的五步驟：列出視圖→觸發原因→寫好State→刪掉多餘→事件處理
-	Living Style Guide：列出各種可能視圖，就像設計系統。例如按鈕可能就有normal, hover, active, focus, disabled等狀態
-	Reducer可以合併多個State變數，減少多餘的。後續會學到
-	切換布林時不是用setState(true)，不然就會一直固定在true；而是要用setState(!state)才對

---

又是一次自己寫得開心，結果發現把img當成按鈕的挑戰一，限定不能再按一次圖片切回去，也就是說不能用三元運算，還要阻止跨父子影響的事件冒泡。

```js
// 我原本寫的
import {useState} from 'react';

export default function Picture() {
  const [state, setState] = useState(false)

  function click() {
    setState(!state)
  }
  
  return (
    <div onClick={click} className={state ? "background background--active" : "background picture--active"}>
      <img
        className="picture"
        alt="Rainbow houses in Kampung Pelangi, Indonesia"
        src="https://i.imgur.com/5qwVYb1.jpeg"
      />
    </div>
  );
}
```
```js
// 正解
import { useState } from 'react';

export default function Picture() {
  const [isActive, setIsActive] = useState(false);

  let backgroundClassName = 'background';
  let pictureClassName = 'picture';
  if (isActive) {
    pictureClassName += ' picture--active';
  } else {
    backgroundClassName += ' background--active';
  }

  return (
    <div
      className={backgroundClassName}
      onClick={() => setIsActive(false)}
    >
      <img
        onClick={e => {
          e.stopPropagation();
          setIsActive(true);
        }}
        className={pictureClassName}
        alt="Rainbow houses in Kampung Pelangi, Indonesia"
        src="https://i.imgur.com/5qwVYb1.jpeg"
      />
    </div>
  );
}
```

---

難度再升級的則是Edit mode和Save mode的轉換。列出視圖（兩種）和觸發原因（點擊）都不難，寫好State的部分則有「姓氏」、「名字」和「編輯中？」這三種會變化的部分。

這裡要特別小心，Form標籤也會因提不提交而改變！如果沒有透過onSubmit附加State的話，即使視圖成功切換了，畫面依然會自動重渲染。而Input自帶一個名為onChange的DOM事件，可以設定輸入的值正在改變時要做什麼。

再多筆記一點新手寫code可能會踩的小陷阱：像Takeaway裡也有寫到，但還是要不厭其煩提醒自己的，記得setter裡是寫「!state」。好容易因為前面設定false，直覺就在要切換時填上true。另外還有雖然無傷大雅，但符合coding style還是比較好的，事件處理函數通常以handle開頭的命名慣例。

## State managing 2

### Takeaway
-	不應同時為true的state不要同時宣告
-	比起用嵌套一層包一層，讓每個節點「扁平化」，定義各自的子節點會更好
-	用到Props時要把State直接拿掉，否則會無法更新
-	要列出「所選擇元素」的State時，不要直接select原元素，要select原元素的ID才不會導致重複！
-	includes()需要線性時間，萬一資料量大性能會差。可使用Set的has()取代
-	要先useState( new Set() );
-	要看Set的長度是用size而不是length
-	要用new Set複製一份State出去再做增刪，不然會mutation
-	狀態提升：希望兩個組件的狀態保持連動，如一開一合。所以把State擺去父組件，再用Props傳State下來
-	狀態提升三步驟：移除子組件的State → 寫好父組件的內容 → 設定父組件裡的子組件的狀態
-	狀態提升的缺點：資料傳遞路徑又要改。替代方案如Redux
-	可控組件：讓Props或State成為單一資訊來源；不可控組件：經由DOM
-	單一資訊來源（SSOT）：每個狀態都有唯一的資料來源
-	React Hook Form和Formik：幫助製作React表單的套件。核心是不可控組件，解決可控一直重渲染的效率問題。但兩者都仍能做到可控。

## State managing 3

### Takeaway
-	當一個組件不再渲染，它的狀態也不會保留
-	相同位置的相同組件不再渲染，會被視為切換，保留狀態
-	相同位置的相同組件想重置狀態？在不同位置渲染或使用key值
-	小心不要打成id值等於什麼，寫作key值等於什麼（如id）才對
-	將key值賦予給子組件時，只能在父組件裡標示。因為key值不是全域的
-	如何幫不再渲染的組件保留狀態？都渲染但用CSS隱藏（效能差）、以狀態提升在父組件保留資訊、使用local和sessionStorage（後者的生命週期較短，畫面一關就清除）
-	如何跨頁面保留狀態？Store（各大狀態管理工具）、React Context、local和sessionStorage
-	local和sessionStorage只能存字串，localForage則能幫助開發者用一樣簡單的方式使用非同步資料庫IndexedDB，適合存大量資料或非字串。就算瀏覽器不支援IndexedDB，localForage也能切換成localStorage。算是種降級（Downgrade）策略，跟Polyfill哲學正好相反，哈
-	遇到需要在畫面裡多加新元素，但又要保留輸入狀態的好方法：直接把「是否等於State」當成渲染與否的條件，寫成三元運算或&&
-	Flux：適合搭配React的架構，後續被簡化成狀態管理用的Redux

## Reducer

### Takeaway
-	Reducer邏輯：讓「事件處理函數」派遣action給響應的「reducer函數」
-	如何使用useReducer：將setter的邏輯改成dispatch，確定下個狀態要幹嘛 → 寫reducer函數 → 宣告const [tasks, dispatch] = useReducer(reducer函數, 初始狀態);
-	useReducer可以實現簡易的Flux模式
-	Flux邏輯：先定義規則（action） → 把規則派遣給狀態管理處（reducer函數/store） → 狀態管理處根據規則更新狀態（state）
-	在事件處理函數裡dispatch({　action　});
-	action裡通常會有type和id等資訊
-	寫action要把數種變化視為同一行為。譬如以「重置」代表重設好幾個列
-	reducer函數接受兩個參數：分別是tasks（初始狀態）和action（要幹嘛）
-	引入immer後，tasks當然也可以用draft來取代
-	比起if…else，reducer函數更常使用switch…case語句
-	Reducer的概念來自陣列方法的reduce
-	Reducer要寫的程式碼可能更多，但比State更適合用來測試和除錯
-	Reducer也比State適合更複雜的情境
-	useReducer的概念很像Redux，但是沒有global store和middleware的功能
-	useReducer搭配useContext，可以實作類似前者的功能
-	useReducer隱藏的第三個參數：初始函數（Init function）
-	初始函數可以實現惰性初始化（Lazy initialization），只有在初次render時會被調用。其目的是提升效能，同時可以把初始狀態抓出來另外做處理
-	其實useState的原始碼是用useReducer寫的
-	其實useState也可以做惰性初始化

## Context

### Takeaway
-	Context可將Props直送到所要的組件
-	使用Context的三步驟：創建 → 使用 → 提供
-	譬如`<LevelContext.Provider value={level + 1}>`可以讓包起來的value值遞增
-	createContext的參數只有一個
-	Context類似CSS屬性，適合主題切換、讀帳戶資訊、做為路由、狀態管理
-	雖然好用，但傳遞Props和JSX還是優先選項，更能看出資訊流向
-	舊版React還要定義contextTypes
-	Reducer結合Context：將tasks和dispatch放進兩個Context裡傳遞
-	使用組件導出Reducer結合Context：可簡化app.js的架構
-	Reducer + Context和Redux的載入速度差不多
-	createContext也要引入！
-	Reducer函數在程式碼尾段引入

---

![](https://i.imgur.com/MiuJvfV.png)

[![Edit Context](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/context-5td5l5)

再複習一遍：Reducer是把「狀態更新的邏輯」集中起來管理，Context是讓組件更容易取值。

話不多說，開始實作Reducer + Context，先放添加鈕。確認連好「App.js」和「Add.js」後，我們在「Add.js」引入useState。
```js
// Add.js

// 引入useState
const [text, setText] = useState("");
return (
<>
  <input
    placeholder="添加待辦"
    value={text}
    onChange={(e) => setText(e.target.value)}
  />
  <button
    onClick={() => {
      setText("");
    }}
  >
    添加
  </button>
</>
);
```
現在的狀態很簡單，還只是個按下添加後會清空輸入欄的按鈕。

由於Reducer和Context最後會集中在一處，這時要到「Logic.js」引入createContext, useContext, useReducer。我們首先在「Logic.js」裡設置Reducer函數tasksReducer和初始資料initialTasks。這兩個接下來會被Context的Provider設為要傳遞的東西。
```js
// Logic.js

// 設定Reducer函數
function tasksReducer(tasks, action) {
  switch (action.type) {
    case "added": {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case "changed": {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

// 設定初始狀態
const initialTasks = [
  { id: 0, text: "學習State", done: true },
  { id: 1, text: "學習Reducer", done: false },
  { id: 2, text: "學習Context", done: false },
];
```

設定Context的第一步是「創建」，亦即宣告Tasks和Dispatch是createContext(null)。這裡就像在宣告State和Setter是useState(0)一樣。

設定Context的第二步是「使用」。我們要用useContext把Tasks和Dispatch（這裡的Tasks和Dispatch是createContext時所創建的）包在組件裡傳出去。

設定Context的第三步是「提供」。所以我們加上TasksProvider，把Reducer函數和初始資料用task和dispatch宣告起來，然後在return時賦予給{ children }。

```js
// Logic.js

// 「創建」Context
const Tasks = createContext(null);
const Dispatch = createContext(null);

// 「提供」Context
export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <Tasks.Provider value={tasks}>
      <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
    </Tasks.Provider>
  );
}

// 「使用」Context
export function useTasks() {
  return useContext(Tasks);
}
export function useDispatch() {
  return useContext(Dispatch);
}
```

於是可以回到「Add.js」。當然要記得import { useDispatch } from "./Logic.js"。然後在組件裡const dispatch = useDispatch()，並派遣東西給按鈕。
這裡有個隱密的坑，那就是「App.js」也要記得改啊！從`return <Add />`改成
```js
return (
    <TasksProvider>
        <h1>React待辦事項</h1>
        <Add />
    </TasksProvider>
);
```

不過現在還看不到加了什麼。所以最後來完成「List.js」吧。這邊就是用到各種State觀念了。
然後可以對照一下「List.js」和Reducer函數的code，可以更注意到Reducer是收到action之後，在不同type之間switch的。

---

最後附上初始資料傳遞路徑圖：

![](https://i.imgur.com/lC13PnO.png)

![](https://i.imgur.com/KgYVP8Y.png)

![](https://i.imgur.com/iDU9s0T.png)

![](https://i.imgur.com/C5Nhj28.png)