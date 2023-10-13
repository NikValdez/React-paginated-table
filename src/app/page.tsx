import Table from "@/components/Table"

export default async function Home() {
  const res = await fetch('https://jsonplaceholder.typicode.com/comments')
  const data = await res.json()
  return (
    <main>
      <Table data={data} />

    </main>
  )
}
