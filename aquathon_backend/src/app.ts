import cors from 'cors'
import express from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import router from './routes/api'
import 'dotenv/config'
// Turn off listen, when you are testing
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('public'))
app.use(router)

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AQUATHON APP REST API',
      version: '1.0.0',
      description: ''
    }
  },
  apis: ['./src/models/*.ts', './src/routes/api/*.ts'] // files containing annotations as above
}

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsdoc(swaggerOptions))
)

export default app
