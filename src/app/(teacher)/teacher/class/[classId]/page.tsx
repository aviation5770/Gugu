export default async function TeacherClassPage({
  params,
}: {
  params: Promise<{ classId: string }>;
}) {
  await params;

  return <main />;
}
