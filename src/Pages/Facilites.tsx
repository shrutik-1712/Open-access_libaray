import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

const InfoSection = ({ title, content }) => (
  <div className="mb-6">
    <h4 className="text-lg font-semibold mb-2">{title}</h4>
    {Array.isArray(content) ? (
      <ul className="list-disc pl-5">
        {content.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    ) : (
      <p>{content}</p>
    )}
  </div>
)

const Facilities = () => (
  <section className="mb-12">
    <h2 className="text-3xl font-semibold mb-4">M Library Facilities</h2>
    <Tabs defaultValue="library">
      <TabsList className="mb-4">
        <TabsTrigger value="library">Main Library</TabsTrigger>
        <TabsTrigger value="study-room">Study Rooms</TabsTrigger>
      </TabsList>
      
      <TabsContent value="library">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-2xl font-semibold mb-4">Main Library</h3>
            <Carousel
              items={libraryImages.map((src, index) => (
                <img key={index} src={src} alt={`Library image ${index + 1}`} className="w-full h-auto rounded-lg" />
              ))}
            />
            <div className="mt-6">
              <p className="mb-4">
                Welcome to M Library, a state-of-the-art facility designed to meet the diverse needs of our community. Our library boasts an extensive collection of books, journals, and digital resources, complemented by modern technology and comfortable spaces for learning and research.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="study-room">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-2xl font-semibold mb-4">Study Rooms</h3>
            <Carousel
              items={studyRoomImages.map((src, index) => (
                <img key={index} src={src} alt={`Study room image ${index + 1}`} className="w-full h-auto rounded-lg" />
              ))}
            />
            <div className="mt-6">
              <p className="mb-4">
                Our study rooms provide a quiet and focused environment for individual or group study sessions. These spaces are designed to enhance concentration and facilitate collaborative work among students and researchers.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
    <Card className="mt-8">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoSection 
            title="Rules and Regulations" 
            content={[
              "Maintain a quiet environment",
              "No food in main library (water allowed in study rooms)",
              "Handle materials with care",
              "Return items on time",
              "Adhere to room capacity limits",
              "4-hour max for study rooms",
              "Clean up after use"
            ]}
          />
          <InfoSection 
            title="Fees" 
            content={[
              "Annual membership: $50",
              "Late returns: $0.50/day",
              "Printing: $0.10 (B&W), $0.50 (color) per page",
              "Inter-library loans: Varies",
              "Study rooms: Free (members), $5/hour (non-members)",
              "Late cancellation: $10 (< 24hrs notice)"
            ]}
          />
          <InfoSection 
            title="Seats and Availability" 
            content={[
              "Main Library: 200 total seats",
              "50 individual carrels",
              "20 group study tables",
              "30 computer workstations",
              "Study Rooms: 10 total",
              "5 small (1-2 people)",
              "3 medium (3-4 people)",
              "2 large (5-8 people)",
              "Online booking available"
            ]}
          />
          <InfoSection 
            title="Facilities" 
            content={[
              "High-speed Wi-Fi",
              "Self-checkout kiosks",
              "Printing and scanning",
              "Research assistance desk",
              "Quiet reading rooms",
              "Multimedia lab",
              "Power outlets at desks",
              "Adjustable lighting",
              "Soundproof study rooms",
              "Whiteboards and markers",
              "Large displays in medium/large rooms"
            ]}
          />
        </div>
        <InfoSection 
          title="Additional Information" 
          content={[
            "Book study rooms up to 2 weeks ahead",
            "Group study priority during peak hours",
            "Accessibility features in select areas",
            "Tech support available",
            "Regular workshops and events (see calendar)"
          ]}
        />
      </CardContent>
    </Card>
  </section>
);

export default Facilities;