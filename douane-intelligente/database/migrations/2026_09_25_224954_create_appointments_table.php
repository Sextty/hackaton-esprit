<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->string('reference_code')->unique();
            $table->foreignId('office_id')->constrained('customs_offices')->cascadeOnDelete();
            $table->foreignId('service_id')->constrained('customs_services')->cascadeOnDelete();
            $table->date('appointment_date');
            $table->time('appointment_time');
            $table->string('status')->default('pending')->index();
            $table->string('citizen_name');
            $table->timestamps();

            $table->index(['appointment_date', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
