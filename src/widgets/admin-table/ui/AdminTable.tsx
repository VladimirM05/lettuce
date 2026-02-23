import { AdminTableHeader } from '@/widgets/admin-table/ui/AdminTableHeader'
import { AdminTableBody } from '@/widgets/admin-table/ui/AdminTableBody'
import { AdminTableControls } from '@/widgets/admin-table/ui/AdminTableControls'

export const AdminTable = () => {
  return (
    <div>
      <AdminTableControls />
      <table>
        <AdminTableHeader />
        <AdminTableBody />
      </table>
    </div>
  )
}
