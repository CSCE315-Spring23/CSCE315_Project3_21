import React from "react";
import { Button, Card } from "antd";
/**
 * 
 * MenuBoardItemCard function is used to generate the item cards used in the menu board.
 * 
 * 
 */
const MenuBoardItemCard = ({item}) => {
    const {Meta} = Card;
    return (
        <div >
            <Card
                hoverable
                style ={{width:250,marginBottom: 20, marginLeft: 20, fontSize: '8px', background: '#F2F4F4'}}
                cover={
                <img 
                    alt={item.itemname} 
                    src={item.imageLink} 
                    />
                }
            >
                <Meta title={item.itemname}
                description = {
                    <div className="item-description">
                        <p>
                            {item.itemname}
                        </p>
                        <p className="price">
                            {"$" + item.price}
                        </p>
                    </div>
                    
                } />
                

            </Card>
        </div>
    )
}

export default MenuBoardItemCard;