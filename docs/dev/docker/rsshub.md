---
description: 使用Docker Compose將RSSHub架設到Cloudflare，並取得開源貢獻之經驗分享
head:
  - - link
    - rel: canonical
      href: https://haruowang.vercel.app/dev/docker/rsshub
  - - meta
    - property: og:url
      content: https://haruowang.vercel.app/dev/docker/rsshub
  - - meta
    - property: og:title
      content: 自架RSSHub到Cloudflare
  - - meta
    - name: og:description
      content: 使用Docker Compose將RSSHub架設到Cloudflare，並取得開源貢獻之經驗分享
  - - meta
    - name: og:image
      content: /docker/do1.webp
  - - meta
    - property: twitter:title
      content: 自架RSSHub到Cloudflare
  - - meta
    - name: twitter:description
      content: 使用Docker Compose將RSSHub架設到Cloudflare，並取得開源貢獻之經驗分享
  - - meta
    - name: twitter:image
      content: /docker/do1.webp
---

# 自架RSSHub到Cloudflare

<p><Badge type="info" text="🌿 Budding" /></P>

![RSSHub](/docker/do1.webp)

## 基本設定

- 安裝Docker Desktop
- 新增docker-compose.yml
- 複製[官方配置](https://github.com/DIYgod/RSSHub/blob/master/docker-compose.yml)
- 在終端機輸入`docker-compose up -d`

以RSSHub為例，localhost會在1200。

話說version現在似乎是被棄用了，會跳出obsolete警示。

## 新增網域

免費託管基本上都不會讓使用者管理DNS record。

所以我先去Cloudflare，乖乖花新台幣141元買了[rsshw.win](https://rsshw.win/)。

但一年後可能也不會再續約就是（笑），等到2025年9月再說。

## Cloudflare Tunnel

去zero trust申請免費帳號。好了之後到networks > tunnels > add a tunnel，選擇cloudflared。

點開有三個點的選單，進configure，開始調public hostname。type選http，URL寫rsshub:1200。

![Cloudflare Public Hostname Page](/docker/do2.webp)

這樣就可以將localhost映射出去了。記得在docker-compose裡加上這段後，再`up -d`一次。

```yml
cloudflared:
    image: cloudflare/cloudflared:latest
    restart: always
    command: tunnel run
    environment:
    - TUNNEL_TOKEN=$CF_TUNNEL_TOKEN
```

![Cloudflare Public Hostname Page](/docker/do3.webp)

## 實務應用

請參考[RSSHub路由文件](https://docs.rsshub.app/routes/popular)。

譬如輸入[https://rsshw.win/github/activity/HaruoWang](https://rsshw.win/github/activity/HaruoWang)就會出現我的開發歷程：

![Github User Activities ](/docker/do4.webp)

## Error 1033

我想是因為我的docker host在自家電腦上，所以只要關機，Docker Engine就會關閉。

有調整過restart policy和Daemon，但不管always/unless-stopped或"live-restore": true，都不起作用。

或許要把docker-compose推到不用關閉的虛擬主機？這部分就留待未來研究吧。

![Error 1033 Argo Tunnel error](/docker/do5.webp)

## 開源貢獻

第一次發PR。

![First pull request](/docker/do6.webp)

擺了三天後終於被merge了。

![rsshub-docs add new instances](/docker/do7.webp)

登上RSSHub官網的[Public Instances](https://docs.rsshub.app/guide/instances)啦。

![RSSHub Public Instances](/docker/do8.webp)

## 後記

我是在[Kalan's Blog](https://blog.kalan.dev/posts/rss-revival-and-attention)認識RSSHub的。

以此開展的一連串行動，令我想起在[《網路社會學通訊》](https://www.nhu.edu.tw/~society/e-j/81/81-07.htm)讀到的一句好話：

> Goodwill is the best freeware.

為這篇短文收尾，可以說再好不過了。

## [專案連結](https://github.com/HaruoWang/rsshw)