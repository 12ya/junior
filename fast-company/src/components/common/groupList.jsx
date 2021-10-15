import React from "react";
import PropTypes from "prop-types";

export const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedItem
}) => {
    console.log(items, "itemingrouplist");
    console.log(typeof items, "typeofff");

    return (
        <ul className="list-group">
            {typeof items === "object"
                ? Object.keys(items).map((item) => (
                      <li
                          onClick={() => onItemSelect(items[item])}
                          key={items[item][valueProperty]}
                          className={
                              "list-group-item" +
                              (items[item] === selectedItem ? " active" : "")
                          }
                      >
                          {items[item][contentProperty]}
                      </li>
                  ))
                : items.map((item) => {
                      console.log(item, "oneitem");
                      return (
                          <li
                              onClick={() =>
                                  onItemSelect(item[contentProperty])
                              }
                              key={item[valueProperty]}
                              className={
                                  "list-group-item" +
                                  (item[valueProperty] ===
                                  selectedItem[valueProperty]
                                      ? " active"
                                      : "")
                              }
                          >
                              {item.name}
                          </li>
                      );
                  })}
        </ul>
    );
};

GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string,
    contentProperty: PropTypes.string,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.object
};
