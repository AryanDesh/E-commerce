import {
    createStep,
    StepResponse,
} from "@medusajs/framework/workflows-sdk"
 
import { CreateVendorWorkflowInput } from ".."
import MarketplaceModuleService from "src/modules/marketplace/service"
import { MARKETPLACE_MODULE } from "src/modules/marketplace"
const createVendorStep = createStep(
    "create-vendor-step",
    async ({ 
      vendor: vendorData,  
    }: Pick<CreateVendorWorkflowInput, "vendor">, 
    { container }) => {
      const marketplaceModuleService: MarketplaceModuleService = 
        container.resolve(MARKETPLACE_MODULE)
      const vendor = await marketplaceModuleService.createVendors(
        vendorData
      )
      return new StepResponse(
        vendor
      )  
    },
  
    async (vendor, { container }) => {
      const marketplaceModuleService: MarketplaceModuleService = 
        container.resolve(MARKETPLACE_MODULE)
      marketplaceModuleService.deleteVendors(vendor.id)
    }
)
export default createVendorStep