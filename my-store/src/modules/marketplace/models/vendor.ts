// src/models/vendor.ts
import { model } from "@medusajs/framework/utils"
// import Product from "./product"

const Vendor = model.define('vendor', {
    id: model.id().primaryKey(),
    business_name: model.text(),
    contact_info: model.text(),
    tax_details: model.text().nullable(),
    is_approved: model.boolean().default(false),
    // created_at: model.dateTime().default(new Date()),
    // updated_at: model.dateTime().default(new Date()),
    // products :  model.hasMany(() => Product),
})

export default Vendor
