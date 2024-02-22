const express = require("express");
const router = express.Router();

const login = require('./login');
const users = require('./users');
const songs = require('./songs')
const chords = require('./chords')
const scales = require('./scales')

router.use('/login', login);
router.use('/users', users)
router.use('/songs', songs)
router.use('/chords', chords)
router.use('/scales', scales)

module.exports = router;
