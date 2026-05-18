"use client";

import { useState, useEffect } from "react";
import { Button, Card, CardBody, CardFooter, Image as HeroImage, Spinner } from "@heroui/react";
import Link from "next/link";

export default function AvailableTutors() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/available-tutors");
        const data = await res.json();
        setTutors(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tutors:", error);
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center my-10">
        <Spinner size="lg" label="Loading available tutors..." />
      </div>
    );
  }

  if (tutors.length === 0) {
    return <p className="text-center text-gray-500">No tutors found in the database.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {tutors.map((tutor) => (
        <Card key={tutor._id} shadow="sm" className="hover:scale-[1.02] transition-transform">
          <CardBody className="p-0 overflow-hidden">
            <HeroImage
              alt={tutor.name}
              className="w-full object-cover h-56 rounded-b-none"
              src={tutor.photo || "https://unsplash.com"}
              width="100%"
            />
          </CardBody>
          <CardFooter className="flex flex-col items-start p-4 gap-2">
            <div className="flex justify-between w-full items-center">
              <h3 className="font-bold text-lg text-gray-800">{tutor.name}</h3>
              <span className="text-sm bg-blue-50 text-blue-600 px-2 py-1 rounded font-semibold">
                ${tutor.hourlyFee}/hr
              </span>
            </div>
            <p className="text-sm text-gray-600">Subject: <span className="font-medium text-gray-800">{tutor.subject}</span></p>
            <p className="text-sm text-gray-600">Experience: <span className="font-medium text-gray-800">{tutor.experience}</span></p>
            <p className="text-sm text-gray-600">Institution: <span className="font-medium text-gray-800">{tutor.institution}</span></p>
            
            <Link href={`/tutors/${tutor._id}`} className="w-full mt-2">
              <Button fullWidth color="primary" variant="solid">
                Book Session
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
