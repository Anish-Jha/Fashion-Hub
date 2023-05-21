import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "./user";
import { getUserDetails } from "../../Redux/AuthRedux/action";
import { Box, Heading } from "@chakra-ui/react";

export default function UserContainer() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authreducer.users);

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  return (
    <Box>
    <Heading>User Data</Heading>
      <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, max-content))",
          gridTemplateRows: "repeat(auto-fill)",
          justifyContent: "center",
          gridGap: "20px 10px",
          margin: "auto",
          marginTop:'20px',
          marginBottom:'20px'
        }}>
        {user.length ?(user.map((element) => (
          <User key={element.id} users={element} />
        ))):(
          <Box>
            <Heading>Loading...</Heading>
          </Box>
        )}
      </div>
    </Box>
  );
}
