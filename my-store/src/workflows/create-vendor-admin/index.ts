import { 
    createWorkflow,
    WorkflowResponse,
  } from "@medusajs/framework/workflows-sdk"
import { 
setAuthAppMetadataStep,
} from "@medusajs/medusa/core-flows"
import createVendorAdminStep from "./steps/create-vendor-admin"
export type CreateVendorAdminWorkflowInput = {
    admin: {
        email: string
        first_name?: string
        last_name?: string
    }
    authIdentityId: string
}
export const createVendorAdminWorkflow = createWorkflow(
    "create-vendor-admin",
    function (input: CreateVendorAdminWorkflowInput) {
      const vendorAdmin = createVendorAdminStep({  
        admin: input.admin,
      })
      setAuthAppMetadataStep({
        authIdentityId: input.authIdentityId,
        actorType: "vendorAdmin",
        value: vendorAdmin.id,
      })
      return new WorkflowResponse(vendorAdmin)
    }
) 
