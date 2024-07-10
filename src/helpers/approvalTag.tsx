import { Tag } from '@blueprintjs/core'

export const ApprovalTagMap: React.FC<{ approvals: string[] }> = ({
  approvals,
}) => {
  const splitApproval = (approval: string) => {
    const [approver, approvalType] = approval.split(':')
    return { approver, approvalType }
  }
  const noApprovals = approvals.every(approval => {
    const { approvalType } = splitApproval(approval)
    return !approvalType
  })
  if (noApprovals) {
    return null
  }

  return (
    <>
      {approvals.map((approval, i) => (
        <Tag key={i}>{approval}</Tag>
      ))}
    </>
  )
}
