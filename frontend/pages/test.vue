<template>
  <div class="p-4 bg-gray-900 text-white rounded">
    <table class="w-full border-collapse border border-gray-700">
      <thead>
        <tr class="bg-gray-800">
          <th class="border border-gray-700 p-2">#</th>
          <th class="border border-gray-700 p-2">Item</th>
          <th class="border border-gray-700 p-2">Unit Price</th>
          <th class="border border-gray-700 p-2">Quantity</th>
          <th class="border border-gray-700 p-2">Tax (%)</th>
          <th class="border border-gray-700 p-2">Subtotal</th>
          <th class="border border-gray-700 p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index" class="bg-gray-800">
          <td class="border border-gray-700 p-2 text-center">{{ index + 1 }}</td>
          <td class="border border-gray-700 p-2">
            <select v-model="item.name" class="w-full bg-gray-700 text-white p-1 rounded">
              <option value="Soft skills">Soft skills</option>
              <option value="jkbh">jkbh</option>
              <option value="Other">Other</option>
            </select>
          </td>
          <td class="border border-gray-700 p-2 text-center">dzd {{ item.unitPrice }}</td>
          <td class="border border-gray-700 p-2 text-center">
            <input type="number" v-model.number="item.quantity" min="1" class="w-16 bg-gray-700 text-white p-1 rounded" />
          </td>
          <td class="border border-gray-700 p-2 text-center">
            <input type="number" v-model.number="item.tax" min="0" class="w-16 bg-gray-700 text-white p-1 rounded" />
          </td>
          <td class="border border-gray-700 p-2 text-center">dzd {{ calculateSubtotal(item) }}</td>
          <td class="border border-gray-700 p-2 text-center">
            <button @click="removeItem(index)" class="text-red-500 hover:underline">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="mt-4 flex justify-between items-center">
      <button @click="addItem" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
        + Add new
      </button>
      <div class="text-lg">Subtotal: <span class="font-bold">dzd {{ calculateTotal() }}</span></div>
    </div>

    <div class="mt-4">
      <button class="bg-teal-500 hover:bg-teal-600 text-white py-2 px-6 rounded">Continue</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const items = ref([
      { name: "Soft skills", unitPrice: 1000, quantity: 2, tax: 0 },
      { name: "jkbh", unitPrice: 1000, quantity: 1, tax: 0 },
    ]);

    const addItem = () => {
      items.value.push({ name: "", unitPrice: 1000, quantity: 1, tax: 0 });
    };

    const removeItem = (index) => {
      items.value.splice(index, 1);
    };

    const calculateSubtotal = (item) => {
      return (item.unitPrice * item.quantity * (1 + item.tax / 100)).toFixed(2);
    };

    const calculateTotal = () => {
      return items.value
        .reduce((total, item) => total + parseFloat(calculateSubtotal(item)), 0)
        .toFixed(2);
    };

    return {
      items,
      addItem,
      removeItem,
      calculateSubtotal,
      calculateTotal,
    };
  },
};
</script>

<style scoped>
th {
  text-align: left;
}
</style>
