import supertest from 'supertest'
import app from '../app'
import { initializeDB } from '../configs/db'
import path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({ path: path.resolve(__dirname, '../../.env.test') })
async function setUp() {
  try {
    console.log('-=>')
    console.log(process.env.NODE_MONGODB)
    await initializeDB()
  } catch (error) {
    console.log(error)
  }
}

export default setUp
