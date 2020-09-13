import { createContext } from 'react'
import { BillType } from './components/BillList/Item'
import { BillParams } from './api/bill'

export interface BillSummary {
  [BillType.Income]: number,
  [BillType.Expenditure]: number
}

export interface IBillContext {
  loading?: boolean;
  summary?: BillSummary;
  category?: string;
  changeCategory?: (category: string) => void;
  month?: string;
  changeMonth?: (month: string) => void;
  getBillList?: (params: BillParams) => void;
}

export const BillContext = createContext<IBillContext>({})
