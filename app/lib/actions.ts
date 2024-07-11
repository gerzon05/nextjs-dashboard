'use server'

import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string(),
})

const CreateInvoices = FormSchema.omit({ id: true, date: true })

export async function createInvoice(formData: FormData) {
    const {customerId,amount,status} = CreateInvoices.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    })
    const amountInCents = amount * 100
    const date = new Date().toISOString().split('T')[0]
    try {
    
        await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;
    
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Invoice.',
        }
    }
    revalidatePath('/dashboard/invoices')
    redirect('/dashboard/invoices')
}

const UpdateInvoices = FormSchema.omit({ id: true, date: true })

export async function updateInvoices(id: string, formData:FormData) {
    const {customerId,amount,status} = UpdateInvoices.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    })

    const amountInCents = amount * 100;

    try {
        await sql`UPDATE invoices SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status} WHERE id = ${id}`
    } catch (error) {
        return {
            message: 'Database Error: Failed to Update Invoice.',
        }
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export default async function deleteInvoices(id:string){
    try {
        await sql`DELETE from invoices WHERE id = ${id}`;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Delete Invoice.',
        }
    }
    revalidatePath('/dashboard/invoices');
}
