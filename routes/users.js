const {
  validateId,
  validateUserInfo,
  validateUserAvatar
} = require('../middlewares/validation');
const router = require('express')
  .Router();
const {
  getUsers,
  getProfile,
  updateProfile,
  updateAvatar,
  getMyUser,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getMyUser);
router.get('/users/:id', validateId, getProfile);
router.patch('/users/me', validateUserInfo, updateProfile);
router.patch('/users/me/avatar', validateUserAvatar, updateAvatar);

module.exports = router;
