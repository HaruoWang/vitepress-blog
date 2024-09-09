import { defineConfig } from 'vitepress'

let title = 'Feed Me, Haruo'
let des = 'Digital Garden of Haruo Wang'
let url = 'https://haruowang.vercel.app'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-TW',
  title: title,
  description: des,
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
      { rel: 'apple-touch-icon', sizes: '180x180', href: 'fav/apple-touch-icon.png' }
    ],
    [
      'link',
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: 'fav/favicon-32x32.png' }
    ],
    [
      'link',
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: 'fav/favicon-16x16.png' }
    ],
    [
      'link',
      { rel: 'manifest', href: 'site.webmanifest' }
    ],
    [
      'link',
      { rel: 'mask-icon', href: 'fav/safari-pinned-tab.svg', color: '#5bbad5' }
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
      { property: 'og:title', content: title }
    ],
    [
      'meta',
      { property: 'og:description', content: des }
    ],
    [
      'meta',
      { property: 'og:image', content: '/og-image.webp' }
    ],
    [
      'meta',
      { property: 'twitter:card', content: 'summary_large_image' }
    ],
    [
      'meta',
      { property: 'twitter:domain', content: url }
    ],
    [
      'meta',
      { property: 'twitter:title', content: title }
    ],
    [
      'meta',
      { property: 'twitter:description', content: des }
    ],
    [
      'meta',
      { property: 'twitter:image', content: '/og-image.webp' }
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
              { text: 'Participation', link: '/' },
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
            ]
          }
        ]
      },
      {
        text: 'Web3',
        items: [
          {
            items: [
              { text: 'Knowledge', link: '/' },
              { text: 'Development', link: '/' },
              { text: 'Gitcoin Grants', link: '/' },
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
              { text: 'Japan', link: '/' },
              { text: 'English', link: '/' },
            ]
          }
        ]
      },
      {
        text: 'Wealth',
        items: [
          {
            items: [
              { text: 'Finance', link: '/' },
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
            { text: '數位人才探索計畫', link: '/about/career/google-mkt' },
          ]
        },
      ],

      '/pov/': [
        {
          text: 'Art',
          collapsed: false,
          items: [
            { text: '幀議人物', link: '/pov/art/video-artist' },
            { text: '松學校', link: '/pov/art/arthon' },
            { text: 'IAST', link: '/pov/art/iast' },
          ]
        },
        {
          text: 'Publication',
          collapsed: false,
          items: [
            { text: '草率季', link: '/pov/publication/tabf' },
            { text: '蘭蘭', link: '/pov/publication/lalan' },
          ]
        },
        {
          text: 'Font',
          collapsed: false,
          items: [
            { text: 'The Type', link: '/pov/font/the-type' },
          ]
        },
        {
          text: 'Color',
          collapsed: false,
          items: [
            { text: 'Cie', link: '/pov/color/cie' },
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
            { text: '🚧建設中🚧', },
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
      ],

      '/web3/': [
        {
          text: 'Knowledge',
          collapsed: false,
          items: [
            { text: '🚧建設中🚧', },
          ]
        },
        {
          text: 'Development',
          collapsed: false,
          items: [
            { text: '🚧建設中🚧', },
          ]
        },
        {
          text: 'Gitcoin Grants',
          collapsed: false,
          items: [
            { text: '🚧建設中🚧', },
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
            { text: 'N4', link: '/' },
            { text: 'Travel', link: '/' },
            { text: 'Work', link: '/' },
            { text: 'ShuTube', link: '/' },
          ]
        },
        {
          text: 'English',
          collapsed: false,
          items: [
            { text: 'TOEIC', link: '/' },
            { text: 'Axios', link: '/' },
            { text: '東吳英文系小學堂', link: '/' },
          ]
        },
      ],

      '/wealth/': [
        {
          text: 'Finance',
          collapsed: false,
          items: [
            { text: '現在學React還來得及嗎：UI', link: '/' },
          ]
        },
        {
          text: 'Dwelling',
          collapsed: false,
          items: [
            { text: '現在學React還來得及嗎：UI', link: '/' },
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
