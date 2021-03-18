# Порядок запуска
Общее:

    1) Необходимо создать .env файл в корне проекта, выставив свои настройки, за пример берется .env.example
    2) Убедиться в наличии созданной БД (default: web2021) на PosgtreSQL и правильности настроек подключения в .env
    3) Для запуска из под Windows необходимо установить глобально пакеты nodemon и node-dev-env 
    (npm install -g nodemon node-dev-env)
FRONT: 

    1. из папки front/ в терминале выполняем npm install
    2. для запуска в папке front/ выполняем npm run dev
    default-доступ к фронтенду через http://localhost:3000
BACK:

    1. из папки back/ в терминале выполняем npm install
    2. для запуска бэка в папке back/ выполняем npm run dev
       default-доступ к бэкенду через http://localhost:4200

Документация по API доступна по localhost:4200/api-docs (при запущенном бэкенде)

