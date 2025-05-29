<?php

namespace App\Models;

use RedBeanPHP\R;

class WorkingHours extends BaseModel
{
    public function __construct()
    {
        parent::__construct('working_hours');
    }

    public function findByUserAndDate($userId, $date)
    {
        return R::findOne($this->type, 'user_id = ? AND date = ?', [$userId, $date]);
    }

    public function findByUserAndDateRange($userId, $startDate, $endDate)
    {
        return R::find($this->type, 'user_id = ? AND date BETWEEN ? AND ?', [$userId, $startDate, $endDate]);
    }

    public function getTotalHoursByUser($userId, $startDate, $endDate)
    {
        $hours = R::getAll(
            'SELECT SUM(hours) as total_hours FROM ' . $this->type . 
            ' WHERE user_id = ? AND date BETWEEN ? AND ?',
            [$userId, $startDate, $endDate]
        );
        return $hours[0]['total_hours'] ?? 0;
    }
} 