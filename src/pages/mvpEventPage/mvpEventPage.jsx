import { useState, useEffect } from 'react';
import { apiMultPartFetch, serverHostName } from '../../utils/apiUtils';
import styles from './mvpEventPage.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1>Charles & Jenn Wedding</h1>
        <h3>Photo Album</h3>
      </div>
    </header>
  );
}

function PhotoAlbum({ photos }) {
  function Photo({ photo }) {
    return (
      <div className={styles.photoCard}>
        <img src={photo?.img?.url} alt="Album Photo Entry" />
      </div>
    );
  }

  if (!photos || photos.length === 0) {
    return (
      <div className={styles.albumContainer}>
        <div className={styles.emptyState}>
          <p>No photos yet. Be the first to share!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.albumContainer}>
      {photos.map((photo) => {
        return <Photo key={photo?.id} photo={photo} />;
      })}
    </div>
  );
}

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>{children}</div>
    </div>
  );
}

function PhotoForm({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    caption: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    console.log('files', e.target.files);
    if (file) {
      // Basic validation
      if (file.size > 20 * 1024 * 1024) {
        // 20MB limit
        setError('File size exceeds 20MB limit');
        return;
      }
      setSelectedFile(file);
      setError('');
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
//    if (!formData.caption.trim()) {
//      setError('Caption is required');
//      return false;
//    }
    if (!selectedFile) {
      setError('Please select a photo');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('files[]', selectedFile);
      uploadFormData.append('name', formData.name);
      uploadFormData.append('caption', formData.caption);

      const tempHostName = 'http://52.203.22.110';
      const url = tempHostName + '/upload/photo/1/1';

      const response = await apiMultPartFetch(url, null, uploadFormData, 'POST');
      console.log('Upload response:', response);

      // Reset form
      setFormData({ name: '', caption: '' });
      setSelectedFile(null);
      setError('');

      // Notify parent component of success
      if (onSuccess) onSuccess();

      // Close modal
      onClose();
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload photo. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={styles.modalHeader}>
        <h2>Upload a Photo</h2>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
      </div>
      <div className={styles.modalBody}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Your Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="caption">Photo Caption *</label>
            <textarea
              id="caption"
              name="caption"
              placeholder="Add a caption for your photo"
              value={formData.caption}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="file">Select Photo *</label>
            <div className={styles.fileInputWrapper}>
              <input
                type="file"
                id="file"
                name="file"
                accept="image/*,.heic,.heif"
                onChange={handleFileChange}
                className={styles.fileInput}
              />
              <label htmlFor="file" className={styles.fileInputLabel}>
                <div>Click to select or drag and drop</div>
                <div className={styles.fileName}>
                  {selectedFile ? selectedFile.name : 'JPG, PNG, HEIC up to 10MB'}
                </div>
              </label>
            </div>
          </div>

          {error && (
            <div style={{ color: 'var(--color-text)', marginBottom: 'var(--spacing-md)' }}>
              {error}
            </div>
          )}

          <div className={styles.modalFooter}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading || !formData.name || !formData.caption || !selectedFile}
            >
              {isLoading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

function Footer() {
  return <footer className={styles.footer}>Created by: Charles Villalpando</footer>;
}

export function MvpEventPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photos, setPhotos] = useState([
    // Placeholder photos - will be replaced with API data
    // {
    //   id: 1,
    //   img: { url: 'https://via.placeholder.com/300' },
    //   text: 'Sample photo',
    // },
  ]);

  useEffect(() => {
    // TODO: Fetch photos from API when ready
    // const fetchPhotos = async () => {
    //   try {
    //     const url = serverHostName() + '/photos/event/1/page/1';
    //     const response = await apiFetch(url);
    //     setPhotos(response.data);
    //   } catch (err) {
    //     console.error('Failed to fetch photos:', err);
    //   }
    // };
    // fetchPhotos();
  }, []);

  const handleUploadSuccess = () => {
    // TODO: Refetch photos after successful upload
    console.log('Photo uploaded successfully');
  };

  return (
    <>
      <Header />
      <main className={styles.mainContent}>
        <PhotoAlbum photos={photos} />
      </main>

      {/* Sticky Upload Button */}
      <button
        className={styles.uploadButton}
        onClick={() => setIsModalOpen(true)}
        title="Upload a photo"
        aria-label="Upload a photo"
      >
        +
      </button>

      {/* Upload Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <PhotoForm onClose={() => setIsModalOpen(false)} onSuccess={handleUploadSuccess} />
      </Modal>

      <Footer />
    </>
  );
}
