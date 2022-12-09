"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Table;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.json.stringify.js");
require("./table.css");
var _react = require("react");
var _uparrow = _interopRequireDefault(require("./uparrow.gif"));
var _downarrow = _interopRequireDefault(require("./downarrow.gif"));
var _botharrow = _interopRequireDefault(require("./botharrow.gif"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function Table(props) {
  if (props.data[0] === undefined || props.header[0] === undefined) {
    return /*#__PURE__*/React.createElement("div", null, " Fix your props inputs");
  } else {
    return /*#__PURE__*/React.createElement(TableChild, {
      data: props.data,
      header: props.header
    });
  }
}
function TableChild(props) {
  let sortKeys = Object.keys(props.data[0]);
  const [sortLabel, setSortLabel] = (0, _react.useState)(sortKeys[0]);
  const [sortOrder, setSortOrder] = (0, _react.useState)(true);
  const [page, setPage] = (0, _react.useState)(1);
  const [perPage, setPerPage] = (0, _react.useState)(5);
  function pagination(data) {
    let pagedData = data.slice((page - 1) * perPage, page * perPage);
    return pagedData;
  }
  function amountOfPage() {
    let num = [];
    let amountOfPage = Math.ceil(searchData.length / perPage);
    for (let i = 1; i <= amountOfPage; i++) {
      num.push(i);
    }
    if (amountOfPage < page) {
      if (amountOfPage !== 0) {
        setPage(amountOfPage);
      }
    }
    return num;
  }
  function sortData(data, sortKey, order) {
    const sortedData = data.sort((a, b) => {
      return a[sortKey] > b[sortKey] ? 1 : -1;
    });
    if (!order) {
      return sortedData.reverse();
    }
    return sortedData;
  }
  function SortBtn(props) {
    return /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        if (sortLabel === props.clmkey) {
          setSortOrder(!sortOrder);
        } else {
          setSortLabel(props.clmkey);
          setSortOrder(true);
        }
      }
    }, sortLabel === props.clmkey ? sortOrder === true ? /*#__PURE__*/React.createElement("img", {
      alt: "",
      src: _downarrow.default
    }) : /*#__PURE__*/React.createElement("img", {
      alt: "",
      src: _uparrow.default,
      style: {
        transform: "translate(0px, -6px)"
      }
    }) : /*#__PURE__*/React.createElement("img", {
      src: _botharrow.default,
      alt: "",
      style: {
        opacity: 0.2
      }
    }));
  }
  function search(target) {
    if (target === undefined) {
      setSearchData(sortedData);
    } else {
      let searchData = sortedData.filter(obj => JSON.stringify(obj).toLowerCase().includes(target.toLowerCase()));
      setSearchData(searchData);
    }
  }
  let sortedData = sortData(props.data, sortLabel, sortOrder);
  const [searchData, setSearchData] = (0, _react.useState)(sortedData);
  let pagedData = pagination(searchData);
  let numOfPage = amountOfPage();
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "PageNSearch"
  }, /*#__PURE__*/React.createElement("select", {
    onChange: event => setPerPage(event.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: 5
  }, "5"), /*#__PURE__*/React.createElement("option", {
    value: 10
  }, "10"), /*#__PURE__*/React.createElement("option", {
    value: 15
  }, "15"), /*#__PURE__*/React.createElement("option", {
    value: 25
  }, "25")), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "search",
    onChange: event => search(event.target.value)
  })), /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    className: "tableHead"
  }, props.header.map(column => {
    return /*#__PURE__*/React.createElement("th", {
      key: column.key
    }, column.title, /*#__PURE__*/React.createElement(SortBtn, {
      clmkey: column.key
    }));
  }))), /*#__PURE__*/React.createElement("tbody", null, pagedData.map((data, index) => {
    return /*#__PURE__*/React.createElement("tr", {
      key: index
    }, props.header.map((column, colindex) => {
      return /*#__PURE__*/React.createElement("td", {
        key: index + '_' + colindex
      }, data[column.key]);
    }));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "pages"
  }, numOfPage.length <= 1 ? /*#__PURE__*/React.createElement("div", null) : numOfPage.map(num => {
    return /*#__PURE__*/React.createElement("div", {
      key: num,
      onClick: () => {
        setPage(num);
      }
    }, num);
  })));
}