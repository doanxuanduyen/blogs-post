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
import { useEffect, useRef, useState } from "react";

const initValidate = {
  title: "",
  excerpt: "",
  author: "",
  category: "",
  estimated: "",
  content: "",
};

export function CreatePostNormal() {
  const formDataRef = useRef<{ [key: string]: string }>({
    title: "",
    excerpt: "",
    author: "",
    category: "",
    tags: "",
    image: "",
    estimated: "",
    content: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>(initValidate);
  const [open, setOpen] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState<Option[]>([]);
  const [authorOptions, setAuthorOptions] = useState<Option[]>([]);
  const [tagsResult, setTagsResult] = useState<string[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    setAuthorOptions(AUTHORS);
    setCategoryOptions(CATEGORIES);
  }, []);

  const handleChangeForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    formDataRef.current[name] = value.trim();
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleChangeSelect = (value: string, name: string) => {
    formDataRef.current[name] = value.trim();
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleAddTags = () => {
    const tag = formDataRef.current.tags.trim();
    if (tag) {
      formDataRef.current.tags = "";
      setTagsResult((prev) => [...prev, tag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTagsResult((prev) => prev.filter((currentTag) => currentTag !== tag));
  };

  const handleAddImage = () => {
    const imageUrl = formDataRef.current.image.trim();

    if (imageUrl) {
      setPreviewUrl(imageUrl);
    }
  };

  const resetForm = () => {
    Object.keys(formDataRef.current).forEach((key) => {
      formDataRef.current[key] = "";
    });
    setTagsResult([]);
    setPreviewUrl("");
    setErrors(initValidate);
    setOpen(false);
  };

  const handleSubmit = () => {
    const values = formDataRef.current;
    const newErrors: { [key: string]: string } = { ...initValidate };

    if (values.title.length < 5) {
      newErrors.title = "Title must be at least 5 characters";
    }
    if (values.excerpt.length < 20) {
      newErrors.excerpt = "Excerpt must be at least 20 characters";
    }
    if (!values.author) {
      newErrors.author = "Author is required";
    }
    if (!values.category) {
      newErrors.category = "Category is required";
    }
    if (!values.estimated.trim()) {
      newErrors.estimated = "Read time is required";
    }
    if (values.content.length < 100) {
      newErrors.content = "Content must be at least 100 characters";
    }

    setErrors(newErrors);
    const hasError = Object.values(newErrors).some((val) => val !== "");
    if (!hasError) {
      resetForm();
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-gray-900 text-white cursor-pointer"
          >
            <PlusIcon /> Add New Post (Normal)
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-lg min-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Blog Post</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter post title..."
                  onChange={handleChangeForm}
                  defaultValue=""
                />
                {errors.title && <p className="text-red-500">{errors.title}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  placeholder="Brief description of the post..."
                  onChange={handleChangeForm}
                  defaultValue=""
                />
                {errors.excerpt && (
                  <p className="text-red-500">{errors.excerpt}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="author">Author *</Label>
                  <Dropdown
                    value={formDataRef.current.author}
                    options={authorOptions}
                    onSelectOption={(val) => handleChangeSelect(val, "author")}
                    placeholder={"Select author"}
                  />
                  {errors.author && (
                    <p className="text-red-500">{errors.author}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category *</Label>
                  <Dropdown
                    value={formDataRef.current.category}
                    options={categoryOptions}
                    onSelectOption={(val) =>
                      handleChangeSelect(val, "category")
                    }
                    placeholder={"Select category"}
                  />
                  {errors.category && (
                    <p className="text-red-500">{errors.category}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex gap-2">
                  <Input
                    id="tags"
                    name="tags"
                    placeholder="Add a tag..."
                    onChange={handleChangeForm}
                    defaultValue=""
                    value={formDataRef.current.tags}
                  />
                  <Button variant="secondary" onClick={handleAddTags}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tagsResult.length > 0 &&
                    tagsResult.map((tag, index) => {
                      return (
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
                      );
                    })}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Featured Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="image"
                    name="image"
                    placeholder="https://example.com/image.jpg"
                    onChange={handleChangeForm}
                    defaultValue=""
                  />
                  <Button variant="secondary" onClick={handleAddImage}>
                    Preview
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="rounded-lg border mt-2 max-w-xs max-h-60 object-cover"
                    />
                  )}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="estimated">Estimated Read Time *</Label>
                <Input
                  id="estimated"
                  name="estimated"
                  placeholder="5 min read"
                  onChange={handleChangeForm}
                  defaultValue=""
                />
                {errors.estimated && (
                  <p className="text-red-500">{errors.estimated}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                name="content"
                className="md:text-sm min-h-[400px]"
                placeholder="Write your blog post content here..."
                onChange={handleChangeForm}
                defaultValue=""
              />
              {errors.content && (
                <p className="text-red-500">{errors.content}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSubmit}>
              Publish Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
