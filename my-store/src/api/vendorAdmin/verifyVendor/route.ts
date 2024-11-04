import type { 
    AuthenticatedMedusaRequest,
    MedusaResponse,
  } from "@medusajs/framework/http"
  import { MedusaError } from "@medusajs/framework/utils"
  import { MARKETPLACE_MODULE } from "src/modules/marketplace"
  import MarketplaceModuleService from "src/modules/marketplace/service"
  
  type RequestBody = {
    business_name: string;
  }
  
  export async function POST(
    req: AuthenticatedMedusaRequest<RequestBody>, 
    res: MedusaResponse
  ) {
    try {
      const marketplaceModuleService: MarketplaceModuleService = req.scope.resolve(MARKETPLACE_MODULE)
      
      // Attempt to update the vendor with is_approved set to true
      const vendor = await marketplaceModuleService.updateVendors(
        req.body.business_name,
        {
          is_approved: true
        }
      )
  
      // Respond with the updated vendor information
      return res.status(200).json({ vendor })
    } catch (error) {
      // Handle any errors that might occur during vendor update
      if (error instanceof MedusaError) {
        return res.status(400).json({ message: error.message })
      }
      return res.status(500).json({ message: "Internal server error" })
    }
  }
  