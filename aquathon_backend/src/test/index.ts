import supertest from 'supertest'
import app from '../app'
import { db, initializeDB } from '../configs/db'
import * as dotenv from 'dotenv'
import path from 'path'

export const appTest = supertest(app)
dotenv.config({ path: path.resolve(__dirname, '../../.env.test') })

export default async function setUp() {
  await initializeDB()

  console.log(db)
  return db.asPromise()
}
