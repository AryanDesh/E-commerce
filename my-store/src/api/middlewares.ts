import { validateAndTransformBody } from "@medusajs/framework"
import { 
    defineMiddlewares,
    authenticate,
} from "@medusajs/medusa"

import { 
    AdminCreateProduct,
} from "@medusajs/medusa/api/admin/products/validators"
  
export default defineMiddlewares({  
    routes: [
        {
            matcher: "/vendor",
            method: "POST",
            middlewares: [
                authenticate("vendor", ["session", "bearer"], {
                allowUnregistered: true,
                }),
            ],
        },
        {
            matcher: "/vendor/me*",
            middlewares: [
                authenticate("vendor", ["session", "bearer"]),
            ],
        },
        {
            matcher: "/vendorAdmin",
            method: "POST",
            middlewares: [
                authenticate("vendorAdmin", ["session", "bearer"], {
                allowUnregistered: true,
                }),
            ],
        },
        {
            matcher: "/vendorAdmin/me*",
            middlewares: [
                authenticate("vendorAdmin", ["session", "bearer"]),
            ],
        },
        {
            matcher: "/vendorAdmin/verifyVendor",
            middlewares: [
                authenticate("vendorAdmin", ["session", "bearer"]),
            ],
        },
        {
            matcher: "/vendors/products",
            method: "POST",
            middlewares: [
                authenticate("vendor", ["session", "bearer"]),
                validateAndTransformBody(AdminCreateProduct),
            ],
        }
    ],
})