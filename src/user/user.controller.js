'use strict'

import User from './user.model.js'
import { encrypt, checkPassword } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'

export const test = (req, res) =>{
    console.log('test is running')
    return res.send({message: 'Test is running'})
}

export const saveUser = async(req, res) =>{
    try {
    
        let data = req.body
        let userFind = await User.findOne({
            $or:[
                {username: data.username}
            ]
        })
        if(userFind) return res.status(404).send({ message: ` Already exists a username with "${data.username}" ` })
        
        data.role = 'CLIENT'
        data.password = await encrypt(data.password)
        
        let user = new User(data)

        await user.save()

        return res.send({message: 'Register successfully'})

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Error to save save user'})
    }
}

export const login = async(req, res) => {
    try {
        let { account, password} = req.body
        
        let user = await User.findOne({
            $or: [
                {username: account},
                // {email: account}
            ]
        })

        if(user && await checkPassword(password, user.password)){
            let loggedUser = {  
                uid: user._id,
                name: user.name,
                username: user.username,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send({message: `Welcome ${loggedUser.name}`, loggedUser, token})
        }
        
        return res.status(400).send({message: 'User not found '})

    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error to login'})
        
    }
}

export const updateUser = async(req, res) => {
    try {
        
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: err})
    }
}

export const getUser = async(req, res) => {
    try {
        let user = await User.find()
        return res.send({ user })
    } catch (err) {
        return err
    }
}