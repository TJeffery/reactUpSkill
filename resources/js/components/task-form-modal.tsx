import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

type Task = {
    id?: string;
    title: string;
    description: string;
};

type TaskFormModalProps = {
    task?: Task | null;
    isOpen: boolean;
    onClose: () => void;
};

export default function TaskFormModal({ task, isOpen, onClose }: TaskFormModalProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    // Reset the form when the modal opens
    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
        } else {
            setTitle("");
            setDescription("");
        }
    }, [task]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevent form submission from refreshing the page

        setLoading(true);
        const payload = { title, description };

        if (task?.id) {
            // Edit Task
            router.put(route("tasks.update", task.id), payload, {
                onSuccess: () => {
                    onClose(); // Close the modal after success
                    setLoading(false);
                },
                onError: () => setLoading(false),
            });
        } else {
            // Create Task
            router.post(route("tasks.store"), payload, {
                onSuccess: () => {
                    onClose(); // Close the modal after success
                    setLoading(false);
                },
                onError: () => setLoading(false),
            });
        }
    };

    // If modal is not open, don't render anything

    return (
        <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{task ? "Edit Task" : "New Task"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <Input
                            type="text"
                            placeholder="Task Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <Input
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <DialogFooter className="mt-4">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : task ? "Update" : "Create"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
