import React from "react";
import { Button, Card } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * 
 * @param {*} props - Data of an individual menu item, containing the item name, price, image link, and category. 
 * @returns A Card display component for an individual menu item, used for the Customer Menu component. 
 * Has a button for adding the menu item to the order.
 */
const ItemCard = (props) => {
  const { Meta } = Card;
  return (
    <div
      aria-label={props.item.itemname + ". Price: $" + props.item.price + " ."}
    >
      <Card
        hoverable
        style={{
          width: 230,
          marginBottom: 20,
          marginLeft: 5,
          fontSize: "16px",
          background: "#F2F4F4",
        }}
        cover={
          <img
            alt={"Image of " + props.item.itemname}
            src={props.item.imageLink}
          />
        }
      >
        <Meta
          aria-label={
            props.item.itemname + ". Price: $" + props.item.price + " ."
          }
          title={props.item.itemname}
          description={
            <div className="item-description">
              <p>{props.item.itemname}</p>
                        <p className="category">
                            {props.item.category}
                        </p>
              <p className="price" aria-label={"Price: $" + props.item.price}>
                {"$" + props.item.price}
              </p>
            </div>
          }
        />
        <div className="item-button">
          <Button
            onClick={() => {
              toast.success("Added " + props.item.itemname + " to order!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
              props.AddItem(props.item.itemname);
            }}
            aria-label={"Add " + props.item.itemname + " to cart."}
          >
            Add Item
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ItemCard;
