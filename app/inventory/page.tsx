import Link from "next/link";
import { Filter, PlusCircle, Printer } from "lucide-react";

import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { inventoryItems } from "@/lib/sample-data";
import { formatDate } from "@/lib/format";

export default function InventoryPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="재고 관리"
        title="전체 품목 리스트"
        description="소모품, 백신, 판매용 외용제까지 한 화면에서 관리하세요."
        actions={
          <>
            <Link
              href="/labels"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              <Printer className="h-4 w-4" />
              라벨 출력
            </Link>
            <Button size="sm">
              <PlusCircle className="h-4 w-4" />
              품목 추가
            </Button>
          </>
        }
      />

      <Card className="border border-border/70 bg-surface/80 p-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1">
            <Input placeholder="품목명, 분류, 로케이션 검색" />
          </div>
          <Button variant="secondary" size="sm">
            <Filter className="h-4 w-4" />
            필터
          </Button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          {"전체,백신,소모품,외용제".split(",").map((label) => (
            <button
              key={label}
              type="button"
              className="rounded-full border border-border/70 px-3 py-1 text-muted transition hover:bg-soft"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>품목</TableHead>
                <TableHead>분류</TableHead>
                <TableHead>로케이션</TableHead>
                <TableHead>재고</TableHead>
                <TableHead>유효기간</TableHead>
                <TableHead>상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Link
                      href={`/inventory/${item.id}`}
                      className="font-semibold hover:underline"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-muted">{item.supplier}</p>
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>
                    <span className="font-semibold">
                      {item.stock} {item.unit}
                    </span>
                    <p className="text-xs text-muted">기준선 {item.min}</p>
                  </TableCell>
                  <TableCell>{formatDate(item.expiry)}</TableCell>
                  <TableCell>
                    <Badge variant={item.stock <= item.min ? "danger" : "accent"}>
                      {item.stock <= item.min ? "발주 필요" : "안정"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
