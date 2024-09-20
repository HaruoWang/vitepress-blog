---
description: 以React官方教學為主，從Components由簡入深，跟隨Haruo在iThome鐵人賽中一同成長
head:
  - - link
    - rel: canonical
      href: https://haruowang.vercel.app/dev/react/react-leaflet.html
  - - meta
    - property: og:url
      content: https://haruowang.vercel.app/dev/react/react-leaflet.html
  - - meta
    - property: og:title
      content: 現在學React還來得及嗎：地圖
  - - meta
    - name: og:description
      content: 以React官方教學為主，從Components由簡入深，跟隨Haruo在iThome鐵人賽中一同成長
  - - meta
    - name: og:image
      content: /og-image.webp
  - - meta
    - property: twitter:title
      content: 現在學React還來得及嗎：地圖
  - - meta
    - name: twitter:description
      content: 以React官方教學為主，從Components由簡入深，跟隨Haruo在iThome鐵人賽中一同成長
  - - meta
    - name: twitter:image
      content: https://haruowang.vercel.app/og-image.webp
---

# 【現在學React還來得及嗎：地圖】

<p><Badge type="info" text="🌳 Evergreen" /></P>

## React Leaflet 1

本身蠻喜歡地圖的，也想過要仔細研究GIS。所以在認識到Mapbox和Leaflet時，就像挖到了寶藏。其中前者是基於OSM的大型地圖服務；而後者正如其名，是個如葉子般輕量級的函式庫。像目前中央氣象局網站上的地圖就是以Leaflet所打造。

Mapbox本身有使用到Leaflet，後者的創辦人Volodymyr Agafonkin自己也在13年加入Mapbox，算是點「本是同根生」的小八卦。

網路上有不少根據Leaflet寫口罩地圖的教學資源，但卻沒看過很多從React Leaflet著手的。兩者的一大差異便是，名字有React的可以爽用宣告式語句。心一橫，想說既然都要投入精神，就來闖比較少人走過的路吧。

這次打算來寫個關於下雨的地圖。

---

