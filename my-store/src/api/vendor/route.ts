import type { 
    AuthenticatedMedusaRequest,
    MedusaResponse,
  } from "@medusajs/framework/http"
  import { MedusaError } from "@medusajs/framework/utils"
  import {createVendorWorkflow} from "src/workflows/create-vendor"
type RequestBody = {
    
    contact_info: string;
    business_name: string;
    tax_details: string;
} 
export async function POST(
    req: AuthenticatedMedusaRequest<RequestBody>, 
    res: MedusaResponse
  ){
  
    // If `actor_id` is present, the request carries 
  
    // authentication for an existing manager
  if (req.auth_context.actor_id) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "Request already authenticated as a manager."
    )
  }
  const { result } = await createVendorWorkflow(req.scope)
    .run({
      input: {
        vendor: req.body,
        authIdentityId: req.auth_context.auth_identity_id,
      },
    })
    res.status(200).json({ vendor: result })
}