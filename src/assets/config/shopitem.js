var itemlist = ["armo", "weapon", "left", "right"];
var hplist = ["小", "中", "大"];
import crateWeapon from "./weaponconfig";
import crateArmo from "./armoconifg";
import crateLeft from "./leftconfig";
import crateRight from "./rightconfig";
import crateHP from "./hpconfig";
function random(lower, upper) {
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}
let createShopItem = function (number, level) {
  let items = [];
  for (let i = 0; i < number; i++) {
    let item = {};
    let x = itemlist[random(0, itemlist.length - 1)];
    if(x == "armo"){
      item = crateArmo(level, "R", random(1,5));
    }else if(x == "left"){
      item = crateLeft(level, "R", random(1,5));
    }else if(x == "right"){
      item = crateRight(level, "R", random(1,5));
    }else if(x == "weapon"){
      item = crateWeapon(level, "R", random(1,5));
    }
 
    items.push(item)
  }
  for(let x=0;x<items.length;x++){
    if(items[x].type=='武器'){
      items[x].imgurla = 'weapon/'+items[x].imgurl
    }else if(items[x].type=='护甲'){
      items[x].imgurla = 'armo/'+items[x].imgurl
    }else if(items[x].type=='耳环'){
      items[x].imgurla= 'right/'+items[x].imgurl
    }else if(items[x].type=='首饰'){
      items[x].imgurla = 'left/'+items[x].imgurl
    }
  }
  return items;
};
export default createShopItem