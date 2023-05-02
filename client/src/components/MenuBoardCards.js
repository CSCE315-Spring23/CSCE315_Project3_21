import React from "react";
import { Card } from "antd";
import { blueGrey } from "@mui/material/colors";

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
                style ={{background: '#F2F4F4', height:210, lineHeight:1}}
                cover={
                <img 
                    style ={{width:130, marginLeft:'60px'}}
                    alt={item.itemname} 
                    src={item.imageLink} 
                    />
                }
            >
                <div style ={{fontSize:'16px'}}>
                    {item.itemname}
                </div>
                <div className="price" style ={{fontSize:'13px', color: '#FF0000'}} >
                    {"$" + item.price}
                </div>
            </Card>
        </div>
    )
}

export default MenuBoardItemCard;