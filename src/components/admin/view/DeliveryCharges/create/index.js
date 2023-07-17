import React from "react";

const Create = () => {
  const [shoppingPrice, setShoppingPrice] = React.useState(0);
  const [deliveryCharges, setDeliveryCharges] = React.useState(0);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setShoppingPrice(value);
  };

  const getDeliveryCharges = () => {
    const sql = `SELECT delivery_charges FROM delivery_charges WHERE shopping_price <= ?`;
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "password",
      database: "shopping_cart",
    });
    connection.query(sql, [shoppingPrice], (err, results) => {
      if (err) {
        console.error(err);
      } else {
        if (results.length === 0) {
          setDeliveryCharges(0);
        } else {
          setDeliveryCharges(results[0].delivery_charges);
        }
      }
    });
  };

  return (
    <div>
      <h1>Dynamic Delivery Charges</h1>
      <input
        type="number"
        name="shoppingPrice"
        value={shoppingPrice}
        onChange={handleChange}
      />
      <p>Delivery charges: {deliveryCharges}</p>
      <button onClick={getDeliveryCharges}>Get Delivery Charges</button>
    </div>
  );
};

export default Create;
