---
description: 《區塊鏈技術指南》的個人向整理
head:
  - - link
    - rel: canonical
      href: https://haruowang.vercel.app/web3/knowledge/blockchain-guide.html
  - - meta
    - property: og:url
      content: https://haruowang.vercel.app/web3/knowledge/blockchain-guide.html
  - - meta
    - property: og:title
      content: 給自己的區塊鏈指南
  - - meta
    - name: og:description
      content: 《區塊鏈技術指南》的個人向整理
  - - meta
    - name: og:image
      content: /og-image.webp
  - - meta
    - property: twitter:title
      content: 給自己的區塊鏈指南
  - - meta
    - name: twitter:description
      content: 《區塊鏈技術指南》的個人向整理
  - - meta
    - name: twitter:image
      content: https://haruowang.vercel.app/og-image.webp
---

# 給自己的區塊鏈指南

<p><Badge type="info" text="🌱 Seedlings" /></P>

::: info References
[區塊鏈技術指南](https://poweichen.gitbook.io/blockchain-guide-zh)
:::

## 區塊鏈的誕生
- 已知最早的帳本是烏魯克城Kushim泥板
- 複式記帳法源自會計學之父Luca Pacioli
- 2015年底，三十家科技大廠聯合發起，遵循Apache v2的開源項目「超級帳本」（Hyperledger），並由Linux基金會負責管理
### 站在前人肩膀上的比特幣
- e-Cash：由David Chaum提出，不可追蹤但須銀行協助
- HashCash：由Adam Back提出，首次採用PoW對抗DoS
- B-money：由Wei Dai提出，真正去中心但未解決雙重支付問題
- Bit Gold：由Nick Szabo提出，很接近比特幣但未能實現
### Leslie Lamport
- [1979年，提出順序一致性](#一致性問題)
- [1982年，提出拜占庭問題](#拜占庭問題與算法)
- 1984年，開發LaTeX
- [1990年，提出Paxos算法](#paxos算法與raft算法)

## 核心技術概覽
- Hyperledger使用的共識機制包含崩潰容錯（CFT）、拜占庭容錯（BFT）等
- 2016年起，ITU-T在SG16、17及20研究小組中，各自對分散式帳本進行研究
- IEEE透過P2418.2規範區塊鏈格式標準，制定過程與中國關係密切

## 典型應用場景
- 歐洲虛擬通貨：英國RSCoin、荷蘭DNBcoin等
- Blockcerts：MIT Media Lab開發的鏈上學歷證書
- OpenBazaar：2021年停止運行，a16z投資失利的去中心化電商

## 分散式系統核心技術

### 一致性問題
- 順序一致性（Sequential Consistency）：1979年，由Leslie Lamport提出。必須達成全域順序一致
- 線性一致性（Linearizability Consistency）：1990年，由Maurice P. Herlihy與Jeannette M. Wing共同提出。比順序一致性嚴格，要求將全域操作視為單核操作，且能瞬時完成
- 最終一致性（Eventual Consistency）：受到Amazon技術長Werner Vogels推廣而為人熟知。最不嚴格，不要求同步以換取高效能。案例如DNS系統

### FLP不可能原理
- 在一個異步的分散式系統中，只要允許任一節點失效，就不可能有算法能達成共識

### CAP原理
- 在分散式系統中做讀寫操作時，只能確保一致性（Consistency）、可用性（Availability）和分區容錯性（Partition）中的其中兩項。可能的系統多半是AP或CP架構
- AP：弱化一致性，遇到衝突時會回應舊的值，適合SSG或查詢類資料庫等。案例如Gossip Protocol、Apache的資料庫CouchDB和Cassandra
- CP：弱化可用性，遇到衝突時會回應錯誤，適合ATM等。案例如MapReduce架構、MongoDB和Redis資料庫。共識算法Paxos和Raft，便是對應CP而生
- AC：弱化分區容錯性。案例如部分關係型資料庫和Apache ZooKeeper

### ACID原則與多階段提交
- BASE原則：由eBay架構師Dan Pritchett提出，認為大型分散式系統應犧牲對強一致性之追求，即透過最弱的最終一致性來換取可用性
- 比起接近AP的BASE原則，ACID原則更像是CP
- 多階段提交是為了維持一致性，分為2PC和3PC
- 2PC：預提交+正式提交。1979年由Jim Gray提出，簡單但效能差
- 3PC：會先有「嘗試預提交」。知名算法如Paxos

### Paxos算法與Raft算法
- 普通Paxos場景預設處理非拜占庭問題，相關CFT有Paxos和Raft
- 1990年，Leslie Lamport提出Paxos算法
- 2014年，Diego Ongaro和TCL語言之父John Ousterhout共同提出Raft算法
#### Paxos基本原理
- Paxos算法的三種角色是提案者（Proposer）、接受者（Acceptor）和學習者（Learner）
- 提案者通常是客戶端；接受者負責投票，通常是服務端
- 學習者只獲取並傳播結果，不參與投票，客戶端或服務端皆可
- 在多種組合中，「多個提案者+單個接受者」由於原理簡單，被廣泛採用
- 需要滿足Safety和Liveness，確保決議是正確的且能準時發生
- 作為CP架構，Paxos維持一致性的方式，是確保每次達成共識時皆有超過一半節點參與
- Raft算法的三種角色是領導者（Leader）、候選者（Candidate）和跟隨者（Follower）

### 拜占庭問題與算法
- 1982年，Leslie Lamport等學者共同提出拜占庭問題（Byzantine Problem）
- 思考拜占庭問題時通常難以形成共識，案例如殺人遊戲
- 拜占庭錯誤（Byzantine Fault）：有部分節點偽造訊息
- 拜占庭容錯（Byzantine Fault Tolerant）：處理BF的共識算法BFT
- N>=3F+1：叛變者不能多於1/3
- 1999年，Castro和Liskov共同提出實用拜占庭容錯（PBFT），使複雜度不再是指數級
- PBFT能確保N>=3F+1之下的Safety和Liveness

### 可靠性指標
- SLI：服務水準指標
- SLO：SLI + Time Period + Objective
- SLA：根據SLO制定的合約
- MTBF：平均故障間隔時間
- MTTR：平均修復時間

## 密碼學與安全技術
- 1976年，Whitfield Diffie和Martin E. Hellman共同發表論文《New Directions in Cryptography》，開創現代公鑰密碼學
- SM3：2010年發布的中國雜湊算法
- SM2：2010年發布的中國非對稱加密標準
- [WCAP Training：加密算法和數位簽名](../../about/career/wcap-vc.md#加密算法和數位簽名)
- D-H（Diffie-Hellman Key Exchange）：使雙方能安全地進行公鑰交換
- HMAC：雜湊訊息鑑別碼。在開發時適用於不便選擇OAuth或JWT的情境
- PS3破解事件：2010年，駭客組織fail0verflow在混沌通訊大會（CCC）公開Sony PS3的ECDSA漏洞。由於使用到相同的隨機數，私鑰最終被知名駭客George Hotz揭露
- [WCAP Training：數位憑證、PKI和PGP](../../about/career/wcap-vc.md#數位憑證、pki和pgp)
- Merkle Tree可以讓使用者自行做「代管負債證明」，不需要依靠交易所或會計師
- Bloom Filter可基於Hash快速查找，是高效的資料結構
- Bloom Filter不會漏報（False Negative），但有機率誤報（False Positive）
- 同態加密（Homomorphic Encryption）：不用解密也可以獲得和明文一樣的運算結果