'use strict';

const { Router } = require('express');

const router = new Router();

router.get('/', (req, res) => {
  res.render('admin/index', {
    rooms: req.app.locals.roomManager.getRooms()
  });
});

router.get('/room/:tag', (req, res) => {
  res.render('admin/room', {
    room: req.app.locals.roomManager.getRoom(req.params.tag)
  });
});

module.exports = router;
