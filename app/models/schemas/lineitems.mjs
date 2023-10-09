//prettier-ignore

export const LineItem = {
    "id": "LineItem",
    "type": "object",
    "properties": {
        "key": {
            "type": "string"
          },
        "created_at": {
            "type": "string"
        },
        "updated_at": {
            "type": "string"
        },
        "description": {
            "type": "string"
        },
        "quantity": {
            "type": "number"
        },
        "unit_price": {
            "type": "number"
        },
        "invoice_id": {
            "type": "string"
        },
    }
}

// model LineItem {
//     id    String @id @default(cuid())
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt

//     description String
//     quantity Int
//     unitPrice Float

//     invoiceId String
//     invoice Invoice @relation(fields: [invoiceId], references: [id], onDelete: Cascade, onUpdate: Cascade)
//   }
