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
  )
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
    )
  }
  return (
    <section>
      <div id="album-container">
        {photos.map((photo) => {
          return (
            <Photo key={photo?.id} photo={photo} />
          )
        })}
      </div>
    </section>
  )


}

function Footer() {
  return (
    <footer>
      Created by: Charles Villalpando
    </footer>
  )

}

export default function MvpEventPage() {

  return (
    <>
      <Header />
      <main>
        <PhotoAlbum />
      </main>
      <Footer />
    </>
  )

}
