import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";

const Profile = () => {
  const { user } = useAuthContext();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const response = await fetch(`/api/orders/${user._id}`);
          const data = await response.json();
          setOrders(data || []);
        } catch (error) {
          console.error("Failed to fetch orders", error);
        }
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div>
      <h2>Profile</h2>
      <p>
        {user.name} {user.surname}
      </p>
      <h2>Orders: </h2>
      {orders.map((order, index) => (
        <div key={index}>{order.Name}</div>
      ))}
      {/* <UserForm user={user} /> */}
    </div>
  );
};

export default Profile;
