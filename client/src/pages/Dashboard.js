import React, { useContext } from "react";
import ProductForm from "../components/ProductForm";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {user && user.admin ? <ProductForm /> : <h2>User is not an admin</h2>}
      {/* <ProductForm /> */}
    </div>
  );
};

export default Dashboard;
