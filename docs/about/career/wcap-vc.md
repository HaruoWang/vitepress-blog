---
description: 參與2025年WCAP VC Training的知識點整理
head:
  - - link
    - rel: canonical
      href: https://haruowang.vercel.app/about/career/wcap-vc.html
  - - meta
    - property: og:url
      content: https://haruowang.vercel.app/about/career/wcap-vc.html
  - - meta
    - property: og:title
      content: WCAP Training：從數位憑證到可驗證憑證
  - - meta
    - name: og:description
      content: 參與2025年WCAP VC Training的知識點整理
  - - meta
    - name: og:image
      content: /career/wv2.webp
  - - meta
    - property: twitter:title
      content: WCAP Training：從數位憑證到可驗證憑證
  - - meta
    - name: twitter:description
      content: 參與2025年WCAP VC Training的知識點整理
  - - meta
    - name: twitter:image
      content: https://haruowang.vercel.app/career/wv2.webp
---

# 【WCAP Training：從數位憑證到可驗證憑證】

<p><Badge type="info" text="🌳 Evergreen" /></P>

::: info 2025/11 - 2025/11
WCAP可驗證憑證培訓課程 結業
:::

![WCAP VC Training結業證書](/career/wv1.webp)

## 數位憑證、PKI和PGP

- PKI（Public Key Infrastructure）：，將各種資訊打包成CSR（Certificate Signing Request）給CA（Certificate Authority）的系統，如券商憑證。其中CSR文件可使用OpenSSL產生
- PGP（Pretty Good Privacy）：，一種採用WoT（Web of Trust）的PKI加密方式
- PKI規模較大，由CA進行驗證，簽發數位憑證（Digital Certificate）。因Netscape的SSL而生；PGP規模較小，由使用者互相驗證，不經CA。源自Phil Zimmermann，與IETF合作的標準為OpenPGP
- SSH（Secure Shell）：類似SSL/TLS，但和PGP一樣不經CA。為Github連線方式之一
- Root Certificate：即瀏覽器中（如Chrome Root Store）預先安裝的根憑證，擔任Trust Anchor角色。參見中華電信事件
- X.509：數位憑證標準
- OSCP（Online Certificate Status Protocol）：可即時查詢線上憑證狀態的協定
- 2003年，根據Forbes資料所示，證書偽造產業鏈可創造70億美元產值

## 加密算法和數位簽名

- Symmetric/Common-key Cryptography：對稱加密／共有密鑰加密。如DES、AES
- Asymmetric/Public-key Cryptography：非對稱加密／公鑰加密。如RSA、DSA、ECDSA
- Hybrid Cryptography：混合加密。訊息封裝用對稱，金鑰封裝用非對稱，速度還是快
- 公鑰是拿來傳送和驗證的，私鑰只是用來簽章雜湊值
- encrypt可以decrypt，hash不能
- hash可以讓無論多大的資料都變成同樣長度的字串
- salt：密碼加鹽

## 數位簽名

Sender
1. 產生公私鑰對
2. 將明文雜湊成簽名
3. 使用私鑰進行簽章
4. 將明文、公鑰和簽名一起傳送

Receiver
1. 對收到的明文進行雜湊
2. 使用收到的公鑰驗證，確認身分
3. 比對兩端的雜湊值是否一致（送來的簽名 = 在此雜湊的明文）

## DID

- DID（Decentralized Identifier）：去中心化標示符
- DID Document包含DID和公鑰
- 可用DID URL指向特定位址，如did:example:123456789abcdefghi#keys-1
- 目前常用的DID格式是JSON-LD

## 可驗證憑證、IHV model和產業應用

- VC（Verifiable Credential）：可驗證憑證。遵循W3C的DID標準
- SD（Selective Disclosure）：選擇性揭露。適用於買酒等時機
- VP（Verifiable Presentation）：可驗證展示文件。即使用者決定要揭露的VC部分，達成SD
- VC的組成：Credentail Metadata + Claim + Proof
- IHV模型：Issuer → Holder → Verifier
- VC的精神就是，Verifier想驗證時不須聯繫Issuer
- Issuer和Holder雙方先向Registry註冊DID Document，然後IH之間做VC Issuing&Auth，最後由Verifier根據DID的公鑰進行Verifing
![IHV model](/career/wv2.webp)
- Meta Akita與Heirloom合作，為秋田犬協會提供Digital Pedigree
- Heirloom在知名演唱會Coachella也有使用VC進行承包商管理

## 身分和登入

- ISO對於身分的定義：ISO/IEC 24760–1:2019
- entity下有attribute和identity，像是鍵值對
- Identifier就是用來區分identity
- identity verification：確認現實身分
- user authentication：確認使用者身分
- SSI（Self-sovereign Identity）：身分自主權
- IMS（Identity Management Model）：身分管理系統
- IMS可分為Centralized Identity Management Model和Federation Model，即一般登入和社交帳號登入
- SAML（Security Assertion Markup Language）：基於XML
- OIDC（OpenID Connect）：基於JWT
- SAML中，SP（Service Provider）依賴於IdP（Identity Provider）；OIDC中，RP（Relying Party）依賴於OP（OpenID Provider）
- WebAuthn：採用FIDO2規範。常搭配生物識別或實體金鑰
- FIDO2包含WebAuthn和CTAP（Client-to-Authenticator Protocol）

## 感言

這次很幸運，剛好有機會到digiBlock C 數位創新基地，參與W3C子組織WCAP（亞太網路聯盟）和資策會合辦，並由Internet Academy所執行的[「可驗證憑證培訓課」（Verifiable Credentials Training）](https://wcap.jp/training/taiwan2025/)。後者採用的數位學習平台是BOHR for Business，使用下來也蠻直觀順利的。特別感謝，講師湖林貴子兩天下來的授課。

延伸閱讀：[【小聚小記：數位皮夾】 | Feed Me, Haruo](https://haruowang.vercel.app/pov/participation/did.html)