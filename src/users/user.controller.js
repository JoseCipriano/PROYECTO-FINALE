import {response, request} from "express"
import {hash } from 'argon2'
import User from './user.model.js'

export const getUsers = async (req = request, res = response) => {
    try {
        const { limite = 10, desde = 0} = req.query;
        const query = { estado: true};

        const [total, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        res.status(200).json({
            success: true,
            total,
            users
        })

    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: 'Error al obtener usuarios',
            error
        })
    }
}


export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if(!user){
            return res.status(404).json({
                success: false,
                msg: 'Usuario not found'
            })
        }

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al obtener usuario',
            error
        })
    }
}

export const updateUser = async(req, res) => {
    try{
        const {...data} = req.body;
        const { id } = req.params;

        const user = await User.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json({
            success: true,
            message: 'Update User',
            user,
        })    
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Error updating user',
            error: error.message
        })
    }
}


export const updateRol = async (req, res) => {
    try{
        const { uid } = req.params;
        const { role } = req.body;

        const updateRol = await User.findByIdAndUpdate(uid, { role }, {new: true})

        res.status(200).json({
            success: true,
            message: 'Update Rol',
            updateRol,
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Error updating Role',
            error: error.message
        })
    }
}



export const deleteUser = async(req, res) => {
    try{
        const { uid } = req.params;

        const user = await User.findByIdAndDelete( uid );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: 'Delete User',
            user,
        })   
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Error deleting Role',
            error: error.message
        })
    }
}
