github clone

composer install
composer update

cp .env.example .env
php artisan key:generate

DB_CONNECTION=mysql
DB_HOST=nombre_del_host
DB_PORT=puerto_de_la_base_de_datos
DB_DATABASE=nombre_de_la_base_de_datos
DB_USERNAME=nombre_de_usuario_de_la_base_de_datos
DB_PASSWORD=contraseña_de_la_base_de_datos

php artisan migrate
