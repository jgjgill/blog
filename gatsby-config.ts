import type { GatsbyConfig } from 'gatsby'

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: `https://jgjgill-blog.netlify.app/`,
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
            nodes: { frontmatter: { date: string; slug: string } }[]
            group: { fieldValue: string }[]
          }
        }) => {
          const posts = nodes.map((node) => ({
            path: `/blog/${node.frontmatter.slug}`,
            lastmod: node.frontmatter.date,
          }))

          const home = {
            path: '/',
            lastmod: posts[0].lastmod,
          }

          const categories = group.map((node) => ({
            path: `/category/${node.fieldValue}`,
            lastmod: posts[posts.length - 1].lastmod,
          }))

          return [...posts, ...categories, home]
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
      },
    },
    // gatsby-plugin-offline: manifest.webmanifest 캐시 생성을 위해 manifest 플러그인 이후에 위치
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        workboxConfig: {
          globPatterns: ['src/images/favicon-path*'],
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
  ],
}

export default config
