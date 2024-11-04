import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { 
  ContainerRegistrationKeys,
} from "@medusajs/framework/utils"
import MarketplaceModuleService from "../../../modules/marketplace/service"
import { MARKETPLACE_MODULE } from "../../../modules/marketplace"

export const GET = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  const marketplaceModuleService: MarketplaceModuleService = req.scope.resolve(MARKETPLACE_MODULE)
  const vendorDB = await marketplaceModuleService.retrieveVendor(
    req.auth_context.actor_id,
  )

  const { data: [vendor] } = await query.graph({
    entity: "vendor",
    fields: ["products.*"],
    filters: {
      id: vendorDB.id,
    },
  })

  res.json({
    products: vendor.products,
  })

}