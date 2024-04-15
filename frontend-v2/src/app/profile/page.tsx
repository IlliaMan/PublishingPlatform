function ProfilePage() {
  return (
    <div className="w-full">
      <div className="bg-[url('https://yt3.googleusercontent.com/VBvGYZOnjMTe5NgZKVPgF_vemzkSIdgwzun3TDKTGOietgvEtZXfZeHxRREUWv-wUe3llkmZ=w1138-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj')] h-36 w-full rounded-lg" />
      <div className="h-36 w-full bg-base-300 rounded-lg relative">
        <div className="absolute bottom-4 left-12 flex flex-col gap-4">
          <div
            className="h-32 w-32 bg-stone-200 rounded-lg
            bg-[url('https://yt3.googleusercontent.com/ytc/AIdro_khWt3vK98dhFYSgpIZZBli0zwd-dztKDv9r7rtOEtAVO8=s176-c-k-c0x00ffffff-no-rj')]"
          />
          <button className="btn btn-primary w-full">Subscribe</button>
        </div>
        <div className="w-128 h-full ml-48 overflow-hidden flex justify-center p-4">
          <div className="text-4xl text-white">Movie Reviewer</div>
        </div>
      </div>
      <div className="card card-side bg-base-300 shadow-xl mt-4">
        <figure className="h-48">
          <img
            src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
            alt="Movie"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">New movie is released!</h2>
          <p>Be up to date with the prequels.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Read</button>
          </div>
        </div>
      </div>
      <div className="card card-side bg-base-300 shadow-xl mt-4">
        <figure className="w-48">
          <img
            src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
            alt="Movie"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">New movie is released!</h2>
          <p>This story is terrifying...</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Read</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
