
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Product } from '@/contexts/ProductsContext';
import { Trash2, Plus, Minus, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ImageUploader from '@/components/ImageUploader';

interface ProductEditorProps {
  product: Product;
  onUpdate: (productId: string, updates: Partial<Product>) => void;
  onDelete: (productId: string) => void;
}

const ProductEditor = ({ product, onUpdate, onDelete }: ProductEditorProps) => {
  const [images, setImages] = useState(product.images);
  const navigate = useNavigate();

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
    onUpdate(product.id, { images: newImages });
  };

  const addImage = () => {
    const newImages = [...images, ''];
    setImages(newImages);
    onUpdate(product.id, { images: newImages });
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onUpdate(product.id, { images: newImages });
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          {product.name}
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate(`/produit/${product.id}`)}
          >
            <Eye className="w-4 h-4" />
          </Button>
        </CardTitle>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(product.id)}
          className="flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Supprimer
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`name-${product.id}`}>Nom du produit</Label>
            <Input
              id={`name-${product.id}`}
              value={product.name}
              onChange={(e) => onUpdate(product.id, { name: e.target.value })}
              placeholder="Nom du produit"
            />
          </div>
          <div>
            <Label htmlFor={`type-${product.id}`}>Type</Label>
            <Input
              id={`type-${product.id}`}
              value={product.type}
              onChange={(e) => onUpdate(product.id, { type: e.target.value })}
              placeholder="Type de produit"
            />
          </div>
        </div>

        <div>
          <Label htmlFor={`description-${product.id}`}>Description courte</Label>
          <Textarea
            id={`description-${product.id}`}
            value={product.description}
            onChange={(e) => onUpdate(product.id, { description: e.target.value })}
            placeholder="Description courte du produit"
            rows={2}
          />
        </div>

        <div>
          <Label htmlFor={`detailed-description-${product.id}`}>Description détaillée</Label>
          <Textarea
            id={`detailed-description-${product.id}`}
            value={product.detailedDescription}
            onChange={(e) => onUpdate(product.id, { detailedDescription: e.target.value })}
            placeholder="Description complète du produit"
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor={`origin-${product.id}`}>Origine</Label>
            <Input
              id={`origin-${product.id}`}
              value={product.origin}
              onChange={(e) => onUpdate(product.id, { origin: e.target.value })}
              placeholder="Origine du produit"
            />
          </div>
          <div>
            <Label htmlFor={`weight-${product.id}`}>Poids</Label>
            <Input
              id={`weight-${product.id}`}
              value={product.weight}
              onChange={(e) => onUpdate(product.id, { weight: e.target.value })}
              placeholder="Poids (ex: 1.5-2kg)"
            />
          </div>
          <div>
            <Label htmlFor={`price-${product.id}`}>Prix au kilo</Label>
            <Input
              id={`price-${product.id}`}
              value={product.pricePerKg}
              onChange={(e) => onUpdate(product.id, { pricePerKg: e.target.value })}
              placeholder="Prix (ex: 25€/kg)"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <Label>Images du produit</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addImage}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Ajouter une image
            </Button>
          </div>
          <div className="space-y-4">
            {images.map((image, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Image {index + 1}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeImage(index)}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </div>
                <ImageUploader
                  label=""
                  value={image}
                  onChange={(value) => handleImageChange(index, value)}
                  placeholder="URL de l'image ou uploader depuis votre PC"
                />
              </div>
            ))}
            {images.length === 0 && (
              <p className="text-gray-500 text-sm">Aucune image ajoutée</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductEditor;
