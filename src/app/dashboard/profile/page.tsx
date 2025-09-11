"use client";
import Aside from "@/components/aside";
import React, { useState } from "react";

function ProfilePage() {
  const [formData, setFormData] = useState({
    email: "miguelsalvador304@gmail.com",
    firstName: "Carlos",
    lastName: "James",
    phone: "",
    country: "American Samoa",
  });
  return (
    <>
      <Aside />
      <main>
        <div className="flex min-h-screen max-w-4/5 ml-auto flex-col items-center justify-center p-8">
          <div className="bg-blue-800 rounded-lg p-6 flex items-center gap-6 mb-8 w-full">
            <div className="w-16 h-16 rounded-full bg-red-400 flex items-center justify-center text-3xl font-bold text-white">
              G
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-red-400">
                {formData.firstName} {formData.lastName}
              </h2>
              <p className="text-white">{formData.email}</p>
              <p className="text-sm text-gray-200">{formData.country}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Personal Info Card */}
            <div className="bg-blue-800 p-6 rounded-lg space-y-4 text-white">
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
                  <span className="font-semibold">Account Balance:</span> $0.00
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
            <div className="bg-blue-800 p-6 rounded-lg">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm mb-1 text-white">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full p-2 rounded bg-white border border-gray-700"
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
                      className="w-full p-2 rounded bg-white border border-gray-700"
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
                      className="w-full p-2 rounded bg-white border border-gray-700"
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
                    className="w-full p-2 rounded bg-white border border-gray-700"
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
                    className="w-full p-2 rounded bg-white border border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-white">
                    Upload ID (for verification)
                  </label>
                  <input
                    type="file"
                    className="w-full p-2 rounded bg-white border border-gray-700"
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
