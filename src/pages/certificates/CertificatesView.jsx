import { X, Plus, Pencil, Trash2, AlertCircle, Upload, Image as ImageIcon } from "lucide-react";

export default function CertificatesView({
  loading,
  certificates,
  modalOpen,
  modalMode,
  currentCert,
  deleteConfirm,
  errors,
  onOpenCreate,
  onOpenEdit,
  onCloseModal,
  onImageChange,
  onSubmit,
  onOpenDelete,
  onCloseDelete,
  onConfirmDelete,
}) {
  const certData = certificates?.data?.data || [];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Certificates</h1>
            <p className="text-slate-600 mt-1">Manage your certificate images</p>
          </div>
          <button
            onClick={onOpenCreate}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
          >
            <Plus size={20} />
            Add Certificate
          </button>
        </div>
        
        {/* Grid Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certData.length > 0 ? (
            certData.map((cert) => (
              <div key={cert.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-video bg-slate-100 relative overflow-hidden">
                  {cert.img ? (
                    <img 
                      src={import.meta.env.VITE_API_BASE_URL + '/storage/public/images/' + cert.img} 
                      alt={`Certificate ${cert.id}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <ImageIcon size={48} className="text-slate-300" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-slate-500">ID: {cert.id}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onOpenEdit(cert)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg transition-colors text-sm font-medium"
                    >
                      <Pencil size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => onOpenDelete(cert.id, cert.img_url)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors text-sm font-medium"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-white rounded-xl shadow-lg p-12">
              <div className="flex flex-col items-center gap-2 text-slate-400">
                <AlertCircle size={48} />
                <p className="text-lg font-medium">No certificates found</p>
                <p className="text-sm">Upload your first certificate to get started</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {modalOpen && (
        <div className={`fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4`}>
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 w-full max-w-md transform transition-all">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-800">
                {modalMode === "create" ? "Upload Certificate" : "Update Certificate"}
              </h2>
              <button
                onClick={onCloseModal}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Certificate Image
              </label>
              
              {/* Image Preview */}
              {currentCert.imgPreview && (
                <div className="mb-4 rounded-lg overflow-hidden border-2 border-slate-200">
                  <img 
                    src={currentCert.imgPreview} 
                    alt="Preview" 
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
              
              {/* File Input */}
              <div className="relative">
                <input
                  type="file"
                  onChange={(e) => onImageChange(e.target.files[0])}
                  accept="image/jpeg,image/png,image/jpg"
                  className="hidden"
                  id="img-upload"
                />
                <label
                  htmlFor="img-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <Upload size={32} className="text-slate-400 mb-2" />
                  <span className="text-sm text-slate-600 font-medium">
                    {currentCert.img ? currentCert.img.name : "Click to upload image"}
                  </span>
                  <span className="text-xs text-slate-400 mt-1">
                    JPG, JPEG, PNG (max 2MB)
                  </span>
                </label>
              </div>
              
              {/* Error Message */}
              {errors.img && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.img}
                </p>
              )}
            </div>
            <div className="flex gap-3 p-6 pt-0">
              <button
                onClick={onCloseModal}
                className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={onSubmit}
                disabled={!currentCert.img && modalMode === "create"}
                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
              >
                {modalMode === "create" ? "Upload" : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
                <AlertCircle className="text-red-600" size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-800 text-center mb-2">
                Delete Certificate?
              </h2>
              
              {deleteConfirm.img && (
                <div className="mb-4 rounded-lg overflow-hidden border-2 border-slate-200">
                  <img 
                    src={deleteConfirm.img} 
                    alt="Certificate to delete" 
                    className="w-full h-32 object-cover"
                  />
                </div>
              )}
              
              <p className="text-slate-600 text-center mb-6">
                Are you sure you want to delete this certificate? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={onCloseDelete}
                  className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirmDelete}
                  className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}