<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="6"
        lg="4"
        v-for="item in checklistItems"
        :key="item.id"
      >
        <v-list-item
          @click="selectItem(item)"
          :class="{
            'selected': localSelectedItems.includes(item),
            'disabled': localSelectedItems.length && !localSelectedItems.includes(item),
          }"
          class="checklist-card"
        >
          <div class="checklist-content">
            <v-icon class="checkbox-icon">
              {{ localSelectedItems.includes(item) ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline' }}
            </v-icon>
            <span class="item-text">{{ item.name }}</span>
          </div>
        </v-list-item>
      </v-col>
    </v-row>
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
      localSelectedItems: [...this.selectedItems], // Kopierer selectedItems
    };
  },
  watch: {
    selectedItems: {
      handler(newVal) {
        this.localSelectedItems = [...newVal]; // Opdaterer lokal kopi
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    selectItem(item) {
      if (this.localSelectedItems.includes(item)) {
        this.localSelectedItems = this.localSelectedItems.filter((i) => i !== item);
      } else {
        this.localSelectedItems.push(item);
      }
      this.updateSelectedItems();
    },
    updateSelectedItems() {
      // Udsender opdaterede valgte elementer til forælderen
      this.$emit('update:selectedItems', this.localSelectedItems);
    },
  },
};
</script>

<style scoped>
.v-container {
  max-width: 100%;
  margin-bottom: 30px;
}

.v-row {
  display: flex;
  flex-wrap: wrap;
}

.v-col {
  display: flex;
}

.checklist-card {
  display: flex;
  align-items: center;
  padding: 12px;
  transition: background-color 0.3s ease;
  width: 100%;

}

.checklist-card.selected {
  background-color: #4caf50;
  color: white;
}

.checklist-content {
  display: flex;
  align-items: center;
  width: 100%;
}

.checkbox-icon {
  margin-right: 10px;
  font-size: 24px;
}

.item-text {
  font-size: 1rem;
}
</style>
