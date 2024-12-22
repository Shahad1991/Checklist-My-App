<template>
  <v-container :style="{ width: '100%' }">
    <v-list-item
      v-for="item in checklistItems"
      :key="item.id"
      @click="selectItem(item)"
      :class="{ 'selected': localSelectedItems.includes(item), 'disabled': localSelectedItems.length && !localSelectedItems.includes(item) }"
      :style="itemStyle(item)"
      class="checklist-card"
    >
      <v-checkbox
        v-model="localSelectedItems"
        :value="item"
        :label="item.name"
        class="checkbox-style"
        @click.stop
      />
    </v-list-item>
  </v-container>
</template>

<script>
export default {
  props: {
    checklistItems: {
      type: Array,
      required: true,
    },
    selectedItems: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      localSelectedItems: [...this.selectedItems], // Copy selectedItems
    };
  },
  watch: {
    selectedItems: {
      handler(newVal) {
        this.localSelectedItems = [...newVal]; // Update local copy
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    selectItem(item) {
      if (this.localSelectedItems.includes(item)) {
        this.localSelectedItems = this.localSelectedItems.filter(i => i !== item);
      } else {
        this.localSelectedItems.push(item);
      }
      this.updateSelectedItems();
    },
    updateSelectedItems() {
      // Emit updated selected items to parent
      this.$emit('update:selectedItems', this.localSelectedItems);
    },
    itemStyle(item) {
      return this.localSelectedItems.includes(item)
        ? { backgroundColor: '#4caf50' }
        : { backgroundColor: '#000' };
    },
  },
};
</script>

<style scoped>
.checklist-card {
  margin: 12px 0;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: auto;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  text-align: left;
  width: 100%;
  box-sizing: border-box;
  border-radius: 8px;
  background-color: #fff; /* Baggrundsfarve for kortet */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Skygge hele tiden for klikbar effekt */
}

.checklist-card:active {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4); /* Mørkere skygge ved tryk */
}

.checklist-card.selected {
  background-color: #4caf50; /* Grøn baggrund når valgt */
  color: white;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4); /* Mørkere skygge ved valgt tilstand */
}

.checkbox-style {
  margin-right: 16px; /* Afstand mellem checkbox og tekst */
}

/* Juster eventuelle tekststørrelser eller stil her */
.v-list {
  padding: 20px;
}
</style>
