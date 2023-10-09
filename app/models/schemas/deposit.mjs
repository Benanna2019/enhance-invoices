// prettier-ignore

export const Deposit = {
    "id": "Deposit",
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
        "amount": {
            "type": "number"
        },
        "deposit_date": {
            "type": "string"
        },
        "note": {
            "type": "string"
        },
        "invoice_id": {
            "type": "string"
        },
    }
}

// model Deposit {
//     id    String @id @default(cuid())
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt

//     amount Float
//     depositDate DateTime @default(now())
//     note String

//     invoiceId String
//     invoice Invoice @relation(fields: [invoiceId], references: [id], onDelete: Cascade, onUpdate: Cascade)
//   }
