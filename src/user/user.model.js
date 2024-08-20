'use strict'

import { model, Schema } from "mongoose"

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['ADMIN', 'CLIENT']
    }
},
{
    versionKey: false
}
)

export default model('user', userSchema)