import authController from './modules/auth/auth.controller.js'
import userController from './modules/user/user.controller.js'
import messageController from './modules/messages/message.controller.js'
import connectDB from './DB/connection.js'
import { globalError } from './utils/error/error.js'
import cors from'cors'

const bootsrap = (app, express) => {
    app.use(cors())
    app.use(express.json())
    app.get('/', (req, res) => res.send('Hello World!'))
    app.use('/auth', authController)
    app.use('/user', userController)
    app.use('/message', messageController)

    app.use(globalError)
    // DataBase connection
    connectDB()

    app.all("*", (req, res, next) => {
        return res.status(404).json("in-valid Routing")
    })
}

export default bootsrap;