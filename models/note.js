'use strict';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

/**
 * Notes.
 */
const NoteSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    }
});

/**
 * Exportación del esquema Note.
 */
module.exports = mongoose.model('Note', NoteSchema, 'notes');
