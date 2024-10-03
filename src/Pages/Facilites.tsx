
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Book, Users, Calendar, Gift, Phone } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
const Facilities = () => (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Library Facilities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Reading Rooms</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Quiet spaces for focused study and research.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Computer Lab</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Access to computers and internet for research purposes.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Meeting Rooms</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Spaces for group discussions and collaborative work.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  export default Facilities;
  