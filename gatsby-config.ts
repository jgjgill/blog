/* eslint-disable max-lines */
import type { GatsbyConfig } from 'gatsby'

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'jgjgill-blog',
    description: 'frontend developer jgjgill blog',
    author: 'jgjgill',
    siteUrl: `https://jgjgill-blog.netlify.app/`,
  },
  flags: {
    DEV_SSR: true,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-root-import',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-fusejs',
      options: {
        query: `
          {
            allMdx(
              filter: { fields: { source: { eq: "contents" } } }
            ) {
              nodes {
                id
                frontmatter {
                  title
                  date
                  slug
                  category
                  thumbnail_alt
                  thumbnail {
                    childImageSharp {
                      gatsbyImageData(transformOptions: { fit: FILL })
                    }
                  }
                }
                excerpt
              }
            }
          }
        `,
        keys: ['frontmatter.title', 'excerpt'],
        normalizer: ({ data }: any) =>
          data.allMdx.nodes.map((node: any) => ({
            id: node.id,
            frontmatter: {
              title: node.frontmatter.title,
              slug: node.frontmatter.slug,
              date: node.frontmatter.date,
              category: node.frontmatter.category,
              thumbnail_alt: node.frontmatter.thumbnail_alt,
              thumbnail: node.frontmatter.thumbnail,
            },
            excerpt: node.excerpt,
          })),
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
      {
        site {
          siteMetadata {
            title
            description
            siteUrl
            site_url: siteUrl
          }
        }
      }`,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }: any) => {
              return allMdx.nodes.map((node: any) => {
                return Object.assign({}, node.frontmatter, {
                  title: node.frontmatter.title,
                  description: node.frontmatter.description ?? node.frontmatter.title,
                  date: new Date(node.frontmatter.date),
                  url: `${site.siteMetadata.siteUrl}/${node.frontmatter.type}/${node.frontmatter.slug}`,
                  guid: `${site.siteMetadata.siteUrl}/${node.frontmatter.type}/${node.frontmatter.slug}`,
                  custom_elements: [{ 'content:encoded': node.body }],
                })
              })
            },
            query: `
              {
                allMdx(sort: {frontmatter: {date: DESC}}) {
                  nodes {
                    frontmatter {
                      title
                      date
                      description
                      slug
                      type
                    }
                    body
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: "jgjgill's RSS Feed",
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: { rule: { include: /\.inline\.svg$/ } },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://jgjgill-blog.netlify.app/',
        sitemap: 'https://jgjgill-blog.netlify.app/sitemap-index.xml',
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allMdx(sort: {frontmatter: {date: DESC}}) {
              group(field: {frontmatter: {category: SELECT}}) {
                fieldValue
              }
              nodes {
                frontmatter {
                  slug
                  date
                  type
                }
              }
            }
          }
        `,
        resolveSiteUrl: () => `https://jgjgill-blog.netlify.app/`,
        resolvePages: ({
          allMdx: { nodes, group },
        }: {
          allMdx: {
            nodes: {
              frontmatter: { date: string; slug: string; type: 'post' | 'road' }
            }[]
            group: { fieldValue: string }[]
          }
        }) => {
          const posts = nodes.map((node) => ({
            path: `/${node.frontmatter.type}/${node.frontmatter.slug}`,
            lastmod: node.frontmatter.date,
          }))

          const home = {
            path: '/',
            lastmod: posts[0].lastmod,
          }

          const about = {
            path: '/about',
            lastmod: posts[0].lastmod,
          }

          const categories = group.map((node) => ({
            path: `/post/category/${node.fieldValue}`,
            lastmod: posts[posts.length - 1].lastmod,
          }))

          return [...posts, ...categories, about, home]
        },
        serialize: ({ path, lastmod }: { path: string; lastmod: string }) => {
          return {
            url: path,
            lastmod,
            changefreq: 'daily',
            priority: 0.7,
          }
        },
      },
    },
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [process.env.GA_TRACKING_ID],
        pluginConfig: {
          head: true,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-autolink-headers',
          },
          // gatsby-remark-autolink-headers: gatsby-remark-prismjs 앞에 위치
          // https://github.com/gatsbyjs/gatsby/issues/5764
          {
            resolve: 'gatsby-remark-prismjs',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `jgjgill-blog`,
        short_name: `jgjgill-blog`,
        start_url: `/`,
        background_color: `#f0abfc`,
        theme_color: `#c471f5`,
        display: `standalone`,
        icon: 'src/images/icon.png',
        cache_busting_mode: 'none',
        icon_options: {
          // For all the options available,
          // please see the section "Additional Resources" below.
          purpose: `any maskable`,
        },
      },
    },
    // gatsby-plugin-offline: manifest.webmanifest 캐시 생성을 위해 manifest 플러그인 이후에 위치
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        workboxConfig: {
          runtimeCaching: [
            {
              // 광고 관련 도메인은 항상 네트워크에서 로드 (캐싱 방지)
              urlPattern:
                /^https:\/\/(pagead2\.googlesyndication\.com|googleads\.g\.doubleclick\.net|www\.googletagservices\.com)/,
              handler: 'NetworkOnly',
            },
            {
              urlPattern: /(\.js$|\.css$|static\/)/,
              handler: 'CacheFirst',
            },
            {
              urlPattern: /^https?:.*\/page-data\/.*\.json/,
              handler: 'StaleWhileRevalidate',
            },
            {
              urlPattern:
                /^https?:.*\.(png|jpg|jpeg|webp|avif|svg|gif|tiff|js|woff|woff2|json|css)$/,
              handler: 'StaleWhileRevalidate',
            },
            {
              urlPattern: /^https?:\/\/fonts\.googleapis\.com\/css/,
              handler: 'StaleWhileRevalidate',
            },
          ],
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `contents`,
        path: `${__dirname}/contents/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `roads`,
        path: `${__dirname}/roads/`,
      },
    },
  ],
}

export default config
