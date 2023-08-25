import { getProfile } from "@/service/user";
import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "@/store/slice/user.slice";
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "@/components/navbar";
const BasicLayout = ({ children, name = "Dashboard" }) => {
  const { isLoggedIn } = useSelector((state) => state.userInfo);
  const router = useRouter();

  const dispatch = useDispatch();
  const getProfileData = async () => {
    const response = await getProfile();
    dispatch(setUser(response.data));
  };

  useEffect(() => {
    const token = Cookies.get("token");
    token && getProfileData();
  }, [router.asPath]);

  return <>{children}</>;
};

export default BasicLayout;
