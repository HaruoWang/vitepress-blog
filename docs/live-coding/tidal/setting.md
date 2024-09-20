---
description: SuperCollider回報錯誤訊息，怎麼辦？這時候可以在SuperCollider輸入以下指令後執行：
head:
  - - link
    - rel: canonical
      href: https://haruowang.vercel.app/live-coding/tidal/setting.html
  - - meta
    - property: og:url
      content: https://haruowang.vercel.app/live-coding/tidal/setting.html
  - - meta
    - property: og:title
      content: Tidal x VScode 環境設定
  - - meta
    - name: og:description
      content: SuperCollider回報錯誤訊息，怎麼辦？這時候可以在SuperCollider輸入以下指令後執行：
  - - meta
    - name: og:image
      content: /tidal/se1.webp
  - - meta
    - property: twitter:title
      content: Tidal x VScode 環境設定
  - - meta
    - name: twitter:description
      content: SuperCollider回報錯誤訊息，怎麼辦？這時候可以在SuperCollider輸入以下指令後執行：
  - - meta
    - name: twitter:image
      content: /tidal/se1.webp
---

# Tidal x VScode 環境設定

<p><Badge type="info" text="🌳 Evergreen" /></P>

![Tidal x VScode 環境設定](/tidal/se1.webp)

## 前言

TidalCycles是由Alex McLean開發的領域特定語言（DSL），經常在Live Coding表演中所使用。

本次操作以Win機作為實例。Linux或Mac使用者可以左轉參考[官方文件](https://tidalcycles.org/docs/getting-started/windows_install)，或是留下來看看，要[如何打造更易於操作Tidal的VScode環境](#如何使用vscode操作tidalcycles)。

首先，我沒有選擇Chocolatey做套件管理，而是手動安裝。

安裝需要一點時間，等待途中可以看看我的其他文章（笑）

## 如何在Windows安裝TidalCycles？

#### 一、「以管理員身分」執行Powershell，安裝Haskell

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force;[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; try { Invoke-Command -ScriptBlock ([ScriptBlock]::Create((Invoke-WebRequest https://www.haskell.org/ghcup/sh/bootstrap-haskell.ps1 -UseBasicParsing))) -ArgumentList $true } catch { Write-Error $_ }
```

#### 二、下載並安裝符合規格的[SuperCollider](https://supercollider.github.io/downloads)（簡單）

#### 三、下載[SC3 Plugins](https://github.com/supercollider/sc3-plugins)（簡單）

#### 四、把解壓縮後的SC3plugins資料夾放進這裡

> C:\Users\使用者名\AppData\Local\SuperCollider\Extensions

#### 五、打開SuperCollider，輸入以下指令後執行（Ctrl + Enter），安裝SuperDirt

```
//shiki不支援sclang高亮
Quarks.checkForUpdates({Quarks.install("SuperDirt", "v1.7.3"); thisProcess.recompile()})
```

#### 六、再次「以管理員身分」執行Powershell，讓GHC和Cabal的版本都符合Tidal所求

```powershell
ghcup install ghc 9.6.1
ghcup install cabal 3.10.1.0
ghcup set ghc 9.6.1
ghcup set cabal 3.10.1.0
```

#### 七、同樣在Powershell輸入以下指令，安裝TidalCycles

```powershell
cabal update
cabal v1-install tidal
```

## 如何使用VScode操作TidalCycles？

#### 一、安裝VScode外掛：TidalCycles for VSCode

#### 二、打開SuperCollider，輸入以下指令後執行（Ctrl + Enter）

```
SuperDirt.start
```

#### 三、新增一個tidal檔（檔名是.tidal）

```haskell
d1 $ note "d4 f4 a4 d5" # s "superpiano"
```

#### 四、在VScode裡打開tidal檔，執行（Shift + Enter）

::: details Tips
在SuperCollider裡執行按Ctrl + Enter，在TidalCycles裡執行按Shift + Enter。
:::

#### 五、覺得太吵可以中斷（Ctrl + Alt + H）

## SuperCollider回報錯誤訊息，怎麼辦？

很可能是你的port 57120仍在使用中。這時候可以：

#### 一、在SuperCollider輸入以下指令後執行（Ctrl + Enter）

```
Server.killAll
```

#### 二、重複「如何使用VScode操作TidalCycles？」的步驟二和步驟四

## 如何讓我的VScode更易於操作Tidal？

### 語法突顯

#### 一、安裝VScode外掛：Haskell Syntax Highlighting

#### 二、在VScode按下快速打開（Ctrl + P），找到settings.json

#### 三、在settings.json裡加入以下程式碼

```json
"files.associations": {
    "*.tidal": "haskell"
}
```

#### 四、在VScode按下設定（Ctrl + 逗號），找到Files: Associations

#### 五、Item輸入*.tidal，Value輸入haskell，按OK

#### 六、你會發現你的tidal檔有icon了，程式碼有不同顏色了

### 快速瀏覽音源

#### 一、在VScode按下設定（Ctrl + 逗號），找到Sounds: Paths

#### 二、按下Add Item，輸入以下路徑，按OK

> C:\Users\使用者名\AppData\Local\SuperCollider\downloaded-quarks\Dirt-Samples

#### 三、重開VScode，就可以直接在這裡聆聽或插入音源囉

## 結算畫面

![TidalCycles執行畫面](/tidal/se2.gif)