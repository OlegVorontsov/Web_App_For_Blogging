# Web Application for blogging

Одностраничное вэб приложение основано на ASP.NET CORE Framework и React.js состоит из двух частей: серверная и клиентская части. Серверная часть использует ядро Entity Framework (EF) для обращения к БД. Все классы и зависимости серверной части поддерживаются внедрением Dependency Injection (DI). Для авторизации пользователей используется Bearer token.

Используемые технологии и библиотеки
- ASP.NET CORE
- React.js
- Bootstrap
- HTML, CSS
- LINQ
- MS SQL Server
- LiteDB NoSQL
- Entity Framework (EF)
- Bearer token

## База Данных
Объекты пользователей и постов хранятся в базе данных Microsoft SQL Server. Объекты подписок, "лайков" / "дислайков" хранятся с использованием LiteDB NoSQL database.

## Права
### Зарегистрированный пользователь имеет следующие права:
- редактирование персональных данных;
- просмотр публичных профилей пользователей;
- добавление / редактирование / удаление постов;
- оформление / удаление подписок на пользователей;
- поиск пользователей по имени;
- просмотр всех постов пользователей, на которые оформлена подписка.

## Запуск приложения
Для запуска приложения рекомендуется использовать Visual Studio 2022. Для просмотра клиентской части рекомендуется использовать Visual Studio Code.

## Home page

![home](https://github.com/OlegVorontsov/BlogAppMoveToDesktop/assets/102809790/5315d39d-1746-4e10-ad7e-245082599e16)

## Profile page

![профайл](https://github.com/OlegVorontsov/BlogAppMoveToDesktop/assets/102809790/72dd110a-315f-4ee2-8ecb-e962943a0611)

## Wall page

![валл](https://github.com/OlegVorontsov/BlogAppMoveToDesktop/assets/102809790/2bc4160f-272b-4906-8ef2-5d2668c994e3)

## Login page

![логин](https://github.com/OlegVorontsov/BlogAppMoveToDesktop/assets/102809790/25239a93-1698-4edb-88ea-af064a2cd8e2)

