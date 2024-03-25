<?php
declare(strict_types=1);

/*
 * Constants for file locations. By convention ends wit a directory separator.
 */
const DIR_APP_ROOT = __DIR__ .  DIRECTORY_SEPARATOR;
const DIR_CONTROLLERS = __DIR__ .  DIRECTORY_SEPARATOR . 'controllers' . DIRECTORY_SEPARATOR;

/*
 * check for the application mode in the environment variable. if not present set to
 * production to be on the save side. W accept two modes, either in production or not.
 */
$mode = getenv('APP_ENV');
$mode  =  (false === $mode) ? 'production' : 'development';
if ('production' === $mode) {
    ini_set('display_errors', 0);
    ini_set('display_startup_errors', 0);
    error_reporting(0);
} else {
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
}

/*
 * Set error and exception handling based on the current mode
 */
set_error_handler(function(int $code,
    string $message,
    null|string $file = null,
    null|int $line = null,
    null|array $context = null): bool {

    echo '<pre class="error">';
    echo 'ERROR:';
    echo "<strong>code    : </strong>$code" . PHP_EOL;
    echo "<strong>message : </strong>$message" . PHP_EOL;
    echo "<strong>file    : </strong>$file" . PHP_EOL;
    echo "<strong>len     : </strong>$line" . PHP_EOL;
    echo '<pre>';

    return true;
});

set_exception_handler(function(\Throwable $e){
    echo '<pre class="error">';
    echo 'EXCEPTION : ' . get_class($e);
    echo "<strong>code    : </strong>{$e->getCode()}" . PHP_EOL;
    echo "<strong>message : </strong>{$e->getMessage()}" . PHP_EOL;
    echo "<strong>file    : </strong>{$e->getFile()}" . PHP_EOL;
    echo "<strong>len     : </strong>{$e->getLine()}" . PHP_EOL;
    echo '<pre>';
});
