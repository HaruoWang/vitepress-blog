---
description: 以React官方教學為主，從Components由簡入深，跟隨Haruo在iThome鐵人賽中一同成長
head:
  - - link
    - rel: canonical
      href: https://haruowang.vercel.app/dev/react/recap.html
  - - meta
    - property: og:url
      content: https://haruowang.vercel.app/dev/react/recap.html
  - - meta
    - property: og:title
      content: 現在學React還來得及嗎：回顧
  - - meta
    - name: og:description
      content: 以React官方教學為主，從Components由簡入深，跟隨Haruo在iThome鐵人賽中一同成長
  - - meta
    - name: og:image
      content: /og-image.webp
  - - meta
    - property: twitter:title
      content: 現在學React還來得及嗎：回顧
  - - meta
    - name: twitter:description
      content: 以React官方教學為主，從Components由簡入深，跟隨Haruo在iThome鐵人賽中一同成長
  - - meta
    - name: twitter:image
      content: /og-image.webp
---

# 【現在學React還來得及嗎：回顧】

<p><Badge type="info" text="🌳 Evergreen" /></P>

## Recap1

### 關鍵字
-	Components：一段可複用的程式碼，React的最小單位。名稱以大寫開頭
-	JSX：類似模板語言的JS語法擴充。會回傳JS物件React element，並最終渲染成DOM。React 17後，JSX將透過jsx-runtime處理
-	Props：Components的參數，可以是任意值。唯讀，只能父傳子
-	Event Handlers：有互動時會觸發的函式。名稱慣例以handle + 元素名稱 + 事件名稱，如handleTitleClick
-	useState：為Components添加狀態。會回傳包含state變數（初始值）和setter（更新前者並觸發渲染）的[　陣列　]
-	useImmer：簡化State更新邏輯的第三方Hook。會回傳包含draft（Proxy）和updater（以update開頭）的[　陣列　]
-	useReducer：狀態管理用，可透過儲存的State更新介面。useReducer 有兩個參數，分別是Reducer函數和初始State。其中Reducer函數本身包含tasks（初始值）和action（JS物件）兩個參數，會透過事件處理函數dispatch過來的action更新初始State。通常搭配switch…case…
-	useContext：讓Props可以跨組件共享。先創建某某props（createContext），再使用它的值（useContext），後提供（`<Provider>`）
-	包住傳值對象的`<Provider>`標籤，相當於`<你創的Props.Provider　value={ 你要用的值 }`>
-	useRef：像是沒有setter的useState。不會觸發渲染，但回傳的是具有current屬性，可以修改的{　物件　}
-	useEffect：讓組件可以執行副作用。每次渲染後都會執行，要指定依賴
-	useLayoutEffect：只有執行時機不同於useEffect，執行完程式才重繪畫面
-	useMemo：用來記憶複雜的運算值，避免重新計算以提升效能
-	useCallback：用來記憶函式，避免那個函式因為「跟它無關的變化」重渲染

## Recap2

### 使用時機
-	useState：邏輯簡單時做狀態管理。搭配展開語法、filter、map可分別實作增刪改
-	useReducer：1. 邏輯複雜時做狀態管理（譬如增刪改皆能操作的購物車）；2. 當下一個狀態相依於上一個狀態時；3. 更新邏輯想複用於多個組件時
-	useContext：適合做主題切換、讀取帳戶資訊、i18n，亦可做為路由
-	useRef：通常用來操作DOM，或結合useEffect儲存上一個Props/State的值
-	useEffect：當Props/State改變時，會觸發包含在其中的動作（副作用）。通常用來和React之外的系統同步，如非同步請求fetch；有時會拿來寫定時器；依賴值設定成空陣列時，可以處理只有初始化當下的邏輯（相當於onMounted）

