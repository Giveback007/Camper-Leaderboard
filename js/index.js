"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Header(props) {
  return React.createElement(
    "header",
    null,
    React.createElement(
      "h1",
      null,
      "Brownie Point Masters ",
      React.createElement("i", { className: "fa fa-free-code-camp", "aria-hidden": "true" })
    ),
    React.createElement(
      "section",
      { className: "chart-headers" },
      React.createElement(
        "div",
        { className: "rank" },
        "#"
      ),
      React.createElement("div", { className: "ghost-img" }),
      React.createElement(
        "div",
        { className: "userName" },
        "Camper"
      ),
      " ",
      React.createElement(
        "a",
        { href: "javascript:void(0);", onClick: props.change },
        React.createElement(
          "div",
          { className: "score" },
          props.scoreType,
          " ",
          React.createElement("i", { className: "fa fa-refresh fa-spin", "aria-hidden": "true" })
        )
      )
    )
  );
}

function Camper(props) {
  return React.createElement(
    "a",
    { href: "https://www.freecodecamp.org/" + props.name, target: "_blank" },
    React.createElement(
      "div",
      { className: props.num % 2 === 0 ? "even camper" : "odd camper" },
      React.createElement(
        "div",
        { className: "rank" },
        props.num,
        React.createElement("br", null)
      ),
      React.createElement("img", { src: props.img }),
      React.createElement(
        "div",
        { className: "userName" },
        props.name
      ),
      React.createElement(
        "div",
        { className: "score" },
        props.score
      )
    )
  );
}

// </> Main Component

var LeaderBoard = function (_React$Component) {
  _inherits(LeaderBoard, _React$Component);

  function LeaderBoard(props) {
    _classCallCheck(this, LeaderBoard);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      isRecentScore: false,
      recent: [],
      allTime: [],
      activeData: []
    };
    _this.toggleScores = _this.toggleScores.bind(_this);
    _this.setData = _this.setData.bind(_this);
    _this.ajaxCall = _this.ajaxCall.bind(_this);
    return _this;
  }

  LeaderBoard.prototype.setData = function setData(update, data) {
    var _setState;

    this.setState((_setState = {}, _setState[update] = data, _setState));
    this.setState({ activeData: this.state.allTime });
  };

  LeaderBoard.prototype.toggleScores = function toggleScores() {
    this.setState({
      isRecentScore: !this.state.isRecentScore,
      activeData: !this.state.isRecentScore ? this.state.recent : this.state.allTime
    });
  };

  LeaderBoard.prototype.ajaxCall = function ajaxCall(url, stateToChange) {
    var _this2 = this;

    $.ajax({
      dataType: "json",
      url: url,
      success: function success(data) {
        console.log(data);
        var dataArr = [];
        for (var i = 0; i < data.length; i++) {
          var mem = [];
          for (var x in data[i]) {
            mem.push(data[i][x]);
          }
          dataArr.push(mem);
        }
        _this2.setData(stateToChange, dataArr);
      }
    });
  };

  LeaderBoard.prototype.componentDidMount = function componentDidMount() {
    this.ajaxCall('https://fcctop100.herokuapp.com/api/fccusers/top/alltime', 'allTime');
    this.ajaxCall('https://fcctop100.herokuapp.com/api/fccusers/top/recent', 'recent');
  };

  LeaderBoard.prototype.render = function render() {
    var _this3 = this;

    var scoreType = this.state.isRecentScore ? "30 Days" : "All Time";
    return React.createElement(
      "section",
      { id: "main" },
      React.createElement("div", { className: "header-ghost" }),
      React.createElement(Header, { scoreType: scoreType, change: this.toggleScores }),
      React.createElement(
        "section",
        { className: "main-board" },
        this.state.activeData.map(function (x, index) {
          return React.createElement(Camper, { key: index, num: index + 1, img: x[1], name: x[0], score: _this3.state.isRecentScore ? x[3] : x[2] });
        })
      )
    );
  };

  return LeaderBoard;
}(React.Component);

;

ReactDOM.render(React.createElement(LeaderBoard, null), document.body);