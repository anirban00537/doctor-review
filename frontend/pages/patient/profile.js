import Footer from "@/components/footer";
import Layout from "@/layout";
import { SSRAuthCheck } from "@/utils/ssr";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.userInfo);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    setUserInfo(user);
  }, [user]);

  // Helper function to format the join date
  const formatJoinDate = (dateString) => {
    const joinDate = new Date(dateString);
    return joinDate.toDateString();
  };

  // Placeholder URL for default profile picture from Unsplash
  const defaultProfilePicUrl =
    "https://as2.ftcdn.net/v2/jpg/01/34/29/31/1000_F_134293169_ymHT6Lufl0i94WzyE0NNMyDkiMCH9HWx.jpg";

  // State to track the selected profile picture
  const [selectedProfilePic, setSelectedProfilePic] = useState(null);

  // Function to handle profile picture selection
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setSelectedProfilePic(URL.createObjectURL(file));
  };

  return (
    <Layout>
      <div
        className="flex items-center justify-between py-2 px-14 relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506792006437-256b665541e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80')", // Replace with your image path
          backgroundSize: "cover", // Adjust as needed
          backgroundPosition: "center", // Adjust as needed
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
          <div className="flex flex-col text-center w-full mb-12">
            <div className="relative rounded-full w-24 h-24 mx-auto mb-4 border-4 border-green-500 overflow-hidden">
              {/* Profile Picture */}
              <img
                src={
                  selectedProfilePic ||
                  userInfo?.photo_url ||
                  defaultProfilePicUrl
                }
                alt="Profile"
                className="object-cover w-full h-full"
              />
              <label
                htmlFor="profilePic"
                className="absolute bottom-0 right-0 cursor-pointer"
              >
                <i className="fas fa-edit text-green-500 bg-white rounded-full p-1"></i>
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
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              {userInfo?.name}
            </h1>
            <p className="text-sm text-gray-500">
              Joined: {formatJoinDate(userInfo?.createdAt)}
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
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
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <button className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </Layout>
  );
};

export const getServerSideProps = async (ctx) => {
  await SSRAuthCheck(ctx);

  return {
    props: {},
  };
};

export default Profile;
