import axios from 'axios'

const baseUrl = 'http://localhost:5000/bill'

export interface BillParams {
  time?: number;
  category?: string;
}

export const getBillList = (params: BillParams = {}) => {
  const { time, category } = params

  return axios.get(`${baseUrl}/list`, {
    params: {
      time,
      category
    }
  })
}

export const getBillCategories = () => axios.get(`${baseUrl}/categories`)

export interface AddBillBody {
  time: number;
  amount: number;
  category: string;
}

export const addBillItem = (data: AddBillBody) => (
  axios.post(`${baseUrl}/addItem`, {
    ...data
  }).catch((err) => {
    window.console.log(err)
  })
)
