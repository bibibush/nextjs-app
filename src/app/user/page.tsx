import { auth } from "@/auth";
import React from "react";

const UserPage = async () => {
  const session = await auth();
  console.log(session);

  return <div>로그인된 유저만 볼 수 있는 페이지 입니다.</div>;
};

export default UserPage;
