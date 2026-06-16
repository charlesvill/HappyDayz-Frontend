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
async function handleFileChanges(e) {
  e.preventDefault();
  const fieldName = e.target.id;
  const files = e.target.files;
  console.log(e.target);
  let acc = 0;
  for (const file of files) {
    console.log(file.name, file.size, file.type);
    acc += Number(file.size);
  }
  // set a state if the file size has exceeded a boundary
  console.log('Total size: ', acc);
}

async function submitPhoto(e) {
  // '/upload/photo/:eventid/:pageid';
  // check to make sure that the file limit has not been exceeded in order to submit
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
      <input
        type="file"
        name="files[]"
        id="file"
        accept="image/*, .heic, .heif"
        onChange={handleFileChanges}
        multiple
      />
      <br />
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
