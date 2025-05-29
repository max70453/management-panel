<?php

namespace App\Models;

use RedBeanPHP\R;

class Department extends BaseModel
{
    public function __construct()
    {
        parent::__construct('department');
    }

    public function getUsers($departmentId)
    {
        return R::find('user', 'department_id = ?', [$departmentId]);
    }

    public function getDepartmentStats()
    {
        return R::getAll(
            'SELECT d.name, COUNT(u.id) as employee_count 
            FROM department d 
            LEFT JOIN user u ON u.department_id = d.id 
            GROUP BY d.id'
        );
    }

    public function getDepartmentKPI($departmentId, $startDate, $endDate)
    {
        return R::getAll(
            'SELECT AVG(kpi_score) as avg_kpi 
            FROM working_hours 
            WHERE department_id = ? AND date BETWEEN ? AND ?',
            [$departmentId, $startDate, $endDate]
        );
    }
} 