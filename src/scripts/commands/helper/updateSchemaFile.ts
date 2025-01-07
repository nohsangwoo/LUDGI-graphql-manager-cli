import fs from 'fs'
import path from 'path'

const getAllFiles = (dirPath: string, extension: string): string[] => {
  const files: string[] = []
  const items = fs.readdirSync(dirPath)

  items.forEach(item => {
    const fullPath = path.join(dirPath, item)
    if (fs.statSync(fullPath).isDirectory()) {
      files.push(...getAllFiles(fullPath, extension))
    } else if (item.endsWith(extension)) {
      files.push(fullPath)
    }
  })

  return files
}

const updateSchemaFile = async () => {
  const schemaPath = path.join(process.cwd(), 'src/graphql/schema.ts')
  // let schemaContent = fs.readFileSync(schemaPath, 'utf-8')

  // console.log('schemaContent:', schemaContent)

  const graphqlPath = path.join(process.cwd(), 'src/graphql')
  const resolverFiles = getAllFiles(graphqlPath, '.resolvers.ts')
  const typeDefFiles = getAllFiles(graphqlPath, '.typeDefs.ts')

  // resolvers 배열 업데이트
  const resolversImports = resolverFiles
    .map(file => {
      const fileName = path.basename(file, '.resolvers.ts')
      const relativePath = path.relative(graphqlPath, path.dirname(file))
      return `import ${fileName}Resolvers from './${relativePath}/${fileName}.resolvers'`
    })
    .join('\n')

  const resolversArray = resolverFiles
    .map(file => `  ${path.basename(file, '.resolvers.ts')}Resolvers,`)
    .join('\n')

  // typeDefs 배열 업데이트
  const typeDefsImports = typeDefFiles
    .map(file => {
      const fileName = path.basename(file, '.typeDefs.ts')
      const relativePath = path.relative(graphqlPath, path.dirname(file))
      return `import ${fileName}TypeDefs from './${relativePath}/${fileName}.typeDefs'`
    })
    .join('\n')

  const typeDefsArray = typeDefFiles
    .map(file => `  ${path.basename(file, '.typeDefs.ts')}TypeDefs,`)
    .join('\n')

  // schema.ts 파일 내용 업데이트
  const newSchemaContent = `
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import { makeExecutableSchema } from '@graphql-tools/schema'
${resolversImports}
${typeDefsImports}

export const resolvers = mergeResolvers([
${resolversArray}
])

export const typeDefs = mergeTypeDefs([
${typeDefsArray}
])

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})
  `

  fs.writeFileSync(schemaPath, newSchemaContent)
}

export default updateSchemaFile
