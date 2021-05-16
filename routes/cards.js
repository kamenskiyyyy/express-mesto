const auth = require('../middlewares/auth');
const router = require('express').Router();

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const { validateCardId, validateCard } = require('../middlewares/validation');

router.get('/cards', auth, getCards);
router.post('/cards', auth, validateCard, createCard); // вторым аргументом передаем middleware для валидации приходящих данных до обращения к бд
router.delete('/cards/:cardId', auth, validateCardId, deleteCard);
router.put('/cards/:cardId/likes', auth, validateCardId, likeCard);
router.delete('/cards/:cardId/likes', auth, validateCardId, dislikeCard);

module.exports = router;
