import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Plus, Phone, Clock, Image } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProducts, ProductCategory } from '@/contexts/ProductsContext';
import ProductCategoryEditor from '@/components/ProductCategoryEditor';
import ProductEditor from '@/components/ProductEditor';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ImageUploader from '@/components/ImageUploader';
import DataManager from '@/components/DataManager';
import GlobalSaveButton from '@/components/GlobalSaveButton';

const Admin = () => {
  const navigate = useNavigate();
  const { categories, siteData, updateCategory, addCategory, deleteCategory, addProduct, updateProduct, deleteProduct, updateHeroSection, updateContact } = useProducts();

  // États locaux pour les formulaires
  const [heroData, setHeroData] = useState({
    backgroundImage: siteData?.heroSection.backgroundImage || ''
  });

  const [contactData, setContactData] = useState({
    phone: siteData?.contact.phone || '',
    address: siteData?.contact.address || '',
    email: siteData?.contact.email || '',
    hours: {
      weekdays: siteData?.contact.hours.weekdays || '',
      saturday: siteData?.contact.hours.saturday || '',
      sunday: siteData?.contact.hours.sunday || ''
    }
  });

  // Vérification de sécurité pour éviter l'erreur de map
  if (!categories) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  const [newCategory, setNewCategory] = useState({
    title: '',
    description: '',
    image: ''
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

  const handleHeroImageChange = (value: string) => {
    setHeroData(prev => ({ ...prev, backgroundImage: value }));
    updateHeroSection({ backgroundImage: value });
  };

  const handleContactChange = (field: string, value: string) => {
    if (field.startsWith('hours.')) {
      const hourField = field.split('.')[1];
      setContactData(prev => ({
        ...prev,
        hours: { ...prev.hours, [hourField]: value }
      }));
      updateContact({
        hours: { ...contactData.hours, [hourField]: value }
      });
    } else {
      setContactData(prev => ({ ...prev, [field]: value }));
      updateContact({ [field]: value });
    }
  };

  const handleAddNewCategory = () => {
    if (newCategory.title && newCategory.description) {
      addCategory({
        title: newCategory.title,
        description: newCategory.description,
        image: newCategory.image,
        products: []
      });
      setNewCategory({
        title: '',
        description: '',
        image: ''
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
    }
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

        {/* Section Export/Import */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Gestion des Données</h2>
          <DataManager />
        </div>

        {/* Section gestion de l'image de fond uniquement */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Image de Fond de la Bannière</h2>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="w-5 h-5" />
                Image de fond
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ImageUploader
                label="Image de fond"
                value={heroData.backgroundImage}
                onChange={handleHeroImageChange}
                placeholder="URL de l'image de fond ou uploader depuis votre PC"
              />
            </CardContent>
          </Card>
        </div>

        {/* Section gestion des informations de contact */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations de Contact</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="contact-phone">Numéro de téléphone</Label>
                  <Input
                    id="contact-phone"
                    value={contactData.phone}
                    onChange={(e) => handleContactChange('phone', e.target.value)}
                    placeholder="05 61 86 54 42"
                  />
                </div>

                <div>
                  <Label htmlFor="contact-address">Adresse</Label>
                  <Textarea
                    id="contact-address"
                    value={contactData.address}
                    onChange={(e) => handleContactChange('address', e.target.value)}
                    placeholder="Adresse complète"
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={contactData.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    placeholder="contact@boucherie-hidaya.fr"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Horaires d'ouverture
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="hours-weekdays">Lundi à Vendredi</Label>
                  <Input
                    id="hours-weekdays"
                    value={contactData.hours.weekdays}
                    onChange={(e) => handleContactChange('hours.weekdays', e.target.value)}
                    placeholder="8h30-13h / 15h-19h30"
                  />
                </div>

                <div>
                  <Label htmlFor="hours-saturday">Samedi</Label>
                  <Input
                    id="hours-saturday"
                    value={contactData.hours.saturday}
                    onChange={(e) => handleContactChange('hours.saturday', e.target.value)}
                    placeholder="8h30-13h / 15h-19h30"
                  />
                </div>

                <div>
                  <Label htmlFor="hours-sunday">Dimanche</Label>
                  <Input
                    id="hours-sunday"
                    value={contactData.hours.sunday}
                    onChange={(e) => handleContactChange('hours.sunday', e.target.value)}
                    placeholder="8h30-13h"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Section gestion des catégories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Gestion des Catégories (Nos Produits)</h2>
          
          {/* Catégories existantes avec vérification de sécurité */}
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <ProductCategoryEditor
                key={category.id}
                category={category}
                onUpdate={updateCategory}
                onDelete={deleteCategory}
              />
            ))
          ) : (
            <p className="text-gray-600 mb-6">Aucune catégorie trouvée.</p>
          )}

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

              <ImageUploader
                label="Image de la catégorie"
                value={newCategory.image}
                onChange={(value) => setNewCategory(prev => ({ ...prev, image: value }))}
                placeholder="URL de l'image ou uploader depuis votre PC"
              />

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
        <div className="mb-32">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Gestion des Produits Individuels</h2>
          
          {/* Produits existants avec vérification de sécurité */}
          {categories && categories.length > 0 ? (
            categories.map((category) => 
              category.products && category.products.length > 0 ? (
                category.products.map((product) => (
                  <ProductEditor
                    key={product.id}
                    product={product}
                    onUpdate={updateProduct}
                    onDelete={deleteProduct}
                  />
                ))
              ) : null
            )
          ) : (
            <p className="text-gray-600 mb-6">Aucun produit trouvé.</p>
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
                    <SelectValue placeholder={categories && categories.length > 0 ? "Sélectionner une catégorie" : "Aucune catégorie disponible"} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories && categories.length > 0 ? (
                      categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.title}
                        </SelectItem>
                      ))
                    ) : null}
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
                <div className="space-y-4">
                  {newProduct.images.map((image, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Image {index + 1}</span>
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
                      <ImageUploader
                        label=""
                        value={image}
                        onChange={(value) => handleNewProductImageChange(index, value)}
                        placeholder="URL de l'image ou uploader depuis votre PC"
                      />
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
      </div>

      <GlobalSaveButton />
    </div>
  );
};

export default Admin;
