const express = require('express');
const router = express.Router();
const response = require('../../response/index.js');
const controller = require('./controller.js');


/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtiene un usuario por su ID.
 *     description: Devuelve los detalles de un usuario específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a obtener.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: El ID del usuario.
 *                 name:
 *                   type: string
 *                   description: El nombre del usuario.
 *                 email:
 *                   type: string
 *                   description: El correo electrónico del usuario.
 *       500:
 *         description: Error interno del servidor.
 */


/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un nuevo usuario.
 *     description: Crea un nuevo usuario con los datos proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: El nombre del usuario.
 *               email:
 *                 type: string
 *                 description: El correo electrónico del usuario.
 *               password:
 *                 type: string
 *                 description: La contraseña del usuario.
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de confirmación.
 *                   example: Usuario creado exitosamente.
 *       400:
 *         description: Datos de solicitud inválidos.
 */


router.get('/', (req, res) => {
  controller.listUsers()
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      console.log(err.code);
      res.status(500).send(err);
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const queryUser = req.query;
  console.log(queryUser);
  if (id) {
    controller.getOnlyUser(id)
      .then((data) => res.status(200).json(data))
      .catch((err) => {
        console.log(err.code);
        res.status(500).send(err);
      });
  } else {
    controller.listUsers()
      .then((data) => res.status(200).json(data))
      .catch((err) => {
        console.log(err.code);
        res.status(500).send(err);
      });
  }
});

router.post('/', (req, res) => {
  console.log(req.body)
  controller.addUser(req.body)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => console.log(err));
});

//TODO: add después del post de register
router.post('/:id', (req, res) => {
  const {
    id
  } = req.params
  const passwordFromInput = req.body.password;
  controller.postAuthenticate(id, passwordFromInput)
    .then(result => {
      response.success(req, res, result, 200)
    })
    .catch(err => {
      response.error(req, res, 'Usuario o contraseña incorrecta', 500, err)
    })
})

router.patch('/', (req, res) => {
  const id = req.body.id;
  const uid = parseInt(id)
  console.log(req.body.email)
  controller.updateUserData(uid, req.body.email)
    .then((data) => res.status(201).json(data))
    .catch(err => res.status(500).send(err));
})

module.exports = router;