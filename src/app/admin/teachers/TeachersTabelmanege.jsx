"use client"
import React, { useEffect, useState } from "react";

function Input({ ...props }) {
  return <input className="px-3 py-2 border rounded-md text-sm w-full" {...props} />;
}

function Modal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button className="text-slate-500" onClick={onClose}>Close</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function TeachersTabelmanege() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDir, setSortDir] = useState("desc");

  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({
    employ_id: "",
    name: "",
    email: "",
    phone: "",
    subjects: [],
    classes_assigned: [],
    status: "active",
  });

  useEffect(() => {
    fetchTeachers();
  }, [page, limit, q, sortBy, sortDir]);

  async function fetchTeachers() {
    setLoading(true);
    const url = new URL("/api/teacher-routes", location.href);
    url.searchParams.set("page", String(page));
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("q", q);
    url.searchParams.set("sortBy", sortBy);
    url.searchParams.set("sortDir", sortDir);
    const res = await fetch(url.toString());
    const json = await res.json();
    setTeachers(json.data || []);
    setTotal(json.total || 0);
    setLoading(false);
  }

  async function createTeacher(e) {
    e.preventDefault();
    // ensure arrays are sent (comma-separated accepted by API)
    const body = { ...form };
    body.subjects = Array.isArray(body.subjects) ? body.subjects : String(body.subjects).split(',').map(s=>s.trim()).filter(Boolean);
    body.classes_assigned = Array.isArray(body.classes_assigned) ? body.classes_assigned : String(body.classes_assigned).split(',').map(s=>s.trim()).filter(Boolean);
    const res = await fetch("/api/teacher-routes", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "content-type": "application/json" },
    });
    if (res.ok) {
      setCreateOpen(false);
      setForm({ employ_id: "", name: "", email: "", phone: "", subjects: [], classes_assigned: [], status: "active" });
      fetchTeachers();
    } else {
      alert("Failed to create teacher");
    }
  }

  function openEdit(t) {
    setForm({
      employ_id: t.employ_id || "",
      name: t.name || "",
      email: t.email || "",
      phone: t.phone || "",
      subjects: t.subjects || [],
      classes_assigned: t.classes_assigned || [],
      status: t.status || "active",
      id: t._id,
    });
    setEditOpen(true);
  }

  async function saveEdit(e) {
    e.preventDefault();
    const { id, ...rest } = form;
    const payload = { id, ...rest };
    payload.subjects = Array.isArray(payload.subjects) ? payload.subjects : String(payload.subjects).split(',').map(s=>s.trim()).filter(Boolean);
    payload.classes_assigned = Array.isArray(payload.classes_assigned) ? payload.classes_assigned : String(payload.classes_assigned).split(',').map(s=>s.trim()).filter(Boolean);
    const res = await fetch("/api/teacher-routes", {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: { "content-type": "application/json" },
    });
    if (res.ok) {
      setEditOpen(false);
      fetchTeachers();
    } else {
      alert("Failed to save");
    }
  }

  async function removeTeacher(id) {
    if (!confirm("Delete this teacher?")) return;
    const res = await fetch("/api/teacher-routes", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "content-type": "application/json" },
    });
    if (res.ok) fetchTeachers(); else alert("Failed to delete");
  }

  function sortToggle(field) {
    if (sortBy === field) setSortDir(d => (d === "asc" ? "desc" : "asc"));
    else { setSortBy(field); setSortDir("asc"); }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Teachers</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-slate-800 text-white rounded" onClick={() => setCreateOpen(true)}>Add Teacher</button>
        </div>
      </div>

      <div className="mb-4 flex gap-3 items-center">
        <Input placeholder="Search by employ_id, name, email, subject..." value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} />
        <select value={limit} onChange={(e) => setLimit(Number(e.target.value))} className="px-3 py-2 border rounded-md">
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="p-3 text-left cursor-pointer" onClick={() => sortToggle("employ_id")}>Employ ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Subjects</th>
              <th className="p-3 text-left">Classes</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="p-4">Loading...</td></tr>
            ) : teachers.length === 0 ? (
              <tr><td colSpan={7} className="p-4">No teachers</td></tr>
            ) : (
              teachers.map(t => (
                <tr key={t._id} className="border-t">
                  <td className="p-3">{t.employ_id}</td>
                  <td className="p-3">{t.name}</td>
                  <td className="p-3">{t.email}</td>
                  <td className="p-3">{(t.subjects || []).join(', ')}</td>
                  <td className="p-3">{(t.classes_assigned || []).join(', ')}</td>
                  <td className="p-3">{t.status}</td>
                  <td className="p-3 flex gap-2">
                    <button className="px-2 py-1 bg-amber-500 text-white rounded" onClick={() => openEdit(t)}>Edit</button>
                    <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={() => removeTeacher(t._id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>Showing {(page - 1) * limit + 1} - {Math.min(page * limit, total)} of {total}</div>
        <div className="flex gap-2">
          <button disabled={page <= 1} className="px-3 py-1 border rounded" onClick={() => setPage(p => Math.max(1, p - 1))}>Prev</button>
          <button disabled={page * limit >= total} className="px-3 py-1 border rounded" onClick={() => setPage(p => p + 1)}>Next</button>
        </div>
      </div>

      <Modal open={isCreateOpen} title="Create teacher" onClose={() => setCreateOpen(false)}>
        <form onSubmit={createTeacher} className="grid grid-cols-1 gap-3">
          <Input placeholder="Employ ID" value={form.employ_id} onChange={(e) => setForm({ ...form, employ_id: e.target.value })} required />
          <div className="grid grid-cols-2 gap-2">
            <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <Input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <Input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <Input placeholder="Subjects (comma separated)" value={(Array.isArray(form.subjects) ? form.subjects.join(', ') : form.subjects)} onChange={(e) => setForm({ ...form, subjects: e.target.value })} />
          <Input placeholder="Classes (comma separated)" value={(Array.isArray(form.classes_assigned) ? form.classes_assigned.join(', ') : form.classes_assigned)} onChange={(e) => setForm({ ...form, classes_assigned: e.target.value })} />
          <div className="flex justify-end gap-2 mt-2">
            <button type="button" className="px-4 py-2 border rounded" onClick={() => setCreateOpen(false)}>Cancel</button>
            <button className="px-4 py-2 bg-slate-800 text-white rounded" type="submit">Create</button>
          </div>
        </form>
      </Modal>

      <Modal open={isEditOpen} title="Edit teacher" onClose={() => setEditOpen(false)}>
        <form onSubmit={saveEdit} className="grid grid-cols-1 gap-3">
          <Input placeholder="Employ ID" value={form.employ_id} onChange={(e) => setForm({ ...form, employ_id: e.target.value })} required />
          <div className="grid grid-cols-2 gap-2">
            <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <Input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <Input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <Input placeholder="Subjects (comma separated)" value={(Array.isArray(form.subjects) ? form.subjects.join(', ') : form.subjects)} onChange={(e) => setForm({ ...form, subjects: e.target.value })} />
          <Input placeholder="Classes (comma separated)" value={(Array.isArray(form.classes_assigned) ? form.classes_assigned.join(', ') : form.classes_assigned)} onChange={(e) => setForm({ ...form, classes_assigned: e.target.value })} />
          <div className="flex justify-end gap-2 mt-2">
            <button type="button" className="px-4 py-2 border rounded" onClick={() => setEditOpen(false)}>Cancel</button>
            <button className="px-4 py-2 bg-slate-800 text-white rounded" type="submit">Save</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
