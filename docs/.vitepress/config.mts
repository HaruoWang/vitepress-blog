import { defineConfig } from 'vitepress'
import { RSSOptions, RssPlugin } from 'vitepress-plugin-rss'

let title = 'Feed Me, Haruo'
let baseUrl = 'https://haruowang.vercel.app'
let copyright = 'Copyright © 2024-present Haruo Wang'

let RSS: RSSOptions = {
  title: title,
  baseUrl,
  description: 'Digital Garden of Haruo Wang',
  copyright: copyright,
  filename: 'rss.xml',
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-TW',
  title: title,
  vite: {
    plugins: [RssPlugin(RSS)]
  },
  sitemap: {
    hostname: baseUrl
  },
  head: [
    [
      'script',
      {
        async: '',
        src: 'https://www.googletagmanager.com/gtag/js?id=G-BP9CYL1L50'
      }
    ],
    [
      'script',
      {},
      "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-BP9CYL1L50');"
    ],
    [
      'link',
      { rel: 'apple-touch-icon', sizes: '180x180', href: 'https://haruowang.vercel.app/apple-touch-icon.png' }
    ],
    [
      'link',
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: 'https://haruowang.vercel.app/favicon-32x32.png' }
    ],
    [
      'link',
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: 'https://haruowang.vercel.app/favicon-16x16.png' }
    ],
    [
      'link',
      { rel: 'manifest', href: 'https://haruowang.vercel.app/site.webmanifest' }
    ],
    [
      'link',
      { rel: 'mask-icon', href: 'https://haruowang.vercel.app/safari-pinned-tab.svg', color: '#5bbad5' }
    ],
    [
      'link',
      { name: 'msapplication-TileColor', content: '#da532c' }
    ],
    [
      'link',
      { name: 'theme-color', content: '#ffffff' }
    ],
    [
      'meta',
      { property: 'og:type', content: 'website' }
    ],
    [
      'meta',
      { property: 'twitter:card', content: 'summary_large_image' }
    ],
    [
      'meta',
      { property: 'twitter:site', content: '@WangHaruo' }
    ],
    [
      'meta',
      { property: 'twitter:creator', content: '@WangHaruo' }
    ],
  ],
  markdown: {
    image: {
      lazyLoading: true
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',
    nav: [
      {
        text: 'About',
        items: [
          {
            items: [
              { text: 'About Me', link: '/about/about-me/haruo' },
              { text: 'Lifelog', link: '/about/lifelog/2024' },
              { text: 'Taste', link: '/about/taste/2024' },
              { text: 'Career', link: '/about/career/xchange' },
            ]
          }
        ]
      },
      {
        text: 'POV',
        items: [
          {
            items: [
              { text: 'Art', link: '/pov/art/video-artist' },
              { text: 'Publication', link: '/pov/publication/tabf' },
              { text: 'Font', link: '/pov/font/the-type' },
              { text: 'Color', link: '/pov/color/cie' },
              { text: 'Thinking', link: '/pov/thinking/tourist' },
              { text: 'Participation', link: '/pov/participation/susu' },
              { text: 'Other', link: '/pov/other/ticket' },
            ]
          }
        ]
      },
      {
        text: 'DEV',
        items: [
          {
            items: [
              { text: 'React', link: '/dev/react/ui' },
              { text: 'VitePress', link: '/dev/vitepress/blog' },
              { text: 'Docker', link: '/dev/docker/rsshub' },
            ]
          }
        ]
      },
      {
        text: 'Web3',
        items: [
          {
            items: [
              { text: 'Knowledge', link: '/web3/knowledge/web3' },
              { text: 'Development', link: '/web3/development/chip' },
              { text: 'Gitcoin Grants', link: '/web3/gitcoin-grants/gg18' },
            ]
          }
        ]
      },
      {
        text: 'Live Coding',
        items: [
          {
            items: [
              { text: 'Tidal', link: '/live-coding/tidal/setting' },
              { text: 'Performance', link: '/live-coding/performance/obank' },
            ]
          }
        ]
      },
      {
        text: 'Global',
        items: [
          {
            items: [
              { text: 'Japan', link: '/global/japan/n4' },
              { text: 'English', link: '/global/english/toeic' },
            ]
          }
        ]
      },
      {
        text: 'Wealth',
        items: [
          {
            items: [
              { text: 'Finance', link: '/wealth/finance/securities-specialist' },
              { text: 'Dwelling', link: '/wealth/dwelling/home' },
            ]
          }
        ]
      },
    ],

    sidebar: {
      '/about/': [
        {
          text: 'About Me',
          collapsed: false,
          items: [
            { text: '關於我', link: '/about/about-me/haruo' },
            { text: '普魯斯特問卷', link: '/about/about-me/proust' },
          ]
        },
        {
          text: 'Lifelog',
          collapsed: false,
          items: [
            { text: '2024的生活', link: '/about/lifelog/2024' },
            { text: '2025的生活', link: '/about/lifelog/2025' },
            { text: '那些我曾經歷的挫敗', link: '/about/lifelog/failure' },
            { text: '編輯手記', link: '/about/lifelog/editorial' },
            { text: '部落部落同樂會', link: '/about/lifelog/blogblog' },
          ]
        },
        {
          text: 'Taste',
          collapsed: false,
          items: [
            { text: '2024的品味', link: '/about/taste/2024' },
            { text: '2025的品味', link: '/about/taste/2025' },
          ]
        },
        {
          text: 'Career',
          collapsed: false,
          items: [
            { text: '互聯網大學心得分享', link: '/about/career/xchange' },
            { text: '凌華策展經歷分享', link: '/about/career/adlink' },
            { text: 'Postman黑客松第三名', link: '/about/career/postman' },
            { text: '數位人才探索計畫', link: '/about/career/google-mkt' },
            { text: 'WCAP可驗證憑證培訓', link: '/about/career/wcap-vc' },
          ]
        },
      ],

      '/pov/': [
        {
          text: 'Art',
          collapsed: false,
          items: [
            { text: '幀議人物：影像藝術家36選', link: '/pov/art/video-artist' },
            { text: '松學校導讀：重點筆記', link: '/pov/art/arthon' },
            { text: '臺灣獨立藝術空間檔案計劃', link: '/pov/art/iast' },
            { text: '展學合作：策展研究筆記', link: '/pov/art/curatorial-studies' },
          ]
        },
        {
          text: 'Publication',
          collapsed: false,
          items: [
            { text: '藝術書展草率季之關鍵字', link: '/pov/publication/tabf' },
            { text: '林小乙的裝幀美學', link: '/pov/publication/lalan' },
            { text: '從製稿到估價，一起來印Riso吧', link: '/pov/publication/riso' },
          ]
        },
        {
          text: 'Font',
          collapsed: false,
          items: [
            { text: 'The Type：字型知識補帖', link: '/pov/font/the-type' },
            { text: '數位字型學習筆記', link: '/pov/font/digi' },
          ]
        },
        {
          text: 'Color',
          collapsed: false,
          items: [
            { text: '淺介CIE 1931與1976', link: '/pov/color/cie' },
          ]
        },
        {
          text: 'Thinking',
          collapsed: false,
          items: [
            { text: '《觀光客的哲學》筆記', link: '/pov/thinking/tourist' },
            { text: '紙上地景：徒步者的藝術家書籍', link: '/pov/thinking/walking' },
            { text: '速度與時延：薄邱尼', link: '/pov/thinking/boccioni' },
            { text: '《少女歌劇再生產評論集》筆記', link: '/pov/thinking/revue' },
            { text: '為了不要忘記：《明室》心得', link: '/pov/thinking/lucida' },
            { text: '當夏椿不再失色：《平家物語》', link: '/pov/thinking/heike' },
            { text: '《動物化的後現代》導讀', link: '/pov/thinking/dbanimal' },
            { text: '從後現代角度看《駭客任務》', link: '/pov/thinking/matrix' },
            { text: '千賀健史《自殺潮》淺介', link: '/pov/thinking/kenji' },
            { text: '該如何看待薩爾加多', link: '/pov/thinking/salgado' },
            { text: '《臺灣自然寫作選》心得', link: '/pov/thinking/nature' },
          ]
        },
        {
          text: 'Participation',
          collapsed: false,
          items: [
            { text: '我在晃晃，聽麻子開講', link: '/pov/participation/susu' },
            { text: '開源十年，短講速寫', link: '/pov/participation/ocf' },
            { text: 'V神紀錄片，首映小便箋', link: '/pov/participation/vitalik' },
            { text: '小聚小記：數位皮夾', link: '/pov/participation/did' },
            { text: '小聚小記：AI基本法', link: '/pov/participation/ailaw' },
            { text: '區塊鏈愛好者年會筆記', link: '/pov/participation/tabei' },
          ]
        },
        {
          text: 'Other',
          collapsed: false,
          items: [
            { text: '超迷你文學獎：空白機票', link: '/pov/other/ticket' },
            { text: '《愛動物的人》：試讀短評', link: '/pov/other/animal' },
            { text: '從不倦怠：橫尾忠則', link: '/pov/other/yokoo' },
            { text: '菊地信義的《裝幀人生》', link: '/pov/other/kikuchi' },
            { text: '不期而遇：《菜場搜神記》', link: '/pov/other/suling' },
            { text: '你不能不知道的台藝圖文系友', link: '/pov/other/gca' },
            { text: '吳清友的生命之旅', link: '/pov/other/eslite' },
            { text: '大一生在日星：訪談張介冠', link: '/pov/other/rixing' },
            { text: 'moom bookshop參訪心得', link: '/pov/other/moom' },
            { text: '《裝幀時代》重點筆記', link: '/pov/other/bind60' },
            { text: '《重寫臺灣百年新詩史》筆記', link: '/pov/other/poem100' },
          ]
        },
      ],

      '/dev/': [
        {
          text: 'React',
          collapsed: false,
          items: [
            { text: '現在學React還來得及嗎：UI', link: '/dev/react/ui' },
            { text: '現在學React還來得及嗎：狀態', link: '/dev/react/state' },
            { text: '現在學React還來得及嗎：逃生', link: '/dev/react/escape-hatches' },
            { text: '現在學React還來得及嗎：回顧', link: '/dev/react/recap' },
            { text: '現在學React還來得及嗎：R3F', link: '/dev/react/r3f' },
            { text: '現在學React還來得及嗎：地圖', link: '/dev/react/react-leaflet' },
            { text: '微軟十年收購史', link: '/dev/react/msft' },
            { text: '第一次微調GPT就上手', link: '/dev/react/jotaro' },
            { text: 'Win95俄羅斯方塊', link: '/dev/react/w95' },
          ]
        },
        {
          text: 'VitePress',
          collapsed: false,
          items: [
            { text: '用VitePress玩轉SSG', link: '/dev/vitepress/blog' },
          ]
        },
        {
          text: 'Docker',
          collapsed: false,
          items: [
            { text: '自架RSSHub到Cloudflare', link: '/dev/docker/rsshub' },
          ]
        },
      ],

      '/web3/': [
        {
          text: 'Knowledge',
          collapsed: false,
          items: [
            { text: 'Web3知識庫', link: '/web3/knowledge/web3' },
          ]
        },
        {
          text: 'Development',
          collapsed: false,
          items: [
            { text: '第一次開發NFT就上手', link: '/web3/development/chip' },
            { text: '用thirdweb快速開發dapp', link: '/web3/development/thirdweb' },
            { text: 'Mini App：臺股走勢小鏈遊', link: '/web3/development/tg' },
          ]
        },
        {
          text: 'Gitcoin Grants',
          collapsed: false,
          items: [
            { text: '我和GG18失之交臂的經驗分享', link: '/web3/gitcoin-grants/gg18' },
            { text: '我和GG19舊雨重逢的經驗分享', link: '/web3/gitcoin-grants/gg19' },
          ]
        },
      ],

      '/live-coding/': [
        {
          text: 'Tidal',
          collapsed: false,
          items: [
            { text: 'Tidal x VScode 環境設定', link: '/live-coding/tidal/setting' },
            { text: 'Strudel Work：Persecution Of The Masses', link: '/live-coding/tidal/potm' },
          ]
        },
        {
          text: 'Performance',
          collapsed: false,
          items: [
            { text: '形塑空響：編織中的開放空間', link: '/live-coding/performance/obank' },
            { text: 'Threnoscope Work：Singular Point', link: '/live-coding/performance/threnoscope' },
          ]
        },
      ],

      '/global/': [
        {
          text: 'Japan',
          collapsed: false,
          items: [
            { text: '出口日語N4文法', link: '/global/japan/n4' },
            { text: '東京藝文展館指南', link: '/global/japan/art-guide' },
            { text: 'JobMenta商用日文', link: '/global/japan/work' },
            { text: '内田秀のVlog', link: '/global/japan/shutube' },
            { text: '日本迷你電影院', link: '/global/japan/mini-theater' },
            { text: '《相機女孩漫遊東京》筆記', link: '/global/japan/shutter-girl' },
          ]
        },
        {
          text: 'English',
          collapsed: false,
          items: [
            { text: 'WORD UP藍色證書教材', link: '/global/english/toeic' },
            { text: 'Axios Daily', link: '/global/english/axios' },
            { text: '東吳英文小學堂', link: '/global/english/scu' },
          ]
        },
      ],

      '/wealth/': [
        {
          text: 'Finance',
          collapsed: false,
          items: [
            { text: '證券投資與財務分析', link: '/wealth/finance/securities-specialist' },
            { text: '台灣經濟四百年', link: '/wealth/finance/taiwan400' },
          ]
        },
        {
          text: 'Dwelling',
          collapsed: false,
          items: [
            { text: '居家裝修學習筆記', link: '/wealth/dwelling/home' },
            { text: '房屋租賃買賣筆記', link: '/wealth/dwelling/house' },
          ]
        },
      ],
    },

    outline: {
      label: 'TOC'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/HaruoWang' }
    ],

    search: {
      provider: 'local'
    },

    footer: {
      copyright: copyright
    }
  }
})
