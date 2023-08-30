import React, { useState, useEffect } from "react";
import DoctorCard from "@/components/doctor-cards";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { getAllServiceList } from "@/service/doctor";
import { useSelector } from "react-redux";

const DoctorsList = () => {
  const [lists, setLists] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoggedIn } = useSelector((state) => state.userInfo);

  useEffect(() => {
    const getAllDoctorService = async () => {
      const response = await getAllServiceList();
      if (response.success) {
        setLists(response.data);
      }
    };

    getAllDoctorService();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredLists = lists.filter((item) => {
    return (
      item.doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.doctor.doctorProfile.specialization
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 mt-20">
        <div
          className="flex items-center justify-between py-2 px-14 relative"
          style={{
            backgroundImage:
              "url('/multicolor-shapes-black-backround_1297-161.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: 150,
          }}
        >
          <div>
            <h3 className="font-semibold text-lg text-white">
              Welcome to the patient dashboard
            </h3>
            <p className="text-sm text-white">
              Manage your appointments and more.
            </p>
          </div>
        </div>
        <div
          className="relative isolate px-10 pb-14 lg:px-8 mt-20 overflow-y-auto"
          style={{ height: "100vh", overflow: "hidden" }}
        >
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by doctor's name or specialization"
              value={searchQuery}
              onChange={handleSearch}
              className="px-3 py-2 border border-gray-500 rounded-md w-full"
            />
          </div>
          <div className="grid grid-cols-4 gap-5">
            {filteredLists.map((item) => (
              <DoctorCard key={item.id} details={item} />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default DoctorsList;
