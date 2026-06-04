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
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleOpenBookingModal = () => {
    if (!session) {
      router.push("/login");
      toast.success("Booking Tutor successful")
      return;
    }
    
    const today = new Date();
    const targetDate = new Date(tutor.startDate);
    today.setHours(0,0,0,0);
    targetDate.setHours(0,0,0,0);

    if (today < targetDate) {
      toast.error("Booking is not available yet for this tutor.");
      return;
    }

    if (Number(tutor.totalSlot) <= 0) {
      alert("No available slots left.");
      return;
    }

    setIsModalOpen(true);
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    setBookingLoading(true);
    setMessage({ type: "", text: "" });

    const formData = new FormData(e.currentTarget);
    const bookingFormValues = Object.fromEntries(formData.entries());

    const bookingPayload = {
      tutorId: tutor._id,
      tutorName: tutor.name,
      studentName: bookingFormValues.studentName,
      studentEmail: session?.user?.email,
      phone: bookingFormValues.phone,
    };

    try {
      const {data:tokenData} = await authClient.token()
if (!tokenData?.token) {
      toast.error("Please Login");
      setLoading(false); 
      return;
    }
      const res = await fetch("http://localhost:5000/api/v1/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json",
          authorization : `Bearer ${tokenData?.token}`
         },
        body: JSON.stringify(bookingPayload),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("🎉 Session booked successfully!");
        setTimeout(() => {
          setIsModalOpen(false);
          router.refresh(); 
        }, 2000);
      } else {
         toast.error(data.message || "Booking failed.");
      }
    } catch (err) {
      setMessage({ type: "error", text: "Connection error. Try again." });
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleOpenBookingModal}
        className="w-full md:w-auto px-12 bg-cyan-500 hover:bg-cyan-600 text-white font-bold h-11 rounded-lg transition-all shadow-md shadow-cyan-100"
      >
        Book Session
      </Button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <Card className="bg-white max-w-md w-full p-6 relative rounded-xl shadow-2xl border border-gray-100">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h3 className="font-black text-xl text-gray-800">Confirm Appointment</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 font-bold text-lg">✕</button>
            </div>

            {message.text && (
              <div className={`mb-4 p-3 rounded-lg text-xs text-center font-bold ${
                message.type === "success" ? "bg-green-50 text-green-600 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"
              }`}>
                {message.type === "success" ? "🎉 " : "⚠️ "}{message.text}
              </div>
            )}

            <Form onSubmit={handleConfirmBooking} className="space-y-4">
              <TextField isRequired name="studentName">
                <Label className="text-xs font-bold text-gray-700">Student Name</Label>
                <Input defaultValue={session?.user?.name || ""} placeholder="Your name" className="mt-1" />
              </TextField>

              <TextField isRequired name="phone" type="tel">
                <Label className="text-xs font-bold text-gray-700">Phone Number</Label>
                <Input placeholder="e.g. +88017XXXXXXXX" className="mt-1" />
              </TextField>

<TextField isReadOnly name="studentEmail">
  <Label className="text-xs font-bold text-gray-400">Student Email (Auto-filled)</Label>
  <Input value={session?.user?.email || ""} readOnly={true} className="mt-1 bg-gray-50 text-gray-400 cursor-not-allowed" />
</TextField>

<TextField isReadOnly name="tutorName">
  <Label className="text-xs font-bold text-gray-400">Selected Tutor (Auto-filled)</Label>
  <Input value={tutor.name || ""} readOnly={true} className="mt-1 bg-gray-50 text-gray-400 cursor-not-allowed" />
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