第一步先安裝react-leaflet。然後拿官網提供的[set up demo](https://react-leaflet.js.org/docs/start-setup/)試試。

記得要import { MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

![](https://i.imgur.com/y0XhJl2.jpg)

誰曾想，最基礎的畫面卻render成了六親不認的樣子。

查找後發現，除了react-leaflet，leaflet本身仍要載呢。還必須在css裡調整leaflet-container的高度。感謝網友barbalex在issue#1052的[回答](https://github.com/PaulLeCam/react-leaflet/issues/1052#issuecomment-1637057053)。

![](https://i.imgur.com/QX0Qzq0.jpg)

看似一切順利。但等等，地標的icon怎麼不見了……

這算是React Leaflet的坑，沒有把Leaflet預設之圖例移植過來。

我先是在stackoverflow上找到看起來很合理的[解法](https://stackoverflow.com/questions/49441600/react-leaflet-marker-files-not-found)，但依舊無效。

發現邏輯上是更改圖片網址的前綴後，徑直把寫法簡化成了`L.Icon.Default.imagePath = "https://unpkg.com/leaflet/dist/images/";`

![](https://i.imgur.com/pcZ2BO8.jpg)

總算是有個樣子了。

這裡會需要import L from 'leaflet'，而這個L我們後續還會再碰見。

```js
import "./styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import L from "leaflet";
L.Icon.Default.imagePath = "https://unpkg.com/leaflet/dist/images/";

export default function App() {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
```

接著把經緯度改成臺灣的位置；旋即更改布林值，解封滾輪限制。

漸入佳境。再來用好入門的useEffect抓天氣api。

```js
const [data, setData] = useState();
useEffect(() => {
fetch(
  "https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0002-001?Authorization=rdec-key-123-45678-011121314"
)
  .then((res) => res.json())
  .then((resJson) => setData(resJson))
  .catch((err) => console.log(err));
}, []);
```

此時我希望能夠抓到「嘉義」測站即時的雨量資訊，但只要一重新整理就會出事。

隨後就想到，對耶，filter也要寫在useEffect這邊才對。

```js
import "./styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useState, useEffect } from "react";

import L from "leaflet";
L.Icon.Default.imagePath = "https://unpkg.com/leaflet/dist/images/";

export default function App() {
  const [data, setData] = useState();
  useEffect(() => {
    fetch(
      "https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0002-001?Authorization=rdec-key-123-45678-011121314"
    )
      .then((res) => res.json())
      .then(
        (resJson) =>
          resJson.records.Station.filter((s) => s.StationName === "嘉義")[0]
            .RainfallElement.Now.Precipitation
      )
      .then((resJson) => setData(resJson))
      .catch((err) => console.log(err));
  }, []);

  return (
    <MapContainer center={[23.48, 120.45]} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[23.48, 120.45]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
          {JSON.stringify(data)}
        </Popup>
      </Marker>
    </MapContainer>
  );
}
```

中途我也有試過，如果想要嘉義市所有的測站資訊，該怎麼篩選？

```js
.then((resJson) =>
    resJson.records.Station.filter((s) =>
      s.GeoInfo.CountyName.match("嘉義市")
    )
)
```

重頭戲來了：我們要分開取得測站名、雨量和經緯度資訊。

跳出警告Invalid LatLng object: (undefined, 120.45)，其實是useState裡忘記加上初始值0的基本錯誤。記住一個useEffect做一件事的原則，就不會有問題了。

結果程式碼寫著寫著，我發現icon又不見了。一查，原來這次是API的網址連不上。

是不是呼叫上限？或其他問題？這時還沒確定，便決定先睡一覺再說吧。

## React Leaflet 2

![](https://i.imgur.com/g2KK7GX.jpg)

醒來跑去申請氣象資料開放平臺的帳號，還真的解決問題了。

可能政府資料開放平臺給的Api只是測試用吧。

正常來說這個key不該曝光，要ignore一下。但既然接的只是開源資料而非機敏訊息，那倒還好。

![](https://i.imgur.com/0F08y7x.jpg)

```js
import "./styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useState, useEffect } from "react";

import L from "leaflet";
L.Icon.Default.imagePath = "https://unpkg.com/leaflet/dist/images/";

export default function App() {
  const [name, setName] = useState("");
  const [rain, setRain] = useState(0);
  const [la, setLa] = useState(0);
  const [lo, setLo] = useState(0);

  useEffect(() => {
    fetch(
      "https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0002-001?Authorization=你的API key"
    )
      .then((res) => res.json())
      .then(
        (resJson) =>
          resJson.records.Station.filter((s) => s.StationName === "嘉義")[0]
            .StationName
      )
      .then((resJson) => setName(resJson))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(
      "https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0002-001?Authorization=你的API key"
    )
      .then((res) => res.json())
      .then(
        (resJson) =>
          resJson.records.Station.filter((s) => s.StationName === "嘉義")[0]
            .RainfallElement.Now.Precipitation
      )
      .then((resJson) => setRain(resJson))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(
      "https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0002-001?Authorization=你的API key"
    )
      .then((res) => res.json())
      .then(
        (resJson) =>
          resJson.records.Station.filter((s) => s.StationName === "嘉義")[0]
            .GeoInfo.Coordinates[1].StationLatitude
      )
      .then((resJson) => setLa(resJson))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(
      "https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0002-001?Authorization=你的API key"
    )
      .then((res) => res.json())
      .then(
        (resJson) =>
          resJson.records.Station.filter((s) => s.StationName === "嘉義")[0]
            .GeoInfo.Coordinates[1].StationLongitude
      )
      .then((resJson) => setLo(resJson))
      .catch((err) => console.log(err));
  }, []);

  return (
    <MapContainer center={[23.6, 121]} zoom={8} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[la, lo]}>
        <Popup>
          {name}, {rain}mm
        </Popup>
      </Marker>
    </MapContainer>
  );
}
```

進入最期待的環節：幫地圖加上雨勢動畫。

Leaflet的外掛不少，我本來想用Demo畫面看起來很美的Leaflet.Rain，但卻遇上警告：Unable to determine current node version。

怎麼調整都像是渡不了這個難關，似乎也不能排除外掛本身有狀況的可能？

（Github上也看到有開發者回報的isuue還沒被解決）

可惡，我自己用SVG的SMIL Animation畫啦。

```js
const bounds = [
    [23.5, 120.36],
    [23.6, 120.49],
  ];

<SVGOverlay bounds={bounds}>
    <defs>
      <symbol id="drop">
        <line stroke="#4ea6e9" strokeWidth="1%">
          <animate
            attributeName="x1"
            from="30"
            to="0"
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y1"
            from="0"
            to="60"
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="x2"
            from="30"
            to="15"
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y2"
            from="0"
            to="30"
            dur="1s"
            repeatCount="indefinite"
          />
        </line>
      </symbol>
    </defs>
    <use xlinkHref="#drop" x="0" y="0" />
    <use xlinkHref="#drop" x="10%" y="0" />
    <use xlinkHref="#drop" x="20%" y="0" />
    <use xlinkHref="#drop" x="30%" y="0" />
    <use xlinkHref="#drop" x="40%" y="0" />
    <use xlinkHref="#drop" x="50%" y="0" />
    <use xlinkHref="#drop" x="60%" y="0" />
    <use xlinkHref="#drop" x="70%" y="0" />
    <use xlinkHref="#drop" x="80%" y="0" />
    <use xlinkHref="#drop" x="90%" y="0" />
    <use xlinkHref="#drop" x="0" y="45%" />
    <use xlinkHref="#drop" x="10%" y="45%" />
    <use xlinkHref="#drop" x="20%" y="45%" />
    <use xlinkHref="#drop" x="30%" y="45%" />
    <use xlinkHref="#drop" x="40%" y="45%" />
    <use xlinkHref="#drop" x="50%" y="45%" />
    <use xlinkHref="#drop" x="60%" y="45%" />
    <use xlinkHref="#drop" x="70%" y="45%" />
    <use xlinkHref="#drop" x="80%" y="45%" />
    <use xlinkHref="#drop" x="90%" y="45%" />
</SVGOverlay>
```

測試過程中自然也是踩坑連連。像是遇到namespace tag error，意識到是自己沒有把xlink:href改成駝峰式大小寫的xlinkHref；還有SVG動畫不讓我用百分比當單位等。

目前產出之雨勢效果也還不夠漂亮，而且太多重複。因此動用了viewbox優化程式碼。

```js
<SVGOverlay bounds={bounds}>
    <defs>
      <symbol id="drop" viewBox="0 -10 90 10">
        <line stroke="#4ea6e9" strokeWidth="1%">
          <animate
            attributeName="x1"
            from="30"
            to="0"
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y1"
            from="0"
            to="60"
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="x2"
            from="30"
            to="15"
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y2"
            from="0"
            to="30"
            dur="1s"
            repeatCount="indefinite"
          />
        </line>
      </symbol>
    </defs>
    <use xlinkHref="#drop" x="0" y="0" />
    <use xlinkHref="#drop" x="10%" y="0" />
    <use xlinkHref="#drop" x="20%" y="0" />
    <use xlinkHref="#drop" x="30%" y="0" />
    <use xlinkHref="#drop" x="40%" y="0" />
    <use xlinkHref="#drop" x="50%" y="0" />
    <use xlinkHref="#drop" x="60%" y="0" />
    <use xlinkHref="#drop" x="70%" y="0" />
    <use xlinkHref="#drop" x="80%" y="0" />
    <use xlinkHref="#drop" x="90%" y="0" />
</SVGOverlay>
```

然後偷偷把圖資換成Carto上的好看主題。

至此，畫面已是相當還原。

![](https://i.imgur.com/rte0iCp.jpg)

做完視覺，不小心把歪腦筋動到資料上。想說要讓測站定位可以完全依靠API傳來的經緯。

如果「直接」取用API獲得的資料，會發現MapContainer和Marker的position並不一致。這種時候就要引入useMap啦，可以設定初始視圖（setView）；而bounds（雨勢動畫綁定的位置）則用標準的useState + useEffect處理。

不要忘記幫SVG加上Key值！

此時如果把程式碼中的測站名全都從嘉義改成另一個，就可以重新定位了——

![](https://i.imgur.com/yjELoaT.jpg)

再加上一個簡單的邏輯判斷：雨量大於0的時候秀出雨勢動畫，沒下就不顯示。

用簡單的條件渲染就可以實現。

![](https://i.imgur.com/hwxihzO.jpg)

這張地圖好像稍微有點用處了。

[![Edit Leaflet](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/leaflet-5823c4)

```js
import "./styles.css";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  Popup,
  SVGOverlay,
  TileLayer,
  useMap,
} from "react-leaflet";
import { useState, useEffect } from "react";

import L from "leaflet";
L.Icon.Default.imagePath = "https://unpkg.com/leaflet/dist/images/";

function ChangeView({ position }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position);
  }, [position, map]);
  return null;
}

export default function App() {
  const [name, setName] = useState("");
  const [rain, setRain] = useState(0);
  const [la, setLa] = useState(0);
  const [lo, setLo] = useState(0);
  const [bounds, setBounds] = useState([
    [0, 0],
    [0, 0],
  ]);

  const position = [la, lo];

  useEffect(() => {
    fetch(
      "https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0002-001?Authorization=你的API key"
    )
      .then((res) => res.json())
      .then(
        (resJson) =>
          resJson.records.Station.filter((s) => s.StationName === "嘉義")[0]
            .StationName
      )
      .then((resJson) => setName(resJson))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(
      "https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0002-001?Authorization=你的API key"
    )
      .then((res) => res.json())
      .then(
        (resJson) =>
          resJson.records.Station.filter((s) => s.StationName === "嘉義")[0]
            .RainfallElement.Now.Precipitation
      )
      .then((resJson) => setRain(resJson))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(
      "https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0002-001?Authorization=你的API key"
    )
      .then((res) => res.json())
      .then(
        (resJson) =>
          resJson.records.Station.filter((s) => s.StationName === "嘉義")[0]
            .GeoInfo.Coordinates[1].StationLatitude
      )
      .then((resJson) => setLa(resJson))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(
      "https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0002-001?Authorization=你的API key"
    )
      .then((res) => res.json())
      .then(
        (resJson) =>
          resJson.records.Station.filter((s) => s.StationName === "嘉義")[0]
            .GeoInfo.Coordinates[1].StationLongitude
      )
      .then((resJson) => setLo(resJson))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(
      "https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0002-001?Authorization=你的API key"
    )
      .then((res) => res.json())
      .then((resJson) => {
        const station = resJson.records.Station.find(
          (s) => s.StationName === "嘉義"
        );
        const la = station.GeoInfo.Coordinates[1].StationLatitude;
        const lo = station.GeoInfo.Coordinates[1].StationLongitude;
        setBounds([
          [la, lo - 0.07],
          [la + 0.07, lo + 0.05],
        ]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <MapContainer center={position} zoom={12} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          {name}, {rain}mm
        </Popup>
      </Marker>
      <ChangeView position={position} />
      {rain > 0 && (
        <SVGOverlay key={JSON.stringify(bounds)} bounds={bounds}>
          <defs>
            <symbol id="drop" viewBox="0 -10 80 10">
              <line stroke="#4ea6e9" strokeWidth="1%">
                <animate
                  attributeName="x1"
                  from="30"
                  to="0"
                  dur="1s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y1"
                  from="0"
                  to="60"
                  dur="1s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="x2"
                  from="30"
                  to="15"
                  dur="1s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y2"
                  from="0"
                  to="30"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </line>
            </symbol>
          </defs>
          <use xlinkHref="#drop" x="0" y="0" />
          <use xlinkHref="#drop" x="10%" y="0" />
          <use xlinkHref="#drop" x="20%" y="0" />
          <use xlinkHref="#drop" x="30%" y="0" />
          <use xlinkHref="#drop" x="40%" y="0" />
          <use xlinkHref="#drop" x="50%" y="0" />
          <use xlinkHref="#drop" x="60%" y="0" />
          <use xlinkHref="#drop" x="70%" y="0" />
          <use xlinkHref="#drop" x="80%" y="0" />
          <use xlinkHref="#drop" x="90%" y="0" />
        </SVGOverlay>
      )}
    </MapContainer>
  );
}
```

順帶一提：我發現隔壁生態圈也有Vue Leaflet，不愧是挑戰者。

## React Leaflet 3

最後來打造「依測站名稱查詢」的功能。

關鍵字打上React Leaflet Search，有些外掛看起來是包含世界各地的經緯數據。比較廣泛，也不見得會有測站數據。抓input裡的值去改StationName應該比較有效。

一不做二不休，但直接在index寫這樣不行。
```html
<div id="root">
  <div id="search">
    <label>
    鄉鎮別:
    <input placeholder="台北市大安區 or 大安區" />
    <button>查詢</button>
    </label>
  </div>
</div>
```
那麼就再開一個Search組件。

熟悉的紅字最對味：Cannot read properties of null (reading 'value')。直覺是先寫useEffect試試，不過此時還須搭配useRef和useChange才行。

解決完null值問題，再讓input在發生變化時也可以取得最新資訊。

```js
import { useState, useEffect, useRef } from "react";

export default function Search() {
  const [iv, setIv] = useState("");
  const ir = useRef(null);

  useEffect(() => {
    if (ir.current) {
      setIv(ir.current.value);
    }
  }, []);

  const handleChange = (e) => {
    setIv(e.target.value);
  };

  const handleSearch = () => {
    console.log(iv);
  };

  return (
    <div className="search">
      <label>
        站名：
        <input
          ref={ir}
          placeholder="e.g. 阿里山國小"
          onChange={handleChange}
        ></input>
        <button onClick={handleSearch}>查詢</button>
      </label>
    </div>
  );
}
```
接下來用傳遞props的概念，跨JS檔傳遞iv (input value)值。

再稍微整理一下程式碼之後變成這樣：

```js
//Search.js
import "./styles.css";
import "leaflet/dist/leaflet.css";
import { useState, useEffect, useRef } from "react";

export default function Search({ onSearch }) {
  const [iv, setIv] = useState("");
  const ir = useRef(null);

  useEffect(() => {
    if (ir.current) {
      setIv(ir.current.value);
    }
  }, []);

  const handleChange = (e) => {
    setIv(e.target.value);
  };

  const handleSearch = () => {
    onSearch(iv);
  };

  return (
    <div className="search">
      <label>
        站名：
        <input
          ref={ir}
          placeholder="e.g. 阿里山國小"
          onChange={handleChange}
        ></input>
        <button onClick={handleSearch}>查詢</button>
      </label>
    </div>
  );
}
```
```js
//App.js
import "./styles.css";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  Popup,
  SVGOverlay,
  TileLayer,
  useMap,
} from "react-leaflet";
import { useState, useEffect } from "react";
import Search from "./Search";
import L from "leaflet";

L.Icon.Default.imagePath = "https://unpkg.com/leaflet/dist/images/";

function ChangeView({ position }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position);
  }, [position, map]);
  return null;
}

export default function App() {
  const [name, setName] = useState("");
  const [rain, setRain] = useState(0);
  const [la, setLa] = useState(0);
  const [lo, setLo] = useState(0);
  const [bounds, setBounds] = useState([
    [0, 0],
    [0, 0],
  ]);
  const [searchName, setSearchName] = useState("嘉義");

  const position = [la, lo];

  const handleSearch = (value) => {
    setSearchName(value);
  };

  useEffect(() => {
    fetch(
      "https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0002-001?Authorization=你的API key"
    )
      .then((res) => res.json())
      .then(
        (resJson) =>
          resJson.records.Station.filter((s) => s.StationName === searchName)[0]
            .StationName
      )
      .then((resJson) => setName(resJson))
      .catch((err) => console.log(err));
  }, [searchName]);

  useEffect(() => {
    fetch(
      "https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0002-001?Authorization=你的API key"
    )
      .then((res) => res.json())
      .then(
        (resJson) =>
          resJson.records.Station.filter((s) => s.StationName === searchName)[0]
            .RainfallElement.Now.Precipitation
      )
      .then((resJson) => setRain(resJson))
      .catch((err) => console.log(err));
  }, [searchName]);

  useEffect(() => {
    fetch(
      "https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0002-001?Authorization=你的API key"
    )
      .then((res) => res.json())
      .then(
        (resJson) =>
          resJson.records.Station.filter((s) => s.StationName === searchName)[0]
            .GeoInfo.Coordinates[1].StationLatitude
      )
      .then((resJson) => setLa(resJson))
      .catch((err) => console.log(err));
  }, [searchName]);

  useEffect(() => {
    fetch(
      "https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0002-001?Authorization=你的API key"
    )
      .then((res) => res.json())
      .then(
        (resJson) =>
          resJson.records.Station.filter((s) => s.StationName === searchName)[0]
            .GeoInfo.Coordinates[1].StationLongitude
      )
      .then((resJson) => setLo(resJson))
      .catch((err) => console.log(err));
  }, [searchName]);

  useEffect(() => {
    fetch(
      "https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0002-001?Authorization=你的API key"
    )
      .then((res) => res.json())
      .then((resJson) => {
        const station = resJson.records.Station.find(
          (s) => s.StationName === searchName
        );
        const la = station.GeoInfo.Coordinates[1].StationLatitude;
        const lo = station.GeoInfo.Coordinates[1].StationLongitude;
        setBounds([
          [la, lo - 0.07],
          [la + 0.07, lo + 0.05],
        ]);
      })
      .catch((err) => console.log(err));
  }, [searchName]);

  return (
    <>
      <Search onSearch={handleSearch} />
      <MapContainer center={position} zoom={12} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            {name}, {rain}mm
          </Popup>
        </Marker>
        <ChangeView position={position} />
        {rain > 0 && (
          <SVGOverlay key={JSON.stringify(bounds)} bounds={bounds}>
            <defs>
              <symbol id="drop" viewBox="0 -10 80 10">
                <line stroke="#4ea6e9" strokeWidth="1%">
                  <animate
                    attributeName="x1"
                    from="30"
                    to="0"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="y1"
                    from="0"
                    to="60"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="x2"
                    from="30"
                    to="15"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="y2"
                    from="0"
                    to="30"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </line>
              </symbol>
            </defs>
            <use xlinkHref="#drop" x="0" y="0" />
            <use xlinkHref="#drop" x="10%" y="0" />
            <use xlinkHref="#drop" x="20%" y="0" />
            <use xlinkHref="#drop" x="30%" y="0" />
            <use xlinkHref="#drop" x="40%" y="0" />
            <use xlinkHref="#drop" x="50%" y="0" />
            <use xlinkHref="#drop" x="60%" y="0" />
            <use xlinkHref="#drop" x="70%" y="0" />
            <use xlinkHref="#drop" x="80%" y="0" />
            <use xlinkHref="#drop" x="90%" y="0" />
          </SVGOverlay>
        )}
      </MapContainer>
    </>
  );
}
```
我們首先將iv包在onSearch()裡，然後放到Search的括號中，就像props。這樣當使用者在App.js用到Search組件，就可以把躲在onSearch裡的iv值拿來用了。

另一邊，在APP.js裡設定searchName的state，記得不要粗心把初始值一併改成searchName，才不會報錯：Cannot access 'searchName' before initialization。

然後在每個useEffect的依賴項裡填入[searchName]。這樣每當使用者按下查詢引發handleSearch，導致searchName被重新set後，就會從API抓新的值。並且把`<Search>`改成`<Search onSearch={handleSearch} />`，才能真正叫得動handleSearch。

測試時發現有個小缺陷是：如果兩間測站太近，地標icon會比圖資更迫不及待地跑走，哈。

![](https://i.imgur.com/cizrEdV.jpg)

[![Edit Leaflet2](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/leaflet2-cx82y2)

最後的最後，我希望能為欄位加入「搜尋建議」功能。

而react-search-autocomplete正好能滿足所求。

基本上就是把所有測站名稱重新mapping成一個陣列。

在這個陣列裡有很多items。當使用者在選中搜尋建議時，則會重新得到items裡的iv (input value)值，也就是items裡被選中的那個測站名稱。再用onSearch和父組件App.js聯繫。

![](https://i.imgur.com/ChEZOwi.jpg)

一開始搜尋框長得很怪，把原本search的CSS改掉就好了。然而明明能正常傳出數值的查詢按鈕卻無法作用。反倒是框內輸入正確時，只要按enter，視圖就會跳轉。

翻找一下文件，看來這個外掛本來就打算全包搜尋工作。索性讓它克盡己職。整體效果也十分流暢，很滿意。

再把之前沒特別調的margin和padding歸零，實現真正的全螢幕後——

成功建好一張能搜尋某測站有沒有下雨的漂亮地圖，就是完賽的感人時刻了。

[![Edit Leaflet3](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/leaflet3-hdkxkm)

![](https://i.imgur.com/Tpzl4El.jpg)

![](https://i.imgur.com/CwLUN3L.png)

---

感謝終於沒有輕易言棄的自己；也感謝點進來看我絮絮叨叨的你。

四年前剛認識開發人員工具；四年後，若能再和旁人閒聊前端技藝，願我的眼神能更堅定。