### 注意事項
-	Export是具名導出，導入時要搭配大括號，不像默認導出的Default彈性
-	{　JS　}在JSX中只能作為文本或屬性
-	Props的默認值不能用0或null，和useState、createContext不一樣
-	Setter裡不能寫+=，要使用Immer才能處理mutation
-	切換布林時要用setState(!state)
-	如果兩個State總是連動，在State一起更新；如果兩個組件的State總是連動，使用狀態提升；如果兩個邏輯總是連動，可用自訂Hook
-	不要在State裡用Props
-	如果UI裡要列出「所選擇元素」，請select ID而非該元素本身
-	key值要標示在父組件裡，因為key值不是全域的
-	在事件處理函數或Effect裡讀取ref，才不會造成副作用
-	在組件使用ref屬性只會得到null值，除非使用forwardRef
-	ref和setter不用放進依賴陣列，因為每輪渲染都是相同的
-	不要把Effect Event傳給其他組件或Hook

## Recap3

### React vs Vue
-	React要用onChange提供反向資料流，Vue是透過v-model達成雙向綁定
-	Vue的ref類似useState，而非useRef。後者可以保存不用重渲染的資料。
-	Vue的onClick會簡寫成@click，全名是v-on:click
-	useState類似Vue的ref；useRef則是類似Vue的v-model，可拿來取得input的value
-	React styled component可以解決汙染問題，類似Vue style scoped
-	Flow.js可以做型別檢查。由FB開發，很適合搭配React。不過Vue 3也已是全面支援TypeScript
-	可以拿來做3D的React Three Fiber在2019便發布，而Vue的自定義渲染器TresJS在3年後誕生，比前輩TroisJS還好用
-	React的Class Component有生命週期API，關鍵字是mount, update和 unmount；Functional Component沒有生命週期API，即便useEffect也不是
-	Vue組件的生命週期首先會setup，後續則是對template進行解析。關鍵字比React多了create
-	在Vue 3的Composition API中，那些生命週期的Hook名稱都以on開頭
-	Jest於三大框架皆可做測試，受React官方推薦；React Testing Library則可用來選取DOM，比Enzyme更以使用者角度思考
-	Vue Test Utils是Vue官方提供用來簡化測試的工具庫，可以用來模擬DOM渲染後的樣貌；基於Vite環境、架構很近似Jest的Vitest才是測試框架；小秘密是：其實也有Vue Testing Library

---

這部分除了拾起、並整理前面文章散落的資訊外，還為了對React有更廣泛的認識，而去填補更多知識、延伸出更多的文字。算是進入實作前的過渡。
查閱資料時發現Vue真的越追越緊，特別是「重新發明Vue」的Vue 3。
接下來很看React 19如何發展了，後生可畏啊。

## RSC

行文至此，鐵人賽已經完成三分之二。雖說有保留約五天的緩衝進度，但每日撰文的壓力對意志仍是考驗。累倒是其次，做這件事占用掉生活多大的比例，又能交換到什麼，才是關鍵。

因此，到了這個階段，我想先來回答一下開篇時所拋出的問題：「現在學React還來得及嗎？」

我會說，不只來得及，還很「著時」。
從React 17開始的功能升級，便替18的改變埋下伏筆。譬如不用遍歷整棵樹，就能使用diff演算法更新部分虛擬DOM的Reconciliation節能版；可以複用Event Object，但因不夠直觀而被取消的Event Pooling機制等。近年來，更是多出不少新觀念。

撇除`<Context.Provider>`可以寫得更簡潔這種小改款，其中一個在後Hook時代將影響深遠的發展，正是伺服器端組件（React Server Components）。

