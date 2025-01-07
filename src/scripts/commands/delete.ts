import fs from 'fs'
import path from 'path'
import inquirer from 'inquirer'
import { Table } from 'console-table-printer'
import chalk from 'chalk'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import updateSchemaFile from './helper/updateSchemaFile'

const execPromise = promisify(exec)

const getOperationType = (resolverPath: string): string => {
  try {
    const content = fs.readFileSync(resolverPath, 'utf-8')
    if (content.includes('Query: {')) {
      return '🔍 Query'
    } else if (content.includes('Mutation: {')) {
      return '✏️ Mutation'
    }
    return '📄 Unknown'
  } catch (error) {
    return '❌ Error'
  }
}

const updateApisFile = async () => {
  const apisPath = path.join(process.cwd(), 'src/graphql/apis.ts')
  const graphqlPath = path.join(process.cwd(), 'src/graphql')

  const directories = fs
    .readdirSync(graphqlPath)
    .filter(item => fs.statSync(path.join(graphqlPath, item)).isDirectory())
    .map(dir => `  ${dir}`)

  const apisContent = `import { GraphQLClient } from 'graphql-request'
import { getSdk } from '../generated/graphql'

const API_URL = '/graphql'
const gqlClient = new GraphQLClient(API_URL)

export const { 
${directories.join(',\n')} 
} = getSdk(gqlClient)
`

  fs.writeFileSync(apisPath, apisContent)
}

export default async () => {
  try {
    console.log('\n')
    console.log(chalk.red.bold('🗑️  Delete GraphQL Resource'))
    console.log(chalk.dim('====================================='))

    const graphqlPath = path.join(process.cwd(), 'src/graphql')
    const directories = fs
      .readdirSync(graphqlPath)
      .filter(item => fs.statSync(path.join(graphqlPath, item)).isDirectory())

    if (directories.length === 0) {
      console.log(chalk.yellow('\nℹ️  No GraphQL resources found'))
      return
    }

    // 리소스 목록 테이블 표시
    const table = new Table({
      columns: [
        { name: 'resource', title: 'Resource', alignment: 'left' },
        { name: 'type', title: 'Type', alignment: 'center' },
        { name: 'files', title: 'Files', alignment: 'center' },
      ],
    })

    directories.forEach(dir => {
      const dirPath = path.join(graphqlPath, dir)
      const files = fs.readdirSync(dirPath)
      const resolverFile = files.find(file => file.endsWith('.resolvers.ts'))

      let type = '📄 Type Only'
      if (resolverFile) {
        const resolverPath = path.join(dirPath, resolverFile)
        type = getOperationType(resolverPath)
      }

      table.addRow({
        resource: dir,
        type: type,
        files: `${files.length} files`,
      })
    })

    console.log('\n📦 Available Resources:')
    table.printTable()

    // 사용자 선택
    const { selectedResource } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedResource',
        message: 'Select a resource to delete:',
        choices: directories,
      },
    ])

    // 삭제 확인
    const { confirmation } = await inquirer.prompt([
      {
        type: 'input',
        name: 'confirmation',
        message: chalk.red(
          `⚠️  DANGER: Type 'delete' to confirm removing ${selectedResource}:`,
        ),
        validate: (input: string) => {
          if (input === 'delete') return true
          return 'Please type "delete" to confirm'
        },
      },
    ])

    if (confirmation === 'delete') {
      const resourcePath = path.join(graphqlPath, selectedResource)

      console.log(chalk.yellow('\n🗑️  Removing files...'))
      fs.rmSync(resourcePath, { recursive: true })

      // schema.ts 파일 업데이트
      await updateSchemaFile()
      console.log('schema.ts updated')

      // npm run generate 실행
      console.log(chalk.yellow('\n📦 Updating GraphQL types...'))
      const { stdout, stderr } = await execPromise('npm run generate', {
        shell: 'bash',
      })

      if (stderr) {
        console.log(chalk.yellow('\n⚠️  Generation warnings:'))
        console.log(chalk.dim(stderr))
      }

      // apis.ts 업데이트
      await updateApisFile()

      console.log('\n')
      console.log(chalk.green.bold('✨ Resource Deletion Complete!'))
      console.log(chalk.dim('====================================='))
      console.log(chalk.green(`✅ Successfully removed: ${selectedResource}`))

      // 삭제된 파일 정보 표시
      const deletedTable = new Table({
        columns: [
          { name: 'action', title: 'Action', alignment: 'left' },
          { name: 'status', title: 'Status', alignment: 'center' },
        ],
      })

      deletedTable.addRow({
        action: `Remove ${selectedResource} directory`,
        status: '✅',
      })
      deletedTable.addRow({
        action: 'Update GraphQL types',
        status: '✅',
      })
      deletedTable.addRow({
        action: 'Update APIs file',
        status: '✅',
      })

      console.log('\n')
      deletedTable.printTable()
    } else {
      console.log(chalk.yellow('\n⚠️  Deletion cancelled'))
    }
  } catch (error) {
    console.log('\n')
    console.error(chalk.red.bold('❌ Error deleting GraphQL resource:'))
    console.error(chalk.red(error))
  }
}
