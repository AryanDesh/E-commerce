
import { 
    createWorkflow,
    WorkflowResponse,
  } from "@medusajs/framework/workflows-sdk"
import { 
setAuthAppMetadataStep,
} from "@medusajs/medusa/core-flows"
import createVendorStep from "./steps/create-vendor"

export type CreateVendorWorkflowInput = {
    vendor: {
        contact_info: string
        business_name : string
        tax_details: string
    }
    authIdentityId: string
}  
export const createVendorWorkflow = createWorkflow(
    "create-vendor", 
    function ( input : CreateVendorWorkflowInput ) {
        const vendor = createVendorStep({
            vendor : input.vendor,
        })
        setAuthAppMetadataStep({
            authIdentityId: input.authIdentityId,
            actorType: "vendor",
            value: vendor.id,
        })
    return new WorkflowResponse(vendor)
    }
)
