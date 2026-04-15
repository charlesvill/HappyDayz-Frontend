import { apiMultPartFetch, serverHostName } from '../../utils/apiUtils';

function Header() {
  return (
    <>
      <header>
        <div>
          <h1>{'Charles & Jenn Wedding'}</h1>
          <h3>Photo Album</h3>
        </div>
        <div>
          <button>Post</button>
        </div>
      </header>
    </>
  );
}

function PhotoAlbum({ photos }) {
  function Photo({ photo }) {
    return (
      <section>
        <div>
          <img src={photo?.img?.url} alt="Album Photo Entry" />
          <p>{photo?.text}</p>
        </div>
      </section>
    );
  }
  return (
    <section>
      <div id="album-container">
        {photos.map((photo) => {
          return <Photo key={photo?.id} photo={photo} />;
        })}
      </div>
    </section>
  );
}
async function submitPhoto(e) {
  const url = serverHostName() + '/photo';
  const formData = new FormData(e.target);

  const response = apiMultPartFetch(url, null, formData, 'POST', {
    'Content-Type': 'multipart/form-data',
  });
}

function PhotoForm() {
  return (
    <form>
      <div>Upload a photo</div>
      <label htmlFor="file">Attach photo</label>
      <input type="file" name="file" id="file" />
      <button type="submit" onClick={submitPhoto}>
        Upload
      </button>
    </form>
  );
}

function Footer() {
  return <footer>Created by: Charles Villalpando</footer>;
}

export default function MvpEventPage() {
  return (
    <>
      <Header />
      <main>{/* <PhotoAlbum />*/}</main>

      <Footer />
    </>
  );
}
