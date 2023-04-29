import React from "react";
import { Button, Card } from "antd";

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