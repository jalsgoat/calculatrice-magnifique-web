
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ProductCategory } from '@/contexts/ProductsContext';
import { Trash2, Plus, Minus } from 'lucide-react';

interface ProductCategoryEditorProps {
  category: ProductCategory;
  onUpdate: (id: string, updates: Partial<ProductCategory>) => void;
  onDelete: (id: string) => void;
}

const ProductCategoryEditor = ({ category, onUpdate, onDelete }: ProductCategoryEditorProps) => {
  const [items, setItems] = useState(category.items);

  const handleItemChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
    onUpdate(category.id, { items: newItems });
  };

  const addItem = () => {
    const newItems = [...items, ''];
    setItems(newItems);
    onUpdate(category.id, { items: newItems });
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    onUpdate(category.id, { items: newItems });
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{category.title}</CardTitle>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(category.id)}
          className="flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Supprimer
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor={`title-${category.id}`}>Titre</Label>
          <Input
            id={`title-${category.id}`}
            value={category.title}
            onChange={(e) => onUpdate(category.id, { title: e.target.value })}
            placeholder="Nom de la catégorie"
          />
        </div>

        <div>
          <Label htmlFor={`description-${category.id}`}>Description</Label>
          <Textarea
            id={`description-${category.id}`}
            value={category.description}
            onChange={(e) => onUpdate(category.id, { description: e.target.value })}
            placeholder="Description de la catégorie"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor={`image-${category.id}`}>URL de l'image</Label>
          <Input
            id={`image-${category.id}`}
            value={category.image}
            onChange={(e) => onUpdate(category.id, { image: e.target.value })}
            placeholder="https://example.com/image.jpg"
          />
          {category.image && (
            <img
              src={category.image}
              alt={category.title}
              className="w-full h-32 object-cover rounded-lg mt-2"
            />
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <Label>Articles disponibles</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addItem}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Ajouter
            </Button>
          </div>
          <div className="space-y-2">
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={item}
                  onChange={(e) => handleItemChange(index, e.target.value)}
                  placeholder="Description de l'article"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeItem(index)}
                >
                  <Minus className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCategoryEditor;
