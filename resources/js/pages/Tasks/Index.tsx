import { type BreadcrumbItem, } from '@/types';
import { Head } from '@inertiajs/react';
import { DataTable } from '@/components/data-table';
import AppLayout from '@/layouts/app-layout';

import { ColumnDef } from "@tanstack/react-table"


import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


type Task = {
    id: string
    title: string
}

const columns: ColumnDef<Task>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const task = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(task.title)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },

]

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];


export default function Index( { tasks }) {
    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Tasks" />
                <span className="text-white">hello world</span>
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                    <DataTable data={tasks} columns={columns} />
                </div>
            </AppLayout>
        </>
    );
}
