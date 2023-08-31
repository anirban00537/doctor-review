import React, { useState, useEffect } from "react";
import DoctorCard from "@/components/doctor-cards";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { getAllServiceList } from "@/service/doctor";
import { useSelector } from "react-redux";
import NoItemFound from "@/components/noItemFound";

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
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-screen-xl  py-12 mt-20">
        <div
          className="flex items-center justify-between py-6 px-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg"
          style={{
            backgroundImage:
              "url('/multicolor-shapes-black-backround_1297-161.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: 150,
          }}
        >
          <div>
            <h3 className="font-semibold text-xl md:text-2xl">
              Welcome to the patient dashboard
            </h3>
            <p className="text-sm md:text-base">
              Manage your appointments and more.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-screen-xl  py-12 mt-8">
          <div
            className="relative px-10 mt-8 overflow-y-auto"
            style={{ minHeight: "calc(100vh - 220px)" }}
          >
            <div className="mb-8">
              <input
                type="text"
                placeholder="Search by doctor's name or specialization"
                value={searchQuery}
                onChange={handleSearch}
                className="px-4 py-3 border border-gray-300 rounded-md w-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredLists.map((item) => (
                <DoctorCard key={item.id} details={item} />
              ))}
            </div>
            {filteredLists.length <= 0 && (
              <div className="mt-8 text-center">
                <NoItemFound message={"No Service Found"} />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DoctorsList;
