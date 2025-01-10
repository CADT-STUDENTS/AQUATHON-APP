import * as dotenv from 'dotenv'
import path from 'path'
import { initializeDB } from '../configs/db'

dotenv.config({ path: path.resolve(__dirname, '../../.env.test') })
