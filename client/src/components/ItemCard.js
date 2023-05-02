import React from "react";
import { Button, Card } from "antd";

/**
 * 
 * @param {*} props - Data of an individual menu item, containing the item name, price, image link, and category. 
 * @returns A Card display component for an individual menu item, used for the Customer Menu component. 
 * Has a button for adding the menu item to the order.
 */
const ItemCard = (props) => {
    const {Meta} = Card;
    return (
        <div >
            <Card
                hoverable
                style ={{width:230, marginBottom: 20, marginLeft: 5, fontSize: '16px', background: '#F2F4F4'}}
                cover={
                <img 
                    alt={props.item.itemname} 
                    src={props.item.imageLink} 
                    />
                }
            >
                <Meta title={props.item.itemname}
                description = {
                    <div className="item-description">
                        <p>
                            {props.item.itemname}
                        </p>
                        <p className="category">
                            {props.item.category}
                        </p>
                        <p className="price">
                            {"$" + props.item.price}
                        </p>
                    </div>
                } />
                <div className = "item-button" >
                    <Button onClick={ () => {
                        alert("Adding " + props.item.itemname + " to order!");
                        props.AddItem(props.item.itemname);
                    }}
                    >
                    Add Item
                    </Button>
                </div>

            </Card>
        </div>
    )
}

export default ItemCard;