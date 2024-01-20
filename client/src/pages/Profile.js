// import { useAuthContext } from "../hooks/useAuthContext";
// import { useEffect, useState } from "react";

// const Profile = () => {
//   const { user } = useAuthContext();
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (user) {
//         try {
//           const response = await fetch(`/api/orders/${user._id}`);
//           const data = await response.json();
//           setOrders(data || []);
//         } catch (error) {
//           console.error("Failed to fetch orders", error);
//         }
//       }
//     };

//     fetchOrders();
//   }, [user]);

//   return (
//     <div>
//       <h2>Profile</h2>
//       <p>
//         {user.name} {user.surname}
//       </p>
//       <h2>Orders: </h2>
//       {orders.map((order, index) => (
//         <div key={index}>{order.Name}</div>
//       ))}
//       <h2>Change your data:</h2>
//       <form>
//         <label>Current email:</label>
//         <input type="text" />
//         <label>New email:</label>
//         <input type="text" />
//         <button type="submit">Submit</button>
//       </form>
//       <form>
//         <label>Current password:</label>
//         <input type="password" />
//         <label>New password:</label>
//         <input type="password" />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default Profile;

import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";

const Profile = () => {
  const { user } = useAuthContext();
  const [orders, setOrders] = useState([]); // Initialize orders as an empty array
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleEmailChange = async (event) => {
    event.preventDefault();
    const response = await fetch(`/api/user/changeEmail/${user._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: user._id, newEmail: email }),
    });
    const data = await response.json();
    console.log(data);
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    const response = await fetch(`/api/user/changePassword${user._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: user._id, newPassword: password }),
    });
    const data = await response.json();
    console.log(data);
  };

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
      <h2>Change your data:</h2>
      <form onSubmit={handleEmailChange}>
        <label>Current email:</label>
        <input type="text" value={user.email} readOnly />
        <label>New email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <form onSubmit={handlePasswordChange}>
        <label>Current password:</label>
        <input type="password" />
        <label>New password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Profile;
