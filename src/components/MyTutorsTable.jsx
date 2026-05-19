"use client";

import { useState } from "react";
import { Card, Button, Input, Form, Label, TextField } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function MyTutorsTable({ initialTutors }) {
  const router = useRouter();
  const [tutors, setTutors] = useState(initialTutors);
  
  // মডাল এবং অ্যাকশন স্টেটস
  const [editTutor, setEditTutor] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // ডিলিট রেকর্ড হ্যান্ডলার
  const handleDelete = async () => {
    setActionLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/v1/tutors/${deleteId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setTutors((prev) => prev.filter((t) => t._id !== deleteId));
        setDeleteId(null);
        toast.success("🗑️ Tutor profile deleted permanently.");
        router.refresh();
      }
      else{
        toast.error("Failed to delete the tutor profile.");
      }
    } catch (error) {
    //   alert("Failed to delete tutor record.");
    toast.error("Server connection failed. Could not delete the record.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);

    const formData = new FormData(e.currentTarget);
    const updatedFormValues = Object.fromEntries(formData.entries());

    const payload = {
      ...updatedFormValues,
      hourlyFee: Number(updatedFormValues.hourlyFee),
      totalSlot: Number(updatedFormValues.totalSlot),
    };

    try {
      const res = await fetch(`http://localhost:5000/api/v1/tutors/${editTutor._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setTutors((prev) =>
          prev.map((t) => (t._id === editTutor._id ? { ...t, ...payload } : t))
        );
        setEditTutor(null);
        toast.success("📝 Profile changes saved successfully!");
        router.refresh();
      }
      else {
        toast.error("Failed to save changes. Please check your inputs.");
      }
    } catch (error) {
    //   alert("Failed to update tutor parameters.");
    toast.error("Server connection failed. Could not update parameters.");
    } finally {
      setActionLoading(false);
    }
  };

  if (tutors.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
        <p className="text-gray-500 font-semibold text-lg">You haven't created any tutor profiles yet!</p>
        <Button onClick={() => router.push("/add-tutor")} className="mt-4 bg-cyan-500 text-white font-bold rounded-lg px-6">
          Create Tutor Now
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-700 text-sm font-bold">
              <th className="p-4">Name</th>
              <th className="p-4">Subject</th>
              <th className="p-4">Hourly Fee</th>
              <th className="p-4">Available Slots</th>
              <th className="p-4">Teaching Mode</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm text-gray-600 font-medium">
            {tutors.map((tutor) => (
              <tr key={tutor._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 flex items-center gap-3">
                  <img src={tutor.photo} alt={tutor.name} className="w-10 h-10 rounded-full object-cover border" />
                  <span className="font-bold text-gray-800">{tutor.name}</span>
                </td>
                <td className="p-4">{tutor.subject}</td>
                <td className="p-4">${tutor.hourlyFee}/hr</td>
                <td className="p-4">{tutor.totalSlot} slots</td>
                <td className="p-4"><span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-bold text-xs">{tutor.teachingMode}</span></td>
                <td className="p-4 text-center space-x-2">
                  <button onClick={() => setEditTutor(tutor)} className="px-3 py-1.5 bg-cyan-500 text-white rounded-lg font-bold text-xs hover:bg-cyan-600 transition-colors shadow-sm">
                    Update
                  </button>
                  <button onClick={() => setDeleteId(tutor._id)} className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg font-bold text-xs hover:bg-red-500 hover:text-white transition-colors">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🎯 আপডেট মডাল ফর্ম (সব ফিল্ডে শুধুমাত্র defaultValue ব্যবহার করা হয়েছে) */}
      {editTutor && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <Card className="bg-white max-w-2xl w-full p-6 relative rounded-xl shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h3 className="font-black text-xl text-gray-800">Update Tutor Profile</h3>
              <button onClick={() => setEditTutor(null)} className="text-gray-400 hover:text-gray-600 font-bold text-lg">✕</button>
            </div>
            <Form onSubmit={handleUpdateSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField isRequired name="name">
                <Label className="text-xs font-bold text-gray-700">Tutor Name</Label>
                <Input defaultValue={editTutor.name} className="mt-1" />
              </TextField>
              
              <TextField isRequired name="photo" type="url">
                <Label className="text-xs font-bold text-gray-700">Photo URL</Label>
                <Input defaultValue={editTutor.photo} className="mt-1" />
              </TextField>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">Subject</label>
                <select name="subject" defaultValue={editTutor.subject} required className="mt-1 p-2.5 border rounded-lg bg-gray-50 text-sm font-medium text-gray-700 focus:outline-none">
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="English">English</option>
                  <option value="Computer Science">Computer Science</option>
                </select>
              </div>

              <TextField isRequired name="hourlyFee" type="number">
                <Label className="text-xs font-bold text-gray-700">Hourly Fee ($)</Label>
                <Input defaultValue={editTutor.hourlyFee} className="mt-1" />
              </TextField>

              <TextField isRequired name="availableDays">
                <Label className="text-xs font-bold text-gray-700">Available Days</Label>
                <Input defaultValue={editTutor.availableDays} className="mt-1" />
              </TextField>

              <TextField isRequired name="timeSlot">
                <Label className="text-xs font-bold text-gray-700">Time Slot</Label>
                <Input defaultValue={editTutor.timeSlot} className="mt-1" />
              </TextField>

              <TextField isRequired name="totalSlot" type="number">
                <Label className="text-xs font-bold text-gray-700">Total Slots</Label>
                <Input defaultValue={editTutor.totalSlot} className="mt-1" />
              </TextField>

              <TextField isRequired name="startDate" type="date">
                <Label className="text-xs font-bold text-gray-700">Start Date</Label>
                <Input defaultValue={editTutor.startDate} className="mt-1" />
              </TextField>

              <TextField isRequired name="institution">
                <Label className="text-xs font-bold text-gray-700">Institution</Label>
                <Input defaultValue={editTutor.institution} className="mt-1" />
              </TextField>

              <TextField isRequired name="experience">
                <Label className="text-xs font-bold text-gray-700">Experience</Label>
                <Input defaultValue={editTutor.experience} className="mt-1" />
              </TextField>

              <TextField isRequired name="location">
                <Label className="text-xs font-bold text-gray-700">Location</Label>
                <Input defaultValue={editTutor.location} className="mt-1" />
              </TextField>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-700">Teaching Mode</label>
                <select name="teachingMode" defaultValue={editTutor.teachingMode} required className="mt-1 p-2.5 border rounded-lg bg-gray-50 text-sm font-medium text-gray-700 focus:outline-none">
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                  <option value="Both">Both</option>
                </select>
              </div>

              <div className="sm:col-span-2 flex justify-end gap-2 pt-2 border-t mt-2">
                <Button type="button" onClick={() => setEditTutor(null)} variant="flat" className="rounded-lg font-bold">Cancel</Button>
                <Button type="submit" disabled={actionLoading} className="bg-cyan-500 text-white font-bold rounded-lg px-6">
                  {actionLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <Card className="bg-white max-w-sm w-full p-6 relative rounded-xl shadow-2xl border text-center">
            <h3 className="font-black text-xl text-gray-800 mb-2">Are you absolutely sure?</h3>
            <p className="text-gray-500 text-sm mb-6">This action cannot be undone. This tutor record will be permanently deleted.</p>
            <div className="flex justify-center gap-3">
              <Button type="button" onClick={() => setDeleteId(null)} variant="flat" className="rounded-lg font-bold">Cancel</Button>
              <Button onClick={handleDelete} disabled={actionLoading} className="bg-red-500 text-white font-bold rounded-lg px-6 hover:bg-red-600">
                {actionLoading ? "Deleting..." : "Yes, Delete"}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
