import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Book, Users, Calendar, Gift, Phone } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
const Events = () => (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Events and Exhibitions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Book Club Meeting</CardTitle>
            <CardDescription>Every Tuesday at 7 PM</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Join us for lively discussions on this month's selected book.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Author Talk</CardTitle>
            <CardDescription>June 15th at 6 PM</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Meet renowned author Jane Doe and get your book signed!</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  export default Events;