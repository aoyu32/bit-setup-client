<template>
  <div class="ao-table">
    <div class="table-container">
      <table class="table-main">
        <thead>
          <tr>
            <th v-for="column in columns" :key="column.key">
              {{ column.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in data" :key="rowIndex">
            <td v-for="column in columns" :key="column.key">
              {{ row[column.key] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  columns: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every(col => col.key && col.title)
    }
  },
  data: {
    type: Array,
    required: true
  }
})


</script>

<style scoped lang="scss">
.ao-table {
  @include wh;

  .table-container {
    @include wh;

  }

  .table-main {
    @include wh;
    border-collapse: collapse;
  }

  .table-main th{
    @include c-t{
      background-color: color(c-g1);
      color: color(c-g10,0.7);
    }
  }

  .table-main td{
    @include c-t{
      color: color(c-g10,0.5);
    }
  }

  .table-main th,
  .table-main td {
    padding: 0.75rem;
    text-align: center;
    font-size: 14px;
  }


  .table-main tr {
    border-spacing: 0px;
  }

  .table-main tr:nth-child(even) {

    @include c-t {
      background-color: color(c-g0);
    }
  }

}
</style>