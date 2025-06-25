
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '@/contexts/ProductsContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const CategoryDetail = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { categories } = useProducts();

  const category = categories.find(cat => cat.id === categoryId);

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Catégorie non trouvée</h1>
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
            Retour à l'accueil
          </Button>
        </div>
      </div>

      {/* Hero de la catégorie */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={category.image}
          alt={category.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
              {category.title}
            </h1>
            <p className="text-xl max-w-2xl mx-auto px-4">
              {category.description}
            </p>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Produits spécifiques */}
        {category.products && category.products.length > 0 ? (
          <div>
            <h2 className="font-playfair text-3xl font-bold text-butchery-red mb-8">
              Produits Disponibles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={product.images && product.images.length > 0 ? product.images[0] : category.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-butchery-red font-bold text-lg">
                        {product.pricePerKg}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {product.weight}
                      </span>
                    </div>
                    <Button
                      onClick={() => navigate(`/produit/${product.id}`)}
                      className="w-full bg-butchery-red hover:bg-red-800 text-white"
                    >
                      Voir les détails
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="font-playfair text-2xl font-bold text-gray-600 mb-4">
              Aucun produit disponible
            </h2>
            <p className="text-gray-500">
              Les produits de cette catégorie seront bientôt disponibles.
            </p>
          </div>
        )}

        {/* Section contact */}
        <div className="mt-12 text-center">
          <div className="bg-butchery-red text-white p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="font-playfair text-2xl font-bold mb-4">
              Contactez-nous pour commander
            </h3>
            <p className="text-lg leading-relaxed mb-6">
              Tous nos produits sont disponibles sur commande. Contactez-nous pour vérifier la disponibilité et passer votre commande.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                variant="outline"
                className="bg-white text-butchery-red hover:bg-gray-100"
              >
                <a href="tel:+33561865442" className="flex items-center justify-center gap-2">
                  📞 05 61 86 54 42
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="bg-white text-butchery-red hover:bg-gray-100"
              >
                <a href="mailto:contact@boucherie-hidaya.fr" className="flex items-center justify-center gap-2">
                  ✉️ Nous écrire
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
