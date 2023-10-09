//prettier-ignore
export const Invoice = {
    "id": "Invoice",
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
        "number": {
            "type": "number"
        },
        "invoice_date": {
            "type": "string"
        },
        "due_date": {
            "type": "string"
        },
        "customer_id": {
            "type": "string" 
        },
    }
}

// model Invoice {
//     id    String @id @default(cuid())
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt

//     number Int
//     invoiceDate DateTime @default(now())
//     dueDate DateTime

//     deposits Deposit[]
//     lineItems LineItem[]

//     customerId String
//     customer Customer @relation(fields: [customerId], references: [id], onDelete: Cascade, onUpdate: Cascade)
//   }
