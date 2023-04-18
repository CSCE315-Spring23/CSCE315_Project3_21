import React from "react";
import { Button, Card } from "antd";

const ItemList = ({item}) => {
    const {Meta} = Card;
    return (
        <div >
            <Card
                hoverable
                style ={{width:240, marginBottom: 20, marginLeft: 10, fontSize: '16px', background: '#F2F4F4'}}
                cover={<img alt={item.itemname} src={item.imageLink} />}
            >
                <Meta title={item.itemname}
                description = {"$" + item.price} />
                <div className = "item-button" >
                    <Button>Add to cart</Button>
                </div>

            </Card>
        </div>
    )
}

export default ItemList;