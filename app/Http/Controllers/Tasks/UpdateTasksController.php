<?php

namespace App\Http\Controllers\Tasks;


use Inertia\Inertia;
use App\Models\Task;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UpdateTasksController extends Controller
{
    public function __invoke(Request $request, Task $task)
    {
        $user = auth()->user()->load('tasks');

        $task->completed = !$task->completed;

        $task->save();

        ray('here');
        return redirect()->back();
    }
}
