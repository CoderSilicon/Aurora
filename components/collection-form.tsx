"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { collectionSchema } from "@/lib/schemas";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

const CollectionForm = ({ onSuccess, loading, open, setOpen }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    onSuccess(data);
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 dark:from-amber-400 dark:via-amber-300 dark:to-amber-200 bg-clip-text text-transparent font-josefin-700">
            Create New Collection
          </DialogTitle>
        </DialogHeader>
        {loading && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Collection Name</label>
            <Input
              {...register("name")}
              placeholder="Enter collection name..."
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Description (Optional)
            </label>
            <Textarea
              {...register("description")}
              placeholder="Describe your collection..."
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant={"destructive"}>
              Create Collection
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CollectionForm;
