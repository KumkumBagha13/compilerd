require('./envloader')()


const express = require('express')
const app = express()
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')
const baseRouter = require('./router.js')
const morgan = require('morgan')
const PORT = process.env.PORT || 3000
const { respond, l } = require('./loader.js').helpers
const path = require('path')

require('./loader.js').loadDependency(app)


/* Middlewares */
app.use(express.json())
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return respond(res, 400, { message: 'Invalid JSON found' })
    }
    next()
})
// Log all api requests
app.use(
    morgan(
        'REQUEST [:date[clf]] ":method :url HTTP/:http-version" :status :user-agent',
        {
            immediate: true,
            skip: function (req) { return (req.path === '/api/') },
        },
    ),
)
app.use(
    express.urlencoded({
        extended: true,
        limit: '2mb',
        parameterLimit: 1000000,
    }),
)

app.use(compression())
app.use(helmet())
app.use(cors())

// Serve static files from the CodeJudgeUI directory
app.use(express.static(path.join(__dirname, 'CodeJudgeUI')))

app.use('/api/', baseRouter)

// API health check route
app.get('/api/', (req, res) => {
    return res.send('Compiler API is up and working')
})


app.post('/api/execute', (req, res) => {
    // Your code execution logic here
    // For now, let's just echo back the received data
    res.json({
        output: `Received: ${req.body.language} code: ${req.body.script}`,
        execute_time: null,
        status_code: 200,
        memory: null,
        cpu_time: null,
        output_files: [],
        compile_message: "",
        error: 0
    });
});
// Serve the frontend for any route not starting with /api/
app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) {
        next()
    } else {
        res.sendFile(path.join(__dirname, 'CodeJudgeUI', 'index.html'))
    }
})



app.listen(PORT, () => {
    l.info(`Server started at port: ${PORT}`)
})
