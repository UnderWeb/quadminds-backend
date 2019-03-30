'use strict';
import { Note } from '../models';

// Objeto a exportar.
const noteCtrl = {};

/**
 * Obtiene todas las notas.
 */
noteCtrl.getAll = async (request, response, next) => {
    await Note.find({ }).exec((error, notes) => {
        if (error) {
            response.status(200).send({message: 'Error en la petición de notas: ' + error});
        } else {
            if (!notes) {
                response.status(404).send({message: 'No existen notas en los registros'});
            } else {
                response.status(200).send({notes});
            }
        }
    });
}

/**
 * Obtiene una nota específica.
 */
noteCtrl.getById = async (request, response, next) => {
    // Obtiene el id de la nota específica.
    const noteId = request.params.id;

    if (!noteId) {
        return response.status(404).status({message: 'La nota no existe en los registros'});
    } else {
        await Note.findById(noteId).exec((error, note) => {
            if (error) {
                response.status(200).send({message: 'Error en la petición de la nota: ' + error});
            } else {
                if (!note) {
                    response.status(404).send({message: 'No existen notas que cumplan con la petición'});
                } else {
                    response.status(200).send({note});
                }
            }
        });
    }
}

/**
 * Comprueba la existencia del título.
 */
noteCtrl.title = async (request, response, next) => {
    // Obtiene el id de la nota específica.
    const noteId = request.params.id;

    // Obtiene los parámentos de validación.
    const params = request.params;

    // Comprueba el ingreso de los datos mínimos.
    if (params.title) {
        // Asigna el valor del título.
        const title = new RegExp(["^", params.title, "$"].join(""), "i");

        // Comprueba la existencia de la nota mediante su título.
        if (noteId == 'null') {
            await Note.findOne({ title: title }).exec((error, data) => {
                if (error) {
                    response.status(500).send({message: 'No se ha podido comprobar la existencia del título: ' + error});
                } else {
                    if (data) {
                        response.status(200).send({valid: true});
                    } else {
                        response.status(200).send({valid: null});
                    }
                }
            });
        } else {
            await Note.findOne({ title: title, _id: {$ne: noteId} }).exec((error, data) => {
                if (error) {
                    response.status(500).send({message: 'No se ha podido comprobar la existencia del título: ' + error});
                } else {
                    if (data) {
                        response.status(200).send({valid: true});
                    } else {
                        response.status(200).send({valid: null});
                    }
                }
            });
        }
        
    } else {
        response.status(200).send({valid: null});
    }
};

/**
 * Registro de notas.
 */
noteCtrl.create = async (request, response, next) => {
    // Objeto note.
    const note = new Note();

    // Obtiene los parámentos de registro.
    const params = request.body;

    // Comprueba el ingreso de los datos mínimos.
    if (params.title && params.content) {

        // Asigna los valores al objeto note.
        note.title = params.title;
        note.content = params.content;

        // Guarda el registro en la base de datos.
        await note.save((err, noteStore) => {
            if (err) {
                response.status(500).send({message: 'Error al guardar la nota: ' + error});
            } else {
                if (!noteStore) {
                    response.status(404).send({message: 'No se ha registrado la nota'});
                } else {
                    response.status(200).send({note: noteStore});
                }
            }
        });
    } else {
        response.status(200).send({message: 'Introduce los datos correctamente para registrar la nota'});
    }
};

/**
 * Actualización de notas.
 */
noteCtrl.update = async (request, response, next) => {
    // Obtiene el id de la nota a actualizar.
    const noteId = request.params.id;

    // Obtiene los parámentos de actualización.
    const params = request.body;

    if (!noteId) {
        return response.status(404).status({message: 'La nota no existe en los registros'});
    } else {
        await Note.findOneAndUpdate({ _id: noteId }, params, { new: true }, (error, noteUpdated) => {
            if (error) {
                return response.status(500).send({message: 'Error al actualizar la nota: ' + error});
            } else {
                if (!noteUpdated) {
                    return response.status(404).send({message: 'No se ha podido actualizar la nota'});
                } else {
                    return response.status(200).send({note: noteUpdated});
                }
            }
        });
    }
}

/**
 * Eliminación de notas.
 */
noteCtrl.delete = async (request, response, next) => {
    // Obtiene el id de la nota a eliminar.
    const noteId = request.params.id;

    if (!noteId) {
        return response.status(404).status({message: 'La nota no existe en los registros'});
    } else {
        await Note.findOneAndRemove({ _id: noteId }, (error, noteDeleted) => {
            if (error) {
                return response.status(500).send({message: 'Error al eliminar la nota: ' + error});
            } else {
                if (!noteDeleted) {
                    return response.status(404).send({message: 'No se ha podido eliminar la nota'});
                } else {
                    return response.status(200).send({note: noteDeleted});
                }
            }
        });
    }
}

// Exporta el objeto controller de la nota.
module.exports = noteCtrl;
