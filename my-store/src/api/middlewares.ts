import { 
    defineMiddlewares,
    authenticate,
} from "@medusajs/medusa"
  
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
    ],
})