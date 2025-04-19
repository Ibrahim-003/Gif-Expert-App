import { useState } from "react";
import GifList from "./GifList";
import GifSearch from "./GifSearch";
import { validateCategory } from "../utils/utils";

export default function GifExpert() {
  const [categories, setCategories] = useState<string[]>([]);

  const onAddCategory = (newCategory: string) => {
    newCategory = newCategory.toLowerCase();

    if (validateCategory(categories, newCategory)) {
      setCategories((prev) => [newCategory, ...prev]);
    }
  };

  const onRemoveCategory = (category: string) => {
    setCategories((prev) => prev.filter((c) => c !== category));
  };

  return (
    <div>
      <GifSearch onNewCategory={onAddCategory} />
      <section className='flex flex-col gap-12'>
        {categories &&
          categories.map((category) => (
            <GifList
              key={category}
              category={category}
              onRemoveCategory={onRemoveCategory}
            />
          ))}
      </section>
    </div>
  );
}
