import Layout from "@/layout";
import { SSRAuthCheck } from "@/utils/ssr";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.userInfo);

  // Helper function to format the join date
  const formatJoinDate = (dateString) => {
    const joinDate = new Date(dateString);
    return joinDate.toDateString();
  };

  // Placeholder URL for default profile picture from Unsplash
  const defaultProfilePicUrl =
    "https://images.unsplash.com/photo-1601756844725-26a1ade51d6f";

  // State to track the selected profile picture
  const [selectedProfilePic, setSelectedProfilePic] = useState(null);

  // Function to handle profile picture selection
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setSelectedProfilePic(URL.createObjectURL(file));
  };

  return (
    <Layout>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <div className="relative rounded-full w-24 h-24 mx-auto mb-4 border-4 border-indigo-500 overflow-hidden">
              <img
                src={
                  selectedProfilePic || user?.photo_url || defaultProfilePicUrl
                }
                alt="Profile"
                className="object-cover w-full h-full"
              />
              <label
                htmlFor="profilePic"
                className="absolute bottom-0 right-0 cursor-pointer"
              >
                <i className="fas fa-edit text-indigo-500 bg-white rounded-full p-1"></i>
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
              {user?.name}
            </h1>
            <p className="text-sm text-gray-500">
              Joined: {formatJoinDate(user?.createdAt)}
            </p>
            <p className="lg:w-2/3 mx-auto mt-2 leading-relaxed text-base">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify.
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label for="name" className="leading-7 text-sm text-gray-600">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={user?.name}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    for="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={user?.email}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div className="p-2 w-full">
                <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
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
