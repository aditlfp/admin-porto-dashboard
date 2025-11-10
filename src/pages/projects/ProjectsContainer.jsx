import { useEffect, useState } from "react";
import { getProjects, createProject, updateProject, deleteProject } from "../../api/projects";
import ProjectsView from "./ProjectsView";

export default function ProjectsContainer() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [currentProject, setCurrentProject] = useState(defaultProject());
  const [errors, setErrors] = useState({});
  const [newFeature, setNewFeature] = useState("");
  const [newTech, setNewTech] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null, title: "", img: "" });

  function defaultProject() {
    return {
      id: null,
      title: "",
      description: "",
      img: null,
      imgPreview: null,
      link: "",
      github: "",
      feature: [],
      techStack: [],
    };
  }

  // Load data
  const loadData = async () => {
    try {
      const res = await getProjects();
      setProjects(res.data?.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // CRUD helpers
  const handleSubmit = async (formData) => {
    try {
      if (modalMode === "create") await createProject(formData);
      else await updateProject(currentProject.id, formData);
      closeModal();
      loadData();
    } catch (error) {
      if (error.response?.data?.errors) setErrors(error.response.data.errors);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCurrentProject({
      ...currentProject,
      img: file,
      imgPreview: URL.createObjectURL(file),
    });
  };

  const addFeature = () => {
  if (!newFeature.trim()) return;
  setCurrentProject({
    ...currentProject,
    feature: [...currentProject.feature, newFeature.trim()],
  });
  setNewFeature("");
};

const removeFeature = (index) => {
  setCurrentProject({
    ...currentProject,
    feature: currentProject.feature.filter((_, i) => i !== index),
  });
};

const addTech = () => {
  if (!newTech.trim()) return;
  setCurrentProject({
    ...currentProject,
    techStack: [...currentProject.techStack, newTech.trim()],
  });
  setNewTech("");
};

const removeTech = (index) => {
  setCurrentProject({
    ...currentProject,
    techStack: currentProject.techStack.filter((_, i) => i !== index),
  });
};

  const handleDelete = async () => {
    await deleteProject(deleteConfirm.id);
    closeDeleteConfirm();
    loadData();
  };

  // Modal logic
  const openCreateModal = () => {
    setModalMode("create");
    setCurrentProject(defaultProject());
    setModalOpen(true);
  };

  const openEditModal = (project) => {
    setModalMode("edit");
    setCurrentProject({
      ...project,
      imgPreview: project.img_url ? project.img_url : null,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setErrors({});
  };

  const openDeleteConfirm = (id, title, img) =>
    setDeleteConfirm({ open: true, id, title, img });
  const closeDeleteConfirm = () =>
    setDeleteConfirm({ open: false, id: null, title: "", img: "" });

  return (
    <ProjectsView
      loading={loading}
      projects={projects}
      modalOpen={modalOpen}
      modalMode={modalMode}
      currentProject={currentProject}
      errors={errors}
      deleteConfirm={deleteConfirm}
      openCreateModal={openCreateModal}
      openEditModal={openEditModal}
      closeModal={closeModal}
      handleSubmit={handleSubmit}
      openDeleteConfirm={openDeleteConfirm}
      closeDeleteConfirm={closeDeleteConfirm}
      handleDelete={handleDelete}
      setCurrentProject={setCurrentProject}
      newFeature={newFeature}
      newTech={newTech}
      handleImageChange={handleImageChange}
      addFeature={addFeature}
      removeFeature={removeFeature}
      addTech={addTech}
      removeTech={removeTech}
      setNewFeature={setNewFeature}
      setNewTech={setNewTech}
    />
  );
}
