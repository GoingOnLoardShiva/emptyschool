"use client"
import React, { useEffect, useState } from "react";

function Input({ ...props }) {
  return (
    <input className="px-3 py-2 border rounded-md text-sm w-full" {...props} />
  );
}

function Modal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button className="text-slate-500" onClick={onClose}>Close</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function Datatabel() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDir, setSortDir] = useState("desc");

  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    student_id: "",
    registration_id: "",
    admission_id: "",
    name: "",
    class_name: "",
    section: "",
    status: "active",
  });

  useEffect(() => {
    fetchStudents();
  }, [page, limit, q, sortBy, sortDir]);

  async function fetchStudents() {
    setLoading(true);
    const url = new URL("/api/student-routes", location.href);
    url.searchParams.set("page", String(page));
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("q", q);
    url.searchParams.set("sortBy", sortBy);
    url.searchParams.set("sortDir", sortDir);
    const res = await fetch(url.toString());
    const json = await res.json();
    setStudents(json.data || []);
    setTotal(json.total || 0);
    setLoading(false);
  }

  async function createStudent(e) {
    e.preventDefault();
    const res = await fetch("/api/student-routes", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "content-type": "application/json" },
    });
    if (res.ok) {
      setCreateOpen(false);
      setForm({
        student_id: "",
        registration_id: "",
        admission_id: "",
        name: "",
        class_name: "",
        section: "",
        status: "active",
      });
      fetchStudents();
    } else {
      alert("Failed to create");
    }
  }

  function openEdit(student) {
    setEditing(student);
    setForm({
      student_id: student.student_id || "",
      registration_id: student.registration_id || "",
      admission_id: student.admission_id || "",
      name: student.name || "",
      class_name: student.class_name || "",
      section: student.section || "",
      status: student.status || "active",
      id: student._id,
    });
    setEditOpen(true);
  }

  async function saveEdit(e) {
    e.preventDefault();
    const { id, ...rest } = form;
    const res = await fetch("/api/student-routes", {
      method: "PUT",
      body: JSON.stringify({ id, ...rest }),
      headers: { "content-type": "application/json" },
    });
    if (res.ok) {
      setEditOpen(false);
      fetchStudents();
    } else {
      alert("Failed to save");
    }
  }

  async function removeStudent(id) {
    if (!confirm("Delete this student?")) return;
    const res = await fetch("/api/student-routes", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "content-type": "application/json" },
    });
    if (res.ok) {
      fetchStudents();
    } else {
      alert("Failed to delete");
    }
  }

  function sortToggle(field) {
    if (sortBy === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortDir("asc");
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Students</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-slate-800 text-white rounded" onClick={() => setCreateOpen(true)}>Add Student</button>
        </div>
      </div>

      <div className="mb-4 flex gap-3 items-center">
        <Input placeholder="Search by id, name, class..." value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} />
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
              <th className="p-3 text-left cursor-pointer" onClick={() => sortToggle("student_id")}>Student ID</th>
              <th className="p-3 text-left cursor-pointer" onClick={() => sortToggle("registration_id")}>Registration</th>
              <th className="p-3 text-left cursor-pointer" onClick={() => sortToggle("admission_id")}>Admission</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Class</th>
              <th className="p-3 text-left">Section</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} className="p-4">Loading...</td></tr>
            ) : students.length === 0 ? (
              <tr><td colSpan={8} className="p-4">No students</td></tr>
            ) : (
              students.map((s) => (
                <tr key={s._id} className="border-t">
                  <td className="p-3">{s.student_id}</td>
                  <td className="p-3">{s.registration_id}</td>
                  <td className="p-3">{s.admission_id}</td>
                  <td className="p-3">{s.name}</td>
                  <td className="p-3">{s.class_name}</td>
                  <td className="p-3">{s.section}</td>
                  <td className="p-3">{s.status}</td>
                  <td className="p-3 flex gap-2">
                    <button className="px-2 py-1 bg-amber-500 text-white rounded" onClick={() => openEdit(s)}>Edit</button>
                    <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={() => removeStudent(s._id)}>Delete</button>
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
          <button disabled={page <= 1} className="px-3 py-1 border rounded" onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</button>
          <button disabled={page * limit >= total} className="px-3 py-1 border rounded" onClick={() => setPage((p) => p + 1)}>Next</button>
        </div>
      </div>

      <Modal open={isCreateOpen} title="Create student" onClose={() => setCreateOpen(false)}>
        <form onSubmit={createStudent} className="grid grid-cols-1 gap-3">
          <Input placeholder="Student ID" value={form.student_id} onChange={(e) => setForm({ ...form, student_id: e.target.value })} required />
          <Input placeholder="Registration ID" value={form.registration_id} onChange={(e) => setForm({ ...form, registration_id: e.target.value })} required />
          <Input placeholder="Admission ID" value={form.admission_id} onChange={(e) => setForm({ ...form, admission_id: e.target.value })} required />
          <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <div className="flex gap-2">
            <Input placeholder="Class" value={form.class_name} onChange={(e) => setForm({ ...form, class_name: e.target.value })} />
            <Input placeholder="Section" value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value })} />
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <button type="button" className="px-4 py-2 border rounded" onClick={() => setCreateOpen(false)}>Cancel</button>
            <button className="px-4 py-2 bg-slate-800 text-white rounded" type="submit">Create</button>
          </div>
        </form>
      </Modal>

      <Modal open={isEditOpen} title="Edit student" onClose={() => setEditOpen(false)}>
        <form onSubmit={saveEdit} className="grid grid-cols-1 gap-3">
          <Input placeholder="Student ID" value={form.student_id} onChange={(e) => setForm({ ...form, student_id: e.target.value })} required />
          <Input placeholder="Registration ID" value={form.registration_id} onChange={(e) => setForm({ ...form, registration_id: e.target.value })} required />
          <Input placeholder="Admission ID" value={form.admission_id} onChange={(e) => setForm({ ...form, admission_id: e.target.value })} required />
          <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <div className="flex gap-2">
            <Input placeholder="Class" value={form.class_name} onChange={(e) => setForm({ ...form, class_name: e.target.value })} />
            <Input placeholder="Section" value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value })} />
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <button type="button" className="px-4 py-2 border rounded" onClick={() => setEditOpen(false)}>Cancel</button>
            <button className="px-4 py-2 bg-slate-800 text-white rounded" type="submit">Save</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
