import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { useProducts } from '@/contexts/ProductsContext';
import { useToast } from '@/hooks/use-toast';

const DataManager = () => {
  const { exportData, importData, saveAllChanges } = useProducts();
  const { toast } = useToast();
  const [isImporting, setIsImporting] = useState(false);
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleExport = () => {
    try {
      // Sauvegarder toutes les modifications avant l'export
      saveAllChanges();
      
      const data = exportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Succès",
        description: "Modifications sauvegardées et fichier JSON téléchargé! Uploadez ce fichier sur votre serveur pour mettre à jour le site.",
        duration: 5000,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de l'export des données",
        variant: "destructive",
      });
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportStatus('idle');

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);
        
        // Validation basique de la structure
        if (!data.categories || !data.heroSection || !data.contact) {
          throw new Error('Structure de données invalide');
        }

        importData(data);
        setImportStatus('success');
        toast({
          title: "Succès",
          description: "Les données ont été importées avec succès!",
        });
      } catch (error) {
        setImportStatus('error');
        toast({
          title: "Erreur",
          description: "Erreur lors de l'import : fichier JSON invalide",
          variant: "destructive",
        });
      } finally {
        setIsImporting(false);
      }
    };

    reader.onerror = () => {
      setImportStatus('error');
      setIsImporting(false);
      toast({
        title: "Erreur",
        description: "Erreur lors de la lecture du fichier",
        variant: "destructive",
      });
    };

    reader.readAsText(file);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Exporter les données
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Téléchargez un fichier JSON contenant toutes les données de votre site.
          </p>
          <Button
            onClick={handleExport}
            className="w-full bg-butchery-red hover:bg-red-800 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Télécharger data.json
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Importer des données
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Sélectionnez un fichier JSON pour mettre à jour le contenu du site.
          </p>
          <div className="space-y-4">
            <div>
              <Label htmlFor="json-file">Fichier JSON</Label>
              <Input
                id="json-file"
                type="file"
                accept=".json"
                onChange={handleImport}
                disabled={isImporting}
              />
            </div>
            
            {importStatus === 'success' && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Import réussi!</span>
              </div>
            )}
            
            {importStatus === 'error' && (
              <div className="flex items-center gap-2 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">Erreur lors de l'import</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Instructions pour la mise en production
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <span className="font-semibold text-butchery-red">1.</span>
              <span>Modifiez le contenu via l'interface d'administration</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-butchery-red">2.</span>
              <span>Cliquez sur "Télécharger data.json" pour exporter vos modifications</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-butchery-red">3.</span>
              <span>Connectez-vous à votre gestionnaire de fichiers Hostinger</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-butchery-red">4.</span>
              <span>Remplacez le fichier <code className="bg-gray-100 px-1 rounded">/public/data.json</code> par le nouveau fichier téléchargé</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-butchery-red">5.</span>
              <span>Votre site sera automatiquement mis à jour avec le nouveau contenu!</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataManager;
