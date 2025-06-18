
import React from 'react';
import { MapPin, Phone, CreditCard, Star } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Livraison à Domicile",
      description: "Nous livrons vos commandes à domicile dans Cugnaux et les communes environnantes. Service sur commande téléphonique.",
      details: "Zone de livraison : Cugnaux, Plaisance-du-Touch, Villeneuve-Tolosane"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Commandes Personnalisées",
      description: "Préparez vos événements avec nos services sur mesure : mariages, fêtes, Ramadan, et autres occasions spéciales.",
      details: "Précommandes recommandées 48h à l'avance pour les grandes quantités"
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Carte de Fidélité",
      description: "Bénéficiez d'avantages exclusifs avec notre carte de fidélité disponible directement en boutique.",
      details: "Remises progressives et offres spéciales pour nos clients fidèles"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Promotions du Mois",
      description: "Profitez de nos offres spéciales et promotions mensuelles sur une sélection de produits.",
      details: "Offres renouvelées chaque mois - Renseignez-vous en boutique"
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="section-padding">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-butchery-red mb-6">
            Nos Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nous mettons tout en œuvre pour vous offrir un service de qualité 
            et faciliter vos achats au quotidien.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="text-center group">
              <div className="bg-butchery-red text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-red-800 transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="font-playfair text-xl font-bold text-butchery-red mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {service.description}
              </p>
              <p className="text-sm text-butchery-gold font-medium">
                {service.details}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-butchery-red to-red-800 text-white rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-playfair text-3xl font-bold mb-6">
                Horaires d'Ouverture
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/20 pb-2">
                  <span className="font-medium">Lundi</span>
                  <span>8h30-13h</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/20 pb-2">
                  <span className="font-medium">Mardi - Samedi</span>
                  <span>8h30-13h / 15h-19h30</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/20 pb-2">
                  <span className="font-medium">Dimanche</span>
                  <span>8h30-13h</span>
                </div>
                <p className="text-sm text-red-200 mt-4">
                  * Fermé le lundi après-midi
                </p>
              </div>
            </div>
            <div className="text-center lg:text-right">
              <h4 className="font-playfair text-2xl font-bold mb-4">
                Une Question ?
              </h4>
              <p className="text-lg mb-6 opacity-90">
                Notre équipe est à votre disposition pour vous conseiller 
                et répondre à toutes vos questions.
              </p>
              <a
                href="tel:+33561865442"
                className="inline-flex items-center space-x-2 bg-white text-butchery-red px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>05 61 86 54 42</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
