
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '@/contexts/ProductsContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Phone, Mail } from 'lucide-react';
import ProductImageGallery from '@/components/ProductImageGallery';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { getProductById } = useProducts();

  const product = productId ? getProductById(productId) : undefined;

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Produit non trouvé</h1>
          <Button onClick={() => navigate('/')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux produits
          </Button>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Galerie d'images */}
          <div>
            <ProductImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Informations du produit */}
          <div className="space-y-6">
            <div>
              <h1 className="font-playfair text-3xl md:text-4xl font-bold text-butchery-red mb-4">
                {product.name}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Détails du produit */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4">Détails du produit</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Type</span>
                    <p className="text-gray-900">{product.type}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Origine</span>
                    <p className="text-gray-900">{product.origin}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Poids</span>
                    <p className="text-gray-900">{product.weight}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Prix</span>
                    <p className="text-butchery-red font-bold text-lg">{product.pricePerKg}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description détaillée */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4">Description complète</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.detailedDescription}
                </p>
              </CardContent>
            </Card>

            {/* Certification Halal */}
            <div className="bg-butchery-red text-white p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Certification Halal</h3>
              <p className="text-sm">
                Ce produit est certifié halal et respecte scrupuleusement les traditions islamiques.
              </p>
            </div>

            {/* Boutons de contact */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-gray-900">Commander ce produit</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  className="bg-butchery-red hover:bg-red-800 text-white flex-1"
                >
                  <a href="tel:+33561865442" className="flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    Appeler la boucherie
                  </a>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="flex-1"
                >
                  <a href="mailto:contact@boucherie-hidaya.fr" className="flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    Envoyer un email
                  </a>
                </Button>
              </div>
              <p className="text-sm text-gray-600 text-center">
                Contactez-nous pour vérifier la disponibilité et passer commande
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
