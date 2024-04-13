function Card() {
  return (
    <div className="card w-full md:w-[45%] xl:w-[30%] bg-primary text-primary-content">
      <div className="card-body">
        <h2 className="card-title">Article</h2>
        <p>Brief Description</p>
        <div className="card-actions justify-end">
          <button className="btn">Read</button>
        </div>
      </div>
    </div>
  );
}

export default Card;