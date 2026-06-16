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
  // '/upload/photo/:eventid/:pageid';
  e.preventDefault();
  const url = serverHostName() + '/upload/photo/1/1';
  const formData = new FormData(e.target);

  let response;

  try {
    response = await apiMultPartFetch(url, null, formData, 'POST');
  } catch (err) {
    console.error(err);
  } finally {
    console.log(response);
  }
}

function PhotoForm() {
  return (
    <form onSubmit={submitPhoto}>
      <div>Upload a photo</div>
      <label htmlFor="file">Attach photo</label>
      <input type="file" name="files[]" id="file" accept="image/*" multiple />
      <button type="submit">Upload</button>
    </form>
  );
}

function Footer() {
  return <footer>Created by: Charles Villalpando</footer>;
}

export function MvpEventPage() {
  return (
    <>
      <Header />
      <main>{/* <PhotoAlbum />*/}</main>
      <PhotoForm />

      <Footer />
    </>
  );
}
