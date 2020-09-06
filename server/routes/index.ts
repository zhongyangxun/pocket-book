import { Application } from 'express'
import bill from './bill'

const routes = (app: Application) => {
  app.use('/bill', bill)
}

export default routes
