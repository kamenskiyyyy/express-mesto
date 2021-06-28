# Проект Mesto (бэкенд)

![Express](https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/-MongoDB-56a14b?logo=mongodb&logoColor=white)
![Node](https://img.shields.io/badge/-Node.js-469837?logo=Node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-f3de35?logo=javaScript&logoColor=black)
___

## Описание

Бэкенд часть SPA приложения Mesto на Express.js. Схемы и модели созданы через Mongoose. Все роуты, кроме `/signup`
и `/signin`, защищены. Используется валидация Joi и celebrate. При регистрации пользователя пароль хешируется модулем
bcrypt с добавлением соли. Реализована централизованная обработка ошибок. Настроено логирование запросов и ошибок.

[Ссылка на код фронтенд части приложения Mesto](https://github.com/kamenskiyyyy/react-mesto-auth)

## Задача

* Написать бэкенд для проекта Mesto

## Роуты

Для пользователей:</br>
<table>
<tr>
<td align="center"><strong>Запрос</strong></th>
<td align="center"><strong>Роут</strong></th>
<td align="center"> <strong>Описание</strong></th>
</tr>

<tr>
<td align="center">POST</td>
<td align="center">/signup</td>
<td>Создаёт пользователя с переданными в теле email, password и name</td>
</tr>

<tr>
<td align="center">POST</td>
<td align="center">/signin</td>
<td>Проверяет переданные в теле почту и пароль и возвращает JWT</td>
</tr>

<tr>
<td align="center">POST</td>
<td align="center">/signout</td>
<td>Удаляет JWT из куков пользователя</td>
</tr>

<tr>
<td align="center">GET</td>
<td align="center">/users/me</td>
<td>Возвращает информацию о пользователе (email и имя)</td>
</tr>

<tr>
<td align="center">PATCH</td>
<td align="center">/users/me</td>
<td>Обновляет информацию о пользователе (email и имя)</td>
</tr>
<tr>
<td align="center">PATCH</td>
<td align="center">/users/me/avatar</td>
<td>Обновляет аватар пользователе</td>
</tr>
</table>


Для карточек:</br>
<table>
<tr>
<td align="center"><strong>Запрос</strong></th>
<td align="center"><strong>Роут</strong></th>
<td align="center"> <strong>Описание</strong></th>
</tr>

<tr>
<td align="center">GET</td>
<td align="center">/cards</td>
<td>Возвращает все карточки</td>
</tr>

<tr>
<td align="center">POST</td>
<td align="center">/cards</td>
<td>Создаёт карточку с переданными в теле name, link</td>
</tr>

<tr>
<td align="center">DELETE</td>
<td align="center">/cards/cardId</td>
<td>Удаляет добавленную карточку по id</td>
</tr>

<tr>
<td align="center">PUT</td>
<td align="center">/cards/cardId/likes</td>
<td>Ставит карточке лайк по id</td>
</tr>

<tr>
<td align="center">DELETE</td>
<td align="center">/cards/cardId/likes</td>
<td>Убирает лайк с карточки по id</td>
</tr>

</table>

## Стек

- Node.js
- Express.js
- MongoDB
- JavaScript
- API

## Установка

Для запуска на локальной машине необходимо:

1. Установить npm зависимости:</br>

```sh
npm install
```

2. Запустить MongoDB:

```sh
npm run mongod
```

3. Запустить в режиме разработки:</br>

```sh
npm run start  — запускает сервер
npm run dev — запускает сервер с hot-reload
```

Если все прошло успешно, проект будет запущен на `http://localhost:3010`
