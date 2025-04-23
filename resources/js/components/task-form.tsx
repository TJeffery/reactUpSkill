"use client";

import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";

interface Task {
    id: number;
    title: string;
    description: string;
}

interface TaskFormProps {
    task?: Task; // Optional task for editing
    onSuccess?: () => void; // Callback after success
}

export default function TaskForm({ task, onSuccess }: TaskFormProps) {
    const [form, setForm] = useState({ title: "", description: "" });
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Pre-fill form when editing
    useEffect(() => {
        if (task) {
            setForm({ title: task.title, description: task.description });
        }
    }, [task]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({}); // Clear previous errors

        if (task) {
            // Update task
            router.put(route("tasks.update", task.id), form, {
                onError: (errorResponse) => setErrors(errorResponse),
                onSuccess: () => {
                    if (onSuccess) onSuccess();
                },
            });
        } else {
            // Create new task
            router.post(route("tasks.store"), form, {
                onError: (errorResponse) => setErrors(errorResponse),
                onSuccess: () => {
                    setForm({ title: "", description: "" }); // Reset form
                    if (onSuccess) onSuccess();
                },
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md">
            <div>
                <label className="block text-sm font-medium">Title</label>
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border rounded-md"
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border rounded-md"
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
                {task ? "Update Task" : "Add Task"}
            </button>
        </form>
    );
}
