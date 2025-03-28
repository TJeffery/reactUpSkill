import { type BreadcrumbItem, } from '@/types';
import { Head } from '@inertiajs/react';
import { DataTable } from '@/components/data-table';
import AppLayout from '@/layouts/app-layout';

import { ColumnDef } from "@tanstack/react-table"


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
