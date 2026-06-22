import { useState, useEffect } from 'react';
import { apiMultPartFetch, apiFetch } from '../../utils/apiUtils';
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
        <img src={photo?.url} alt="Album Photo Entry" id={photo?.id} />
        <a>{photo?.data?.caption}</a>
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
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const filesArray = Array.from(files);
      let totalSize = 0;

      // Validate file sizes
      for (const file of filesArray) {
        totalSize += file.size;
        if (file.size > 20 * 1024 * 1024) {
          setError(`File "${file.name}" exceeds 20MB limit`);
          return;
        }
      }

      setSelectedFiles(filesArray);
      setError('');
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (selectedFiles.length === 0) {
      setError('Please select at least one photo');
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

      // Append all selected files
      for (const file of selectedFiles) {
        uploadFormData.append('files[]', file);
      }

      uploadFormData.append('name', formData.name);
      uploadFormData.append('caption', formData.caption);

      const tempHostName = 'https://api-happydayz.top';
      const url = tempHostName + '/upload/photo/1/1';

      const response = await apiMultPartFetch(
        url,
        null,
        uploadFormData,
        'POST'
      );
      console.log('Upload response:', response);

      // Reset form
      setFormData({ name: '', caption: '' });
      setSelectedFiles([]);
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
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
            <label htmlFor="file">Select Photos *</label>
            <div className={styles.fileInputWrapper}>
              <input
                type="file"
                id="file"
                name="files[]"
                accept="image/*,.heic,.heif"
                onChange={handleFileChange}
                multiple
                className={styles.fileInput}
              />
              <label htmlFor="file" className={styles.fileInputLabel}>
                <div>Click to select or drag and drop</div>
                <div className={styles.fileName}>
                  {selectedFiles.length > 0
                    ? `${selectedFiles.length} photo${selectedFiles.length > 1 ? 's' : ''} selected`
                    : 'JPG, PNG, HEIC up to 20MB total'}
                </div>
              </label>
            </div>
          </div>

          {error && (
            <div
              style={{
                color: 'var(--color-text)',
                marginBottom: 'var(--spacing-md)',
              }}
            >
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
              disabled={
                isLoading || !formData.name || selectedFiles.length === 0
              }
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
  return (
    <footer className={styles.footer}>Created by: Charles Villalpando</footer>
  );
}

export function MvpEventPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  const tempHostName = 'http://52.203.22.110';
  const url = tempHostName + '/upload/photo/1/1';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiFetch(url);
        console.log(response, ' response');
        setPhotos(response);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
        setReload(false);
      }
    };

    fetchData();
  }, [url, reload]);

  const handleUploadSuccess = () => {
    // TODO: Refetch photos after successful upload
    setReload(true);
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
        <PhotoForm
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleUploadSuccess}
        />
      </Modal>

      <Footer />
    </>
  );
}
