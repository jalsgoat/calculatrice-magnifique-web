
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Tristan N.",
    rating: 5,
    comment: "Deux commandes en livraison à domicile je ne peux que noter la satisfaction de manger de la très bonne viande. Un plaisir! La livraison par chronofresh est top et rapide. C'est devenu ma boucherie préférée. Je suis du puy de dôme.",
    date: "Il y a 1 semaine"
  },
  {
    id: 2,
    name: "Audrey M.",
    rating: 5,
    comment: "Parfait !",
    date: "Il y a 2 semaines"
  },
  {
    id: 3,
    name: "Nicolas G.",
    rating: 5,
    comment: "Colis très soigné et produits de qualité",
    date: "Il y a 1 mois"
  },
  {
    id: 4,
    name: "Théophile J.",
    rating: 5,
    comment: "Commande au top.",
    date: "Il y a 1 mois"
  },
  {
    id: 5,
    name: "Julie D.",
    rating: 5,
    comment: "Produits conforme aux produits exposés sur le site.",
    date: "Il y a 2 mois"
  }
];

const ReviewsSection = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-white">
      <div className="section-padding">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-butchery-red mb-6">
            Avis de nos Clients
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez ce que nos clients disent de notre boucherie halal. 
            Leur satisfaction est notre priorité depuis des années.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
              containScroll: "trimSnaps",
            }}
            className="w-full"
          >
            <CarouselContent className="ml-0">
              {reviews.map((review) => (
                <CarouselItem key={review.id} className="md:basis-1/3 basis-full pl-4">
                  <div className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 min-h-[320px] flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex space-x-1">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    
                    <div className="flex-1 mb-6 overflow-hidden">
                      <p className="text-gray-700 leading-relaxed text-sm">
                        "{review.comment}"
                      </p>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 mt-auto">
                      <p className="font-semibold text-butchery-red">
                        {review.name}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
