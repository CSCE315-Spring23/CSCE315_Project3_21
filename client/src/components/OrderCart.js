import React from "react";
import MaterialReactTable from "material-react-table";
import Box from "@mui/material/Box";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import {  toast } from "react-toastify";


const columns = [
  {
    accessorKey: "itemname",
    header: "Menu Item",
    size: 50,
  },
  {
    size: 50,
    accessorKey: "price",
    header: "Price($)",
  },
];

/**
 * 
 * @param {*} props - Functions/data to use from the parent component (ServerPage.js or CustomerPage.js)
 * @returns Order cart component which displays the current order information to the user and provides 
 * functionalities for removing items, cancelling the order, and creating an order.
 */
const OrderCart = (props) => {
  return (
    <div>
      <div className="order-info">
        <div className="shopping-cart">
          <div
            id="num-items"
            aria-label={"Your cart has " + props.OrderItems.length + " items."}
          >
            {props.OrderItems.length}
          </div>
          <ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon>
        </div>
        <h2 id="total">Order Total: {props.OrderTotal}</h2>
      </div>
      <button className="checkout-button" onClick={props.SendOrder}>
        Send Order
      </button>
      <MaterialReactTable
        columns={columns}
        data={props.OrderItems}
        enableEditing
        enableRowVirtualization
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip
              arrow
              placement="right"
              title="Remove Item"
              aria-label={"Remove " + row.original.itemname + " from order."}
            >
              <IconButton
                color="error"
                onClick={() => {
                  toast.success(
                    "Removing " + row.original.itemname + " from order!",
                    {
                      position: "top-center",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                    }
                  );
                  props.RemoveItem(row.original.itemname);
                }}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        muiTableHeadCellProps={{
          //simple styling with the `sx` prop, works just like a style prop in this example
          sx: {
            fontSize: "22px",
            textDecoration: "underline",
          },
        }}
        muiTableBodyCellProps={{
          sx: {
            fontSize: "18px",
            color: "#1A5276",
          },
        }}
      ></MaterialReactTable>
    </div>
  );
};

export default OrderCart;
