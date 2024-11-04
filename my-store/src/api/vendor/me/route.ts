import { 
    AuthenticatedMedusaRequest,
    MedusaResponse,
} from "@medusajs/framework/http"
import MarketplaceModuleService from "../../../modules/marketplace/service"
export async function GET(
    req: AuthenticatedMedusaRequest,
    res: MedusaResponse
): Promise<void> {
    const marketplaceModuleService: MarketplaceModuleService = req.scope.resolve("marketplaceModuleService")
    const vendor = await marketplaceModuleService.retrieveVendor(
      req.auth_context.actor_id
    )
    res.json({ vendor })
}