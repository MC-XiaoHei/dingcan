<template>
  <div class="w-full h-full py-8 px-4 flex flex-col justify-center items-center">
    <div class="text-h6 font-bold text-center">
      订餐小工具
    </div>
    <v-table class="mt-4 w-full rounded text-center">
      <thead>
        <tr>
          <th class="text-center min-w-30">
            名称
          </th>
          <th class="text-center min-w-24">
            单价
          </th>
          <th class="text-center min-w-24">
            数量
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(food, index) in store.nowFoods"
          :key="index"
        >
          <td>{{ food[0].name }}</td>
          <td>{{ getFoodPrice(food[0]) }}</td>
          <td>
            <v-btn
              flat
              append-icon="mdi-pencil"
            >
              {{ food[1] }} {{ food[0].unitName }}
              <v-dialog activator="parent">
                <template #default="{ isActive }">
                  <div>
                    <v-confirm-edit
                      v-model="food[1]"
                      cancel-text="取消"
                      ok-text="确定"
                      @save="isActive.value = false"
                    >
                      <template #default="{ model: proxyModel, actions }">
                        <v-card
                          class="mx-auto"
                          max-width="320"
                          :title="`修改 ${food[0].name} 的数量`"
                        >
                          <template #text>
                            <v-input class="mt-2">
                              <template #prepend>
                                <v-btn
                                  flat
                                  variant="tonal"
                                  icon="mdi-minus"
                                  class="mb--2"
                                  @click="proxyModel.value = Math.max(0, proxyModel.value - 1)"
                                />
                              </template>
                              <template #default>
                                <v-text-field
                                  v-model="proxyModel.value"
                                  label="数量"
                                  type="number"
                                  :rules="[
                                    value => !!value || '必须输入一个数量！',
                                  ]"
                                  class="mb--8"
                                  :suffix="food[0].unitName"
                                />
                              </template>
                              <template #append>
                                <v-btn
                                  flat
                                  variant="tonal"
                                  class="mb--2"
                                  icon="mdi-plus"
                                  @click="proxyModel.value += 1"
                                />
                              </template>
                            </v-input>
                          </template>

                          <template #actions>
                            <v-spacer />

                            <v-btn
                              color="red"
                              text="删除此项"
                              @click="() => {
                                store.nowFoods.splice(index, 1);
                                isActive.value = false;
                              }"
                            />
                            <v-btn
                              class="mr--18"
                              text="取消"
                              @click="isActive.value = false"
                            />
                            <component :is="actions" />
                          </template>
                        </v-card>
                      </template>
                    </v-confirm-edit>
                  </div>
                </template>
              </v-dialog>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
    <div class="flex gap-2 mt-4 w-full">
      <v-btn class="flex-1">
        添加项目
        <v-dialog activator="parent">
          <template #default="{ isActive }">
            <v-card class="px-6">
              <v-card-title class="ml--2 pt-4">
                添加项目
              </v-card-title>
              <v-select
                v-model="formFood"
                autofocus
                :items="foods.map(food => food.name)"
                item-text="name"
                item-value="data"
                label="名称"
                :rules="[ value => !!value || '必须选择一个！' ]"
              />

              <v-input class="mt-2">
                <template #prepend>
                  <v-btn
                    flat
                    variant="tonal"
                    icon="mdi-minus"
                    class="mb--2"
                    @click="formFoodNumber = Math.max(0, formFoodNumber - 1)"
                  />
                </template>
                <template #default>
                  <v-text-field
                    v-model="formFoodNumber"
                    label="数量"
                    type="number"
                    :rules="[
                      value => !!value || '必须输入一个数量！',
                    ]"
                    class="mb--8"
                    :suffix="formFood ? foods.find(food => food.name === formFood)?.unitName : ''"
                  />
                </template>
                <template #append>
                  <v-btn
                    flat
                    variant="tonal"
                    class="mb--2"
                    icon="mdi-plus"
                    @click="formFoodNumber += 1"
                  />
                </template>
              </v-input>

              <v-card-actions class="mt-2">
                <v-spacer />
                <v-btn @click="clear()">
                  清空
                </v-btn>
                <v-btn @click="isActive.value = false">
                  取消
                </v-btn>
                <v-btn
                  @click="() => {
                    if (submit()){
                      isActive.value = false;
                    }
                  }"
                >
                  确定
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-btn>
      <v-btn
        class="flex-1"
        text="复制信息"
        @click="copyInfo()"
      />
      <v-btn
        class="flex-1"
        text="重置菜单"
        @click="store.nowFoods = []"
      />
    </div>
    <v-snackbar
      v-model="snackbar"
      timeout="2000"
      color="success"
    >
      复制成功！
    </v-snackbar>
    <v-spacer />
  </div>
</template>

<script lang="ts" setup>
import { type FoodData, foods, useAppStore } from "@/stores/app";

const store = useAppStore();
const formFood = ref<string | null>(null);
const formFoodNumber = ref(0);
const snackbar = ref(false);

function getFoodPrice(food: FoodData): string {
  return `${ food.unitPrice }元/${ food.unitNumber }${ food.unitName }`;
}

function clear() {
  formFood.value = null;
  formFoodNumber.value = 0;
}

function submit(): boolean {
  if (formFood.value && formFoodNumber.value > 0) {
    store.nowFoods.push([foods.find(food => food.name === formFood.value)!, formFoodNumber.value]);
    clear();
    return true;
  }
  return false;
}

function padString(str: string, length: number, padChar: string): string {
  if (str.length >= length) {
    return str;
  }
  const padding = padChar.repeat(length - str.length);
  return str + padding;
}

function copyInfo() {
  let result = "";
  store.nowFoods.forEach(food => {
    result += `${ padString(food[0].name + " ", 7, "—") } ${ food[1] }${ food[0].unitName }\n`;
  });
  result += `\n总计：${ store.nowFoods.reduce((acc, cur) => acc + cur[0].unitPrice * cur[1], 0) }元`;
  navigator.clipboard.writeText(result);
  snackbar.value = true;
}
</script>
