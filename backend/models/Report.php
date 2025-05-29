<?php

namespace App\Models;

use RedBeanPHP\R;

class Report extends BaseModel
{
    public function __construct()
    {
        parent::__construct('report');
    }

    public function getTurnoverRate($startDate, $endDate)
    {
        return R::getAll(
            'SELECT 
                MONTH(date) as month,
                COUNT(CASE WHEN status = "left" THEN 1 END) * 100.0 / COUNT(*) as turnover_rate
            FROM user_status_history
            WHERE date BETWEEN ? AND ?
            GROUP BY MONTH(date)
            ORDER BY month',
            [$startDate, $endDate]
        );
    }

    public function getHiringEffectiveness($startDate, $endDate)
    {
        return R::getAll(
            'SELECT 
                MONTH(hire_date) as month,
                COUNT(*) as successful_hires
            FROM user
            WHERE hire_date BETWEEN ? AND ?
            GROUP BY MONTH(hire_date)
            ORDER BY month',
            [$startDate, $endDate]
        );
    }

    public function getDepartmentDistribution()
    {
        return R::getAll(
            'SELECT 
                d.name as department,
                COUNT(u.id) as employee_count
            FROM department d
            LEFT JOIN user u ON u.department_id = d.id
            GROUP BY d.id'
        );
    }
} 