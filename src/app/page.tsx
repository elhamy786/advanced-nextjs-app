"use client"; // Client Component

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const dogDescriptions = [
  "Golden Retriever: A friendly, intelligent breed known for its gentle temperament.",
  "Labrador Retriever: An outgoing, even-tempered breed with a playful nature.",
  "German Shepherd: A courageous and confident breed, often used in police work.",
  "Poodle: An intelligent breed known for its hypoallergenic coat and graceful appearance.",
  "Beagle: A curious and friendly breed, known for its excellent sense of smell.",
  "Bulldog: A calm and courageous breed, known for its loose skin and distinctive pushed-in nose.",
  "French Bulldog: A playful and adaptable breed, known for its bat-like ears.",
  "Rottweiler: A confident and loyal breed, often used as a guard dog.",
  "Siberian Husky: An energetic breed with a striking appearance and friendly disposition.",
  "Dachshund: A playful and clever breed with a distinctive long body and short legs.",
  "Chihuahua: A tiny dog with a big personality, known for its loyalty.",
  "Boxer: A playful and energetic breed known for its strong build and affectionate nature.",
  "Shih Tzu: A friendly and affectionate breed with a distinctive long coat.",
  "Border Collie: An intelligent and energetic breed, known for its herding abilities.",
  "Cocker Spaniel: A friendly breed known for its expressive eyes and long ears.",
  "Yorkshire Terrier: A small breed with a big personality and long, silky hair.",
  "Great Dane: A giant breed known for its friendly nature and majestic appearance.",
  "Pit Bull: A strong and loyal breed known for its protective instincts.",
  "Boston Terrier: A small breed known for its friendly demeanor and distinctive 'tuxedo' coat.",
  "Bichon Frise: A cheerful and affectionate breed known for its fluffy coat."
];

export default function DogGallery() {
  const [dogs, setDogs] = useState<string[]>([]);

  useEffect(() => {
    const fetchDogs = async () => {
      const response = await fetch('https://dog.ceo/api/breeds/image/random/36');
      const data = await response.json();
      setDogs(data.message);
    };

    fetchDogs();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Cute Dog Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dogs.map((dog, index) => (
          <Link key={index} href={`/dogs/${index}`}>
            <div className="card cursor-pointer">
              <Image
                src={dog}
                alt={`Dog ${index + 1}`}
                className="w-full h-64 object-cover"
                width={400}
                height={256}
              />
              <div className="p-4">
                <h2 className="card-title">Dog Breed {index + 1}</h2>
                <p className="card-description">{dogDescriptions[index % dogDescriptions.length]}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
