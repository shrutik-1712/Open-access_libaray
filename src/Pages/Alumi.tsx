import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Book, Users, Calendar, Gift, Phone } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
const Alumni = () => (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Alumni / Achievers</h2>
      <p className="mb-4">Celebrating the accomplishments of our library members and supporters.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Jane Doe</CardTitle>
            <CardDescription>Class of 2020</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Published author and literacy advocate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>John Smith</CardTitle>
            <CardDescription>Class of 2018</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Founder of a successful educational technology startup</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  export default Alumni;