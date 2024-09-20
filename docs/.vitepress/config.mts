import { defineConfig } from 'vitepress'

let title = 'Feed Me, Haruo'
let des = 'Digital Garden of Haruo Wang'
let url = 'https://haruowang.vercel.app'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-TW',
  title: title,
  description: des,
  cleanUrls: true, 
  sitemap: {
    hostname: url
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
      'link',
      { rel: 'canonical', href: url }
    ],
    [
      'meta',
      { property: 'og:url', content: url }
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
      { property: 'twitter:domain', content: url }
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
              { text: 'Thinking', link: '/' },
              { text: 'Participation', link: '/pov/participation/susu' },
              { text: 'Other', link: '/' },
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
              { text: 'Dwelling', link: '/' },
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
            { text: '那些我曾經歷的挫敗', link: '/about/lifelog/failure' },
          ]
        },
        {
          text: 'Taste',
          collapsed: false,
          items: [
            { text: '2024的品味', link: '/about/taste/2024' },
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
          ]
        },
        {
          text: 'Publication',
          collapsed: false,
          items: [
            { text: '藝術書展草率季之關鍵字', link: '/pov/publication/tabf' },
            { text: '林小乙的裝幀美學', link: '/pov/publication/lalan' },
          ]
        },
        {
          text: 'Font',
          collapsed: false,
          items: [
            { text: 'The Type：字型知識補帖', link: '/pov/font/the-type' },
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
            { text: '🚧建設中🚧', },
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
          ]
        },
        {
          text: 'Other',
          collapsed: false,
          items: [
            { text: '🚧建設中🚧', },
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
            { text: '🚧建設中🚧', },
          ]
        },
      ],
    },

    outline: {
      label: 'TOC'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/HaruoWang/' }
    ],

    search: {
      provider: 'local'
    },

    footer: {
      copyright: 'Copyright © 2024-present Haruo Wang'
    }
  }
})
