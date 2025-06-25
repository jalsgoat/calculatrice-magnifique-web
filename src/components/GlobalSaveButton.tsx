
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { useProducts } from '@/contexts/ProductsContext';
import { useToast } from '@/hooks/use-toast';

const GlobalSaveButton = () => {
  const { hasUnsavedChanges, saveAllChanges } = useProducts();
  const { toast } = useToast();

  const handleSave = () => {
    saveAllChanges();
    
    toast({
      title: "Succès",
      description: "Modifications sauvegardées! Rendez-vous dans la section 'Gestion des Données' pour exporter le fichier JSON.",
      duration: 5000,
    });
  };

  if (!hasUnsavedChanges) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">
              Vous avez des modifications non sauvegardées
            </span>
            <span className="text-xs text-gray-500">
              Cliquez pour sauvegarder vos modifications
            </span>
          </div>
          <Button
            onClick={handleSave}
            className="bg-butchery-red hover:bg-red-800 text-white flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Sauvegarder
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GlobalSaveButton;
