import http from 'http'
import app from './app/app.js'
import {dbConnection} from './configs/dbConnection.js'


const PORT = process.env.PORT || 5000

// Server
const server = http.createServer(app)
server.listen(PORT, ()=> console.log(`Server is running on PORT number ${PORT}...`))