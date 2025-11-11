import { useEffect, useState } from "react";
import {
  getCertificates,
  createCertificate,
  deleteCertificate,
  updateCertificate,
} from "../../api/certificates";
import CertificatesView from "./CertificatesView";
import { notifySuccess, notifyError, notifyWarning } from '../../components/Notifications'


export default function CertificatesContainer() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [currentCert, setCurrentCert] = useState({ id: null, img: null, imgPreview: null });
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null, img: "" });
  const [errors, setErrors] = useState({});

  const loadData = async () => {
    try {
      const res = await getCertificates();
      setCertificates(res.data);
    } catch (err) {
      console.error("Error loading certificates", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setModalMode("create");
    setCurrentCert({ id: null, img: null, imgPreview: null });
    setErrors({});
    setModalOpen(true);
  };

  const openEditModal = (cert) => {
    setModalMode("edit");
    setCurrentCert({ id: cert.id, img: null, imgPreview: cert.img_url || null });
    setErrors({});
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentCert({ id: null, img: null, imgPreview: null });
    setErrors({});
  };

  const handleImageChange = (file) => {
    if (!file) return;

    setErrors({});
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      return setErrors({ img: "The image must be a file of type: jpeg, png, jpg." });
    }

    if (file.size > 2048 * 1024) {
      return setErrors({ img: "The image may not be greater than 2048 kilobytes." });
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setCurrentCert({ ...currentCert, img: file, imgPreview: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!currentCert.img && modalMode === "create") {
      setErrors({ img: "The image field is required." });
      return;
    }

    const formData = new FormData();
    if (currentCert.img) formData.append("img", currentCert.img);

    try {
      if (modalMode === "create") {
        await createCertificate(formData);
        notifySuccess("Certificates Success To Add!")
      } else {
        await updateCertificate(currentCert.id, formData);
        notifySuccess("Certificates Success To Updated!")
      }
      closeModal();
      loadData();
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
        notifyError("Error Cant Continue Proccess")
      }
    }
  };

  const openDeleteConfirm = (id, imgUrl) => {
    setDeleteConfirm({ open: true, id, img: imgUrl });
  };

  const closeDeleteConfirm = () => {
    setDeleteConfirm({ open: false, id: null, img: "" });
  };

  const handleDelete = async () => {
    await deleteCertificate(deleteConfirm.id);
    closeDeleteConfirm();
    notifyWarning("Certificates has been Remove!")
    loadData();
  };

  return (
    <CertificatesView
      loading={loading}
      certificates={certificates}
      modalOpen={modalOpen}
      modalMode={modalMode}
      currentCert={currentCert}
      deleteConfirm={deleteConfirm}
      errors={errors}
      onOpenCreate={openCreateModal}
      onOpenEdit={openEditModal}
      onCloseModal={closeModal}
      onImageChange={handleImageChange}
      onSubmit={handleSubmit}
      onOpenDelete={openDeleteConfirm}
      onCloseDelete={closeDeleteConfirm}
      onConfirmDelete={handleDelete}
    />
  );
}
