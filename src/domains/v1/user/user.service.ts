import { Prisma } from '@prisma/client'
import { database } from '../../../database'
import { unlink } from 'fs/promises'

export class UserService {
    create(data: Prisma.UserCreateInput) {
        return database.user.create({
            data,
        })
    }

    find() {
        return database.user.findMany()
    }

    findByID(id: string) {
        return database.user.findUnique({
            where: {
                id,
            },
        })
    }

    delete(id: string) {
        return database.user.delete({
            where: {
                id,
            },
        })
    }

    update(id: string, data: Prisma.UserUpdateInput) {
        return database.user.update({
            where: {
                id,
            },
            data,
        })
    }

    deletePhoto(photoPath : string){
        return unlink(photoPath)
    }
}
