import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import JSON data
import profileData from './data/profile-data.json';
import advisoryCommittee from './data/advisory-committee.json';
import libraryTeam from './data/library-team.json';
import libraryImages from './data/library-images.json';
import studyRoomImages from './data/study-room-images.json';

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

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">M Library</h2>
        <Tabs defaultValue="info">
          <TabsList className="mb-4">
            <TabsTrigger value="info">Library Info</TabsTrigger>
            <TabsTrigger value="study-room">Study Room</TabsTrigger>
          </TabsList>
          <TabsContent value="info">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-2">About M Library</h3>
                  <p className="mb-4">M Library is a state-of-the-art facility designed to meet the diverse needs of our community. With extensive collections, modern technology, and comfortable spaces, we aim to provide an ideal environment for learning and research.</p>
                </div>
                <Carousel
                  items={libraryImages.map((src, index) => (
                    <img key={index} src={src} alt={`Library image ${index + 1}`} className="w-full h-auto rounded-lg" />
                  ))}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="study-room">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Study Room</h3>
                <Carousel
                  items={studyRoomImages.map((src, index) => (
                    <img key={index} src={src} alt={`Study room image ${index + 1}`} className="w-full h-auto rounded-lg" />
                  ))}
                />
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Rules and Regulations</h4>
                    <ul className="list-disc pl-5 mb-4">
                      <li>Quiet study environment must be maintained</li>
                      <li>No food or drinks allowed (except water)</li>
                      <li>Maximum occupancy: 4 hours per session</li>
                      <li>Please clean up after use</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Seats and Availability</h4>
                    <p className="mb-2">Total seats: 50</p>
                    <p className="mb-4">Check our online booking system for real-time availability.</p>
                    <h4 className="text-lg font-semibold mb-2">Facilities</h4>
                    <ul className="list-disc pl-5">
                      <li>High-speed Wi-Fi</li>
                      <li>Power outlets at each desk</li>
                      <li>Adjustable lighting</li>
                      <li>Soundproof rooms</li>
                    </ul>
                  </div>
                </div>
                
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default About;