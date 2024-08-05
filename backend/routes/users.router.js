const express = require('express');
const jwt = require('jsonwebtoken');
const UserService = require('../services/user.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  updateUserSchema,
  createUserSchema,
  getUserSchema,
  loginSchema,
} = require('../schemas/user.schema');

const router = express.Router();
const service = new UserService();

router.get('/', async (req, res, next) => {
  try {
    const categories = await service.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const userData = req.body;
      const newUser = await service.create(userData);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/login',
  validatorHandler(loginSchema, 'body'),
  async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await service.findByCredentials(email, password);

      if (user) {
        const token = jwt.sign(
          { id: user.id, email: user.email },
          'secret-key',
          { expiresIn: '1h' }
        );
        res.json({ token });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      res.status(500).json({
        message: 'An error occurred during login',
        error: error.message,
      });
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
