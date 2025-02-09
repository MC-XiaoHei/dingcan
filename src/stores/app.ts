// Utilities
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
  const nowFoods: Ref<[FoodData, number][]> = ref([]);

  return {
    nowFoods,
  };
}, {
  persist: true,
});

export const foods = [
  buildFood("鱼豆腐", 1),
  buildFood("甜不辣", 1),
  buildFood("大头菜", 1),
  buildFood("蘑菇", 1),
  buildFood("五花", 2),
  buildFood("鸡心", 2),
  buildFood("土豆片", 1),
  buildFood("鸡肉丸", 1),
  buildFood("豆肠", 1),
  buildFood("鱼卷", 1),
  buildFood("鸡肝", 2),
  buildFood("豆排", 2),
  buildFood("风火轮", 2),
  buildFood("瘦肉", 2),
  buildFood("鸡胗", 2),
  buildFood("骨肉相连", 2),
  buildFood("板筋", 2),
  buildFood("鸡皮", 2),
  buildFood("素鸡", 2),
  buildFood("年糕", 2),
  buildFood("鱼饼", 2),
  buildFood("星星串", 2),
  buildFood("培根金针菇", 2),
  buildFood("鸡柳", 2),
  buildFood("菜卷", 2),
  buildFood("千叶豆腐", 2),
  buildFood("羊肉串", 3),
  buildFood("脆骨肠", 3),
  buildFood("脆骨", 3),
  buildFood("大烤肠", 3),
  buildFood("小烤肠", 1),
  buildFood("实蛋", 3),
  buildFood("臭豆腐", 3),
  buildFood("火烧", 3),
  buildFood("油豆皮", 5),
  buildFood("猪腰子", 6),
  buildFood("马步鱼", 6),
  buildFood("腊肠小串", 7, 1, "把"),
  buildFood("大鱿鱼", 10, 1, "串"),
  buildFood("鸭肠", 10, 1, "把"),
  buildFood("牛肉小串", 10, 1, "把"),
  buildFood("小面筋", 5, 4, "串"),
  buildFood("大面筋", 10, 4, "串"),
  buildFood("剁椒面筋", 10, 1, "份"),
];

export interface FoodData {
  name: string,
  unitPrice: number,
  unitNumber: number,
  unitName: string,
}

function buildFood(
  name: string,
  unitPrice: number,
  unitNumber?: number,
  unitName?: string,
): FoodData {
  return {
    name,
    unitPrice,
    unitNumber: unitNumber ?? 1,
    unitName: unitName ?? "个",
  };
}
