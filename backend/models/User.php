<?php

namespace App\Models;

class User extends BaseModel
{
    public function __construct()
    {
        parent::__construct('user');
    }

    public function findByEmail($email)
    {
        return \RedBeanPHP\R::findOne($this->type, 'email = ?', [$email]);
    }

    public function create($data)
    {
        // Hash password before storing
        if (isset($data['password'])) {
            $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
        }
        return parent::create($data);
    }

    public function update($id, $data)
    {
        // Hash password if it's being updated
        if (isset($data['password'])) {
            $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
        }
        return parent::update($id, $data);
    }

    public function verifyPassword($password, $hash)
    {
        return password_verify($password, $hash);
    }
} 