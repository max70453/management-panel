<?php

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/User.php';

use App\Models\User;
use Firebase\JWT\JWT;

header('Content-Type: application/json');

$userModel = new User();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['email']) || !isset($data['password'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Email and password are required']);
            exit;
        }

        $user = $userModel->findByEmail($data['email']);
        
        if (!$user || !$userModel->verifyPassword($data['password'], $user->password)) {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid credentials']);
            exit;
        }

        // Generate JWT token
        $payload = [
            'user_id' => $user->id,
            'email' => $user->email,
            'exp' => time() + (60 * 60) // 1 hour expiration
        ];

        $token = JWT::encode($payload, $_ENV['JWT_SECRET'], 'HS256');

        echo json_encode([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'email' => $user->email,
                'name' => $user->name
            ]
        ]);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
} 