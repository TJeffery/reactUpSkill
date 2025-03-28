<?php

namespace App\Http\Controllers\Tasks;


use Inertia\Inertia;
use App\Models\Task;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DeleteTasksController extends Controller
{
    public function __invoke(Request $request, Task $task)
    {
        $task->delete();
    }
}
