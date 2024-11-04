import { model } from "@medusajs/framework/utils"

const VendorAdmin = model.define('vendor-admin', {
    id: model.id().primaryKey(),
    first_name: model.text().nullable(),
    last_name: model.text().nullable(),
    email: model.text().unique(),
} )

export default VendorAdmin