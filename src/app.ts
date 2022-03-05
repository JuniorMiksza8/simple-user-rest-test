import 'reflect-metadata'
import { createExpressServer } from 'routing-controllers'

const app = createExpressServer({
    controllers: [__dirname + '/domains/**/**/*controller{.ts,.js}'],
})

export default app
