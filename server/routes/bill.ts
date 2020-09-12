import express from 'express'
import path from 'path'
import { promises as fs } from 'fs'
import parse from 'csv-parse/lib/sync'
import Joi, { ObjectSchema } from 'joi'

const route = express.Router()

enum BillType {
  Income = '1',
  Expenditure = '0'
}

interface OriginBillItem {
  type: BillType;
  time: string | number;
  amount: string | number;
  category: string;
}

interface BillItem extends OriginBillItem {
  id: string;
  time: number;
  amount: number;
  categoryName: string;
}

interface CateGoryItem {
  id: string;
  type: BillType;
  name: string;
}

const readCateGries = async (): Promise<CateGoryItem[]> => {
  let categories = []
  const data = await fs.readFile(path.resolve(__dirname, '../data/categories.csv'))

  categories = parse(data, {
    columns: true,
    skip_empty_lines: true
  })

  return categories
}

const validateErrorMessage = (error: Joi.ValidationError) => {
  const [firstDetail] = error.details
  const { message } = firstDetail
  return message
}

const createListReqQuerySchema = (categoryIds: string[]): ObjectSchema => {
  const listReqQuerySechame = Joi.object({
    time: Joi.date().timestamp('javascript'),
    category: Joi.allow(...categoryIds, '').only()
  })

  return listReqQuerySechame
}

const compareListItem = (item: BillItem, nextItem: BillItem) => {
  const { time } = item
  const { time: nextItemTime } = nextItem

  if (time > nextItemTime) {
    return -1
  }

  if (item < nextItem) {
    return 1
  }

  return 0
}

route.get('/list', async (req, res) => {
  const categories = await readCateGries()
  const categoryIds = categories.map(({ id }: { id: string }) => id)

  const listReqQuerySechame = createListReqQuerySchema(categoryIds)

  const validateResult = listReqQuerySechame.validate(req.query)
  const { error } = validateResult

  if (!error) {
    fs.readFile(path.resolve(__dirname, '../data/bill.csv'))
      .then((data) => {
        const { time: queryTime, category: queryCategory } = req.query
        const typeSummary = {
          [BillType.Income]: 0,
          [BillType.Expenditure]: 0
        }

        const outputList = parse(data, {
          columns: true,
          skip_empty_lines: true
        })

        let list: BillItem[] = outputList.map((item: OriginBillItem, index: number) => {
          const {
            type,
            time,
            category,
            amount
          } = item

          const newItem = {
            id: `${index}`,
            type,
            time: parseInt(time as string, 10),
            categoryName: categories.find((cate) => cate.id === category)?.name,
            category,
            amount: parseFloat(amount as string)
          }
          return newItem
        })

        if (queryTime) {
          const date = new Date(parseInt(queryTime as string, 10))
          const year = date.getFullYear()
          const month = date.getMonth()

          list = list.filter(({ time: itemTime }: BillItem) => {
            const itemDate = new Date(itemTime)
            const itemYear = itemDate.getFullYear()
            const itemMonth = itemDate.getMonth()

            return itemMonth === month && itemYear === year
          })
        }

        if (queryCategory) {
          list = list.filter(({ category: itemCateory }) => itemCateory === queryCategory)
        }

        list.forEach((item: BillItem) => {
          typeSummary[item.type] += item.amount as number
        })

        list.sort(compareListItem)

        res.send({
          list,
          typeSummary
        })
      })
  } else {
    res.status(400).send({
      message: validateErrorMessage(error)
    })
  }
})

route.get('/categories', async (req, res) => {
  const categories = await readCateGries()
  res.send(categories)
})

const createAddItemReqBodySchema = (categoryIds: string[]): ObjectSchema => {
  const addItemSchema = Joi.object({
    time: Joi.date().timestamp('javascript').required(),
    category: Joi.allow(...categoryIds).only().required(),
    amount: Joi.number().positive().required()
  })

  return addItemSchema
}

route.post('/addItem', async (req, res) => {
  const {
    time,
    category,
    amount
  } = req.body

  const categories = await readCateGries()
  const categoryIds = categories.map(({ id }: { id: string}) => id)

  const addItemSchema = await createAddItemReqBodySchema(categoryIds)
  const validateResult = addItemSchema.validate(req.body)

  const { error } = validateResult
  if (!error) {
    const { type } = categories.find(({ id }: { id: string }) => id === category) as CateGoryItem
    const serializedData = `\n${type},${time},${category},${amount}`

    fs.appendFile(path.resolve(__dirname, '../data/bill.csv'), serializedData)
      .then(() => {
        res.send({
          message: 'success'
        })
      })
  } else {
    res.status(400).send({
      message: validateErrorMessage(error)
    })
  }
})

export default route
