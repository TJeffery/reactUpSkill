<?php

namespace App\Http\Controllers\Tasks;


use Inertia\Inertia;
use Inertia\Controller;
use Illuminate\Http\Request;

class IndexTasksController extends Controller
{
    public function __invoke(Request $request): \Inertia\Response
    {
        $tasks = auth()->user()->tasks()->orderBy('id', 'desc')->get();

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
        ]);
    }
}
