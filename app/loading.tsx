export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-100">
      <div className="flex flex-col items-center">
        <div className="loading loading-spinner loading-lg text-blue-500"></div>
        <p className="mt-4 text-lg">جاري التحميل...</p>
      </div>
    </div>
  )
}
