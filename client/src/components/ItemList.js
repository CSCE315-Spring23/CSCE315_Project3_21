import React from "react";
import { Card } from "antd";

const ItemList = ({item}) => {
    const {Meta} = Card;
    return (
        <div>
            <Card
                hoverable
                style ={{width:240}}
                cover={<img alt={item.itemname} src={item.imageLink} />}
            >
                <Meta title={item.itemname}
                description = {"$" + item.price} />

            </Card>
        </div>
    )
}

export default ItemList;