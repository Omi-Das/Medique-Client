import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import MyTutorsTable from "@/components/MyTutorsTable";

const MyTutorsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userEmail = session?.user?.email;

   const { token } = await auth.api.getToken({
      headers: await headers()
    });

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/my-tutors?email=${userEmail}`, {
    cache: "no-store",
    headers: {
          authorization: `Bearer ${token}`
        }
  });

  const initialTutors = await res.json();

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-gray-800 dark:text-white">My Tutors List</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage and update all the tutor profiles you have created</p>
      </div>
      <MyTutorsTable initialTutors={Array.isArray(initialTutors) ? initialTutors : []} />
    </div>
  );
};

export default MyTutorsPage;
