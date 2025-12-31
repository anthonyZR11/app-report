import api from '@/lib/api'

export const reportService = {
  getAll(params: { page?: number } = {}) {
    return api.get('/api/list-reports', { params })
  },
  download(id: number) {
    return api.get(`/api/get-report/${id}`, {
      responseType: 'blob',
    })
  },
  createReport({
    title,
    startDate,
    endDate,
  }: {
    title: string
    startDate: string
    endDate: string
  }) {
    return api.post(`/api/generate-report`, {
      title,
      start_date: startDate,
      end_date: endDate,
    })
  },
}
