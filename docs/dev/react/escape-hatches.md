---
description: 以React官方教學為主，從Components由簡入深，跟隨Haruo在iThome鐵人賽中一同成長
head:
  - - meta
    - property: og:title
      content: 現在學React還來得及嗎：逃生
  - - meta
    - name: og:description
      content: 以React官方教學為主，從Components由簡入深，跟隨Haruo在iThome鐵人賽中一同成長
  - - meta
    - name: og:image
      content: /og-image.webp
  - - meta
    - property: twitter:title
      content: 現在學React還來得及嗎：逃生
  - - meta
    - name: twitter:description
      content: 以React官方教學為主，從Components由簡入深，跟隨Haruo在iThome鐵人賽中一同成長
  - - meta
    - name: twitter:image
      content: /og-image.webp
---

# 【現在學React還來得及嗎：逃生】

<p><Badge type="info" text="🌳 Evergreen" /></P>

## ref

### Takeaway
-	useRef可以拿來傳參考，畢竟用了Reference嘛
-	不想觸發渲染時：使用ref。所以在渲染期間讀取ref是沒用的
-	如果直接更新useRef，不會被偵測到，是在做React管轄以外的互動，將造成副作用。所以我們會在事件處理函數或Effect裡讀取ref，並搭配使用
-	useRef就像沒有setter的useState
-	但useState回傳的是陣列，useRef回傳的是物件
-	受控組件：讓State成為單一資料源
-	非受控組件：使用原始DOM或ref
-	ref的current屬性可以被點記法修改
-	ref適合timeout ID和DOM元素
-	可以像.current.focus()這樣使用瀏覽器API
-	Hook只能在組件頂端調用，所以map裡不能包ref
-	但是ref裡可以包著map！
-	ref callback：當ref對象會變化時，將函數傳遞給ref。譬如用ref包住map
-	ref callback跟拿來記憶函數，減少渲染的useCallback不一樣喔
-	組件不能用ref，除非使用forwardRef暴露DOM節點
-	useImperativeHandle：限制暴露的只剩下控制代碼（Handle），而不是DOM節點。這時候能調用的就只剩下你設定的那個方法（如focus）
-	flushSync：強制DOM同步更新的最後手段，通常是和第三方程式碼（如UI函式庫或者瀏覽器API）整合時使用
-	避免重複創建ref：初始化ref，加上if判斷：current是null的時候再執行
-	useState類似Vue的ref；useRef則是類似Vue的v-model，可拿來取得input的value

## Effect1

### Takeaway
-	讓組件和React之外的系統同步
-	一般來說，副作用得在事件處理函數裡發生。但要是沒有特定的觸發事件，就可以使用Effect包裹副作用
-	不要太常使用Effect
-	編寫Effect的三步驟：宣告 → 指定 → （清理）
-	Effect預設會在每次渲染後執行，所以要指定依賴
-	React使用Object.is來確認依賴項是否發生變化
-	如果依賴項不會改變，可以不用特別清理
-	依賴陣列如果設定空陣列，代表組件掛載後才會執行useEffect
-	ref和set函數都是穩定的，所以不用放進依賴陣列
-	但如果無法確認傳來的是不是同個ref等等，就要放了
-	開發環境下，會連接兩次，斷開一次。React會多測試，不要用ref阻止
-	利用useEffect處理非同步請求fetch時，可能會因為請求切換太快，而遇到競態條件（Race Condition）。不引入其他套件的應對方式有AbortController
-	關於切換太快的效能優化方式還有節流（Throttle）函式
-	如果想要緩存資料而不是刪掉再請求：可使用React Query、useSWR和 React Router v6.4+等第三方解決方案
-	Intersection Observer：常用來觀察元素在視窗裡的可視程度
-	如果要使用的資料只需要載入一次，如確認登入狀態或使用本地資料，可以寫在useEffect之外
-	業務邏輯（如按鈕購買）不該放在useEffect裡，而該寫到事件處理函數

## Effect2

### Takeaway
-	useEffect的前身是生命週期函數componentDidMount、 componentWillUnmount和componentDidUpdate
-	useEffect讓函式組件（Functional Component）也能有自己的生命周期
-	useMemo：可以儲存複雜的計算結果
-	可以使用console.time + console.timeEnd了解計算的耗時程度
-	在props發生變化時調整部分頁面（譬如可勾選的列表）：用陣列方法直接調整回傳的props最高效，而不是用useEffect或改state
-	Effect只用來執行「組件一顯示時就要執行」的程式碼，否則有其他互動的話就是事件處理的邏輯了
-	如果是想讓state的變化被父組件得知：可用狀態提升
-	如果想要訂閱外部儲存（如Redux Store、瀏覽器API等）：更適合用專門的useSyncExternalStore
-	比起掛載和卸載，Effect的生命週期更接近多次開始和停止同步
-	每次渲染時都會有各自對應的Effect。而且由於函式組件的閉包特性，這些Effect的值各自都是不變的（immutable）
-	每個useEffect都該是各自獨立的
-	ref.current不能拿來當依賴項：因為ref的特質就是更改也不會重渲染
-	React的程式碼檢查工具會提示React Hook useEffect has missing dependencies
-	useLayoutEffect：只有執行時機不同於useEffect，瀏覽器會先執行程式再重繪頁面。雖然可以讓畫面不會發生惱人的閃爍，但可能拖累效能，建議在特殊狀況下使用
-	useEffect可以用來抓API，但React官方推出的Suspense組件更加適合

## Effect3

### Takeaway
-	useEffect的”Effect”是副作用
-	使用useEffect呼叫api時，可以加上布林判斷let ignore = false結合if (!ignore)，避免資料回傳速度不一致所造成的競態條件
-	事件處理函數的邏輯是非響應，除非有互動
-	useEffectEvent：用來處理Effect裡不想要產生響應的邏輯
-	在useEffect裡調用Effect Event：Effect Event()
-	不要把Effect Event傳給其他組件或Hook
-	Eslint有可能會抑制React原生的檢查工具
-	將靜態、不會變的東西移到組件外；將動態的東西移到Effect內
-	如果擔心各自獨立的useEffect太重複，可把共通邏輯寫到自訂的Hook
-	自訂Hook共享的是邏輯，想要共享State請用狀態提升
-	自訂Hook的好處：讓資訊流更容易看清，譬如useData(url)就像是輸入url會輸出data；如果自訂Hook裡的Effect想升級成更好用的功能（例如useSyncExternalStore），也不需要動到組件
-	higher order components VS render props VS custom hook：三者都想複用邏輯
-	高階組件（HOC）：傳入一個組件，這個函數（HOC）會回傳被包裝的新組件，例如Redux的connect()。適合搭配條件渲染，缺點是一個組件裡只能用一次HOC，以及使用太多層的話會引起Wrapper Hell
-	Render Props：把函式放在props裡傳遞，而那個函式會渲染元素，因此得名。容易嵌套太深