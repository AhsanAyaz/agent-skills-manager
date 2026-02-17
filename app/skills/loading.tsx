export default function SkillsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="skeleton h-8 w-64"></div>
          <div className="skeleton h-4 w-48 mt-2"></div>
        </div>
        <div className="skeleton h-8 w-24"></div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <div className="skeleton h-6 w-3/4"></div>
              <div className="skeleton h-4 w-full mt-2"></div>
              <div className="skeleton h-4 w-2/3 mt-1"></div>
              <div className="flex justify-between mt-4">
                <div className="skeleton h-4 w-20"></div>
                <div className="skeleton h-4 w-16"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}