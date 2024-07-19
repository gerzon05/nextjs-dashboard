import { fetchFilteredCustomers } from '@/app/lib/data';
import CustomersTable from '@/app/ui/customers/table';
import { TableRowSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customers',
  description: 'List of all customers',
}

export default async function Page({ searchParams }: { searchParams?: { query?: string, page?: string } }) {

  const query = searchParams?.query || ''
  const customer = await fetchFilteredCustomers(query)
  return (
    <div className='w-full'>
      <Suspense fallback={<TableRowSkeleton />}>
        <CustomersTable customers={customer} />
      </Suspense>
    </div>
  );
}