import { useState } from "react";
import GifList from "./GifList";
import GifSearch from "./GifSearch";
import { validateCategory } from "../utils/utils";

export default function GifExpert() {
  const [categories, setCategories] = useState<string[]>([]);

  const onAddCategory = (newCategory: string) => {
    newCategory = newCategory.toLowerCase();

    if (validateCategory(categories, newCategory)) {
      setCategories((prevCategories) => [newCategory, ...prevCategories]);
    } else {
      return;
    }
  };

  const onRemoveCategory = (category: string) => {
    setCategories(prevCategories => {
        return prevCategories.filter(prevCategory => prevCategory !== category);
    })
  }

  return (
    <div>
      <GifSearch onNewCategory={onAddCategory} />
      <div className="flex flex-col gap-12">
        {categories &&
          categories.map((category) => (
            <GifList key={category} category={category} onRemoveCategory={onRemoveCategory} />
          ))}
      </div>
    </div>
  );
}
