## **Chat**
**Chat** - это учебный проект, созданный для повышения навыков создания SPA и web-приложений. Проект представляет собой мессенджер с возможностью регистрации и авторизации. Среди возможностей сервиса можно выделить следующие:
- Создание чатов (как тет-а-тет диалогов, так и многопользовательских бесед)
- Отправка текстовых сообщений, фотографий и других файлов
- Изменение пользовательских данных в т.ч. и данных безопасности
- Настройка пользовательского аватара
- Поиск чата по ключевым словам
- Отображение статуса сообщений в чате

Данный проект находится на завершающей стадии разработки.
На данный момент имеется почти весь функционал за исключением возможности отправки файлов между пользователями и удобного поиска чата по ключевым словам.
Также в планах:
- Добавление datalist списка для более удобного добавления пользователей в чат
- Добавление аватара чатам
- Добавление списка пользователей, состоящих в чате
- Доработка реактивности некоторых возможностей ( в т.ч. отображение статуса сообщений в чате )
- Написание обширного профиля тестов
- Вывод в чат системных сообщений о создании чата, добавлении/удалении пользователей, изменении аватара чата
- Отображение id чатов рядом с их названиями
- Доработка и улучшение UI/UX и дизайна в целом

Upd: Покрыты тестами основные блоки приложения

## **Используемые технологии**
При реализации проекта использованы следующие технологии:
- Figma - реализация макета интерфейса
- Handlebars - шаблонизация и ускорение вёрстки
- PostCSS - ускорение написания css
- Vite - cборка проекта
- Express - реализация веб-сервера
- Netlify - удобная публикация актуального проекта в сети
- Typescript - типизатор языка Javascript
- EsLint - анализатор скриптов
- Stylelint - анализатор стилей
- Chai - библиотека утверждений BDD/TDD
- Mocha - фреймворк для тестирования
- Sinon - mock-библиотека для тестирования
- Husky - удобное создание git hooks

## **Установка и сборка**
Для установки и запуска проекта:

- Установите зависимости, для этого в корне проекта введите:

`npm i`
- Запустите проект:

`npm run dev`
- Соберите и запустите в режиме отладки( опционально ) / express:

`npm run start`

## **Ссылки**
Ссылка на макет: https://www.figma.com/file/Py5bTbELUHZANun5wZXB16/MyChat?type=design&node-id=2%3A27&t=nLgn4P5l8NslG82Y-1

Ссылка на Netlify: https://deploy--symphonious-sorbet-1f98a9.netlify.app/
