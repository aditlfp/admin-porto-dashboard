import {  X, 
  Plus, 
  Pencil, 
  Trash2, 
  AlertCircle, 
  Upload, 
  ExternalLink, 
  Github, 
  Layers, 
  Tag, 
  Image as ImageIcon } from "lucide-react";

export default function ProjectsView({
  loading,
  projects,
  modalOpen,
  modalMode,
  currentProject,
  errors,
  deleteConfirm,
  openCreateModal,
  openEditModal,
  closeModal,
  handleSubmit,
  openDeleteConfirm,
  closeDeleteConfirm,
  handleDelete,
  setCurrentProject,
  handleImageChange,
  addFeature,
  removeFeature,
  addTech,
  removeTech,
  newFeature,
  newTech,
  setNewFeature,
  setNewTech
}) {
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Projects</h1>
            <p className="text-slate-600 mt-1">Manage your portfolio projects</p>
          </div>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-lg transition-all"
          >
            <Plus size={20} /> Add Project
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.data.length ? (
            projects.data.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition flex flex-col"
              >
                <div className="aspect-video bg-slate-100 overflow-hidden">
                  {project.img ? (
                    <img
                      src={`${import.meta.env.VITE_API_BASE_URL}/storage/public/images/${project.img}`}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <ImageIcon size={48} className="text-slate-300" />
                    </div>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{project.title}</h3>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2 flex-1">
                    {project.description}
                  </p>
                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => openEditModal(project)}
                      className="flex gap-2 w-full items-center justify-center bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg px-3 py-2 text-sm"
                    >
                      <Pencil size={14} /> Edit
                    </button>
                    <button
                      onClick={() => openDeleteConfirm(project.id, project.title, project.img_url)}
                      className="flex gap-2 w-full items-center justify-center bg-red-50 hover:bg-red-100 text-red-700 rounded-lg px-3 py-2 text-sm"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-white rounded-xl shadow-lg p-12">
              <div className="flex flex-col items-center gap-2 text-slate-400">
                <AlertCircle size={48} />
                <p className="text-lg font-medium">No projects found</p>
                <p className="text-sm">Create your first project to get started</p>
              </div>
            </div>
          )}
        </div>
      </div>

       {/* Create/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-2xl w-full max-w-2xl transform transition-all my-8">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-800">
                {modalMode === "create" ? "Create Project" : "Edit Project"}
              </h2>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-5 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={currentProject.title}
                  onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                  placeholder="Enter project title"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
                {errors.title && (
                  <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={currentProject.description}
                  onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                  placeholder="Enter project description"
                  rows={4}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                />
                {errors.description && (
                  <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Project Image <span className="text-red-500">*</span>
                </label>
                
                {currentProject.imgPreview && (
                  <div className="mb-3 rounded-lg overflow-hidden border-2 border-slate-200">
                    <img 
                      src={currentProject.imgPreview} 
                      alt="Preview" 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
                
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/jpeg,image/png,image/jpg"
                  className="hidden"
                  id="img-upload"
                />
                <label
                  htmlFor="img-upload"
                  className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <Upload size={28} className="text-slate-400 mb-2" />
                  <span className="text-sm text-slate-600 font-medium">
                    {currentProject.img ? currentProject.img.name : "Click to upload image"}
                  </span>
                  <span className="text-xs text-slate-400 mt-1">
                    JPG, JPEG, PNG (max 2MB)
                  </span>
                </label>
                
                {errors.img && (
                  <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.img}
                  </p>
                )}
              </div>

              {/* Links Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Live Link
                  </label>
                  <div className="relative">
                    <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="url"
                      value={currentProject.link}
                      onChange={(e) => setCurrentProject({ ...currentProject, link: e.target.value })}
                      placeholder="https://example.com"
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  {errors.link && (
                    <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.link}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    GitHub Link
                  </label>
                  <div className="relative">
                    <Github className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="url"
                      value={currentProject.github}
                      onChange={(e) => setCurrentProject({ ...currentProject, github: e.target.value })}
                      placeholder="https://github.com/user/repo"
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  {errors.github && (
                    <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.github}
                    </p>
                  )}
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Layers size={16} />
                  Features
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    placeholder="Add a feature"
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                  <button
                    onClick={addFeature}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentProject.feature.map((feat, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm">
                      {feat}
                      <button
                        onClick={() => removeFeature(idx)}
                        className="hover:text-green-900"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Tag size={16} />
                  Tech Stack
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                    placeholder="Add a technology"
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                  <button
                    onClick={addTech}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentProject.techStack.map((tech, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm">
                      {tech}
                      <button
                        onClick={() => removeTech(idx)}
                        className="hover:text-blue-900"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 p-6 pt-0 border-t border-slate-200">
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
              >
                {modalMode === "create" ? "Create Project" : "Save Changes"}
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
                Delete Project?
              </h2>
              
              {deleteConfirm.img && (
                <div className="mb-4 rounded-lg overflow-hidden border-2 border-slate-200">
                  <img 
                    src={deleteConfirm.img} 
                    alt={deleteConfirm.title} 
                    className="w-full h-32 object-cover"
                  />
                </div>
              )}
              
              <p className="text-slate-600 text-center mb-6">
                Are you sure you want to delete <span className="font-semibold">"{deleteConfirm.title}"</span>? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={closeDeleteConfirm}
                  className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
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