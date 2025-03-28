<?php

namespace App\Http\Controllers\Tasks;


use Inertia\Inertia;
use Inertia\Controller;
use Illuminate\Http\Request;

class IndexTasksController extends Controller
{
    public function __invoke(Request $request): \Inertia\Response
    {
        $user = auth()->user()->load('tasks');


        return Inertia::render('Tasks/Index', [
            'tasks' => $user->tasks,
        ]);
    }
}
