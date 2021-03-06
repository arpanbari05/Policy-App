import React from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Header,
  HeaderTitle,
  List,
  ListItem,
  Label,
} from "../../../../components/Common/DropDownComponents/DropDownComponents";
import useSortByDD from "./useSort";
import "styled-components/macro";
import { useTheme } from "../../../../customHooks";

const SortByDD = ({ title, list, onSortByChange = () => {} }) => {
  const { dropdownRef, toggleList, isOpen, selected, handleSelect } =
    useSortByDD({ onSortByChange });

  const { colors } = useTheme();

  return (
    <div
      css={`
        width: max-content;
      `}
      ref={dropdownRef}
    >
      <Header
        onClick={toggleList}
        className={`${isOpen && "active"} SortByDD__Header`}
        style={{
          overflow: "unset",
          borderRadius: "6px",
          margin: 0,
          position: "relative",
          zIndex: "9",
        }}
        sortByDD
      >
        <Label
          css={`
            color: gray;
          `}
        >
          {title}
        </Label>
        <HeaderTitle
          className={`${isOpen && "active"} SortByDD__Title`}
          css={`
            overflow: unset;
            border-radius: 6px;
            margin: 0px;
            width: 200px;
            padding: 20px !important;
            height: 47px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
          `}
        >
          {selected || "Sort By"}
        </HeaderTitle>
        {isOpen && (
          <List
            style={{
              position: "absolute",
              left: 0,
              top: "100%",
              width: "100%",
              margin: 0,
            }}
            className="SortByDD__List"
          >
            {list.map(data => {
              return (
                <ListItem
                  PrimaryShade={colors.primary_shade}
                  className={` SortByDD__ListItem`}
                  onClick={() => handleSelect(data.title)}
                  key={uuidv4()}
                  style={{
                    padding: "10px",
                  }}
                >
                  {data.title}
                </ListItem>
              );
            })}
          </List>
        )}
      </Header>
    </div>
  );
};

export default SortByDD;
