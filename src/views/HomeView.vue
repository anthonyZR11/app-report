<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reportService } from '@/services/reportService'
import FooterComponent from '@/components/FooterComponent.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import downloadIcon from '../assets/icons/download-icon.svg'
import ButtonComponent from '@/components/ButtonComponent.vue'
import BaseModalComponent from '@/components/BaseModalComponent.vue'

interface ReportDto {
  id: number
  title: string
  created_at: string
  report_link: string | null
}

interface PaginationMeta {
  current_page: number
  last_page: number
  total: number
}

interface PaginationLinks {
  next: string | null
  prev: string | null
}

interface PaginatedResponse<T> {
  data: T[]
  meta: PaginationMeta
  links: PaginationLinks
}

const open = ref(false)
const reports = ref<ReportDto[]>([])
const pagination = ref<PaginatedResponse<ReportDto> | null>(null)
const loading = ref(false)
const reportErrors = ref<Record<string, string[] | null>>({})

const openModal = () => {
  open.value = true
  reportErrors.value = {}
}

const loadReports = async (pageNumber = 1) => {
  loading.value = true
  try {
    const { data } = await reportService.getAll({ page: pageNumber })
    reports.value = data.data
    pagination.value = data
  } catch (error: unknown) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const generateReport = async ({
  title,
  startDate,
  endDate,
}: {
  title: string
  startDate: string
  endDate: string
}) => {
  try {
    reportErrors.value = {}
    await reportService.createReport({ title, startDate, endDate })
    await loadReports()
    open.value = false
  } catch (error: any) {
    if (error.status === 422) {
      reportErrors.value = error.response.data.errors ?? {}
    }
  }
}

const downloadReport = async (reportId: number) => {
  try {
    const response = await reportService.download(reportId)
    const blob = response.data as Blob

    const filename = `reporte-${reportId}.xlsx`

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  } catch (error: unknown) {
    console.error(error)
  }
}

onMounted(loadReports)
</script>

<template>
  <HeaderComponent />
  <main>
    <h1>Generador de reportes TK</h1>
    <table>
      <thead>
        <tr>
          <th>Titulo</th>
          <th>Fecha de creación</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="report in reports" :key="report.id">
          <td>{{ report.title }}</td>
          <td>{{ report.created_at }}</td>
          <td>
            <a v-if="report.report_link" @click="downloadReport(report.id)" class="btn-download">
              Descargar
              <img :src="downloadIcon" alt="Descargar" class="btn-download__icon" />
            </a>
            <span v-else>Procesando...</span>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination-container" v-if="pagination">
      <button
        @click="loadReports(pagination.meta.current_page - 1)"
        :disabled="!pagination.links.prev || loading"
        class="btn btn-prev"
      >
        ← Anterior
      </button>

      <span class="page-info">
        Página {{ pagination.meta.current_page }} de {{ pagination.meta.last_page }} ({{
          pagination.meta.total
        }}
        total)
      </span>

      <button
        @click="loadReports(pagination.meta.current_page + 1)"
        :disabled="!pagination.links.next || loading"
        class="btn btn-next"
      >
        Siguiente →
      </button>
    </div>

    <div class="content-button">
      <ButtonComponent
        label="Crear reporte"
        @click="openModal" />
    </div>
    <BaseModalComponent
      :errors="reportErrors"  
      v-model="open"
      @generateReport="generateReport" />
  </main>
  <FooterComponent />
</template>

<style lang="sass" scoped>
h1
  text-align: center
  font-family: ArgentumSansRegular, sans-serif
  font-size: 28px
  margin: 3rem 0 3rem 0
  font-weight: normal

table
  background-color: $secondary-color
  width: 70%
  margin: 20px auto
  border-radius: 10px
  border-collapse: collapse
  color: white
  font-family: ArgentumSansRegular, sans-serif
  font-weight: normal

thead tr
  position: relative
  font-size: 1rem

thead tr::after
  content: ''
  position: absolute
  bottom: 0
  left: 1.8rem
  right: 1.8rem
  border-bottom: 4px solid $gray-color

tbody tr
  position: relative
  font-size: .75rem

tbody tr:not(:last-child)::after
  content: ''
  position: absolute
  bottom: 0
  left: 1.8rem
  right: 1.8rem
  border-bottom: 1px solid $gray-color

tbody tr:last-child td
  padding-bottom: 2.5rem

td:not(:last-child)::after
  content: ''
  position: absolute
  right: 0
  top: .7rem
  bottom: .7rem
  border-right: 4px solid $gray-color


tbody tr:last-child td:not(:last-child)::after
  top: .7rem
  bottom: 2.5rem

th:first-child,
td:first-child
  text-align: left

th:not(:first-child):not(:last-child),
td:not(:first-child):not(:last-child)
  text-align: center

th:last-child,
td:last-child
  text-align: right

th,
td
  font-weight: normal

th
  padding: 10px 30px

td
  padding: 10px 30px
  position: relative

.btn-download
  display: inline-flex
  align-items: center
  text-decoration: none;
  padding: 6px 0;
  gap: 6px;
  font-family: ArgentumSansSemiBold, sans-serif
  color: white
  cursor: pointer

.btn-download__icon
  width: 14px
  height: 14px
  display: block

.content-button
  margin-top: 2rem
  text-align: center

.pagination-container
  display: flex
  justify-content: center
  align-items: center
  gap: 1rem
  margin-top: 1rem
  padding: 1rem


.page-info
  font-weight: 500
  color: #666


.btn
  padding: 0.5rem 1rem
  border: 1px solid $primary-color
  background: white
  border-radius: 6px
  cursor: pointer


.btn:disabled
  opacity: 0.5
  cursor: not-allowed
  border: 1px solid $gray-color
</style>
