"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Card, Button, Input, Form, Label, TextField } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function BookingModal({ tutor }) {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  const handleOpenBookingModal = () => {
    const today = new Date();
    const targetDate = new Date(tutor.startDate);
    today.setHours(0,0,0,0);
    targetDate.setHours(0,0,0,0);

    if (today < targetDate) {
      toast.error("Booking is not available yet for this tutor.");
      return;
    }

    if (Number(tutor.totalSlot) <= 0) {
      toast.error("No available slots left.");
      return;
    }

    setIsModalOpen(true);
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    if (bookingLoading) return;
    setBookingLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      tutorId: tutor._id,
      tutorName: tutor.name,
      studentName: formData.get("studentName"),
      studentEmail: session?.user?.email,
      phone: formData.get("phone"),
      photo: tutor.photo,
      subject: tutor.subject,
      hourlyFee: Number(tutor.hourlyFee),
      availableDays: tutor.availableDays,
      timeSlot: tutor.timeSlot,
      totalSlot: Number(tutor.totalSlot),
      startDate: tutor.startDate,
      institution: tutor.institution,
      experience: tutor.experience,
      location: tutor.location,
      teachingMode: tutor.teachingMode,
    };

    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/bookings`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "authorization": `Bearer ${tokenData?.token}`
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("🎉 Session booked successfully!");
        setTimeout(() => {
          setIsModalOpen(false);
          router.push("/booked-sessions");
          router.refresh(); 
        }, 1500);
      } else {
         toast.error(data.message || "Booking failed.");
      }
    } catch (err) {
      toast.error("Connection error. Try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleOpenBookingModal}
        className="w-full md:w-auto px-12 bg-cyan-500 hover:bg-cyan-600 text-white font-bold h-11 rounded-lg transition-all shadow-md shadow-cyan-100 dark:shadow-none"
      >
        Book Session
      </Button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <Card className="bg-white dark:bg-gray-900 max-w-md w-full p-6 relative rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-center border-b dark:border-gray-800 pb-3 mb-4">
              <h3 className="font-black text-xl text-gray-800 dark:text-white">Confirm Appointment</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 font-bold text-lg">✕</button>
            </div>

            <Form onSubmit={handleConfirmBooking} className="space-y-4">
              <TextField isRequired name="studentName">
                <Label className="text-xs font-bold text-gray-700 dark:text-gray-300">Student Name</Label>
                <Input placeholder="Your name" className="mt-1 dark:bg-gray-800 dark:text-white rounded-lg" />
              </TextField>

              <TextField isRequired name="phone" type="tel">
                <Label className="text-xs font-bold text-gray-700 dark:text-gray-300">Phone Number</Label>
                <Input placeholder="e.g. +88017XXXXXXXX" className="mt-1 dark:bg-gray-800 dark:text-white rounded-lg" />
              </TextField>
<TextField isReadOnly name="tutorId">
  <Label className="text-xs font-bold text-gray-400">Tutor ID (Auto-filled)</Label>
  <Input 
    value={tutor?._id || ""} 
    readOnly={true} 
    className="mt-1 bg-gray-50 dark:bg-gray-800 text-gray-400 cursor-not-allowed rounded-lg" 
  />
</TextField>

<TextField isReadOnly name="tutorName">
  <Label className="text-xs font-bold text-gray-400">Tutor Name (Auto-filled)</Label>
  <Input 
    value={tutor?.name || ""} 
    readOnly={true} 
    className="mt-1 bg-gray-50 dark:bg-gray-800 text-gray-400 cursor-not-allowed rounded-lg" 
  />
</TextField>


              <TextField isReadOnly name="studentEmail">
                <Label className="text-xs font-bold text-gray-300">Student Email (Auto-filled)</Label>
                <Input value={session?.user?.email || ""} readOnly={true} className="mt-1 bg-gray-50 dark:bg-gray-800 text-gray-400 cursor-not-allowed rounded-lg" />
              </TextField>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" onClick={() => setIsModalOpen(false)} variant="flat" className="rounded-lg font-bold text-sm">Cancel</Button>
                <Button type="submit" disabled={bookingLoading} className="bg-cyan-500 text-white font-bold rounded-lg px-6 hover:bg-cyan-600">
                  {bookingLoading ? "Processing Booking..." : "Confirm Booking"}
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      )}
    </>
  );
}
