create table if not exists public.teachers (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  name text not null,
  profile_image_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.classes (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid references public.teachers(id) on delete cascade,
  class_name text not null,
  class_code text not null unique,
  student_count integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes(id) on delete cascade,
  student_number integer not null,
  name text,
  birth_date text,
  memo text,
  profile_image_url text,
  created_at timestamptz not null default now(),
  unique(class_id, student_number)
);

create table if not exists public.exam_schedules (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes(id) on delete cascade,
  title text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  problem_count integer,
  time_limit_seconds integer,
  created_at timestamptz not null default now()
);

create table if not exists public.student_records (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade,
  mode text not null,
  problem_count integer not null,
  correct_count integer not null,
  accuracy numeric not null,
  elapsed_seconds integer not null,
  created_at timestamptz not null default now()
);

alter table public.teachers add column if not exists profile_image_url text;
alter table public.students add column if not exists name text;
alter table public.students add column if not exists memo text;
alter table public.students add column if not exists profile_image_url text;

alter table public.teachers enable row level security;
alter table public.classes enable row level security;
alter table public.students enable row level security;
alter table public.exam_schedules enable row level security;
alter table public.student_records enable row level security;

drop policy if exists "teachers_select_own" on public.teachers;
create policy "teachers_select_own" on public.teachers
  for select using (auth.uid() = id);

drop policy if exists "teachers_insert_own" on public.teachers;
create policy "teachers_insert_own" on public.teachers
  for insert with check (auth.uid() = id);

drop policy if exists "teachers_update_own" on public.teachers;
create policy "teachers_update_own" on public.teachers
  for update using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "classes_teacher_all" on public.classes;
create policy "classes_teacher_all" on public.classes
  for all using (auth.uid() = teacher_id) with check (auth.uid() = teacher_id);

drop policy if exists "students_teacher_all" on public.students;
create policy "students_teacher_all" on public.students
  for all using (
    exists (
      select 1 from public.classes
      where classes.id = students.class_id
      and classes.teacher_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.classes
      where classes.id = students.class_id
      and classes.teacher_id = auth.uid()
    )
  );

drop policy if exists "exam_schedules_teacher_all" on public.exam_schedules;
create policy "exam_schedules_teacher_all" on public.exam_schedules
  for all using (
    exists (
      select 1 from public.classes
      where classes.id = exam_schedules.class_id
      and classes.teacher_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.classes
      where classes.id = exam_schedules.class_id
      and classes.teacher_id = auth.uid()
    )
  );

drop policy if exists "student_records_teacher_read" on public.student_records;
create policy "student_records_teacher_read" on public.student_records
  for select using (
    exists (
      select 1 from public.classes
      where classes.id = student_records.class_id
      and classes.teacher_id = auth.uid()
    )
  );
