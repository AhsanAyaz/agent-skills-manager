export default function SkillLoading() {
  return (
    <div className="p-6 max-w-md mx-auto my-4">
      <div className="card bg-base-200">
        <div className="card-body">
          <div className="skeleton h-6 w-3/4"></div>
          <div className="skeleton h-4 w-full mt-2"></div>
        </div>
      </div>
    </div>
  );
}