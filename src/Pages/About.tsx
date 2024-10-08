import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';

import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import JSON data
import profileData from './data/profile-data.json';
import advisoryCommittee from './data/advisory-committee.json';
import libraryTeam from './data/library-team.json';

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div key={index} className="w-full flex-shrink-0">
              {item}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
};

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">About Us</h1>
      
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Our Profile</h2>
        <Carousel
          items={profileData.map((item) => (
            <Card className="h-full">
              <CardContent className="p-6">
                <CardTitle className="mb-2">{item.title}</CardTitle>
                <p>{item.content}</p>
              </CardContent>
            </Card>
          ))}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Library Advisory Committee</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {advisoryCommittee.map((member, index) => (
            <div key={index} className="text-center">
              <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-2" />
              <p>{member.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Library Team</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {libraryTeam.map((member, index) => (
            <div key={index} className="text-center">
              <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-2" />
              <p className="font-semibold">{member.name}</p>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;