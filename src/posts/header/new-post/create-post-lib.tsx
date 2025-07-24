import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Dropdown from "@/posts/filter/dropdown-filter";
import {
  AUTHORS,
  CATEGORIES,
  type Option,
} from "@/posts/shared/data/dropdownOptions.data";
import { PlusIcon, XIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const postSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  excerpt: z.string().min(20, "Excerpt must be at least 20 characters"),
  author: z.string().min(1, "Author is required"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).optional(),
  image: z.string().url("Invalid image URL").optional(),
  estimated: z.string().min(1, "Read time is required"),
  content: z.string().min(100, "Content must be at least 100 characters"),
  tagsInput: z.string().optional(),
});

type PostFormValues = z.infer<typeof postSchema>;

export function CreatePostLib() {
  const [open, setOpen] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState<Option[]>([]);
  const [authorOptions, setAuthorOptions] = useState<Option[]>([]);
  const [tagsResult, setTagsResult] = useState<string[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch,
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      author: "",
      category: "",
      estimated: "",
      title: "",
      excerpt: "",
      content: "",
      image: "",
      tags: [],
    },
  });

  useEffect(() => {
    setAuthorOptions(AUTHORS);
    setCategoryOptions(CATEGORIES);
  }, []);

  const onSubmit = () => {
    reset();
    setTagsResult([]);
    setPreviewUrl("");
    setOpen(false);
  };

  const handleCancel = () => {
    reset();
    setOpen(false);
  };

  const handleAddTag = () => {
    const tagValue = watch("tags") || [];
    const inputTag = watch("tagsInput")?.trim();
    if (inputTag) {
      setTagsResult((prev) => [...prev, inputTag]);
      setValue("tags", [...tagValue, inputTag]);
      setValue("tagsInput", "");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTagsResult((prev) => prev.filter((t) => t !== tag));
    setValue(
      "tags",
      tagsResult.filter((t) => t !== tag)
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-gray-900 text-white cursor-pointer"
        >
          <PlusIcon /> Add New Post (Lib)
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg min-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Blog Post</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  {...register("title")}
                  placeholder="Enter post title..."
                />
                {errors.title && (
                  <p className="text-red-500">{errors.title.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  {...register("excerpt")}
                  placeholder="Brief description of the post..."
                />
                {errors.excerpt && (
                  <p className="text-red-500">{errors.excerpt.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="author">Author *</Label>
                  <Dropdown
                    value={watch("author") || ""}
                    options={authorOptions}
                    onSelectOption={(val) => setValue("author", val)}
                    {...register("author")}
                    placeholder="Select author"
                  />
                  {errors.author && (
                    <p className="text-red-500">{errors.author.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category *</Label>
                  <Dropdown
                    value={watch("category") || ""}
                    options={categoryOptions}
                    onSelectOption={(val) => setValue("category", val)}
                    {...register("category")}
                    placeholder="Select category"
                  />
                  {errors.category && (
                    <p className="text-red-500">{errors.category.message}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex gap-2">
                  <Input
                    id="tags"
                    placeholder="Add a tag..."
                    {...register("tagsInput")}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleAddTag}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tagsResult.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                      <Button
                        variant="secondary"
                        size="icon"
                        onClick={() => handleRemoveTag(tag)}
                        className="w-2 h-2 p-0 ml-1"
                      >
                        <XIcon />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="image">Featured Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="image"
                    {...register("image")}
                    placeholder="https://example.com/image.jpg"
                  />
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={() => setPreviewUrl(watch("image") || "")}
                  >
                    Preview
                  </Button>
                </div>
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="rounded-lg border mt-2 max-w-xs max-h-60 object-cover"
                  />
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="estimated">Estimated Read Time *</Label>
                <Input
                  id="estimated"
                  {...register("estimated")}
                  placeholder="5 min read"
                />
                {errors.estimated && (
                  <p className="text-red-500">{errors.estimated.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                {...register("content")}
                className="md:text-sm min-h-[400px]"
                placeholder="Write your blog post content here..."
              />
              {errors.content && (
                <p className="text-red-500">{errors.content.message}</p>
              )}
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" type="button" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Publish Post</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
