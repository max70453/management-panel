<?php

namespace App\Models;

use RedBeanPHP\R;

class Forecast extends BaseModel
{
    public function __construct()
    {
        parent::__construct('forecast');
    }

    public function getWorkforceForecast($departmentId, $months)
    {
        return R::getAll(
            'SELECT 
                DATE_FORMAT(date, "%Y-%m") as month,
                predicted_headcount,
                actual_headcount
            FROM forecast
            WHERE department_id = ?
            AND date >= CURDATE()
            AND date <= DATE_ADD(CURDATE(), INTERVAL ? MONTH)
            ORDER BY date',
            [$departmentId, $months]
        );
    }

    public function getSkillGapAnalysis($departmentId)
    {
        return R::getAll(
            'SELECT 
                s.name as skill,
                COUNT(u.id) as current_employees,
                f.required_employees
            FROM skills s
            LEFT JOIN user_skills us ON us.skill_id = s.id
            LEFT JOIN user u ON u.id = us.user_id AND u.department_id = ?
            LEFT JOIN forecast_skills f ON f.skill_id = s.id AND f.department_id = ?
            GROUP BY s.id',
            [$departmentId, $departmentId]
        );
    }

    public function getTurnoverPrediction($departmentId, $months)
    {
        return R::getAll(
            'SELECT 
                DATE_FORMAT(date, "%Y-%m") as month,
                predicted_turnover_rate
            FROM turnover_forecast
            WHERE department_id = ?
            AND date >= CURDATE()
            AND date <= DATE_ADD(CURDATE(), INTERVAL ? MONTH)
            ORDER BY date',
            [$departmentId, $months]
        );
    }
} 