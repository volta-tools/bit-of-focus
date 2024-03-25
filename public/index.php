<?php
declare(strict_types=1);

require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'bootstrap.php';

/*
 * get the URI without the query string
 */
$uri = strtok($_SERVER['REQUEST_URI'], '?');

/*
 * If we are in build in web server check for static files
 */
if (php_sapi_name() == 'cli-server') {
    if (is_file(__DIR__ . $uri )) {
        return false;
    }
}

/*
 * Simple routing as the site wil have very few entry points
 */
switch ($uri)
{

    /*
     * Home page
     */
    case '/';
        require_once DIR_CONTROLLERS . 'index.php';
        break;


    /*
     * returns a json file with configuration settings for this day
     */
    case '/api/v1/config';
        header("Content-type: application/json; charset=utf-8");
        $file = DIR_APP_ROOT . 'controllers/config-'.date('Ymd').'.json';
        if (is_file($file)) {
            echo file_get_contents( $file);
        } else {
            echo file_get_contents(DIR_APP_ROOT . 'controllers/config.json');
        }
        break;

    /*
     * Default to a standard 404
     */
    default:
        header($_SERVER["SERVER_PROTOCOL"] . " 404 Not Found");
        echo "<strong>$uri</strong> not found";
}
exit();

