import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime'

import {
    Body,
    Get,
    InternalServerError,
    JsonController,
    Post,
    BadRequestError,
    Put,
    Param,
    Delete,
    NotFoundError,
    UploadedFile,
} from 'routing-controllers'
import { uploadMiddleware } from '../../../middlewares/upload.middleware'
import { CreateUserDTO, UpdateUserDTO } from './user.dto'
import { UserService } from './user.service'

@JsonController('/user')
export class UserController {
    userService = new UserService()

    @Get('/:id')
    async getUser(@Param('id') id: string) {
        const user = await this.userService.findByID(id)

        if (!user) throw new NotFoundError('user not found')

        return user
    }

    @Get()
    async getUsers() {
        const users = await this.userService.find()

        return users
    }

    @Post()
    async createUser(@Body() body: CreateUserDTO) {
        try {
            let { username, birthdate } = body

            const user = {
                username,
                birthdate: new Date(birthdate),
            }

            const newUser = await this.userService.create(user)

            return newUser
        } catch (error) {
            console.log(error)
            throw new InternalServerError('error creating user')
        }
    }

    @Put('/photo/:id')
    async updatePhoto(
        @UploadedFile('photo', { options: uploadMiddleware() }) file: Express.Multer.File,
        @Param('id') id: string
    ) {
        const user = await this.userService.findByID(id)

        if (!user) {
            throw new NotFoundError('user not found')
        }

        if (user.photo) this.userService.deletePhoto(user.photo)

        const updated = this.userService.update(id, { photo: file.path })

        return updated
    }

    @Put('/:id')
    async updateUser(@Body() body: UpdateUserDTO, @Param('id') id: string) {
        try {
            const { birthdate, username } = body

            const data = {
                birthdate,
                username,
            }

            const user = await this.userService.update(id, data)

            return user
        } catch (error: any) {
            throw new InternalServerError(error.message)
        }
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: string) {
        try {
            const deleted = await this.userService.delete(id)

            if (deleted.photo) this.userService.deletePhoto(deleted.photo)

            return deleted
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                const message = (error.meta as any).cause
                if (error.code === 'P2025') {
                    throw new NotFoundError('user doest not exist')
                }
                throw new BadRequestError(message)
            }
            throw new InternalServerError('error deleting user')
        }
    }
}

export default UserController
