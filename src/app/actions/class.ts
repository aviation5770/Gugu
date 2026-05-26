"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

interface CreateClassInput {
  className: string;
  studentCount: number;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "수업 생성에 실패했습니다.";
}

export async function createClassAction({
  className,
  studentCount,
}: CreateClassInput) {
  try {
    const supabase = await createClient();
    const classCode = Math.random().toString(36).substring(2, 7).toUpperCase();

    const { data: classData, error: classError } = await supabase
      .from("classes")
      .insert([
        {
          class_name: className,
          student_count: studentCount,
          class_code: classCode,
        },
      ])
      .select()
      .single();

    if (classError) throw new Error(classError.message);

    const studentRows = Array.from({ length: studentCount }, (_, index) => ({
      class_id: classData.id,
      student_number: index + 1,
      birth_date: null,
    }));

    const { error: studentError } = await supabase
      .from("students")
      .insert(studentRows);

    if (studentError) throw new Error(studentError.message);

    revalidatePath("/teacher/dashboard");

    return { success: true, classCode: classData.class_code };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}
