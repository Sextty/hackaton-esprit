<?php

use App\Http\Controllers\AgentController;
use App\Http\Controllers\AppointmentController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
})->name('home');

Route::view('/assistant', 'assistant')->name('assistant');

Route::get('/admin', [AppointmentController::class, 'adminIndex'])->name('admin.index');

Route::post('/appointments', [AppointmentController::class, 'store'])->name('appointments.store');
Route::get('/appointments/{reference_code}', [AppointmentController::class, 'show'])->name('appointments.show');
Route::get('/appointments/{reference_code}/ticket', [AppointmentController::class, 'ticket'])->name('appointments.ticket');

Route::post('/api/agent/chat', [AgentController::class, 'chat'])->name('agent.chat');
