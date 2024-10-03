import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Book, Users, Calendar, Gift, Phone } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
const About = () => (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">About Us</h2>
      <p>We are dedicated to providing free and open access to information and resources for all.</p>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent>
          <p>To empower individuals through knowledge and promote lifelong learning in our community.</p>
        </CardContent>
      </Card>
    </div>
  );
  export default About;