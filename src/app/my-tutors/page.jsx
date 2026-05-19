import { auth } from "@/lib/auth"; // আপনার সার্ভার সাইড BetterAuth ইনস্ট্যান্স পাথ
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import MyTutorsTable from "@/components/MyTutorsTable";

const MyTutorsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const userEmail = session.user.email;

  const res = await fetch(`http://localhost:5000/api/v1/my-tutors?email=${userEmail}`, {
    cache: "no-store",
  });

  const initialTutors = await res.json();

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-gray-800">My Tutors List</h1>
        <p className="text-gray-500 text-sm mt-1">Manage and update all the tutor profiles you have created</p>
      </div>
      <MyTutorsTable initialTutors={Array.isArray(initialTutors) ? initialTutors : []} />
    </div>
  );
};

export default MyTutorsPage;
