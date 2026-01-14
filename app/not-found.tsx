import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
      <p className="text-xs font-semibold text-muted">404</p>
      <h1 className="text-3xl font-semibold">요청한 페이지를 찾을 수 없습니다.</h1>
      <p className="text-sm text-muted">
        이동한 페이지가 없거나 URL이 변경되었습니다. 아래에서 홈으로 이동할 수 있습니다.
      </p>
      <Link href="/" className={buttonVariants({ size: "sm" })}>
        대시보드로 이동
      </Link>
    </div>
  );
}
