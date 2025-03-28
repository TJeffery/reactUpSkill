<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('tasks', \App\Http\Controllers\Tasks\IndexTasksController::class)->name('tasks.index');
    Route::put('tasks/{task}/update', \App\Http\Controllers\Tasks\UpdateTasksController::class)->name('tasks.update');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
