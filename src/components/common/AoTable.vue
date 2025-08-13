<template>
  <div class="simple-table-container">
    <table class="simple-table">
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
</template>

<script>
export default {
  name: 'SimpleTable',
  props: {
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
  }
}
</script>

<style scoped>
.simple-table-container {
  overflow-x: auto;
}

.simple-table {
  width: 100%;
  border-collapse: collapse;
  /* margin: 1rem 0; */
}

.simple-table th,
.simple-table td {
  padding: 0.75rem;
  text-align: left;
  border: 1px solid #ddd;
}

.simple-table th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.simple-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.simple-table tr:hover {
  background-color: #f1f1f1;
}
</style>