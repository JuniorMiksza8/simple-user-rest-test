import multer from 'multer'

export const uploadMiddleware = () => ({
    storage: multer.diskStorage({
        destination: (req: any, file: any, cb: any) => {
            cb(null, 'uploads/')
        },
        filename: (req: any, file: any, cb: any) => {
            cb(null, `${Date.now()}-${file.originalname}`)
        },
    }),
    limits: {
        fieldNameSize: 255,
        fileSize: 1024 * 1024 * 2,
    },
})
