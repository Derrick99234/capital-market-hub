"use client";
import Aside from "@/components/aside";
import TickerLive from "@/components/live-price";
import { useUser } from "@/context/user-context";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

function ProfilePage() {
  const { user, loading } = useUser();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    amount: 0,
    country: "",
  });
  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        country: user.country,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phoneNumber,
        amount: user.balance,
      });
    }
  }, [user]);
  if (loading) return <p>Loading...</p>;
  if (!user) redirect("/login");
  return (
    <>
      <Aside />
      <main>
        <div className="flex min-h-screen max-w-4/5 ml-auto flex-col items-center justify-center p-8 bg-black">
          <TickerLive />
          <div className="bg-gray-800 rounded-lg p-6 flex gap-6 mb-8 w-full flex-col">
            <Image
              src={
                "https://cdn.pixabay.com/photo/2022/12/26/11/37/bitcoin-7678816_1280.jpg"
              }
              width={400}
              height={400}
              className="w-full h-56 object-cover object- blur-[2.5px]"
              alt="user profiel"
            />
            <div className="flex gap-5">
              <div className="w-16 h-16 rounded-full bg-purple-700 flex items-center justify-center text-3xl font-bold text-white">
                G
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-purple-700">
                  {formData.firstName} {formData.lastName}
                </h2>
                <p className="text-white">{formData.email}</p>
                <p className="text-sm text-gray-200">{formData.country}</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Personal Info Card */}
            <div className="bg-gray-800 p-6 rounded-lg space-y-4 text-white">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <div className="space-y-6 text-sm">
                <p>
                  <span className="font-semibold">First Name:</span>{" "}
                  {formData.firstName}
                </p>
                <p>
                  <span className="font-semibold">Last Name:</span>{" "}
                  {formData.lastName}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {formData.email}
                </p>
                <p>
                  <span className="font-semibold">Account Balance:</span> $
                  {formData.amount.toFixed(2)}
                </p>
                <p>
                  <span className="font-semibold">Account Status:</span>
                  <span className="ml-2 px-2 py-1 text-xs bg-red-600 rounded">
                    Not Verified
                  </span>
                </p>
                <p>
                  <span className="font-semibold">Identity Status:</span>
                  <span className="ml-2 px-2 py-1 text-xs bg-red-600 rounded">
                    Not Verified
                  </span>
                </p>
                <p>
                  <span className="font-semibold">Referred Code:</span> 1394199
                  <button className="ml-2 px-2 py-1 bg-lime-400 text-black rounded text-xs">
                    Copy
                  </button>
                </p>
                <p>
                  <span className="font-semibold">Referred By:</span> Unknown
                  Referrer
                </p>
              </div>
            </div>

            {/* Edit Form */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm mb-1 text-white">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full p-2 rounded bg-gray-400 border border-gray-700"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1 text-white">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className="w-full p-2 rounded bg-gray-400 border border-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 text-white">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className="w-full p-2 rounded bg-gray-400 border border-gray-700"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1 text-white">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full p-2 rounded bg-gray-400 border border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1 text-white">
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    className="w-full p-2 rounded bg-gray-400 border border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-white">
                    Upload ID (for verification)
                  </label>
                  <input
                    type="file"
                    className="w-full p-2 rounded bg-gray-400 border border-gray-700"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-lime-400 text-black px-4 py-2 rounded font-semibold"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ProfilePage;
