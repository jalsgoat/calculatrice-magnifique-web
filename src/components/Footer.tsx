import React from 'react';
import { MapPin, Phone, Clock, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-butchery-darkGray text-white py-12 relative">
      <div className="section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo et description */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center p-1">
                <img 
                  src="/lovable-uploads/6e143375-4021-47b2-971f-6a9b56b26d8f.png" 
                  alt="Logo Boucherie Hidaya" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-playfair text-2xl font-bold text-white">
                  Boucherie Hidaya
                </h3>
                <p className="text-gray-300 text-sm">Boucherie Halal</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Votre boucherie halal de confiance à Cugnaux. Nous nous engageons 
              à vous fournir des produits de qualité exceptionnelle dans le respect 
              des traditions.
            </p>
          </div>

          {/* Informations de contact */}
          <div>
            <h4 className="font-playfair text-xl font-bold mb-6 text-butchery-gold">
              Contact
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-butchery-gold mt-1" />
                <div>
                  <p className="text-gray-300">
                    36 Avenue Georges Pompidou<br />
                    31270 Cugnaux, France
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-butchery-gold" />
                <a 
                  href="tel:+33561865442"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  05 61 86 54 42
                </a>
              </div>
            </div>
          </div>

          {/* Horaires */}
          <div>
            <h4 className="font-playfair text-xl font-bold mb-6 text-butchery-gold">
              Horaires
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Lundi</span>
                <span className="text-white">8h30-13h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Mar-Sam</span>
                <span className="text-white">8h30-13h / 15h-19h30</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Dimanche</span>
                <span className="text-white">8h30-13h</span>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                * Fermé le lundi après-midi
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm mb-4 md:mb-0">
              © 2024 Boucherie Hidaya. Tous droits réservés.
            </p>
            <div className="flex space-x-6 text-sm">
              <span className="text-butchery-gold font-medium">Certification Halal</span>
              <span className="text-butchery-gold font-medium">Qualité Garantie</span>
              <span className="text-butchery-gold font-medium">Service Local</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bouton d'administration discret */}
      <Link
        to="/admin"
        className="absolute bottom-4 right-4 opacity-20 hover:opacity-100 transition-opacity duration-300"
        title="Administration"
      >
        <Settings className="w-6 h-6 text-gray-400 hover:text-white" />
      </Link>
    </footer>
  );
};

export default Footer;