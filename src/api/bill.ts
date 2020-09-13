import axios from 'axios'
import { baseUrl } from './config'

const BillBaseUrl = `${baseUrl}/bill`

export interface BillParams {
  time?: number;
  category?: string;
}

export const getBillList = (params: BillParams = {}) => {
  const { time, category } = params

  return axios.get(`${BillBaseUrl}/list`, {
    params: {
      time,
      category
    }
  })
}

export const getBillCategories = () => axios.get(`${BillBaseUrl}/categories`)

export interface AddBillBody {
  time: number;
  amount: number;
  category: string;
}

export const addBillItem = (data: AddBillBody) => (
  axios.post(`${BillBaseUrl}/addItem`, {
    ...data
  })
)
