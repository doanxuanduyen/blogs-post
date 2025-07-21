import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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
  authors,
  categories,
  type BaseOption,
} from "@/posts/shared/data/dropdownOptions.data";
import { Image, PlusIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
const initValidate = {
  title: "",
  excerpt: "",
  author: "",
  category: "",
  estimated: "",
  content: "",
};

const initFormValues = {
  title: "",
  excerpt: "",
  author: "",
  category: "",
  tags: "",
  image: "",
  estimated: "",
  content: "",
};

export function CreatePostLib() {
  const [categoryOptions, setCategoryOptions] = useState<BaseOption[]>([]);
  const [authorOptions, setAuthorOptions] = useState<BaseOption[]>([]);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>(initValidate);
  const [formValues, setFormValues] = useState<{ [key: string]: string }>(
    initFormValues
  );

  useEffect(function loadAPI() {
    setAuthorOptions(authors);
    setCategoryOptions(categories);
  });

  const handleSubmit = () => {
    if (formValues.title.length < 5) {
      setErrors((prev) => {
        return { ...prev, title: "Title must be at least 5 characters" };
      });
    }
    if (formValues.excerpt.length < 20) {
      setErrors((prev) => {
        return { ...prev, excerpt: "Excerpt must be at least 20 characters" };
      });
    }
    if (formValues.author === "") {
      setErrors((prev) => {
        return { ...prev, author: "Author is required" };
      });
    }
    if (formValues.category === "") {
      setErrors((prev) => {
        return { ...prev, category: "Category is required" };
      });
    }
    if (formValues.estimated.toString().trim() === "") {
      setErrors((prev) => {
        return { ...prev, estimated: "Read time is required" };
      });
    }
    if (formValues.content.length < 100) {
      setErrors((prev) => {
        return { ...prev, content: "Content must be at least 100 characters" };
      });
    }
    if (
      formValues.title.length > 5 &&
      formValues.excerpt.length > 20 &&
      formValues.author !== "" &&
      formValues.category !== "" &&
      formValues.estimated.toString().trim() !== "" &&
      formValues.content.length > 100
    ) {
      setOpen(false);
      setFormValues(initFormValues);
    }
  };

  const handleChangeForm = (e: any) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleChangeSelect = (value: string, name: string) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form ref={formRef}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-gray-900 text-white cursor-pointer"
          >
            <PlusIcon /> Add New Post (lib)
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
                  value={formValues.title}
                  onChange={handleChangeForm}
                />
                {errors.title && <p className="text-red-500">{errors.title}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  placeholder="Brief description of the post..."
                  value={formValues.excerpt}
                  onChange={handleChangeForm}
                />
                {errors.excerpt && (
                  <p className="text-red-500">{errors.excerpt}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="author">Author *</Label>
                  <Dropdown
                    value={formValues.author}
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
                    value={formValues.category}
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
                    value={formValues.tags}
                    placeholder="Add a tag..."
                    onChange={handleChangeForm}
                  />
                  <Button variant="secondary">Add</Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Featured Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="image"
                    value={formValues.image}
                    name="image"
                    placeholder="Enter post title..."
                    onChange={handleChangeForm}
                  />
                  <Button variant="secondary">
                    <Image />
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="estimated">Estimated Read Time *</Label>
                <Input
                  value={formValues.estimated}
                  id="estimated"
                  name="estimated"
                  placeholder="5 min read"
                  onChange={handleChangeForm}
                />
                {errors.estimated && (
                  <p className="text-red-500">{errors.estimated}</p>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <Label htmlFor="content">Content *</Label>
              <Textarea
                className="md:text-sm min-h-[400px]"
                id="content"
                name="content"
                value={formValues.content}
                placeholder="Write your blog post content here..."
                onChange={handleChangeForm}
              />
              {errors.content && (
                <p className="text-red-500">{errors.content}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={() => handleSubmit()}>
              Publish Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
