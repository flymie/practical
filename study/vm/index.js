class Element {
  constructor(type, props, children) {
    this.type = type;
    this.props = props;
    this.children = children;
  }
}

function createElement(type, props, children) {
  return new Element(type, props, children);
}

function createNode(node){
  // 根据类型创建元素
  let el = document.createElement(node.type);
  for (key in node.props) {
    // 遍历属性
    if(key === "value"){
      // 只有input还有textarea需要value属性
      if(node.type.toUpperCase() === "INPUT" || node.type.toUpperCase() === "TEXTAREA"){
        el.value = node.props[key];
      }
    }else {
      // 设置属性
      el.setAttribute(key, node.props[key]);
    }
  }
  return el;
}

function createDom(node) {
  let root = createNode(node);
  if(node.children && node.children.length > 0){
    // 遍历子元素
    node.children.forEach( function(element) {
      if(element instanceof Element){
        // 节点
        root.appendChild( createDom(element) );
      }else {
        // 文本
        root.appendChild( document.createTextNode(element) );
      }
    });
  }
  return root;
}
let vDom = createElement("ul", {class: "dawd"}, [
  createElement("li", {class: "dawd"}, ["1"]),
  createElement("li", {class: "dawd"}, ["2"]),
  createElement("li", {class: "dawd"}, ["3"])
]);

let vDom2 = createElement("div", {class: "div"}, [
  createElement("ul", {class: "ul"}, [
    createElement("li", {class: "li"},[createElement("input", {type: "checkbox",value: "1651"},["多选"])]),
    createElement("li", {class: "li"},[createElement("input", {type: "text",value: "1651"},[])]),]),
  createElement("div", {class: "div"}, [
    createElement("p", {class: "p"},[
      createElement("span", {class: "span"},["我是span"])]),
    createElement("a", {class: "a",href: ""},[
      createElement("span", {class: "span"},["我是超链接里面的span"])]),
    createElement("img", {class: "img",src: "",alt: "虚拟DOM图片",title: "虚拟的DOM"},[])
  ]),
]);

let dom = createDom(vDom);
let dom2 = createDom(vDom2);

const body = document.getElementsByTagName("body")[0];
body.appendChild(dom);
body.appendChild(dom2);

