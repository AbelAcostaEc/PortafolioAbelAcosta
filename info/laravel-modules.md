laravel-modules# Laravel-Modules

## Create project laravel

1.1- `composer create-project laravel/laravel your-project-name 4.2`

## Install laravel-modules

2.1 `composer require nwidart/laravel-modules`

2.2 `php artisan vendor:publish--provider="Nwidart\Modules\LaravelModulesServiceProvider"`

2.3 In `Composer.json` add line "Modules"

```bash
{
"autoload": {
        "psr-4": {
        "App\\": "app/",
        "Modules\\": "Modules/"
        }
    }
}
```

2.4 `composer dump-autoload`

## Install Livewire-modules

3.1 `composer require livewire/livewire`

3.2 `composer require mhmiton/laravel-modules-livewire`

3.3 `php artisan vendor:publish --tag=modules-livewire-config`

## Install dependencies Aditionals (optional)

4.1 `composer require laravelcollective/html` /** Para Form **/

## Create a module

4.1 `php artisan module:make module-name`

4.2 `php artisan module:make-livewire Pages/AboutPage Module`

## Information Livewire

### Route

```sh
Route::prefix('inventory')->group(function() {

    Route::view('/', 'inventory::livewire.administration.product.index');
});
```

### Template Basic Livewire

`view/template/master.blade.php`

```sh
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>@yield('title')</title>
        @livewireStyles
    </head>
    <body>
            @yield('content')

        @livewireScripts
    </body>
</html>
```

### Add Component

```sh
@livewire('module::administration.product.product')
```

##### template

```sh
@extends('layouts.master')

@section('title', 'title')

@section('content')
    @livewire('module::administration.product.product')
@endsection
```
