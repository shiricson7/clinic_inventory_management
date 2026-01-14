import { PhoneLoginForm } from "@/components/auth/PhoneLoginForm";

export default function LoginPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold text-muted">인증 시작</p>
        <h1 className="text-3xl font-semibold">휴대폰 번호로 로그인</h1>
        <p className="text-sm text-muted">
          최초 로그인 시 자동으로 계정이 생성됩니다.
        </p>
      </div>
      <PhoneLoginForm />
    </div>
  );
}
