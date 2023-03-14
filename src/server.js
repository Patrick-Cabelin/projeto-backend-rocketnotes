require('express-async-errors')
const migrationRun = require('./database/sqlite/migrations')

const express = require('express')
const app = express()
app.use(express.json())

const upload = require('./config/upload')
app.use('/files', express.static(upload.UPLOAD_FOLDER))

const routes = require('./routes')
app.use(routes)

migrationRun()

const AppError = require('./utils/AppError')
app.use((error, resquest, response, next) => {
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            message: error.message,
            status: 'error'
        })
    }

    console.error(error)

    return response.status(500).json({
        message: 'Internal server error',
        status: 'error'
    }) 
})
const PORT = 3000 
app.listen(PORT, ()=>console.log(`O servidor ta rodando na porta: ${PORT}`))