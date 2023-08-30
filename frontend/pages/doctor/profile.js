import Footer from "@/components/footer";
import DoctorLayout from "@/layout/doctor.layout";
import { addProfilePicDoctor, doctorProfileEdit } from "@/service/doctor";
import { SSRAuthCheck } from "@/utils/ssr";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaUpload } from "react-icons/fa";

const Profile = () => {
  const { user } = useSelector((state) => state.userInfo);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    setUserInfo(user);
  }, [user]);

  const formatJoinDate = (dateString) => {
    const joinDate = new Date(dateString);
    return joinDate.toDateString();
  };

  const [selectedProfilePic, setSelectedProfilePic] = useState(null);

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];

    setSelectedProfilePic(URL.createObjectURL(file));

    const response = await addProfilePicDoctor(file);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  const handleAdditionalInfoChange = async () => {
    const response = await doctorProfileEdit(
      userInfo.doctorProfile.specialization,
      userInfo.doctorProfile.qualification,
      userInfo.doctorProfile.experienceYears,
      userInfo.doctorProfile.clinicAddress,
      userInfo.doctorProfile.education,
      userInfo.doctorProfile.publication_link,
      userInfo.doctorProfile.current_place,
      userInfo.doctorProfile.country,
      userInfo.doctorProfile.other_inportent_link,
      userInfo.doctorProfile.description,
      userInfo.id
    );
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };
  return (
    <DoctorLayout>
      <div
        className="flex items-center justify-between py-2 px-14 relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=704&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 250,
        }}
      >
        <div>
          <h3 className="font-semibold text-lg text-white">Profile Section</h3>
          <p className="text-sm text-white">Manage your profile from here</p>
        </div>
      </div>
      <section className="text-gray-600 body-font relative mb-40">
        <div className="container px-5 py-14 mx-auto">
          <div className="lg:w-4/5 md:w-2/3 mx-auto">
            <div className="mb-8">
              <div className="flex items-center">
                <div className="relative rounded-full w-24 h-24 mx-auto mb-4 border-4 border-green-500 overflow-hidden">
                  <img
                    src={
                      selectedProfilePic ||
                      `http://localhost:3000/${userInfo?.photo_url}`
                    }
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                  <label
                    htmlFor="profilePic"
                    className="absolute bottom-0 right-0 cursor-pointer"
                  >
                    <FaUpload className="text-green-500 bg-white rounded-full p-1" />
                    <input
                      type="file"
                      id="profilePic"
                      name="profilePic"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfilePicChange}
                    />
                  </label>
                </div>
              </div>
              <h1 className="text-2xl text-center font-medium title-font mb-4 text-gray-900">
                {userInfo?.name}
              </h1>
              <p className="text-sm text-gray-500 text-center">
                Joined: {formatJoinDate(userInfo?.createdAt)}
              </p>
              <h2 className="text-2xl font-semibold mb-4">Profile Info</h2>
              <div className="lg:w-4/5 md:w-2/3 mx-auto"></div>
            </div>
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-600">
                    Name
                  </label>
                  <input
                    type="text"
                    value={userInfo?.name}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    readOnly
                    onChange={(e) => {
                      setUserInfo({
                        ...userInfo,
                        name: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-600">
                    Email
                  </label>
                  <input
                    type="email"
                    value={userInfo?.email}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    readOnly
                    onChange={(e) => {
                      setUserInfo({
                        ...userInfo,
                        email: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>

              {/* <div className="p-2 w-full">
                <button className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
                  Save
                </button>
              </div> */}
            </div>
            <div className="mt-5">
              <h2 className="text-2xl font-semibold mb-4">Additional Info</h2>
              <div className="flex flex-wrap -m-2">
                {/* Clinic Address */}
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label className="leading-7 text-sm text-gray-600">
                      Clinic Address
                    </label>
                    <input
                      type="text"
                      value={userInfo?.doctorProfile?.clinicAddress}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      onChange={(e) => {
                        setUserInfo({
                          ...userInfo,
                          doctorProfile: {
                            ...userInfo.doctorProfile,
                            clinicAddress: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                </div>
                {/* Experience Years */}
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label className="leading-7 text-sm text-gray-600">
                      Experience Years
                    </label>
                    <input
                      type="text"
                      value={userInfo?.doctorProfile?.experienceYears}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      onChange={(e) => {
                        setUserInfo({
                          ...userInfo,
                          doctorProfile: {
                            ...userInfo.doctorProfile,
                            experienceYears: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                </div>
                {/* Qualification */}
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label className="leading-7 text-sm text-gray-600">
                      Qualification
                    </label>
                    <input
                      type="text"
                      value={userInfo?.doctorProfile?.qualification}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      onChange={(e) => {
                        setUserInfo({
                          ...userInfo,
                          doctorProfile: {
                            ...userInfo.doctorProfile,
                            qualification: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                </div>
                {/* Specialization */}
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label className="leading-7 text-sm text-gray-600">
                      Specialization
                    </label>
                    <input
                      type="text"
                      value={userInfo?.doctorProfile?.specialization}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      onChange={(e) => {
                        setUserInfo({
                          ...userInfo,
                          doctorProfile: {
                            ...userInfo.doctorProfile,
                            specialization: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label className="leading-7 text-sm text-gray-600">
                      Education
                    </label>
                    <input
                      type="text"
                      value={userInfo?.doctorProfile?.education}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      onChange={(e) => {
                        setUserInfo({
                          ...userInfo,
                          doctorProfile: {
                            ...userInfo.doctorProfile,
                            education: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label className="leading-7 text-sm text-gray-600">
                      Publication Link
                    </label>
                    <input
                      type="text"
                      value={userInfo?.doctorProfile?.publication_link}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      onChange={(e) => {
                        setUserInfo({
                          ...userInfo,
                          doctorProfile: {
                            ...userInfo.doctorProfile,
                            publication_link: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label className="leading-7 text-sm text-gray-600">
                      Current Place
                    </label>
                    <input
                      type="text"
                      value={userInfo?.doctorProfile?.current_place}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      onChange={(e) => {
                        setUserInfo({
                          ...userInfo,
                          doctorProfile: {
                            ...userInfo.doctorProfile,
                            current_place: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label className="leading-7 text-sm text-gray-600">
                      Country
                    </label>
                    <input
                      type="text"
                      value={userInfo?.doctorProfile?.country}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      onChange={(e) => {
                        setUserInfo({
                          ...userInfo,
                          doctorProfile: {
                            ...userInfo.doctorProfile,
                            country: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label className="leading-7 text-sm text-gray-600">
                      Other Inportent Link
                    </label>
                    <input
                      type="text"
                      value={userInfo?.doctorProfile?.other_inportent_link}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      onChange={(e) => {
                        setUserInfo({
                          ...userInfo,
                          doctorProfile: {
                            ...userInfo.doctorProfile,
                            other_inportent_link: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label className="leading-7 text-sm text-gray-600">
                      Description
                    </label>
                    <textarea
                      type="text"
                      value={userInfo?.doctorProfile?.description}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      onChange={(e) => {
                        setUserInfo({
                          ...userInfo,
                          doctorProfile: {
                            ...userInfo.doctorProfile,
                            description: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
                  onClick={handleAdditionalInfoChange}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </DoctorLayout>
  );
};

export const getServerSideProps = async (ctx) => {
  await SSRAuthCheck(ctx);

  return {
    props: {},
  };
};

export default Profile;
