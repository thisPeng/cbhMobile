"use strict";
/**
 * @file Javascript工具
 * @author DJ
 */
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) {
  // fmt = fmt.replace(/-/g, "/");
  let o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

// 格式金额，保留两位小数
const formatMoney = (str) => {
  let num = parseFloat(str).toFixed(2);

  return '￥' + (
    num &&
    num.replace(/(\d)(?=(\d{3})+\.)/g, res => {
      return res + ",";
    })
  );
};

// 字符转换
const codeValue = (val, code) => {
  const store = require("./store.js");
  const arr = store.state.codeValue;
  let result = "";

  for (const i in arr) {
    if (arr[i].CodeTableID === code && arr[i].CodeID === val) {
      result = arr[i].CodeName;
      break;
    }
  }
  return result;
}

const xmlData = function xmlData(xml, val) {
  return "<" + xml + ">" + val + "</" + xml + ">"
};

export default {
  formatMoney,
  codeValue,
  xmlData
};