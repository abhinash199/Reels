function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

let React = require('react');
let React__default = _interopDefault(React);

let styles = {"lightboxContainer":"lightbox-container","reactLightboxCloseButtonContainer":"_3ZUEV","reactLightboxCloseButton":"_3bkri","reactLightboxButton":"_20cg_","reactLightboxArrowRight":"_18xMp","reactLightboxArrowLeft":"_2pWTS"};

let _path, _path2;

function _extends() {
    _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    return _extends.apply(this, arguments);
}

function SvgArrowRight(props) {
    return /*#__PURE__*/React.createElement("svg", _extends({
        xmlns: "http://www.w3.org/2000/svg",
        height: 24,
        width: 24
    }, props), _path || (_path = /*#__PURE__*/React.createElement("path", {
        d: "M0 0h24v24H0V0z",
        fill: "none"
    })), _path2 || (_path2 = /*#__PURE__*/React.createElement("path", {
        d: "M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"
    })));
}

var _path$1, _path2$1;

function _extends$1() {
    _extends$1 = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    return _extends$1.apply(this, arguments);
}

function SvgArrowLeft(props) {
    return /*#__PURE__*/React.createElement("svg", _extends$1({
        xmlns: "http://www.w3.org/2000/svg",
        height: 24,
        width: 24
    }, props), _path$1 || (_path$1 = /*#__PURE__*/React.createElement("path", {
        d: "M0 0h24v24H0V0z",
        fill: "none"
    })), _path2$1 || (_path2$1 = /*#__PURE__*/React.createElement("path", {
        d: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
    })));
}

var _path$2, _path2$2;

function _extends$2() {
    _extends$2 = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    return _extends$2.apply(this, arguments);
}

function SvgClose(props) {
    return /*#__PURE__*/React.createElement("svg", _extends$2({
        xmlns: "http://www.w3.org/2000/svg",
        height: 24,
        width: 24
    }, props), _path$2 || (_path$2 = /*#__PURE__*/React.createElement("path", {
        d: "M0 0h24v24H0V0z",
        fill: "none"
    })), _path2$2 || (_path2$2 = /*#__PURE__*/React.createElement("path", {
        d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
    })));
}

var LightBox = function LightBox(_ref) {
    var state = _ref.state,
        event = _ref.event,
        data = _ref.data,
        dataArr = _ref.dataArr,
        _ref$imageWidth = _ref.imageWidth,
        imageWidth = _ref$imageWidth === void 0 ? '50vw' : _ref$imageWidth,
        _ref$imageHeight = _ref.imageHeight,
        imageHeight = _ref$imageHeight === void 0 ? '60vh' : _ref$imageHeight,
        _ref$thumbnailHeight = _ref.thumbnailHeight,
        thumbnailHeight = _ref$thumbnailHeight === void 0 ? 50 : _ref$thumbnailHeight,
        _ref$thumbnailWidth = _ref.thumbnailWidth,
        thumbnailWidth = _ref$thumbnailWidth === void 0 ? 50 : _ref$thumbnailWidth,
        setImageIndex = _ref.setImageIndex,
        imageIndex = _ref.imageIndex;

    if (state) {
        var arrowsHandler = function arrowsHandler(arrow) {
            var arrayLength = data.length - 1;

            switch (arrow) {
                case 'next':
                    if (imageIndex >= arrayLength) {
                        setImageIndex(0);
                    } else {
                        setImageIndex(function (prevState) {
                            return prevState + 1;
                        });
                    }

                    break;

                case 'prev':
                    if (imageIndex <= 0) {
                        setImageIndex(arrayLength);
                    } else {
                        setImageIndex(function (prevState) {
                            return prevState - 1;
                        });
                    }

                    break;

                default:
                    setImageIndex(0);
            }
        };

        return /*#__PURE__*/React__default.createElement("div", {
            className: styles.lightboxContainer
        }, /*#__PURE__*/React__default.createElement("div", {
            className: styles.reactLightboxCloseButtonContainer
        }, /*#__PURE__*/React__default.createElement("button", {
            className: styles.reactLightboxCloseButton,
            onClick: function onClick() {
                event(false, imageIndex);
                setImageIndex(0);
            }
        }, /*#__PURE__*/React__default.createElement(SvgClose, {
            fill: "#fff"
        }))), /*#__PURE__*/React__default.createElement("div", {
            className: styles.reactLightboxArea
        }, /*#__PURE__*/React__default.createElement("img", {
            src: data[imageIndex].image,
            alt: data.title,
            style: {
                maxHeight: imageHeight,
                maxWidth: imageWidth
            }
        }), /*#__PURE__*/React__default.createElement("div", {
            className: styles.reactLightboxArrowRight
        }, /*#__PURE__*/React__default.createElement("button", {
            className: styles.reactLightboxButton,
            onClick: function onClick() {
                return arrowsHandler('next');
            }
        }, /*#__PURE__*/React__default.createElement(SvgArrowRight, null))), /*#__PURE__*/React__default.createElement("div", {
            className: styles.reactLightboxArrowLeft
        }, /*#__PURE__*/React__default.createElement("button", {
            className: styles.reactLightboxButton,
            onClick: function onClick() {
                return arrowsHandler('prev');
            }
        },

            React__default.createElement(SvgArrowLeft, null)))), /*#__PURE__*/React__default.createElement("div", {
            style: {
                position: 'fixed',
                bottom: '10px',
                display: 'flex',
                flexDirection: 'row',
            }
        },

        //     data && data.map(function (item, index) {
        //     return /*#__PURE__*/React__default.createElement("img", {
        //         key: item.id,
        //         src: item.image,
        //         alt: item.title,
        //         height: thumbnailHeight,
        //         width: thumbnailWidth,
        //         style: {
        //             objectFit: 'cover',
        //             margin: '0 0.5rem',
        //             borderRadius: '0.2rem'
        //         },
        //         onClick: function onClick() {
        //             return setImageIndex(index);
        //         }
        //     });
        // }),
            dataArr && dataArr.map(function (item, index) {
            return /*#__PURE__*/React__default.createElement("img", {
                key: item,
                src: item,
                alt: item,
                height: thumbnailHeight,
                width: thumbnailWidth,
                style: {
                    objectFit: 'cover',
                    margin: '0 0.5rem',
                    borderRadius: '0.2rem'
                },
                onClick: function onClick() {
                    return setImageIndex(index);
                }
            });
        })
        ));
    }

    return null;
};

exports.LightBox = LightBox;
//# sourceMappingURL=index.js.map
