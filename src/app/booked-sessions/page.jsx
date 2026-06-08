// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";
// import BookedSessionsTable from "@/components/BookedSessionsTable";

// export const metadata = {
//   title: "My Booked Sessions",
// };

// const MyBookedSessionsPage = async () => {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   const studentEmail = session?.user?.email;
  
//    const { token } = await auth.api.getToken({
//     headers: await headers()
//   });

//   const res = await fetch(`http://localhost:5000/api/v1/my-bookings?email=${studentEmail}`, {
//     cache: "no-store",
//     headers: {
//       authorization: `Bearer ${token}`
//     }
//   });

//   const initialBookings = await res.json();

//   return (
//     <div className="container mx-auto max-w-7xl px-4 py-8">
//       <div className="mb-6">
//         <h1 className="text-3xl font-black text-gray-800 dark:text-white">My Booked Sessions</h1>
//         <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">View and manage all the tutoring sessions you have booked</p>
//       </div>

//       <BookedSessionsTable initialBookings={Array.isArray(initialBookings) ? initialBookings : []} />
//     </div>
//   );
// };

// export default MyBookedSessionsPage;
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import BookedSessionsTable from "@/components/BookedSessionsTable";

export const metadata = {
  title: "My Booked Sessions",
};

const MyBookedSessionsPage = async () => {
  const requestHeaders = await headers();

  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  const studentEmail = session?.user?.email;
  
  const { token } = await auth.api.getToken({
    headers: requestHeaders
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/my-bookings?email=${studentEmail}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`
    }
  });

  const initialBookings = await res.json();

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-gray-800 dark:text-white">My Booked Sessions</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">View and manage all the tutoring sessions you have booked</p>
      </div>

      <BookedSessionsTable initialBookings={Array.isArray(initialBookings) ? initialBookings : []} />
    </div>
  );
};

export default MyBookedSessionsPage;
