"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Card, Button, Input, Form, Label, TextField, Select, SelectItem } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function AddTutorPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Redirect to login if user is not authenticated
  if (!isPending && !session) {
    router.push("/login");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    const formData = new FormData(e.currentTarget);
    const tutorData = Object.fromEntries(formData.entries());

    // Appending current logged-in user information to the payload
    const payload = {
      ...tutorData,
      hourlyFee: Number(tutorData.hourlyFee),
      totalSlot: Number(tutorData.totalSlot),
      createdBy: {
        uid: session.user.id,
        name: session.user.name,
        email: session.user.email,
      },
    };

    try {
      const res = await fetch("http://localhost:5000/api/v1/tutors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "🎉 Tutor profile created successfully!" });
        e.currentTarget.reset(); // Reset form fields
      } else {
        setMessage({ type: "error", text: data.message || "Failed to add tutor." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Server connection failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-black text-gray-800">Become a Tutor</h1>
        <p className="text-gray-500 text-sm mt-1">Fill out the details below to start teaching</p>
      </div>

      <Card className="p-8 bg-white shadow-sm border border-gray-100 rounded-xl">
        {/* Status Message Notification banner */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg text-sm text-center font-semibold ${
            message.type === "success" ? "bg-green-50 border border-green-200 text-green-600" : "bg-red-50 border border-red-200 text-red-600"
          }`}>
            {message.text}
          </div>
        )}

        <Form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          
          {/* Tutor Name */}
          <TextField isRequired name="name" type="text" className="md:col-span-2">
            <Label className="text-sm font-semibold text-gray-700">Tutor Name</Label>
            <Input placeholder="Enter your professional name" className="mt-1" />
          </TextField>

          {/* Photo Link */}
          <TextField isRequired name="photo" type="url" className="md:col-span-2">
            <Label className="text-sm font-semibold text-gray-700">Photo URL (ImgBB / PostImage link)</Label>
            <Input placeholder="https://imgbb.com" className="mt-1" />
          </TextField>

          {/* Subject / Category Dropdown */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">Subject / Category</label>
            <select name="subject" required className="mt-1 w-full p-2.5 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm font-medium text-gray-700">
              <option value="">Select a Subject</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="English">English</option>
              <option value="Computer Science">Computer Science</option>
            </select>
          </div>

          {/* Hourly Fee */}
          <TextField isRequired name="hourlyFee" type="number">
            <Label className="text-sm font-semibold text-gray-700">Hourly Fee ($)</Label>
            <Input placeholder="e.g. 25" min="1" className="mt-1" />
          </TextField>

          {/* Available Days */}
          <TextField isRequired name="availableDays" type="text">
            <Label className="text-sm font-semibold text-gray-700">Available Days</Label>
            <Input placeholder="e.g. Sun - Thu" className="mt-1" />
          </TextField>

          {/* Available Time Slot */}
          <TextField isRequired name="timeSlot" type="text">
            <Label className="text-sm font-semibold text-gray-700">Available Time Slot</Label>
            <Input placeholder="e.g. 5:00 PM - 8:00 PM" className="mt-1" />
          </TextField>

          {/* Total Booking Slots */}
          <TextField isRequired name="totalSlot" type="number">
            <Label className="text-sm font-semibold text-gray-700">Total Slots Available</Label>
            <Input placeholder="e.g. 5" min="1" className="mt-1" />
          </TextField>

          {/* Session Start Date */}
          <TextField isRequired name="startDate" type="date">
            <Label className="text-sm font-semibold text-gray-700">Session Start Date</Label>
            <Input className="mt-1" />
          </TextField>

          {/* Institution */}
          <TextField isRequired name="institution" type="text">
            <Label className="text-sm font-semibold text-gray-700">Institution</Label>
            <Input placeholder="University / College Name" className="mt-1" />
          </TextField>

          {/* Experience */}
          <TextField isRequired name="experience" type="text">
            <Label className="text-sm font-semibold text-gray-700">Experience Length</Label>
            <Input placeholder="e.g. 3 Years of teaching" className="mt-1" />
          </TextField>

          {/* Location Area / City */}
          <TextField isRequired name="location" type="text">
            <Label className="text-sm font-semibold text-gray-700">Location (Area/City)</Label>
            <Input placeholder="e.g. Dhanmondi, Dhaka" className="mt-1" />
          </TextField>

          {/* Teaching Mode Dropdown */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">Teaching Mode</label>
            <select name="teachingMode" required className="mt-1 w-full p-2.5 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm font-medium text-gray-700">
              <option value="">Select Mode</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Both">Both</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 pt-4">
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-cyan-500 text-white font-bold tracking-wide rounded-lg hover:bg-cyan-600 h-11 transition-all shadow-md shadow-cyan-100"
            >
              {loading ? "Submitting Details..." : "Submit Tutor Profile"}
            </Button>
          </div>

        </Form>
      </Card>
    </div>
  );
}
