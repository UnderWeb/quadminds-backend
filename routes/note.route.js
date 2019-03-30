'use strict';
import express from 'express';
import { noteCtrl } from '../controllers';

var api = express.Router();

api.get('/notes', noteCtrl.getAll);
api.get('/notes/:id', noteCtrl.getById);
api.get('/notes/title/:title/:id?', noteCtrl.title);
api.post('/notes', noteCtrl.create);
api.put('/notes/:id', noteCtrl.update);
api.delete('/notes/:id', noteCtrl.delete);

module.exports = api;
