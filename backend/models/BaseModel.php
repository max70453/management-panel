<?php

namespace App\Models;

use RedBeanPHP\R;

abstract class BaseModel
{
    protected $bean;
    protected $type;

    public function __construct($type)
    {
        $this->type = $type;
    }

    public function find($id)
    {
        return R::load($this->type, $id);
    }

    public function findAll()
    {
        return R::findAll($this->type);
    }

    public function create($data)
    {
        $bean = R::dispense($this->type);
        foreach ($data as $key => $value) {
            $bean->$key = $value;
        }
        return R::store($bean);
    }

    public function update($id, $data)
    {
        $bean = R::load($this->type, $id);
        if (!$bean->id) {
            return false;
        }
        foreach ($data as $key => $value) {
            $bean->$key = $value;
        }
        return R::store($bean);
    }

    public function delete($id)
    {
        $bean = R::load($this->type, $id);
        if (!$bean->id) {
            return false;
        }
        R::trash($bean);
        return true;
    }
} 