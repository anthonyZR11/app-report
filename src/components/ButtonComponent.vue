<script setup lang="ts">
import type { ButtonHTMLAttributes, PropType } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  disabled: { type: Boolean, default: false },
  type: {
    type: String as PropType<ButtonHTMLAttributes['type']>,
    default: 'button',
  },
})

const emit = defineEmits(['click'])

function onClick() {
  if (props.disabled) return
  emit('click')
}
</script>

<template>
  <button class="btn-report__create" :type="props.type" :disabled="props.disabled" @click="onClick">
    {{ props.label }}
  </button>
</template>

<style lang="sass" scoped>
@use "sass:color"

.btn-report__create
  background-color: $orange-color
  color: #181818
  border: none
  padding: .75rem 2.5rem
  margin-bottom: 2rem
  border-radius: 3rem
  cursor: pointer
  font-size: 1rem
  transition: background-color 0.3s ease
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)

.btn-report__create:hover
  background-color: color.adjust($orange-color, $lightness: -5%)

.btn-report__create:disabled
  background-color: $gray-color
  cursor: not-allowed
</style>
