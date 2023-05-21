Module-Administration# Module-Administration

## Import Spatie Laravel

1.1- `composer require spatie/laravel-permission`

1.2 `php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"`

1.3 `php artisan migrate:fresh --seed`

1.4 `Migrations\ Permission`

```sh
    database\migrations
    Linea 46
    $table->softDeletes();
```

## Create Module

2.1 `php artisan module:make Administration`

2.2 `php artisan storage:link`
