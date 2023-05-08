// import modules
import express from 'express'
import { router as routesRouter} from "./routes/routes.js"
import { fileURLToPath } from 'url';
import path from 'path'
import connectToDatabase from "./config/database.js"
import methodOverride from "method-override"

// Create Express app
const app = express()
connectToDatabase()


// Configure the app (app.set)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


// Mount Middleware (app.use)
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use(methodOverride('_method'))

app.use("", routesRouter)

// Tell the app to listen on port 3000
app.listen(3000, () => {
  console.log('Listening on port 3000')
})