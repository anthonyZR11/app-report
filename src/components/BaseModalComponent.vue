<script setup lang="ts">
import { ref, computed, type PropType } from 'vue'
import ButtonComponent from './ButtonComponent.vue'

const props = defineProps({ 
  modelValue: Boolean,
  errors: Object as PropType<Record<string, string[] | null>>,
})
const emit = defineEmits(['update:modelValue', 'generateReport'])
const title = ref('')
const startDate = ref('')
const endDate = ref('')

const formReady = computed(
  () => 
  title.value.trim() !== ''&&
  startDate.value !== ''&&
  endDate.value !== ''
)

const generateReport = () => {
  if (!formReady.value) return

  emit('generateReport', {
    title: title.value.trim(),
    startDate: startDate.value,
    endDate: endDate.value,
  })

}

function close() {
  emit('update:modelValue', false)

  title.value = ''
  startDate.value = ''
  endDate.value = ''
}
</script>

<template>
  <Teleport to="body">
    <div v-if="props.modelValue" class="backdrop" @click.self="close">
      <div class="modal">
        <div class="modal__header">
          <div class="modal__header__title">
            <h2>Reporte por fecha de nacimiento</h2>
          </div>
          <button class="modal__close" @click="close">X</button>
          <p>Ingresa los siguientes datos para generar tu reporte</p>
        </div>
        <div class="modal__body">
          <fieldset class="field">
            <legend>Descripción del reporte *</legend>
            <input v-model="title" class="control" type="text" />
          </fieldset>
          <div class="content__Date">
            <fieldset class="field">
              <legend>Fecha de inicio *</legend>
              <input v-model="startDate" class="control" type="date" />
            </fieldset>
            <fieldset class="field">
              <legend>Fecha de fin *</legend>
              <input v-model="endDate" class="control" type="date" />
            </fieldset>
          </div>
            <div v-if="props.errors?.title?.length" class="error">
              * {{ props.errors.title[0] }}
            </div>
            <div v-if="props.errors?.start_date?.length" class="error">
              * {{ props.errors.start_date[0] }}
            </div>
            <div v-if="props.errors?.end_date?.length" class="error">
              * {{ props.errors.end_date[0] }}
            </div>
          <div class="content__button">
            <ButtonComponent
              label="Generar reporte"
              :disabled="!formReady"
              @click="generateReport"
            />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="sass">

$border: #d6d6d6
$text: #2b2b2b
$muted: #7a7a7a
$bg: #fff

.backdrop
  position: fixed
  inset: 0
  background: rgba(0,0,0,.45)
  display: grid
  place-items: center

.modal
  width: min(500px, 92vw)
  background: #fff
  border-radius: 12px
  padding: 1.5rem
  font-family: ArgentumSansRegular, sans-serif

.modal__header
  display: flex
  flex-direction: column
  justify-content: space-between
  align-items: center
  gap: 12px
  position: relative
  padding-bottom: 1.5rem

.modal__header__title
  position: relative

.modal__header h2
  font-weight: 800
  font-size: 1.5rem

.modal__header p
  margin: 0
  color: $gray-color-medium
  font-size: 1rem
  font-weight: 400
  font-family: ArgentumSansLight, sans-serif

.modal__close
  border: 0
  background: transparent
  cursor: pointer
  font-size: 1rem
  font-weight: bold
  position: absolute
  top: -.5rem
  right: -.5rem

.field
  border: 1px solid $border
  border-radius: 10px
  padding: 8px
  background: $bg
  margin-bottom: 16px
  width: 100%

  legend
    padding: 0 8px
    color: $muted
    font-size: 13px

.control
  width: 100%
  box-sizing: border-box
  border: none
  border-radius: 10px
  padding: 6px
  font-size: 14px
  color: $text
  outline: none

.control:focus
  border-color: #6aa9ff

.content__Date
  display: flex
  gap: 1rem
  justify-content: space-between
  width: 100%

.content__button
  text-align: center

.error
  color: #e74c3c
  font-size: 0.7rem
  margin-bottom: .5rem

</style>
