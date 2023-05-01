import React from "react";
import { Card } from "antd";

const MenuBoardItemCard = ({item}) => {
    const {Meta} = Card;
    return (
        <div >
            <Card
                hoverable
                style ={{fontSize: '8px', background: '#F2F4F4', height:200, lineHeight:1}}
                cover={
                <img 
                    style ={{width:130, marginLeft:'60px'}}
                    alt={item.itemname} 
                    src={item.imageLink} 
                    />
                }
            >
                <Meta title={item.itemname}
                description = {
                    <div className="item-description">
                        <div className="price">
                            {"$" + item.price}
                        </div>
                    </div>
                    
                } />
                
            </Card>
        </div>
    )
}

export default MenuBoardItemCard;