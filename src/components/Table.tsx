"use client"

import {
	Table as ReactTable,
	useReactTable,
	getCoreRowModel,
	getPaginationRowModel,
	flexRender,
	createColumnHelper,
} from '@tanstack/react-table'

type Person = {
	body: string
	email: string
	name: string
	postId: number
}

const columnHelper = createColumnHelper<Person>()

const columns = [
	columnHelper.accessor('email', {
		cell: info => <i>{info.getValue()}</i>,
		header: () => <span>Email</span>,
	}),
	columnHelper.accessor('name', {
		header: () => 'Name',
	}),
	columnHelper.accessor('body', {
		header: () => <span className="font-bold">Body</span>,
	}),
	columnHelper.accessor('postId', {
		header: () => <span>Post Id</span>,
	}),

]


export default function Table({ data }: { data: Person[] }) {
	console.log("DATA", data)
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	})
	return (
		<div>
			<table>
				<thead>
					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map(header => {
								return (
									<th key={header.id} colSpan={header.colSpan}>
										{header.isPlaceholder ? null : (
											<div>
												{flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
											</div>
										)}
									</th>
								)
							})}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map(row => {
						return (
							<tr key={row.id}>
								{row.getVisibleCells().map(cell => {
									return (
										<td key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</td>
									)
								})}
							</tr>
						)
					})}
				</tbody>
				<div className="h-2" />
				<div className="flex items-center gap-2">
					<button
						className="border rounded p-1"
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
					>
						{'<<'}
					</button>
					<button
						className="border rounded p-1"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						{'<'}
					</button>
					<button
						className="border rounded p-1"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						{'>'}
					</button>
					<button
						className="border rounded p-1"
						onClick={() => table.setPageIndex(table.getPageCount() - 1)}
						disabled={!table.getCanNextPage()}
					>
						{'>>'}
					</button>
					<span className="flex items-center gap-1">
						<div>Page</div>
						<strong>
							{table.getState().pagination.pageIndex + 1} of{' '}
							{table.getPageCount()}
						</strong>
					</span>
					<span className="flex items-center gap-1">
						| Go to page:
						<input
							type="number"
							defaultValue={table.getState().pagination.pageIndex + 1}
							onChange={e => {
								const page = e.target.value ? Number(e.target.value) - 1 : 0
								table.setPageIndex(page)
							}}
							className="border p-1 rounded w-16"
						/>
					</span>
					<select
						value={table.getState().pagination.pageSize}
						onChange={e => {
							table.setPageSize(Number(e.target.value))
						}}
					>
						{[10, 20, 30, 40, 50].map(pageSize => (
							<option key={pageSize} value={pageSize}>
								Show {pageSize}
							</option>
						))}
					</select>
				</div>

			</table>
		</div>
	)
}