"use client";

import { useState } from "react";
import { Card, Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function BookedSessionsTable({ initialBookings }) {
  const router = useRouter();
  const [bookings, setBookings] = useState(initialBookings);
  const [cancelId, setCancelId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCancelBooking = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/v1/bookings/${cancelId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookStatus: "Cancelled" }),
      });

      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b._id === cancelId ? { ...b, bookStatus: "Cancelled" } : b))
        );
        setCancelId(null);
        router.refresh();
      }
    } catch (error) {
      alert("Failed to cancel the session.");
    } finally {
      setLoading(false);
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
        <p className="text-gray-500 font-semibold text-lg">You haven't booked any learning sessions yet.</p>
        <Button onClick={() => router.push("/tutors")} className="mt-4 bg-cyan-500 text-white font-bold rounded-lg px-6">
          Explore Tutors
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-700 text-sm font-bold">
              <th className="p-4">Tutor Name</th>
              <th className="p-4">Student Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm text-gray-600 font-medium">
            {bookings.map((booking) => (
              <tr key={booking._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 font-bold text-gray-800">{booking.tutorName}</td>
                <td className="p-4">{booking.studentName}</td>
                <td className="p-4">{booking.studentEmail}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-extrabold ${
                    booking.bookStatus === "Confirmed" 
                      ? "bg-green-50 text-green-600" 
                      : "bg-red-50 text-red-600"
                  }`}>
                    {booking.bookStatus}
                  </span>
                </td>
                <td className="p-4 text-center">
                  {booking.bookStatus !== "Cancelled" ? (
                    <button
                      onClick={() => setCancelId(booking._id)}
                      className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg font-bold text-xs hover:bg-red-500 hover:text-white transition-all"
                    >
                      Cancel
                    </button>
                  ) : (
                    <span className="text-xs text-gray-400 font-semibold italic">No actions available</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {cancelId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <Card className="bg-white max-w-sm w-full p-6 relative rounded-xl shadow-2xl border text-center">
            <h3 className="font-black text-xl text-gray-800 mb-2">Cancel Session?</h3>
            <p className="text-gray-500 text-sm mb-6">Are you sure you want to cancel this booked tutoring session appointment?</p>
            <div className="flex justify-center gap-3">
              <Button type="button" onClick={() => setCancelId(null)} variant="flat" className="rounded-lg font-bold">No, Keep It</Button>
              <Button onClick={handleCancelBooking} disabled={loading} className="bg-red-500 text-white font-bold rounded-lg px-6 hover:bg-red-600">
                {loading ? "Cancelling..." : "Yes, Cancel"}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
