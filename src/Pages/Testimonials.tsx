import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { QuoteIcon } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Student",
    content:
      "The Open Access Library has been a game-changer for my research. The vast collection and easy access to resources have significantly improved my academic work.",
    avatar: "/api/placeholder/50/50",
  },
  {
    id: 2,
    name: "Dr. Michael Lee",
    role: "Professor",
    content:
      "As an educator, I find the library's digital resources invaluable. My students can access a wealth of information, enhancing their learning experience.",
    avatar: "/api/placeholder/50/50",
  },
  {
    id: 3,
    name: "Emma Thompson",
    role: "Local Author",
    content:
      "The library's community events have provided a platform for me to connect with readers and fellow writers. It's more than just books; it's a hub for literary culture.",
    avatar: "/api/placeholder/50/50",
  },
];

const TestimonialCard = ({ name, role, content, avatar }) => (
  <Card className="h-full">
    <CardContent className="p-6">
      <QuoteIcon className="w-12 h-12 text-gray-400 mb-4" />
      <p className="text-lg mb-4">{content}</p>
      <div className="flex items-center">
        <img src={avatar} alt={name} className="w-12 h-12 rounded-full mr-4" />
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const Testimonials = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {testimonials.map((testimonial) => (
      <TestimonialCard key={testimonial.id} {...testimonial} />
    ))}
  </div>
);

export default Testimonials;
