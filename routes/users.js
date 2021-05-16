const auth = require('../middlewares/auth');
const router = require('express').Router();

const {
  getUsers, getProfile, updateProfile, updateAvatar, getMyUser,
} = require('../controllers/users');

const { validateId, validateUserInfo, validateUserAvatar } = require('../middlewares/validation');

router.get('/users', auth, getUsers);
router.get('/users/me', auth, getMyUser);
router.get('/users/:id', auth, validateId, getProfile); // вторым аргументом передаем middleware для валидации приходящих данных до обращения к бд
router.patch('/users/me', auth, validateUserInfo, updateProfile);
router.patch('/users/me/avatar', auth, validateUserAvatar, updateAvatar);

module.exports = router;
