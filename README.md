
# Task Management App 
> A simple Task Management app that allows users to view,create,edit,rearrange and manipulate tasks

## Description
This project was built with React,Laravel and PostgreSQL .

##### Integration testing :
- PHPUnit (https://phpunit.de)
- Faker (https://github.com/fzaninotto/Faker)

## Running the App
To run the App, you must have:
- **PHP** (https://www.php.net/downloads)
- **PostgreSQL** (https://www.postgresql.org/download)

Clone the repository to your local machine using the command
```console
$ git clone *remote repository url*
```

Create an `.env` file using the command. You can use this config or change it for your purposes.

```console
$ cp .env.example .env
```


### Environment
Configure environment variables in `.env` for dev environment based on your MYSQL database configuration

```  
DB_CONNECTION=<YOUR_MYSQL_TYPE>
DB_HOST=<YOUR_MYSQL_HOST>
DB_PORT=<YOUR_MYSQL_PORT>
DB_DATABASE=<YOUR_DB_NAME>
DB_USERNAME=<YOUR_DB_USERNAME>
DB_PASSWORD=<YOUR_DB_PASSWORD>
MIX_REACT_APP_BASE_URL= < Base url for Laravel API e.g  http://localhost:8000/api  or http://app.test/api (Valet)**>
```

### LARAVEL INSTALLATION
Install the dependencies and start the server

```console
$ composer install
$ php artisan key:generate
$ php artisan migrate
$ php artisan db:seed
$ php artisan serve
```

### REACT INSTALLATION



Install the dependencies and start the server

```console
$ npm install && npm run dev
```

You should be able to visit your app at your laravel app base url e.g  http://localhost:8000  or http://app.test (Valet).

## Testing
To run unit tests:
```console
$ composer test
```

## Assumptions
While creating the app the following Assumptions were made
- **Absence of "allow_duplicates" setting implies that tasks labels can be duplicated** 
- **The sort order was auto generated from backend and auto incremented for each task. Sort order was then used to order the task returned to frontend**
- **The completed_at attribute signified the task completion status, hence it was set to null when a task is created. When such
task is set as complete, the completed_at was set to current timestamp and vice versa**
- **There was a little contraint to reordering tasks. Dragging up or down of tasks one level was catered for on backend(If page is refreshed,new task order will be updated too).**
- **This means that dragging two level up or down will reflect on frontend but not on backend. The functionality can be made implementated nevertheless**

