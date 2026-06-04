"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Card, Button, Input, Form, Label, TextField } from "@heroui/react";
import toast from "react-hot-toast";

export default function AddTutorPage() {
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (loading) return; 
    
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const tutorData = Object.fromEntries(formData.entries());

    const payload = {
      ...tutorData,
      hourlyFee: Number(tutorData.hourlyFee),
      totalSlot: Number(tutorData.totalSlot),
      createdBy: {
        uid: session?.user?.id,
        name: session?.user?.name,
        email: session?.user?.email,
      },
    };

    try {
      const {data:tokenData} = await authClient.token()

      if (!tokenData?.token) {
      toast.error("Please Login");
      setLoading(false); 
      return;
    }
      const res = await fetch("http://localhost:5000/api/v1/tutors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization : `Bearer ${tokenData?.token}`
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("🎉 Tutor profile created successfully!");
        e.target.reset(); 
      } else {
        toast.error(data.message || "Failed to create profile. Verify entries.");
      }
    } catch (error) {
      toast.error("Server connection failed. Try again.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-black text-gray-800 dark:text-white">Become a Tutor</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Fill out the details below to start teaching</p>
      </div>

      <Card className="p-8 bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800 rounded-xl">
        <Form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          
          <TextField isRequired name="name" type="text" className="md:col-span-2">
            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Tutor Name</Label>
            <Input placeholder="Enter your professional name" className="mt-1 dark:bg-gray-800 dark:text-white rounded-lg" />
          </TextField>

          <TextField isRequired name="photo" type="url" className="md:col-span-2">
            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Photo URL (ImgBB / PostImage link)</Label>
            <Input placeholder="https://imgbb.com" className="mt-1 dark:bg-gray-800 dark:text-white rounded-lg" />
          </TextField>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Subject / Category</label>
            <select name="subject" required className="mt-1 w-full p-2.5 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm font-medium text-gray-700 dark:text-gray-200">
              <option value="">Select a Subject</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="English">English</option>
              <option value="Computer Science">Computer Science</option>
            </select>
          </div>

          <TextField isRequired name="hourlyFee" type="number">
            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Hourly Fee ($)</Label>
            <Input placeholder="e.g. 25" min="1" className="mt-1 dark:bg-gray-800 dark:text-white rounded-lg" />
          </TextField>

          <TextField isRequired name="availableDays" type="text">
            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Available Days</Label>
            <Input placeholder="e.g. Sun - Thu" className="mt-1 dark:bg-gray-800 dark:text-white rounded-lg" />
          </TextField>

          <TextField isRequired name="timeSlot" type="text">
            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Available Time Slot</Label>
            <Input placeholder="e.g. 5:00 PM - 8:00 PM" className="mt-1 dark:bg-gray-800 dark:text-white rounded-lg" />
          </TextField>

          <TextField isRequired name="totalSlot" type="number">
            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Total Slots Available</Label>
            <Input placeholder="e.g. 5" min="1" className="mt-1 dark:bg-gray-800 dark:text-white rounded-lg" />
          </TextField>

          <TextField isRequired name="startDate" type="date">
            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Session Start Date</Label>
            <Input className="mt-1 dark:bg-gray-800 dark:text-white rounded-lg" />
          </TextField>

          <TextField isRequired name="institution" type="text">
            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Institution</Label>
            <Input placeholder="University / College Name" className="mt-1 dark:bg-gray-800 dark:text-white rounded-lg" />
          </TextField>

          <TextField isRequired name="experience" type="text">
            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Experience Length</Label>
            <Input placeholder="e.g. 3 Years of teaching" className="mt-1 dark:bg-gray-800 dark:text-white rounded-lg" />
          </TextField>

          <TextField isRequired name="location" type="text">
            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Location (Area/City)</Label>
            <Input placeholder="e.g. Dhanmondi, Dhaka" className="mt-1 dark:bg-gray-800 dark:text-white rounded-lg" />
          </TextField>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Teaching Mode</label>
            <select name="teachingMode" required className="mt-1 w-full p-2.5 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm font-medium text-gray-700 dark:text-gray-200">
              <option value="">Select Mode</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Both">Both</option>
            </select>
          </div>

          <div className="md:col-span-2 pt-4">
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-cyan-500 text-white font-bold tracking-wide rounded-lg hover:bg-cyan-600 h-11 transition-all shadow-md shadow-cyan-100 dark:shadow-none"
            >
              {loading ? "Submitting Details..." : "Submit Tutor Profile"}
            </Button>
          </div>

        </Form>
      </Card>
    </div>
  );
}
