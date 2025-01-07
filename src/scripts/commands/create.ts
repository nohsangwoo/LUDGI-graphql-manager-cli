import fs from 'fs'
import path from 'path'
import inquirer from 'inquirer'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import { Table } from 'console-table-printer'
import chalk from 'chalk'
import updateSchemaFile from './helper/updateSchemaFile'
interface CreateOptions {
  name: string
}

const execPromise = promisify(exec)

// 첫 글자를 대문자로 변환하는 헬퍼 함수
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

const updateApisFile = async () => {
  const apisPath = path.join(process.cwd(), 'src/graphql/apis.ts')
  const graphqlPath = path.join(process.cwd(), 'src/graphql')

  // 디렉토리만 필터링
  const directories = fs
    .readdirSync(graphqlPath)
    .filter(item => fs.statSync(path.join(graphqlPath, item)).isDirectory())
    .map(dir => `  ${dir}`)

  // apis.ts 파일 내용 업데이트
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

const create = async (options: CreateOptions) => {
  const { name } = options
  const graphqlPath = path.join(process.cwd(), 'src/graphql')
  const domainPath = path.join(graphqlPath, name)

  // 이미 존재하는지 체크
  if (fs.existsSync(domainPath)) {
    console.error(
      '\x1b[31m%s\x1b[0m',
      `Error: Path already exists: ${domainPath}`,
    )
    process.exit(1)
  }

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: 'Select GraphQL operation type:',
      choices: [
        { name: 'Query - Read operations (Fetch data)', value: 'query' },
        {
          name: 'Mutation - Write operations (Create/Update/Delete)',
          value: 'mutation',
        },
      ],
      default: 'query',
    },
  ])

  const type = answers.type
  console.log('chosen type:', type)

  if (!fs.existsSync(graphqlPath)) {
    console.error('GraphQL directory not found:', graphqlPath)
    return
  }

  try {
    const startTime = Date.now()
    console.log('\n')
    console.log(chalk.blue.bold('🚀 Creating GraphQL Resource...'))
    console.log(chalk.dim('====================================='))

    // 도메인 디렉토리 생성
    if (!fs.existsSync(domainPath)) {
      fs.mkdirSync(domainPath)
    }

    // 필요한 파일들 생성
    const files = [
      {
        name: `${name}.graphql`,
        content: `${type} ${name} {
  ${name} {
    title
    price
    isAvailable
  }
}\n`,
      },
      {
        name: `${name}.resolvers.ts`,
        content: `import type { Context } from '@/graphql/type'
import { ${capitalize(name)}${capitalize(
          type,
        )}Variables } from '@/generated/graphql'

export default {
  ${capitalize(type)}: {
    ${name}: async (
      _parent: any,
      args: ${capitalize(name)}${capitalize(type)}Variables,
      context: Context,
    ) => {
      // TODO: Implement your resolver logic
      return {
        title: "Sample Title",
        price: 1000.0,
        isAvailable: true
      }
    },
  },
}\n`,
      },
      {
        name: `${name}.typeDefs.ts`,
        content: `import { gql } from 'graphql-tag'

export default gql\`
  type ${name}Result {
    title: String!
    price: Float!
    isAvailable: Boolean!
  }

  type ${capitalize(type)} {
    ${name}: ${name}Result!
  }
\`\n`,
      },
    ]

    files.forEach(file => {
      const filePath = path.join(domainPath, file.name)
      fs.writeFileSync(filePath, file.content)
    })

    // schema.ts 파일 업데이트
    await updateSchemaFile()

    console.log('schema.ts updated')

    // 생성된 파일 정보 수집
    const createdFiles = [
      { file: `${name}.graphql`, type: 'Query Definition', status: '✅' },
      { file: `${name}.resolvers.ts`, type: 'Resolver', status: '✅' },
      { file: `${name}.typeDefs.ts`, type: 'Type Definition', status: '✅' },
    ]

    // npm run generate 실행
    console.log(chalk.yellow('\n📦 Generating GraphQL Types...'))
    const { stdout, stderr } = await execPromise('npm run generate', {
      shell: 'bash',
    })

    // apis.ts 파일 업데이트
    await updateApisFile()

    // 실행 결과 테이블 출력
    const resultTable = new Table({
      columns: [
        { name: 'file', title: 'File', alignment: 'left' },
        { name: 'type', title: 'Type', alignment: 'left' },
        { name: 'status', title: 'Status', alignment: 'center' },
      ],
    })

    createdFiles.forEach(file => resultTable.addRow(file))

    console.log('\n')
    console.log(chalk.green.bold('✨ Resource Creation Complete!'))
    console.log(chalk.dim('====================================='))
    console.log('\n📁 Created Files:')
    resultTable.printTable()

    // 폴더 구조 출력
    console.log('\n📂 Folder Structure:')
    console.log(chalk.dim('src/graphql/'))
    console.log(chalk.dim(`└── ${name}/`))
    createdFiles.forEach(file => {
      console.log(chalk.dim(`    └── ${file.file}`))
    })

    // 실행 시간 계산
    const endTime = Date.now()
    const duration = ((endTime - startTime) / 1000).toFixed(2)

    console.log('\n')
    console.log(chalk.dim('====================================='))
    console.log(chalk.green(`✅ Complete in ${duration}s`))
    console.log(chalk.blue(`📍 Location: ${chalk.underline(domainPath)}`))

    if (stderr) {
      console.log('\n')
      console.log(chalk.yellow('⚠️  Warnings:'))
      console.log(chalk.dim(stderr))
    }
  } catch (error) {
    console.log('\n')
    console.error(chalk.red.bold('❌ Error creating GraphQL resource:'))
    console.error(chalk.red(error))
    process.exit(1)
  }
}

export default create
