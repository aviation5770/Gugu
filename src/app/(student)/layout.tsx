import AuthBackground from "@/app/(auth)/_components/AuthBackground";
import * as S from "./student/student.styles";

export default function StudentLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <S.Shell>
      <AuthBackground />
      <S.ShellContent>{children}</S.ShellContent>
    </S.Shell>
  );
}