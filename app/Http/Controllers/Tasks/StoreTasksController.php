<?php

namespace App\Http\Controllers\Tasks;

use App\Models\Task;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class StoreTasksController extends Controller
{
    public function __invoke(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
        ]);
ray('hi');
        auth()->user()->tasks()->create([
            'title' => $request->title,
            'description' => $request->description,
        ]);
    }
}
