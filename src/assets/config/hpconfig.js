import { weaponintro } from "./intro";
import { weaponNameList } from "./equipmentname";
import { weaponimglist } from "./equipmentimg";
//随机词条
var extra = ["暴击率", "攻击", "暴击伤害", "生命", "防御力", "每秒恢复HP"];
var basicextra = ["暴击率", "攻击", "暴击伤害"];

//随机生成词条
function random(lower, upper) {
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}
//随机生成装备品质（0.1-1.0）
var fomatFloat = function (value, n) {
  var f = Math.round(value * Math.pow(10, n)) / Math.pow(10, n);
  var s = f.toString();
  var rs = s.indexOf(".");
  if (rs < 0) {
    s += ".";
  }
  for (var i = s.length - s.indexOf("."); i <= n; i++) {
    s += "0";
  }
  return s;
};

var crateHP = function (level, type) {
  var img = "";
  if (type == "小") {
    img = "1";
  } else if (type == "中") {
    img = "2";
  } else {
    img = "3";
  }
  let hp = {
    name: "治疗药水" + "(" + type + ")",
    type: "药水",
    intro: "这是一瓶平平无奇的治疗药水，虽然平凡但管用",
    imgurl: img,
    recoverhp: 0,
    color: "",
    fontcolor: "",
    lv: level,
  };

  if (type == "大") {
    hp.color = "rgb(255 0 0) 0px 0px 7px 2px inset";
    hp.fontcolor = "rgb(255 0 0)";
    hp.recoverhp = level * 1.5;
  } else if (type == "中") {
    hp.color = "rgb(247 137 24) 0px 0px 7px 2px inset";
    hp.fontcolor = "rgb(247 137 24)";
    hp.recoverhp = level * 1;
  } else {
    hp.color = "rgb(161 161 161) 0px 0px 7px 2px inset";
    hp.fontcolor = "rgb(161 161 161)";
    hp.recoverhp = level * 0.8;
  }
  return hp;
};
export default crateHP;
