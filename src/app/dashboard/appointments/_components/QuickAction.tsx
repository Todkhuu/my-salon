import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const QuickAction = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Түргэн Үйлдлүүд</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Link href="/services">
          <Button className="w-full">Шинэ цаг захиалах</Button>
        </Link>
        <Link href="/contact">
          <Button variant="outline" className="w-full">
            Дэмжлэгтэй холбогдох
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