### Takeaway
-	RSC只在伺服器端渲染，檔名為.server.jsx
-	RSC會在伺服器端渲染完；SSR（例如：Next.js）會先在伺服器端預渲染，再hydrate去客戶端
-	預渲染：使用renderToString()，先渲染HTML過去
-	RSC讓JSX不用在客戶端轉譯
-	RSC和SSR可以同時使用，保留hydrate，相輔相成
-	RSC被視為無狀態的組件，不能用狀態管理的Hook或DOM API
-	RSC讓使用者不用一直透過useEffect獲取資訊
-	RSC將業務邏輯組件化，且不會影響bundle的大小
-	RSC裡可以寫非同步的async和await
-	客戶端組件不能直接引入RSC，但可以把RSC當成{children}
-	Server Actions：React正在推動，讓客戶端可以更輕鬆調用非同步函式。常見語法有use server、use client等
-	RSC輸出格式：有ID的JSON
-	ID編號有J、M、S、E，分別代表Model、Module、Symbol、Error
-	其中J是伺服器端渲染的，M是客戶端需要的

## vDOM

爬文時常看見「虛擬DOM」一詞，但還沒有梳理過，特於此筆記。

### Takeaway
-	虛擬DOM其實是JS物件
-	Vue也有虛擬DOM，叫作VNode
-	Svelte的哲學是不需要用虛擬DOM
-	重點不是快慢，而是可以用聲明式語法
-	好處還有方便維護，以及能做到跨平台使用
-	React18前，由ReactDOM.render()負責將虛擬DOM安插到真實節點
-	React18後，由createRoot和hydrateRoot負責協助
-	遍歷vDOM tree的時間複雜度是O(n^3)，只比對前後差異則是O(n)
-	Fiber透過linked list結構進行遍歷，足以讓虛擬DOM實現增量渲染（Incremental Rendering），可以分割、中斷或調整渲染的優先順序
-	requestIdleCallback()：善用零碎時間，讓瀏覽器裡的任務不被單線程耽擱
-	shouldYield()：判斷任務執行有沒有超過5毫秒
-	Lanes模型：React 17時引入，關於任務執行的優先順序。相較於16的Expiration Times，可用二進制運算做到更細緻的處理
-	ReactElement的$$typeof屬性是symbol類型，可用來防止XSS攻擊。而倘若瀏覽器不支援symbol類型，React會回傳0xeac7。小彩蛋是因為這串值長得像React，哈
-	lazyTree可以讓IE(8-11)和Edge逐一渲染節點，在遇到特殊節點（例如Fragment）時會進行調整。其他瀏覽器則是都採取一次渲染
-	React 15時是Stack Reconciler加上Renderer，16則是Fiber Reconciler加Renderer再加上 Scheduler。目前則向著Concurrent Features的方向發展中

## Good Writing

以下羅列一些寫React的好習慣：

### Takeaway
- 使用Fragments（空標籤）取代無效的div，因其可讀性更高，渲染出的DOM也更小
- 不會循序改變的state可以使用memo，避免不必要的渲染。不過到React 19情況可能又會有變，因為脫胎自React Forget的React Compiler要來了
- 在JSX裡使用行內樣式（style={鍵值對}），會比用className外連CSS的效能好，但將沒那麼方便使用media queries和hover等功能。解方如：安裝外掛radium，請自行斟酌。感覺兩邊各有擁護者。另外還有Styled Components、Emotion和Glamorous這樣的CSS-in-JS庫可供參考，更是出現了CSS Modules這樣的模組化解決方案，以亂數解決命名衝突問題。而Next.JS則是採用Styled-JSX
- 使用強調屬性名稱的物件解構賦值，可讓提取資料更便利，擺脫點記法
- 不要在JSX裡寫JS
- 使用更易讀，還可以設定預設值的樣板字面值，取代「加號相連到天邊」的字串串接。這是寫JS時本來就可以保有的反射動作
- 保持有條理的引入順序：內置 → 外連 → 內連
- 不要拿會讓人誤會的名稱幫props命名。譬如style或type等可以直接操作DOM的HTML屬性
- 使用React.lazy動態載入組件，做到程式碼拆分以提升效能
- 可用PropTypes對props進行型別檢查

### Reference
[21 Best Practices for a Clean React Project](https://www.mdfaisal.com/blog/21-best-practices-for-a-clean-react-project)