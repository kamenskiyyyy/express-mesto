const router = require('express').Router();

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const { validateCardId, validateCard } = require('../middlewares/validation');

router.get('/', getCards);
router.post('/', validateCard, createCard); // вторым аргументом передаем middleware для валидации приходящих данных до обращения к бд
router.delete('/:cardId', validateCardId, deleteCard);
router.put('/:cardId/likes', validateCardId, likeCard);
router.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = router;
