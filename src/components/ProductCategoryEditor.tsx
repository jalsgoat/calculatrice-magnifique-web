
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ProductCategory } from '@/contexts/ProductsContext';
import { Trash2 } from 'lucide-react';
import ImageUploader from '@/components/ImageUploader';

interface ProductCategoryEditorProps {
  category: ProductCategory;
  onUpdate: (id: string, updates: Partial<ProductCategory>) => void;
  onDelete: (id: string) => void;
}

const ProductCategoryEditor = ({ category, onUpdate, onDelete }: ProductCategoryEditorProps) => {
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

        <ImageUploader
          label="Image de la catégorie"
          value={category.image}
          onChange={(value) => onUpdate(category.id, { image: value })}
          placeholder="URL de l'image ou uploader depuis votre PC"
        />
      </CardContent>
    </Card>
  );
};

export default ProductCategoryEditor;
