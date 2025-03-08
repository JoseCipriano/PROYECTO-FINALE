import User from '../users/user.model.js';
import Product from '../product/product.model.js';

export const esRoleValido = async (role = '') => {

}

export const existenteEmail = async (email = ' ') => {

    const existeEmail = await User.findOne({ email });

    if(existeEmail){
        throw new Error(`El correo ${ email } ya existe en la base de datos`);
    }
}

export const existeUsuarioById = async (id = '') => {
    const existeUsuario = await User.findById(id);

    if(!existeUsuario){
        throw new Error(`El ID ${id} no existe`);
    }
}

export const adminRol = async (id = "", { req }) => {
    if (!req.usuario || !req.usuario.role) {
        throw new Error("No se pudo verificar el rol del usuario");
    }

    const userModify = await User.findById(id);
    if (!userModify) {
        throw new Error("Usuario no encontrado");
    }

    if (req.usuario._id.toString() === id) {
        return;
    }

    if (userModify.role === "ADMIN" && req.usuario.role === "ADMIN") {
        throw new Error("No tienes permisos para modificar a otro administrador");
    }
};



export const adminRolDelete = async (uid = "", { req }) => {
    if(!req.usuario || !req.usuario.role) {
        throw new Error("No se pudo verificar el rol del usuario"); 
    }

    const userModify = await User.findById(uid);
    if (!userModify) {
        throw new Error("Usuario no encontrado");
    }

    if (req.usuario._id.toString() === uid) {
        return; 
    }

    if (userModify.role === "ADMIN" && req.usuario.role === "ADMIN") {
        throw new Error("No tienes permisos para eliminar a otro admin");
    }
};

export const nameProductExists = async (nameProduct = " ") => {
    const existe = await Product.findOne({nameProduct})
    if(existe){
        throw new Error(`The product name ${nameProduct} is already registered`)
    }
}



