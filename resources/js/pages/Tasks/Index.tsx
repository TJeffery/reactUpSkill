import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { DataTable } from '@/components/data-table';
import AppLayout from '@/layouts/app-layout';
import { router } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table"

import {
    MoreHorizontal,
    Trash2,
    SquareCheckBigIcon,
    X
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from '@/components/ui/checkbox';
import TaskFormModal from "@/components/task-form-modal";

type Task = {
    id: string;
    completed: boolean;
    task: string;
    description: string;
};

const handleUpdate = (taskId: string) => {
    router.put(route('tasks.update', taskId), {} , {
        onFinish: () => {
            router.get(route('tasks.index'));
        },
    });
};

const handleDelete = (taskId: string) => {
    router.delete(route('tasks.delete', taskId));
};

export default function Index({ tasks }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState<Task | null>(null);

    // Function to open the modal with or without task data
    const openModal = (task?: Task) => {
        setCurrentTask(task || null); // Set current task data or null for new task
        setIsModalOpen(true); // Open the modal
    };

    // Ensure modal stays open for the correct task
    const handleCloseModal = () => {
        setIsModalOpen(false); // Explicitly close the modal
        setCurrentTask(null); // Optionally reset the current task when closing
    };

    const columns: ColumnDef<Task>[] = [
        {
            accessorKey: "completed",
            header: "",
            cell: ({ row }) => {
                return (
                    <Checkbox
                        checked={row.original.completed}
                    />
                );
            },
        },
        {
            accessorKey: "title",
            header: "Title",
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const task = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleUpdate(task.id)}>
                                { task.completed ? <SquareCheckBigIcon className="w-4 h-4 mr-2" /> : <X className="w-4 h-4 mr-2" /> }
                                Toggle
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openModal(task)}>
                                <SquareCheckBigIcon className="w-4 h-4 mr-2" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(task.id)}>
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    return (
        <>
            <AppLayout>
                <Head title="Tasks" />
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    <Button onClick={() => openModal()}>New Task</Button>
                    <DataTable data={tasks} columns={columns} />

                    {/* Task Form Modal */}
                    <TaskFormModal
                        task={currentTask}
                        isOpen={isModalOpen}
                        onClose={handleCloseModal} // Close modal with handleCloseModal function
                    />
                </div>
            </AppLayout>
        </>
    );
}
