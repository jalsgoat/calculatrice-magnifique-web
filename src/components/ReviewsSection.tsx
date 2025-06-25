
import React, { useEffect, useCallback } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from 'lucide-react';
import { type CarouselApi } from "@/components/ui/carousel";

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
  const [api, setApi] = React.useState<CarouselApi>();

  // Créer un tableau infini en dupliquant les avis plusieurs fois
  const createInfiniteReviews = () => {
    // Dupliquer les avis 3 fois pour assurer l'infinite scroll dans les deux directions
    const duplicatedReviews = [];
    
    // Ajouter plusieurs copies avant
    for (let i = 0; i < 3; i++) {
      duplicatedReviews.push(...reviews.map((review, index) => ({
        ...review,
        id: review.id + (i * 1000) + 3000 // ID unique pour éviter les conflits
      })));
    }
    
    // Ajouter les avis originaux
    duplicatedReviews.push(...reviews);
    
    // Ajouter plusieurs copies après
    for (let i = 0; i < 3; i++) {
      duplicatedReviews.push(...reviews.map((review, index) => ({
        ...review,
        id: review.id + (i * 1000) + 6000 // ID unique pour éviter les conflits
      })));
    }
    
    return duplicatedReviews;
  };

  const infiniteReviews = createInfiniteReviews();
  const originalReviewsCount = reviews.length;
  const startIndex = originalReviewsCount * 3; // Commencer au milieu (après 3 copies)

  // Gérer l'infinite scroll
  const handleInfiniteScroll = useCallback(() => {
    if (!api) return;

    const scrollProgress = api.scrollProgress();
    const selectedIndex = api.selectedScrollSnap();
    const slideCount = api.slideNodes().length;

    // Si on est proche du début, sauter vers la fin des vrais avis
    if (selectedIndex <= originalReviewsCount) {
      const newIndex = startIndex + (selectedIndex % originalReviewsCount);
      api.scrollTo(newIndex, false); // false = pas d'animation
    }
    
    // Si on est proche de la fin, sauter vers le début des vrais avis  
    if (selectedIndex >= slideCount - originalReviewsCount - 1) {
      const newIndex = startIndex + (selectedIndex % originalReviewsCount);
      api.scrollTo(newIndex, false); // false = pas d'animation
    }
  }, [api, originalReviewsCount, startIndex]);

  useEffect(() => {
    if (!api) return;

    // Aller au slide de départ
    api.scrollTo(startIndex, false);

    // Écouter les changements de slide
    api.on('select', handleInfiniteScroll);
    api.on('settle', handleInfiniteScroll);

    return () => {
      api.off('select', handleInfiniteScroll);
      api.off('settle', handleInfiniteScroll);
    };
  }, [api, handleInfiniteScroll, startIndex]);

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
            setApi={setApi}
            opts={{
              align: "start",
              loop: false, // Désactiver le loop natif car on gère manuellement
              slidesToScroll: 1,
              containScroll: false,
              dragFree: false,
            }}
            className="w-full"
          >
            <CarouselContent className="ml-0">
              {infiniteReviews.map((review, index) => (
                <CarouselItem key={`${review.id}-${index}`} className="md:basis-1/3 basis-full pl-4">
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
