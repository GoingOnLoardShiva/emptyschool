import dbConnect from '@/utilites/db/dbContec';
import Student from '@/utilites/models/student';

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
      { student_id: re },
      { registration_id: re },
      { admission_id: re },
      { name: re },
      { class_name: re },
      { section: re },
    ];
  }

  const skip = (page - 1) * limit;
  const total = await Student.countDocuments(filter);
  const data = await Student.find(filter)
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
  try {
    const student = await Student.create(body);
    return new Response(JSON.stringify(student), { status: 201, headers: { 'content-type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400, headers: { 'content-type': 'application/json' } });
  }
}

export async function PUT(req) {
  await dbConnect();
  const body = await req.json();
  const { id, ...rest } = body;
  if (!id) return new Response(JSON.stringify({ error: 'Missing id' }), { status: 400, headers: { 'content-type': 'application/json' } });
  try {
    const updated = await Student.findByIdAndUpdate(id, rest, { new: true });
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
    await Student.findByIdAndDelete(id);
    return new Response(null, { status: 204 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400, headers: { 'content-type': 'application/json' } });
  }
}