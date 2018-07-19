'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _html2canvas = require('html2canvas');

var _html2canvas2 = _interopRequireDefault(_html2canvas);

var _pdfmake = require('pdfmake/build/pdfmake');

var _pdfmake2 = _interopRequireDefault(_pdfmake);

var _vfs_fonts = require('pdfmake/build/vfs_fonts');

var _vfs_fonts2 = _interopRequireDefault(_vfs_fonts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Siver on 2018/7/11.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ReactDomPrinter节点转化为pdf进行打印
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var ReactDomPrinter = function (_React$Component) {
    _inherits(ReactDomPrinter, _React$Component);

    function ReactDomPrinter(props) {
        _classCallCheck(this, ReactDomPrinter);

        var _this = _possibleConstructorReturn(this, (ReactDomPrinter.__proto__ || Object.getPrototypeOf(ReactDomPrinter)).call(this, props));

        _this.print = function () {
            var dom = document.getElementById(_this.state.domID);
            (0, _html2canvas2.default)(dom).then(function (canvas) {
                var PAGE_H = _this.props.pageHeight;
                var PAGE_W = _this.props.pageWidth;
                var margin = _this.props.margin;

                var IMG_W = PAGE_W - margin.left - margin.right;
                var IMG_H = PAGE_H - margin.top - margin.bottom;
                var pageData = canvas.toDataURL('image/jpeg', 1.0);
                var docDefinition = {
                    pageSize: _this.props.pageSize,
                    footer: _this.props.footer,
                    header: _this.props.header,
                    pageMargins: [margin.left, margin.top, margin.right, margin.bottom]
                };
                //每页显示的实际图片高度;
                var pageHeight = canvas.width / IMG_W * IMG_H;
                //页面偏移
                var top = 0;
                //content
                var content = [];
                //当内容未超过pdf一页显示的范围，无需分页
                if (canvas.height < pageHeight) {
                    content.push({
                        image: pageData,
                        margin: [0, 0],
                        width: IMG_W,
                        height: canvas.height * IMG_W / canvas.width
                    });
                } else {
                    while (top < canvas.height) {
                        var cutHeight = top + pageHeight > canvas.height ? canvas.height - top : pageHeight;
                        var obj = {
                            image: _this.cutImg(canvas, cutHeight, canvas.width, top, 0),
                            margin: [0, 0],
                            width: IMG_W,
                            height: cutHeight * IMG_W / canvas.width
                        };
                        top += pageHeight;
                        //分页
                        if (top < canvas.height) obj.pageBreak = 'after';
                        content.push(obj);
                    }
                }
                docDefinition.content = content;
                _pdfmake2.default.createPdf(docDefinition).open();
            });
        };

        _this.cutImg = function (imgData, height, width, top, left) {
            var canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            canvas.getContext('2d').drawImage(imgData, left, top, width, height, 0, 0, width, height);
            // 保存图片信息
            return canvas.toDataURL('image/jpeg', 1.0);
        };

        _pdfmake2.default.vfs = _vfs_fonts2.default.pdfMake.vfs;

        _this.state = {
            domID: _this.props.domID
        };
        return _this;
    }

    //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高


    _createClass(ReactDomPrinter, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(next) {
            if (next.domID !== this.props.domID) {
                this.setState({
                    domID: next.domID
                });
            }
        }

        //canvas对图片进行裁剪

    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'button',
                { onClick: this.print },
                '\u6253\u5370'
            );
        }
    }]);

    return ReactDomPrinter;
}(_react2.default.Component);

ReactDomPrinter.propTypes = {
    /** Dom'id to print */
    domID: _propTypes2.default.string.isRequired,
    pageHeight: _propTypes2.default.number,
    pageWidth: _propTypes2.default.number,
    margin: _propTypes2.default.shape({
        left: _propTypes2.default.number,
        top: _propTypes2.default.number,
        right: _propTypes2.default.number,
        bottom: _propTypes2.default.number
    }),
    header: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func]),
    footer: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func]),
    pageSize: _propTypes2.default.string
};
ReactDomPrinter.defaultProps = {
    pageHeight: 841.89,
    pageWidth: 595.28,
    margin: {
        left: 20,
        top: 30,
        right: 20,
        bottom: 30
    },
    header: {
        columns: [{ text: 'begin', alignment: 'left', margin: 5 }, { text: 'end', alignment: 'right', margin: 5 }]
    },
    footer: function footer(currentPage, pageCount) {
        return {
            text: currentPage.toString() + '/' + pageCount,
            alignment: 'center',
            margin: 5
        };
    },
    pageSize: 'A4'
};
exports.default = ReactDomPrinter;