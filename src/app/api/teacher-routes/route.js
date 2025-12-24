import dbConnect from '@/utilites/db/dbContec';
import Teacher from '@/utilites/models/teacher';

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const sortDir = searchParams.get('sortDir') === 'desc' ? -1 : 1;
  const search = searchParams.get('q') || '';

  const filter = {};
  if (search) {
    const re = new RegExp(search, 'i');
    filter.$or = [
      { employ_id: re },
      { name: re },
      { email: re },
      { subjects: re },
      { classes_assigned: re },
    ];
  }

  const skip = (page - 1) * limit;
  const total = await Teacher.countDocuments(filter);
  const data = await Teacher.find(filter)
    .sort({ [sortBy]: sortDir })
    .skip(skip)
    .limit(limit)
    .lean();

  return new Response(JSON.stringify({ data, total, page, limit }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  // normalize subjects/classes if comma-separated string
  if (body.subjects && typeof body.subjects === 'string') body.subjects = body.subjects.split(',').map(s => s.trim()).filter(Boolean);
  if (body.classes_assigned && typeof body.classes_assigned === 'string') body.classes_assigned = body.classes_assigned.split(',').map(s => s.trim()).filter(Boolean);
  try {
    const teacher = await Teacher.create(body);
    return new Response(JSON.stringify(teacher), { status: 201, headers: { 'content-type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400, headers: { 'content-type': 'application/json' } });
  }
}

export async function PUT(req) {
  await dbConnect();
  const body = await req.json();
  const { id, ...rest } = body;
  if (!id) return new Response(JSON.stringify({ error: 'Missing id' }), { status: 400, headers: { 'content-type': 'application/json' } });
  if (rest.subjects && typeof rest.subjects === 'string') rest.subjects = rest.subjects.split(',').map(s => s.trim()).filter(Boolean);
  if (rest.classes_assigned && typeof rest.classes_assigned === 'string') rest.classes_assigned = rest.classes_assigned.split(',').map(s => s.trim()).filter(Boolean);
  try {
    const updated = await Teacher.findByIdAndUpdate(id, rest, { new: true });
    return new Response(JSON.stringify(updated), { status: 200, headers: { 'content-type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400, headers: { 'content-type': 'application/json' } });
  }
}

export async function DELETE(req) {
  await dbConnect();
  const body = await req.json();
  const { id } = body;
  if (!id) return new Response(JSON.stringify({ error: 'Missing id' }), { status: 400, headers: { 'content-type': 'application/json' } });
  try {
    await Teacher.findByIdAndDelete(id);
    return new Response(null, { status: 204 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400, headers: { 'content-type': 'application/json' } });
  }
}