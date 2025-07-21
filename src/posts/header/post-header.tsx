import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreatePostNormal } from "./new-post/create-post-normal";
import { CreatePostLib } from "./new-post/create-post-lib";

export const Header = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-start">
          Blog Posts
        </h1>
        <p className="text-muted-foreground mt-2 text">
          Discover insights, tutorials, and updates from our team
        </p>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <PlusIcon /> Add New Post
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[460px]">
          <DialogTitle>Create a new post</DialogTitle>
          <div className="flex gap-4">
            <CreatePostNormal />
            <CreatePostLib />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
