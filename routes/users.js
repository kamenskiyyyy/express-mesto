const router = require('express').Router();

const {
  getUsers, getProfile, updateProfile, updateAvatar, getMyUser,
} = require('../controllers/users');

const { validateId, validateUserInfo, validateUserAvatar } = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', getMyUser);
router.get('/:id', validateId, getProfile); // вторым аргументом передаем middleware для валидации приходящих данных до обращения к бд
router.patch('/me', validateUserInfo, updateProfile);
router.patch('/me/avatar', validateUserAvatar, updateAvatar);

module.exports = router;
