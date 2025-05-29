<?php

require_once __DIR__ . '/../vendor/autoload.php';

use RedBeanPHP\R;

// Load environment variables
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

// Database configuration
$dbHost = $_ENV['DB_HOST'] ?? 'localhost';
$dbName = $_ENV['DB_NAME'] ?? 'management_panel';
$dbUser = $_ENV['DB_USER'] ?? 'root';
$dbPass = $_ENV['DB_PASS'] ?? '';

// Setup RedBean
R::setup("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbPass);

// Enable RedBean debug mode in development
if ($_ENV['APP_ENV'] === 'development') {
    R::debug(true);
} 