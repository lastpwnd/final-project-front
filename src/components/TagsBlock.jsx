import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import { SideBlock } from "./SideBlock";
import { Link } from "react-router-dom";

// clearArray = (items) =>
// {
//   items.filter((value, index) => { items.indexOf(value) === index })
//   return items
// }
const clearArray = (items) => {
  return items.filter( (value, index) => items.indexOf(value) === index )
}

export const TagsBlock = ({ items, isLoading = true }) => {
  return (
    <SideBlock title="Tags">
      <List>
        {(isLoading ? [...Array(10)] : clearArray(items)).map((name, i) => (
          <Link
            key={i}
            style={{ textDecoration: "none", color: "black" }}
            to={`/posts/tags/${name}`}
          >
            <ListItem key={i} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <ListItemText primary={name} />
                )}
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </SideBlock>
  );
};
