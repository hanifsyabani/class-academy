export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      <div className="flex justify-center items-center flex-col">
        <div className="loading-wave">
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
        </div>
      </div>
    </div>
  );
}
