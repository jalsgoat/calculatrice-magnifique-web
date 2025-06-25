import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  detailedDescription: string;
  images: string[];
  type: string;
  origin: string;
  weight: string;
  pricePerKg: string;
}

export interface ProductCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  products: Product[];
}

export interface SiteData {
  heroSection: {
    title: string;
    subtitle: string;
    backgroundImage: string;
  };
  categories: ProductCategory[];
  services: Array<{
    title: string;
    description: string;
  }>;
  contact: {
    address: string;
    phone: string;
    email: string;
    hours: {
      weekdays: string;
      saturday: string;
      sunday: string;
    };
  };
}

interface ProductsContextType {
  categories: ProductCategory[];
  siteData: SiteData | null;
  loading: boolean;
  hasUnsavedChanges: boolean;
  updateCategory: (id: string, updates: Partial<ProductCategory>) => void;
  addCategory: (category: Omit<ProductCategory, 'id'>) => void;
  deleteCategory: (id: string) => void;
  addProduct: (categoryId: string, product: Omit<Product, 'id'>) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  getProductById: (productId: string) => Product | undefined;
  updateHeroSection: (updates: Partial<SiteData['heroSection']>) => void;
  updateContact: (updates: Partial<SiteData['contact']>) => void;
  exportData: () => SiteData;
  importData: (data: SiteData) => void;
  saveAllChanges: () => void;
  resetUnsavedChanges: () => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Chargement initial des données
  useEffect(() => {
    const loadData = async () => {
      try {
        // Charger d'abord depuis localStorage (données modifiées)
        const savedData = localStorage.getItem('siteData');
        if (savedData) {
          console.log('Chargement depuis localStorage...');
          setSiteData(JSON.parse(savedData));
          setLoading(false);
          return;
        }

        // Si pas de données locales, charger depuis le fichier JSON public
        const response = await fetch('/data.json');
        if (response.ok) {
          const data = await response.json();
          setSiteData(data);
          // Sauvegarder dans localStorage pour la prochaine fois
          localStorage.setItem('siteData', JSON.stringify(data));
        } else {
          throw new Error('Fichier data.json non trouvé');
        }
      } catch (error) {
        console.log('Erreur lors du chargement, utilisation des données par défaut');
        // Données par défaut si rien n'est trouvé
        const defaultData: SiteData = {
          heroSection: {
            title: "Boucherie Artisanale",
            subtitle: "Viandes fraîches et de qualité",
            backgroundImage: "/lovable-uploads/6e143375-4021-47b2-971f-6a9b56b26d8f.png"
          },
          categories: [],
          services: [],
          contact: {
            address: "36 Avenue Georges Pompidou, 31270 Cugnaux, France",
            phone: "05 61 86 54 42",
            email: "contact@boucherie-hidaya.fr",
            hours: {
              weekdays: "8h30-13h / 15h-19h30",
              saturday: "8h30-13h / 15h-19h30",
              sunday: "8h30-13h"
            }
          }
        };
        setSiteData(defaultData);
        localStorage.setItem('siteData', JSON.stringify(defaultData));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const saveData = (data: SiteData, markAsUnsaved = true) => {
    setSiteData(data);
    // Sauvegarder automatiquement dans localStorage à chaque modification
    localStorage.setItem('siteData', JSON.stringify(data));
    if (markAsUnsaved) {
      setHasUnsavedChanges(true);
    }
  };

  const saveAllChanges = () => {
    // Cette fonction ne fait plus rien car les données sont déjà sauvegardées automatiquement
    setHasUnsavedChanges(false);
  };

  const resetUnsavedChanges = () => {
    setHasUnsavedChanges(false);
  };

  const updateCategory = (id: string, updates: Partial<ProductCategory>) => {
    if (!siteData) return;
    
    const updatedCategories = siteData.categories.map(cat =>
      cat.id === id ? { ...cat, ...updates } : cat
    );
    
    const newData = { ...siteData, categories: updatedCategories };
    saveData(newData);
  };

  const addCategory = (category: Omit<ProductCategory, 'id'>) => {
    if (!siteData) return;
    
    const newCategory: ProductCategory = {
      ...category,
      id: `category-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    
    const newData = {
      ...siteData,
      categories: [...siteData.categories, newCategory]
    };
    saveData(newData);
  };

  const deleteCategory = (id: string) => {
    if (!siteData) return;
    
    const newData = {
      ...siteData,
      categories: siteData.categories.filter(cat => cat.id !== id)
    };
    saveData(newData);
  };

  const addProduct = (categoryId: string, product: Omit<Product, 'id'>) => {
    if (!siteData) return;
    
    const newProduct: Product = {
      ...product,
      id: `product-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    
    const updatedCategories = siteData.categories.map(cat =>
      cat.id === categoryId
        ? { ...cat, products: [...cat.products, newProduct] }
        : cat
    );
    
    const newData = { ...siteData, categories: updatedCategories };
    saveData(newData);
  };

  const updateProduct = (productId: string, updates: Partial<Product>) => {
    if (!siteData) return;
    
    const updatedCategories = siteData.categories.map(cat => ({
      ...cat,
      products: cat.products.map(product =>
        product.id === productId ? { ...product, ...updates } : product
      )
    }));
    
    const newData = { ...siteData, categories: updatedCategories };
    saveData(newData);
  };

  const deleteProduct = (productId: string) => {
    if (!siteData) return;
    
    const updatedCategories = siteData.categories.map(cat => ({
      ...cat,
      products: cat.products.filter(product => product.id !== productId)
    }));
    
    const newData = { ...siteData, categories: updatedCategories };
    saveData(newData);
  };

  const updateHeroSection = (updates: Partial<SiteData['heroSection']>) => {
    if (!siteData) return;
    
    const newData = {
      ...siteData,
      heroSection: { ...siteData.heroSection, ...updates }
    };
    saveData(newData);
  };

  const updateContact = (updates: Partial<SiteData['contact']>) => {
    if (!siteData) return;
    
    const newData = {
      ...siteData,
      contact: { ...siteData.contact, ...updates }
    };
    saveData(newData);
  };

  const exportData = (): SiteData => {
    if (!siteData) throw new Error('Aucune donnée à exporter');
    return siteData;
  };

  const importData = (data: SiteData) => {
    saveData(data, false);
  };

  const getProductById = (productId: string): Product | undefined => {
    if (!siteData) return undefined;
    
    for (const category of siteData.categories) {
      const product = category.products.find(p => p.id === productId);
      if (product) return product;
    }
    
    return undefined;
  };

  return (
    <ProductsContext.Provider value={{
      categories: siteData?.categories || [],
      siteData,
      loading,
      hasUnsavedChanges,
      updateCategory,
      addCategory,
      deleteCategory,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductById,
      updateHeroSection,
      updateContact,
      exportData,
      importData,
      saveAllChanges,
      resetUnsavedChanges
    }}>
      {children}
    </ProductsContext.Provider>
  );
};
