
import { Response } from "express"

export const ResOK = (res: Response, data: any, message = 'success') => {
    const response = {
        status: 200,
        message,
        data
    }
    res.status(200)
    return res.json(response)
}

export const ResErr = (res: Response, status: number, message: any ) => {
    const response = {
        status,
        message,
        data: {}
    }
    res.status(status)
    return res.json(response)
}