import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Save, ArrowLeft, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProducts, ProductCategory } from '@/contexts/ProductsContext';
import ProductCategoryEditor from '@/components/ProductCategoryEditor';
import ProductEditor from '@/components/ProductEditor';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Admin = () => {
  const navigate = useNavigate();
  const { categories, updateCategory, addCategory, deleteCategory, addProduct, updateProduct, deleteProduct } = useProducts();
  const { toast } = useToast();
  const [heroImage, setHeroImage] = useState('');

  const [newCategory, setNewCategory] = useState({
    title: '',
    description: '',
    image: '',
    items: ['']
  });

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    detailedDescription: '',
    images: [''],
    type: '',
    origin: '',
    weight: '',
    pricePerKg: '',
    categoryId: ''
  });

  const handleSave = () => {
    console.log('Image de bannière sauvegardée:', heroImage);
    toast({
      title: "Succès",
      description: "Les modifications ont été sauvegardées avec succès!",
    });
  };

  const handleAddNewCategory = () => {
    if (newCategory.title && newCategory.description) {
      addCategory({
        title: newCategory.title,
        description: newCategory.description,
        image: newCategory.image,
        items: newCategory.items.filter(item => item.trim() !== '')
      });
      setNewCategory({
        title: '',
        description: '',
        image: '',
        items: ['']
      });
      toast({
        title: "Succès",
        description: "Nouvelle catégorie ajoutée avec succès!",
      });
    }
  };

  const handleAddNewProduct = () => {
    if (newProduct.name && newProduct.description && newProduct.categoryId) {
      addProduct(newProduct.categoryId, {
        name: newProduct.name,
        description: newProduct.description,
        detailedDescription: newProduct.detailedDescription,
        images: newProduct.images.filter(img => img.trim() !== ''),
        type: newProduct.type,
        origin: newProduct.origin,
        weight: newProduct.weight,
        pricePerKg: newProduct.pricePerKg
      });
      setNewProduct({
        name: '',
        description: '',
        detailedDescription: '',
        images: [''],
        type: '',
        origin: '',
        weight: '',
        pricePerKg: '',
        categoryId: ''
      });
      toast({
        title: "Succès",
        description: "Nouveau produit ajouté avec succès!",
      });
    }
  };

  const handleNewCategoryItemChange = (index: number, value: string) => {
    const newItems = [...newCategory.items];
    newItems[index] = value;
    setNewCategory(prev => ({ ...prev, items: newItems }));
  };

  const addNewCategoryItem = () => {
    setNewCategory(prev => ({ ...prev, items: [...prev.items, ''] }));
  };

  const removeNewCategoryItem = (index: number) => {
    setNewCategory(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleNewProductImageChange = (index: number, value: string) => {
    const newImages = [...newProduct.images];
    newImages[index] = value;
    setNewProduct(prev => ({ ...prev, images: newImages }));
  };

  const addNewProductImage = () => {
    setNewProduct(prev => ({ ...prev, images: [...prev.images, ''] }));
  };

  const removeNewProductImage = (index: number) => {
    setNewProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au site
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">
            Administration - Gestion du contenu
          </h1>
        </div>

        {/* Section gestion des catégories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Gestion des Catégories</h2>
          
          {/* Catégories existantes */}
          {categories.map((category) => (
            <ProductCategoryEditor
              key={category.id}
              category={category}
              onUpdate={updateCategory}
              onDelete={deleteCategory}
            />
          ))}

          {/* Ajouter nouvelle catégorie */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Ajouter une nouvelle catégorie
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="new-title">Titre</Label>
                <Input
                  id="new-title"
                  value={newCategory.title}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Nom de la nouvelle catégorie"
                />
              </div>

              <div>
                <Label htmlFor="new-description">Description</Label>
                <Textarea
                  id="new-description"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Description de la catégorie"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="new-image">URL de l'image</Label>
                <Input
                  id="new-image"
                  value={newCategory.image}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Articles disponibles</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addNewCategoryItem}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {newCategory.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={item}
                        onChange={(e) => handleNewCategoryItemChange(index, e.target.value)}
                        placeholder="Description de l'article"
                      />
                      {newCategory.items.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeNewCategoryItem(index)}
                        >
                          ×
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleAddNewCategory}
                className="w-full bg-butchery-red hover:bg-red-800 text-white"
              >
                Ajouter la catégorie
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Section gestion des produits individuels */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Gestion des Produits Individuels</h2>
          
          {/* Produits existants */}
          {categories.map((category) => 
            category.products.map((product) => (
              <ProductEditor
                key={product.id}
                product={product}
                onUpdate={updateProduct}
                onDelete={deleteProduct}
              />
            ))
          )}

          {/* Ajouter nouveau produit */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Ajouter un nouveau produit
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="product-category">Catégorie</Label>
                <Select value={newProduct.categoryId} onValueChange={(value) => setNewProduct(prev => ({ ...prev, categoryId: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="product-name">Nom du produit</Label>
                  <Input
                    id="product-name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Nom du produit"
                  />
                </div>
                <div>
                  <Label htmlFor="product-type">Type</Label>
                  <Input
                    id="product-type"
                    value={newProduct.type}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, type: e.target.value }))}
                    placeholder="Type de produit"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="product-description">Description courte</Label>
                <Textarea
                  id="product-description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Description courte du produit"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="product-detailed-description">Description détaillée</Label>
                <Textarea
                  id="product-detailed-description"
                  value={newProduct.detailedDescription}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, detailedDescription: e.target.value }))}
                  placeholder="Description complète du produit"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="product-origin">Origine</Label>
                  <Input
                    id="product-origin"
                    value={newProduct.origin}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, origin: e.target.value }))}
                    placeholder="Origine du produit"
                  />
                </div>
                <div>
                  <Label htmlFor="product-weight">Poids</Label>
                  <Input
                    id="product-weight"
                    value={newProduct.weight}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, weight: e.target.value }))}
                    placeholder="Poids (ex: 1.5-2kg)"
                  />
                </div>
                <div>
                  <Label htmlFor="product-price">Prix au kilo</Label>
                  <Input
                    id="product-price"
                    value={newProduct.pricePerKg}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, pricePerKg: e.target.value }))}
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
                    onClick={addNewProductImage}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {newProduct.images.map((image, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={image}
                        onChange={(e) => handleNewProductImageChange(index, e.target.value)}
                        placeholder="URL de l'image"
                      />
                      {newProduct.images.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeNewProductImage(index)}
                        >
                          ×
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleAddNewProduct}
                className="w-full bg-butchery-red hover:bg-red-800 text-white"
              >
                Ajouter le produit
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Section gestion de la photo de bannière */}
        <div className="grid gap-6">
          <h2 className="text-2xl font-bold text-gray-900">Gestion de la photo de bannière</h2>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Photo de bannière (Accueil)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Label htmlFor="hero-image">URL de l'image</Label>
                <Input
                  id="hero-image"
                  placeholder="https://example.com/image.jpg"
                  value={heroImage}
                  onChange={(e) => setHeroImage(e.target.value)}
                />
                {heroImage && (
                  <img
                    src={heroImage}
                    alt="Aperçu bannière"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleSave}
            className="w-full bg-butchery-red hover:bg-red-800 text-white flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Sauvegarder les modifications
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
