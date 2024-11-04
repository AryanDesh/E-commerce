import type { 
    AuthenticatedMedusaRequest,
    MedusaResponse,
  } from "@medusajs/framework/http"
  import { MedusaError } from "@medusajs/framework/utils"
  import {createVendorAdminWorkflow} from "src/workflows/create-vendor-admin"
type RequestBody = {
    first_name: string
    last_name: string  
    email: string
  
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
      "Request already authenticated as an admin."
    )
  }
  const { result } = await createVendorAdminWorkflow(req.scope)
    .run({
      input: {
        admin: req.body,
        authIdentityId: req.auth_context.auth_identity_id,
      },
    })
    res.status(200).json({ admin: result })
}