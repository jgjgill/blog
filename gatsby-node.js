const path = require('path')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const categoryTemplate = path.resolve('src/templates/CategoryTemplate.tsx')
  const result = await graphql(`
    {
      allMdx {
        group(field: { frontmatter: { category: SELECT } }) {
          fieldValue
        }
      }
    }
  `)

  const categories = result.data.allMdx.group

  categories.forEach((category) => {
    createPage({
      path: `/category/${category.fieldValue}`,
      component: categoryTemplate,
      context: {
        category: category.fieldValue,
      },
    })
  })
}
